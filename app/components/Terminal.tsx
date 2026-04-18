'use client';

import {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  KeyboardEvent,
  ReactNode,
} from 'react';
import styles from '../page.module.css';
import {
  stack,
  skills,
  services,
  log as gitLog,
  processes,
  adrs,
  shortHash,
  Service,
  Adr,
} from '../data';

type Entry = { cmd: string; node: ReactNode };

type Props = {
  uptime: string;
  toggleTheme: () => void;
};

const BOOT_LINES = [
  'initializing kenneth-ajero v9.2.0',
  'mounting /services ... 6 healthy',
  'resolving skills.lock ... done',
  'ready. type `help` or scroll for the full documentation.',
];

const QUICK_CMDS = ['help', 'whoami', 'ls', 'cat README.md', 'contact'];

const FILES = [
  'README.md',
  'package.json',
  'skills.lock',
  'contact.http',
  'services/',
  'decisions/',
];

const COMMAND_NAMES = [
  'help', 'whoami', 'ls', 'cat', 'git', 'ps', 'uname',
  'uptime', 'date', 'contact', 'theme', 'clear',
];

export default function Terminal({ uptime, toggleTheme }: Props) {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [input, setInput] = useState('');
  const [cursor, setCursor] = useState(-1);
  const [booted, setBooted] = useState(false);
  const [visibleBoot, setVisibleBoot] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<string[]>([]);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setVisibleBoot(BOOT_LINES.length);
      setBooted(true);
      return;
    }
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      i++;
      setVisibleBoot(i);
      if (i >= BOOT_LINES.length) {
        timer = setTimeout(() => setBooted(true), 220);
        return;
      }
      timer = setTimeout(tick, 160);
    };
    timer = setTimeout(tick, 260);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (booted) inputRef.current?.focus({ preventScroll: true });
  }, [booted]);

  useLayoutEffect(() => {
    const el = outputRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [entries, visibleBoot, booted]);

  const unknown = (x: string): ReactNode => (
    <div className={styles.termUnknown}>
      command not found: <strong>{x}</strong>. type &apos;help&apos; for available commands.
    </div>
  );

  const lsHandler = (arg: string): ReactNode => {
    const path = arg.replace(/\/$/, '');
    if (path === '' || path === '.' || path === '/') {
      return (
        <div className={styles.termLs}>
          {FILES.map((f) => (
            <span key={f}>{f}</span>
          ))}
        </div>
      );
    }
    if (path === 'services') {
      return (
        <div>
          {services.map((s) => (
            <div key={s.id}>
              <span className={styles.termAccent}>{s.id}</span>  {s.title}
            </div>
          ))}
        </div>
      );
    }
    if (path === 'decisions') {
      return (
        <div>
          {adrs.map((a) => (
            <div key={a.id}>
              <span className={styles.termAccent}>{a.id}</span>  {a.title}
            </div>
          ))}
        </div>
      );
    }
    return <div className={styles.termUnknown}>ls: {arg}: No such directory</div>;
  };

  const catHandler = (arg: string): ReactNode => {
    if (!arg) return <div className={styles.termUnknown}>cat: missing file operand</div>;
    if (arg === 'README.md') return <CatReadme />;
    if (arg === 'package.json') return <CatPackage />;
    if (arg === 'skills.lock') return <CatSkills />;
    if (arg === 'contact.http') return <ContactOut />;
    const svc = arg.match(/^services\/(svc_\d{2})$/);
    if (svc) {
      const s = services.find((x) => x.id === svc[1]);
      return s ? <CatService s={s} /> : <div className={styles.termUnknown}>cat: {arg}: No such file</div>;
    }
    const adr = arg.match(/^decisions\/(ADR-\d{3})$/);
    if (adr) {
      const a = adrs.find((x) => x.id === adr[1]);
      return a ? <CatAdr a={a} /> : <div className={styles.termUnknown}>cat: {arg}: No such file</div>;
    }
    return <div className={styles.termUnknown}>cat: {arg}: No such file</div>;
  };

  const runCommand = (raw: string): ReactNode => {
    const trimmed = raw.trim();
    if (!trimmed) return null;
    const [cmd, ...args] = trimmed.split(/\s+/);
    const sub = args.join(' ');

    switch (cmd) {
      case 'help':
        return <Help />;
      case 'whoami':
        return <div>Kenneth Ajero — .NET / IoT / cloud engineer. Makati, PH.</div>;
      case 'ls':
        return lsHandler(sub);
      case 'cat':
        return catHandler(sub);
      case 'git':
        return args[0] === 'log' ? <GitLogOut /> : unknown(trimmed);
      case 'ps':
        return args[0] === 'aux' ? <PsAuxOut /> : unknown(trimmed);
      case 'uname':
        return <div>kenneth-ajero 9.2.0 #build 2026.04 x86_64 MAKATI-1</div>;
      case 'uptime':
        return <div>{uptime}</div>;
      case 'date':
        return <div>{new Date().toISOString()}</div>;
      case 'contact':
        return <ContactOut />;
      case 'theme': {
        const current = document.documentElement.getAttribute('data-theme') ?? 'dark';
        const next = current === 'dark' ? 'light' : 'dark';
        toggleTheme();
        return <div>theme → <span className={styles.termAccent}>{next}</span></div>;
      }
      case 'clear':
        setEntries([]);
        return null;
      case 'sudo':
        return <div className={styles.termUnknown}>nice try. this system is read-only.</div>;
      default:
        return unknown(trimmed);
    }
  };

  const submit = (raw: string) => {
    if (!raw.trim()) return;
    historyRef.current = [...historyRef.current, raw];
    setCursor(-1);
    const out = runCommand(raw);
    if (raw.trim() === 'clear') {
      setInput('');
      return;
    }
    setEntries((prev) => [...prev, { cmd: raw, node: out }]);
    setInput('');
  };

  const autocomplete = (current: string): string | null => {
    const words = current.split(/\s+/);
    const last = words[words.length - 1];
    if (last === '') return null;
    const pool =
      words.length === 1
        ? COMMAND_NAMES
        : [
            ...FILES,
            ...services.map((s) => 'services/' + s.id),
            ...adrs.map((a) => 'decisions/' + a.id),
          ];
    const match = pool.find((p) => p.startsWith(last));
    if (!match) return null;
    words[words.length - 1] = match;
    return words.join(' ');
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submit(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const h = historyRef.current;
      if (h.length === 0) return;
      const next = cursor === -1 ? h.length - 1 : Math.max(0, cursor - 1);
      setCursor(next);
      setInput(h[next]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const h = historyRef.current;
      if (cursor === -1) return;
      const next = cursor + 1;
      if (next >= h.length) {
        setCursor(-1);
        setInput('');
      } else {
        setCursor(next);
        setInput(h[next]);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const completed = autocomplete(input);
      if (completed) setInput(completed);
    } else if (e.key.toLowerCase() === 'l' && e.ctrlKey) {
      e.preventDefault();
      setEntries([]);
    }
  };

  const focusInput = () => inputRef.current?.focus({ preventScroll: true });

  return (
    <div className={styles.terminal} onClick={focusInput}>
      <div className={styles.terminalOutput} ref={outputRef} role="log" aria-live="polite">
        {BOOT_LINES.slice(0, visibleBoot).map((line, i) => (
          <div key={i} className={styles.bootLine}>
            <span className={styles.bootOk}>[ OK ]</span> {line}
          </div>
        ))}
        {entries.map((e, i) => (
          <div key={i} className={styles.termEntry}>
            <div className={styles.termEcho}>
              <span className={styles.termPrompt}>~/portfolio $</span> {e.cmd}
            </div>
            {e.node && <div className={styles.termOut}>{e.node}</div>}
          </div>
        ))}
      </div>

      {booted && (
        <>
          <div className={styles.cmdChipRow}>
            {QUICK_CMDS.map((c) => (
              <button
                key={c}
                className={styles.cmdChip}
                onClick={(ev) => {
                  ev.stopPropagation();
                  submit(c);
                }}
              >
                {c}
              </button>
            ))}
          </div>
          <div className={styles.terminalPromptLine}>
            <span className={styles.termPrompt}>~/portfolio $</span>
            <input
              ref={inputRef}
              className={styles.terminalInput}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="off"
              aria-label="Terminal input"
            />
          </div>
        </>
      )}
    </div>
  );
}

function Help() {
  const items: [string, string][] = [
    ['help', 'list available commands'],
    ['whoami', 'short bio'],
    ['ls [path]', 'list entries'],
    ['cat [file]', 'read a file — README.md, services/svc_01, ...'],
    ['git log', 'work history'],
    ['ps aux', 'hobbies / background processes'],
    ['uname -a', 'system info'],
    ['uptime', 'years in production'],
    ['date', 'current time'],
    ['contact', 'ways to reach me'],
    ['theme', 'toggle dark / light'],
    ['clear', 'clear the terminal'],
  ];
  return (
    <div className={styles.termHelp}>
      <div className={styles.termHelpHeader}>available commands:</div>
      {items.map(([c, d]) => (
        <div key={c} className={styles.termHelpRow}>
          <span className={styles.termAccent}>{c}</span>
          <span className={styles.termDim}>{d}</span>
        </div>
      ))}
    </div>
  );
}

function CatReadme() {
  return (
    <div className={styles.termReadme}>
      <div className={styles.termAccent}># Kenneth Ajero</div>
      <p>
        A .NET-focused engineer who has built systems across banking, data analytics, automotive
        tech, and IoT. I specialize in cloud-native architecture, microservices, and scalable
        enterprise platforms.
      </p>
      <p>
        I love solving problems, modernizing applications, and creating solutions that deliver
        meaningful impact. Always learning. Always building.
      </p>
    </div>
  );
}

function CatPackage() {
  return (
    <pre className={styles.termPre}>
{`{
  "name": "kenneth-ajero",
  "version": "9.2.0",
  "dependencies": {
${stack.map(([k, v]) => `    "${k}": "${v}"`).join(',\n')}
  }
}`}
    </pre>
  );
}

function CatSkills() {
  return (
    <div>
      <div className={styles.termAccent}>kenneth-ajero@9.2.0</div>
      {skills.map((s, i) => {
        const last = i === skills.length - 1;
        const statusClass =
          s.status === 'PRIMARY'
            ? styles.termAccent
            : s.status === 'ACTIVE'
            ? styles.termBlue
            : styles.termDim;
        return (
          <div key={s.name} className={styles.termSkillRow}>
            <span className={styles.termFaint}>{last ? '└──' : '├──'}</span>
            <span>{s.name}</span>
            <span className={statusClass}>[{s.status}]</span>
            <span className={styles.termDim}>since {s.since}</span>
          </div>
        );
      })}
    </div>
  );
}

function CatService({ s }: { s: Service }) {
  return (
    <div>
      <div className={styles.termAccent}>{s.id} · {s.slug}</div>
      <div className={styles.termTitle}>{s.title}</div>
      <p className={styles.termDim}>{s.description}</p>
      <div><span className={styles.termFaint}>deployed_at: </span>{s.company}</div>
      <div><span className={styles.termFaint}>arch:        </span>{s.arch.join(' → ')}</div>
      <div><span className={styles.termFaint}>stack:       </span>{s.stack.join(' · ')}</div>
      <div><span className={styles.termFaint}>impact:      </span>{s.impact.join(' · ')}</div>
    </div>
  );
}

function CatAdr({ a }: { a: Adr }) {
  return (
    <div>
      <div className={styles.termAccent}>{a.id} · {a.status} · {a.date}</div>
      <div className={styles.termTitle}>{a.title}</div>
      <div className={styles.termFaint} style={{ marginTop: 8 }}>CONTEXT</div>
      <p className={styles.termDim}>{a.context}</p>
      <div className={styles.termFaint}>DECISION</div>
      <p className={styles.termDim}>{a.decision}</p>
      <div className={styles.termFaint}>CONSEQUENCE</div>
      <ul className={styles.termList}>
        {a.consequence.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>
    </div>
  );
}

function GitLogOut() {
  return (
    <div>
      {gitLog.map((c, i) => (
        <div key={i}>
          <span className={styles.termWarn}>{shortHash(c.date + c.scope)}</span>{' '}
          <span className={styles.termFaint}>{c.date}</span>{' '}
          <span className={styles.termBlue}>{c.type}</span>
          <span className={styles.termFaint}>(</span>
          <span className={styles.termAccent}>{c.scope}</span>
          <span className={styles.termFaint}>): </span>
          {c.message}
        </div>
      ))}
    </div>
  );
}

function PsAuxOut() {
  return (
    <div className={styles.termPs}>
      <div className={`${styles.termPsRow} ${styles.termFaint}`}>
        <span>PID</span>
        <span>CPU%</span>
        <span>STAT</span>
        <span>NAME</span>
        <span># COMMENT</span>
      </div>
      {processes.map((p) => (
        <div key={p.pid} className={styles.termPsRow}>
          <span>{p.pid}</span>
          <span>{p.cpu.toFixed(1)}</span>
          <span className={p.status === 'R' ? styles.termAccent : styles.termBlue}>{p.status}</span>
          <span>{p.name}</span>
          <span className={styles.termDim}># {p.note}</span>
        </div>
      ))}
    </div>
  );
}

function ContactOut() {
  return (
    <div className={styles.termContact}>
      <div><span className={styles.termFaint}>email    </span><a className={styles.termLink} href="mailto:ajerokenn@gmail.com">ajerokenn@gmail.com</a></div>
      <div><span className={styles.termFaint}>linkedin </span><a className={styles.termLink} href="https://linkedin.com/in/kenneth-ajero-2a696899" target="_blank" rel="noopener noreferrer">linkedin.com/in/kenneth-ajero-2a696899</a></div>
      <div><span className={styles.termFaint}>github   </span><a className={styles.termLink} href="https://github.com/kanux0301" target="_blank" rel="noopener noreferrer">github.com/kanux0301</a></div>
      <div><span className={styles.termFaint}>resume   </span><a className={styles.termLink} href="/resume.pdf" download>/resume.pdf</a></div>
      <div><span className={styles.termFaint}>location </span>Makati, Philippines (UTC+8)</div>
    </div>
  );
}
