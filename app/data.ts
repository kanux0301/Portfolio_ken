export const shortHash = (s: string) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h) + s.charCodeAt(i);
  return Math.abs(h).toString(16).padStart(7, '0').slice(0, 7);
};

export const stack: [string, string][] = [
  ['dotnet', '^8.0'],
  ['csharp', '^12.0'],
  ['aspnet-core', '^8.0'],
  ['entity-framework', '^8.0'],
  ['azure', '^2026.4'],
  ['azure-devops', '^2026.4'],
  ['docker', '^27.0'],
  ['kubernetes', '^1.30'],
  ['mssql-server', '^2022'],
  ['microservices', '^2.0'],
];

export type Skill = {
  name: string;
  status: 'PRIMARY' | 'ACTIVE' | 'MAINTAINED';
  since: number;
  note?: string;
};

export const skills: Skill[] = [
  { name: 'csharp .net', status: 'PRIMARY', since: 2015, note: 'load-bearing' },
  { name: 'aspnet-core', status: 'PRIMARY', since: 2019 },
  { name: 'microservices', status: 'ACTIVE', since: 2022 },
  { name: 'entity-framework', status: 'ACTIVE', since: 2019 },
  { name: 'azure', status: 'ACTIVE', since: 2022 },
  { name: 'azure-devops-cicd', status: 'ACTIVE', since: 2022 },
  { name: 'kubernetes', status: 'MAINTAINED', since: 2022 },
  { name: 'docker', status: 'MAINTAINED', since: 2022 },
  { name: 'mssql-server', status: 'PRIMARY', since: 2015, note: 'load-bearing' },
  { name: 'git', status: 'PRIMARY', since: 2015 },
];

export type Service = {
  id: string;
  slug: string;
  title: string;
  company: string;
  description: string;
  arch: string[];
  stack: string[];
  impact: string[];
};

export const services: Service[] = [
  {
    id: 'svc_01',
    slug: 'alm.securitybank.internal',
    title: 'Asset & Liability Management System',
    company: 'Security Bank Corporation',
    description:
      'Enterprise-grade forecasting system projecting cashflows for assets and liabilities, enabling strategic financial risk management.',
    arch: ['ui', '.net', 'mssql'],
    stack: ['C#', '.NET Framework', 'MS SQL', 'Financial Modeling'],
    impact: ['OSAM Award Winner', 'Real-time processing'],
  },
  {
    id: 'svc_02',
    slug: 'grundfos.iot.notifications',
    title: 'IoT Notification & Firmware Service',
    company: 'Grundfos Philippines',
    description:
      'Microservices architecture handling real-time notifications and OTA firmware updates for thousands of industrial water pumps.',
    arch: ['devices', 'gateway', 'k8s', 'azure'],
    stack: ['ASP.NET Core', 'Microservices', 'Kubernetes', 'Azure'],
    impact: ['1000+ devices', 'Zero-downtime deploys'],
  },
  {
    id: 'svc_03',
    slug: 'recon.securitybank.internal',
    title: 'Bank Reconciliation System',
    company: 'Security Bank Corporation',
    description:
      'Automated reconciliation matching inter-bank statements against general ledgers, reducing manual processing by 80%.',
    arch: ['import', '.net', 'mssql', 'report'],
    stack: ['C#', 'Visual Studio', 'SQL Server', 'Data Processing'],
    impact: ['80% time saved', '99.9% accuracy'],
  },
  {
    id: 'svc_04',
    slug: 'iss.datacollect.vsto',
    title: 'Data Collection Application',
    company: 'Institutional Shareholder Services',
    description:
      'Enterprise tool with comprehensive change logging and audit trails using VSTO and MVVM architecture.',
    arch: ['office', 'vsto', 'mvvm', 'db'],
    stack: ['VSTO', 'C#', 'MVVM', 'Office Integration'],
    impact: ['Full audit trail', 'High performance'],
  },
  {
    id: 'svc_05',
    slug: 'fleethq.goodyear.web',
    title: 'FleetHQ Call Center Platform',
    company: 'Goodyear Philippines',
    description:
      'Customer service platform for fleet management, optimizing call handling and satisfaction metrics.',
    arch: ['web', 'aspnet', 'db'],
    stack: ['ASP.NET', 'C#', 'Web Development'],
    impact: ['Peak-load optimized', 'Multi-user support'],
  },
  {
    id: 'svc_06',
    slug: 'issues.securitybank.internal',
    title: 'Issue Tracking System',
    company: 'Security Bank Corporation',
    description:
      'Custom project management system streamlining collaboration across multiple banking teams.',
    arch: ['ui', '.net', 'mssql'],
    stack: ['Visual Studio', 'C#', 'MS SQL'],
    impact: ['Flexible workflows', 'Team collaboration'],
  },
];

export type LogEntry = {
  date: string;
  type: string;
  scope: string;
  message: string;
  bullets: string[];
  current?: boolean;
};

