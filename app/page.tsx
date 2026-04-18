'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import Terminal from './components/Terminal';
import {
  stack,
  skills,
  services,
  log,
  processes,
  adrs,
  shortHash,
} from './data';

export default function Home() {
  const [counters, setCounters] = useState({ services: 0, years: 0, industries: 0 });
  const [uptime, setUptime] = useState('9y 0mo 0d');
  const [activeSection, setActiveSection] = useState('home');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const saved = (typeof window !== 'undefined' && localStorage.getItem('theme')) as
      | 'dark'
      | 'light'
      | null;
    const initial: 'dark' | 'light' = saved ?? 'dark';
    setTheme(initial);
    document.documentElement.setAttribute('data-theme', initial);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch {}
  };

  useEffect(() => {
    const start = new Date('2015-11-09');
    const tick = () => {
      const now = new Date();
      let y = now.getFullYear() - start.getFullYear();
      let m = now.getMonth() - start.getMonth();
      let d = now.getDate() - start.getDate();
      if (d < 0) {
        m--;
        d += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
      }
      if (m < 0) {
        y--;
        m += 12;
      }
      setUptime(`${y}y ${m}mo ${d}d`);
    };
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const ids = ['home', 'stack', 'about', 'skills', 'services', 'log', 'decisions', 'hobbies', 'contact'];
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((e): e is HTMLElement => e !== null);
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const target = { services: 15, years: 9, industries: 4 };
    const duration = 1200;
    const start = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const e = 1 - Math.pow(1 - t, 3);
      setCounters({
        services: Math.round(target.services * e),
        years: Math.round(target.years * e),
        industries: Math.round(target.industries * e),
      });
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add(styles.inView);
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll(`.${styles.reveal}`).forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className={styles.app}>
      <div className={styles.chrome}>
        <div className={styles.chromeRow}>
          <div className={styles.dots}>
            <span className={styles.dot} style={{ background: '#FF5F56' }} />
            <span className={styles.dot} style={{ background: '#FFBD2E' }} />
            <span className={styles.dot} style={{ background: '#27C93F' }} />
          </div>
          <div className={styles.path}>
            <span className={styles.pathSeg}>~</span>
            <span className={styles.pathSep}>/</span>
            <span className={styles.pathSeg}>portfolio</span>
            <span className={styles.pathSep}>/</span>
            <span className={styles.pathSeg}>kenneth-ajero</span>
            <span className={styles.branch}>@ main</span>
            <span className={styles.clean}>●</span>
          </div>
          <div className={styles.pills}>
            <span className={styles.pill}><span className={styles.pillDot} />BUILD: passing</span>
            <span className={styles.pill}>UPTIME: {uptime}</span>
            <span className={styles.pill}>REGION: MAKATI-1</span>
            <button
              className={`${styles.pill} ${styles.themeToggle}`}
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            >
              <span className={styles.themeGlyph}>{theme === 'dark' ? '◐' : '◑'}</span>
              THEME: {theme}
            </button>
          </div>
        </div>
        <nav className={styles.tabs}>
          {(
            [
              ['home', 'overview.tsx'],
              ['stack', 'package.json'],
              ['about', 'README.md'],
              ['skills', 'skills.lock'],
              ['services', 'services/'],
              ['log', 'git log'],
              ['decisions', 'decisions/'],
              ['hobbies', 'ps aux'],
              ['contact', 'contact.http'],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`${styles.tab} ${activeSection === id ? styles.tabActive : ''}`}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>

      <section id="home" className={styles.hero}>
        <h1 className={styles.wordmark}>
          kenneth<span>/</span>ajero
        </h1>

        <div className={styles.tagline}>
          <span className={styles.kw}>class</span> KennethAjero <span className={styles.kw}>:</span>{' '}
          <span className={styles.type}>ISoftwareEngineer</span>,{' '}
          <span className={styles.type}>IProblemSolver</span>
        </div>

        <Terminal uptime={uptime} toggleTheme={toggleTheme} />

        <div className={styles.metrics}>
          <div className={styles.metric}>
            <div className={styles.metricLabel}>services_shipped</div>
            <div className={styles.metricValue}>{counters.services}+</div>
          </div>
          <div className={styles.metric}>
            <div className={styles.metricLabel}>years_in_prod</div>
            <div className={styles.metricValue}>{counters.years}+</div>
          </div>
          <div className={styles.metric}>
            <div className={styles.metricLabel}>industries</div>
            <div className={styles.metricValue}>{counters.industries}</div>
          </div>
          <div className={styles.metric}>
            <div className={styles.metricLabel}>incidents</div>
            <div className={styles.metricValue}>0</div>
          </div>
        </div>

        <div className={styles.statusRow}>
          <span className={styles.statusDot} />
          <span className={styles.statusLabel}>accepting_new_opportunities</span>
          <span className={styles.statusEq}>=</span>
          <span className={styles.statusTrue}>true</span>
        </div>
      </section>

      <section id="stack" className={`${styles.section} ${styles.reveal}`}>
        <header className={styles.sectionHeader}>
          <span className={styles.sectionNo}>§1</span>
          <h2 className={styles.sectionTitle}>package.json</h2>
          <span className={styles.sectionMeta}>// software bill of materials</span>
        </header>
        <pre className={styles.code}>
          <code>
{'{\n'}
{'  '}<span className={styles.jsonKey}>&quot;name&quot;</span>: <span className={styles.jsonStr}>&quot;kenneth-ajero&quot;</span>,{'\n'}
{'  '}<span className={styles.jsonKey}>&quot;version&quot;</span>: <span className={styles.jsonStr}>&quot;9.2.0&quot;</span>,{'\n'}
{'  '}<span className={styles.jsonKey}>&quot;description&quot;</span>: <span className={styles.jsonStr}>&quot;enterprise .net engineer&quot;</span>,{'\n'}
{'  '}<span className={styles.jsonKey}>&quot;license&quot;</span>: <span className={styles.jsonStr}>&quot;Open-To-Work&quot;</span>,{'\n'}
{'  '}<span className={styles.jsonKey}>&quot;dependencies&quot;</span>: {'{\n'}
{stack.map(([k, v], i) => (
  <span key={k}>
    {'    '}<span className={styles.jsonKey}>&quot;{k}&quot;</span>: <span className={styles.jsonStr}>&quot;{v}&quot;</span>
    {i < stack.length - 1 ? ',' : ''}
    {'\n'}
  </span>
))}
{'  }\n'}
{'}'}
          </code>
        </pre>
      </section>

      <section id="about" className={`${styles.section} ${styles.reveal}`}>
        <header className={styles.sectionHeader}>
          <span className={styles.sectionNo}>§2</span>
          <h2 className={styles.sectionTitle}>README.md</h2>
          <span className={styles.sectionMeta}>// who i am</span>
        </header>
        <div className={styles.mdFile}>
          <div className={styles.mdTabs}>
            <span className={`${styles.mdTab} ${styles.mdTabActive}`}>README.md</span>
          </div>
          <div className={styles.mdBody}>
            <div className={styles.gutter}>
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            <div className={styles.mdContent}>
              <h3 className={styles.mdH1}># Kenneth Ajero</h3>
              <p className={styles.mdP}>
                A .NET-focused engineer who has built systems across <em>banking</em>,{' '}
                <em>data analytics</em>, <em>automotive tech</em>, and <em>IoT</em>. I specialize in
                cloud-native architecture, microservices, and scalable enterprise platforms.
              </p>
              <p className={styles.mdP}>
                I love solving problems, modernizing applications, and creating solutions that deliver
                meaningful impact. <strong>Always learning. Always building.</strong>
              </p>
              <h3 className={styles.mdH2}>## at a glance</h3>
              <ul className={styles.mdUl}>
                <li>9+ years in production</li>
                <li>4 industries shipped — banking · data analytics · automotive · IoT</li>
                <li>Based in Makati, Philippines (UTC+8)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className={`${styles.section} ${styles.reveal}`}>
        <header className={styles.sectionHeader}>
          <span className={styles.sectionNo}>§3</span>
          <h2 className={styles.sectionTitle}>skills.lock</h2>
          <span className={styles.sectionMeta}>// resolved dependencies</span>
        </header>
        <div className={styles.tree}>
          <div className={styles.treeRoot}>kenneth-ajero@9.2.0</div>
          {skills.map((s, i) => {
            const last = i === skills.length - 1;
            const statusClass = styles[`st_${s.status.toLowerCase()}` as keyof typeof styles];
            return (
              <div key={s.name} className={styles.treeRow}>
                <span className={styles.treeBranch}>{last ? '└──' : '├──'}</span>
                <span className={styles.treeName}>{s.name}</span>
                <span className={`${styles.treeStatus} ${statusClass}`}>[{s.status}]</span>
                <span className={styles.treeSince}>since {s.since}</span>
                {'note' in s && s.note && <span className={styles.treeNote}>· {s.note}</span>}
              </div>
            );
          })}
        </div>
      </section>

      <section id="services" className={`${styles.section} ${styles.reveal}`}>
        <header className={styles.sectionHeader}>
          <span className={styles.sectionNo}>§4</span>
          <h2 className={styles.sectionTitle}>services/</h2>
          <span className={styles.sectionMeta}>// {services.length} services · all healthy</span>
        </header>
        <div className={styles.serviceGrid}>
          {services.map((s) => (
            <article key={s.id} className={`${styles.service} ${styles.reveal}`}>
              <div className={styles.serviceHead}>
                <span className={styles.serviceId}>{s.id}</span>
                <span className={styles.serviceStatus}>
                  <span className={styles.statusDot} />healthy
                </span>
              </div>
              <div className={styles.serviceSlug}>{s.slug}</div>
              <h3 className={styles.serviceTitle}>{s.title}</h3>
              <p className={styles.serviceDesc}>{s.description}</p>
              <div className={styles.archDiagram}>
                {s.arch.map((node, i) => (
                  <span key={i} className={styles.archRow}>
                    <span className={styles.archNode}>{node}</span>
                    {i < s.arch.length - 1 && <span className={styles.archArrow}>─▶</span>}
                  </span>
                ))}
              </div>
              <dl className={styles.serviceMeta}>
                <div>
                  <dt>deployed_at</dt>
                  <dd>{s.company}</dd>
                </div>
                <div>
                  <dt>stack</dt>
                  <dd>{s.stack.join(' · ')}</dd>
                </div>
                <div>
                  <dt>impact</dt>
                  <dd>{s.impact.join(' · ')}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section id="log" className={`${styles.section} ${styles.reveal}`}>
        <header className={styles.sectionHeader}>
          <span className={styles.sectionNo}>§5</span>
          <h2 className={styles.sectionTitle}>git log --author=kenneth</h2>
          <span className={styles.sectionMeta}>// chronicle</span>
        </header>
        <div className={styles.log}>
          {log.map((c, i) => (
            <div key={i} className={`${styles.commit} ${styles.reveal}`}>
              <div className={styles.commitGutter}>
                <span className={styles.commitStar}>*</span>
                {i < log.length - 1 && <span className={styles.commitLine} />}
              </div>
              <div className={styles.commitBody}>
                <div className={styles.commitRow1}>
                  <span className={styles.commitHash}>{shortHash(c.date + c.scope)}</span>
                  <span className={styles.commitDate}>{c.date}</span>
                  {c.current && <span className={styles.commitHeadPointer}>▶ HEAD</span>}
                </div>
                <div className={styles.commitMsg}>
                  <span className={styles.commitType}>{c.type}</span>
                  <span className={styles.commitParen}>(</span>
                  <span className={styles.commitScope}>{c.scope}</span>
                  <span className={styles.commitParen}>):</span>
                  <span className={styles.commitText}> {c.message}</span>
                </div>
                <ul className={styles.commitBullets}>
                  {c.bullets.map((b, bi) => (
                    <li key={bi}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="decisions" className={`${styles.section} ${styles.reveal}`}>
        <header className={styles.sectionHeader}>
          <span className={styles.sectionNo}>§6</span>
          <h2 className={styles.sectionTitle}>decisions/</h2>
          <span className={styles.sectionMeta}>// architecture decision records</span>
        </header>
        <div className={styles.adrList}>
          {adrs.map((a) => (
            <article key={a.id} className={`${styles.adr} ${styles.reveal}`}>
              <div className={styles.adrHead}>
                <span className={styles.adrId}>{a.id}</span>
                <span className={styles.adrStatus}>
                  <span className={styles.statusDot} />
                  {a.status} · {a.date}
                </span>
              </div>
              <h3 className={styles.adrTitle}>{a.title}</h3>
              <div className={styles.adrBody}>
                <div className={styles.adrField}>
                  <div className={styles.adrLabel}>CONTEXT</div>
                  <p className={styles.adrText}>{a.context}</p>
                </div>
                <div className={styles.adrField}>
                  <div className={styles.adrLabel}>DECISION</div>
                  <p className={styles.adrText}>{a.decision}</p>
                </div>
                <div className={styles.adrField}>
                  <div className={styles.adrLabel}>CONSEQUENCE</div>
                  <ul className={styles.adrList2}>
                    {a.consequence.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="hobbies" className={`${styles.section} ${styles.reveal}`}>
        <header className={styles.sectionHeader}>
          <span className={styles.sectionNo}>§7</span>
          <h2 className={styles.sectionTitle}>ps aux — background processes</h2>
          <span className={styles.sectionMeta}>// what runs when i&apos;m not shipping</span>
        </header>
        <div className={styles.ps}>
          <div className={styles.psHead}>
            <span>PID</span>
            <span>CPU%</span>
            <span>STAT</span>
            <span>NAME</span>
            <span>// COMMENT</span>
          </div>
          {processes.map((p) => (
            <div key={p.pid} className={styles.psRow}>
              <span className={styles.psPid}>{p.pid}</span>
              <span className={styles.psCpu}>{p.cpu.toFixed(1)}</span>
              <span className={`${styles.psStat} ${p.status === 'R' ? styles.psRun : styles.psSleep}`}>
                {p.status}
              </span>
              <span className={styles.psName}>{p.name}</span>
              <span className={styles.psNote}># {p.note}</span>
            </div>
          ))}
        </div>
        <blockquote className={styles.pull}>
          &ldquo;A healthy body fuels a creative mind. On the court or in the editor, I bring the
          same passion and dedication.&rdquo;
        </blockquote>
      </section>

      <section id="contact" className={`${styles.section} ${styles.reveal}`}>
        <header className={styles.sectionHeader}>
          <span className={styles.sectionNo}>§8</span>
          <h2 className={styles.sectionTitle}>contact.http</h2>
          <span className={styles.sectionMeta}>// send me a request</span>
        </header>
        <div className={styles.http}>
          <div className={styles.httpBlock}>
            <div className={styles.httpComment}>### Download résumé</div>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download
              className={styles.httpLine}
            >
              <span className={styles.httpVerb}>GET</span>
              <span className={styles.httpUrl}>/resume.pdf</span>
              <span className={styles.httpCode}>200 OK</span>
            </a>
            <div className={styles.httpHeader}>Content-Type: application/pdf</div>
          </div>
          <div className={styles.httpBlock}>
            <div className={styles.httpComment}>### Send a message</div>
            <a href="mailto:ajerokenn@gmail.com" className={styles.httpLine}>
              <span className={styles.httpVerb}>POST</span>
              <span className={styles.httpUrl}>ajerokenn@gmail.com</span>
              <span className={styles.httpCode}>200 OK</span>
            </a>
            <div className={styles.httpHeader}>Content-Type: text/plain</div>
          </div>
          <div className={styles.httpBlock}>
            <div className={styles.httpComment}>### Professional</div>
            <a
              href="https://linkedin.com/in/kenneth-ajero-2a696899"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.httpLine}
            >
              <span className={styles.httpVerb}>GET</span>
              <span className={styles.httpUrl}>linkedin.com/in/kenneth-ajero-2a696899</span>
              <span className={styles.httpCode}>200 OK</span>
            </a>
            <a
              href="https://github.com/kanux0301"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.httpLine}
            >
              <span className={styles.httpVerb}>GET</span>
              <span className={styles.httpUrl}>github.com/kanux0301</span>
              <span className={styles.httpCode}>200 OK</span>
            </a>
          </div>
          <div className={styles.httpBlock}>
            <div className={styles.httpComment}>### Geography</div>
            <div className={styles.httpLine}>
              <span className={styles.httpVerb}>LOC</span>
              <span className={styles.httpUrl}>Makati, Philippines</span>
              <span className={styles.httpCode}>UTC+8</span>
            </div>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.uname}>
          <span className={styles.prompt}>$</span> uname -a
        </div>
        <div className={styles.unameOut}>
          kenneth-ajero 9.2.0 #build 2026.04 x86_64 MAKATI-1 · set in JetBrains Mono, IBM Plex Sans
          &amp; Major Mono Display · © 2026
        </div>
      </footer>
    </div>
  );
}