export const log: LogEntry[] = [
  {
    date: '2022-03-14',
    type: 'feat',
    scope: 'grundfos',
    message: 'joined as IoT Application Developer',
    bullets: [
      'Led cluster migration on Azure Kubernetes across all supported apps',
      'Built notification and firmware-update microservices',
      'Collaborated with international teams on global IoT delivery',
    ],
    current: true,
  },
  {
    date: '2022-01-05',
    type: 'feat',
    scope: 'goodyear',
    message: 'shipped FleetHQ enhancements as Digital Developer',
    bullets: [
      'Enhanced FleetHQ call center on ASP.NET',
      'Improved application performance and user experience',
    ],
  },
  {
    date: '2019-08-02',
    type: 'feat',
    scope: 'iss',
    message: 'joined as Application Developer',
    bullets: [
      'Built comprehensive change-log feature tracking all user modifications',
      'Extended VSTO data-collection app with MVVM patterns',
    ],
  },
  {
    date: '2015-11-09',
    type: 'init',
    scope: 'securitybank',
    message: 'first prod commit — Programmer / System Analyst',
    bullets: [
      'Tech Lead on Asset & Liability Management (ALM) project',
      'Built bank reconciliation program and issue tracking system',
      'Maintained treasury system and third-party integrations',
      'OSAM Award (bank-wide rookie) — March 2016',
    ],
  },
];

export type Adr = {
  id: string;
  title: string;
  status: string;
  date: string;
  context: string;
  decision: string;
  consequence: string[];
};

export const adrs: Adr[] = [
  {
    id: 'ADR-001',
    title: 'Migrate IoT notification stack to Azure Kubernetes',
    status: 'accepted',
    date: '2023-02-14',
    context:
      'The legacy notification service ran on fixed VMs with manual deploys. Firmware rollout events caused traffic spikes that exhausted capacity, and any deployment required a maintenance window visible to global customers.',
    decision:
      'Adopt AKS with horizontal pod autoscaling, move deploys into Azure DevOps pipelines, and split the notifier from the firmware orchestrator into two services behind an internal gateway.',
    consequence: [
      'Zero-downtime deploys replaced scheduled maintenance windows',
      'Burst capacity absorbs firmware rollout spikes automatically',
      'Operational complexity rose — on-call had to learn cluster-level debugging',
    ],
  },
  {
    id: 'ADR-002',
    title: 'Split firmware update into its own microservice',
    status: 'accepted',
    date: '2023-06-04',
    context:
      'Firmware OTA updates shared a process with real-time notifications. Long-running rollouts blocked notification throughput, and a bug in either path could take both down.',
    decision:
      'Extract firmware orchestration into a dedicated service with its own queue and datastore. Notifications retain a thin subscription to firmware events for UI status only.',
    consequence: [
      'Failure isolation — firmware bugs no longer impact notification SLA',
      'Each service scales on its own traffic shape',
      'One-off data-consistency work at the service boundary',
    ],
  },
  {
    id: 'ADR-003',
    title: 'Enforce full audit trail on VSTO data collection tool',
    status: 'accepted',
    date: '2020-05-18',
    context:
      'Analysts were editing large research datasets inline. Compliance required reconstructing every edit, and "I didn\'t change that" disputes were impossible to resolve.',
    decision:
      'Add an MVVM-level change-log interceptor that writes every mutation (before / after / user / timestamp) to an append-only store. Expose a read-only history panel next to the data.',
    consequence: [
      'Compliance queries answered in seconds instead of days',
      'Support cases closed by pointing at the log',
      'Negligible write amplification at our dataset size',
    ],
  },
  {
    id: 'ADR-004',
    title: 'Automate inter-bank reconciliation in place of manual matching',
    status: 'accepted',
    date: '2017-09-22',
    context:
      'Recon was matching inter-bank statements against the general ledger by hand. Month-end took three full days and errors compounded downstream.',
    decision:
      'Build a rule-based matcher driven by SQL Server procedures with an exception queue for human review. Keep the UX familiar so operators trust the output.',
    consequence: [
      '80% reduction in manual processing time',
      '99.9% auto-match accuracy on first pass',
      'Operators shifted from entry clerks to reviewers',
    ],
  },
];

export type Process = {
  pid: number;
  cpu: number;
  name: string;
  status: 'R' | 'S';
  note: string;
};

export const processes: Process[] = [
  { pid: 1421, cpu: 18.4, name: 'gaming.exe', status: 'R', note: 'strategy + multiplayer — keeps problem-solving sharp' },
  { pid: 2087, cpu: 12.7, name: 'basketball.svc', status: 'R', note: 'coordination, quick decisions, team play' },
  { pid: 2104, cpu: 11.2, name: 'volleyball.svc', status: 'R', note: 'timing and communication — like shipping code' },
  { pid: 3319, cpu: 9.8, name: 'badminton.svc', status: 'R', note: 'reflexes and precision drills' },
  { pid: 4402, cpu: 7.5, name: 'swimming.svc', status: 'S', note: 'meditation in motion — endurance' },
  { pid: 1, cpu: 0.1, name: 'work-life-balance', status: 'R', note: 'always running in the background' },
];
