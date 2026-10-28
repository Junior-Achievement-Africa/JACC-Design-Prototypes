/* Sample content for JACC Career Hub design prototype */
window.JACC = window.JACC || {};

const JA_SWATCHES = ['#EEF3F4', '#285F74', '#00C0CA', '#22404D', '#C2EDF0'];
const JA_PREVIEW = { bg: '#EEF3F4', fg: '#22404D', accent: '#00C0CA', primary: '#285F74' };

JACC.THEMES = [
  {
    id: 'baobab',
    name: 'Baobab',
    tagline: 'Soft foundations — 3-column feed, calm cards',
    concept: 'Same JA colours · rounded shell · cohort rail',
    swatches: JA_SWATCHES,
    preview: JA_PREVIEW,
  },
  {
    id: 'horizon',
    name: 'Horizon',
    tagline: 'Full-width — edge-to-edge hero, job carousel',
    concept: 'Same JA colours · cinematic layout · single column',
    swatches: JA_SWATCHES,
    preview: JA_PREVIEW,
  },
  {
    id: 'verdant',
    name: 'Verdant',
    tagline: 'Editorial — centred magazine column, pull-quotes',
    concept: 'Same JA colours · serif headlines · story-led',
    swatches: JA_SWATCHES,
    preview: JA_PREVIEW,
  },
  {
    id: 'pulse',
    name: 'Pulse',
    tagline: 'Full-width feed — live ticker, kinetic lists',
    concept: 'Same JA colours · wider canvas · motion accents',
    swatches: JA_SWATCHES,
    preview: JA_PREVIEW,
  },
  {
    id: 'atlas',
    name: 'Atlas',
    tagline: 'Full-width ops — tables first, sharp edges',
    concept: 'Same JA colours · dense workstation · no fluff',
    swatches: JA_SWATCHES,
    preview: JA_PREVIEW,
  },
];

JACC.NAV = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'careers', label: 'Careers', icon: 'briefcase' },
  { id: 'spaces', label: 'Spaces', icon: 'users' },
  { id: 'events', label: 'Events', icon: 'calendar' },
];

/** Job types mirror local_jacc job_filter::TYPES + paid/unpaid compensation */
JACC.JOB_TYPES = ['Full-time', 'Internship', 'Contract', 'Part-time', 'Volunteer'];
JACC.COMPENSATION = ['Paid', 'Unpaid'];

JACC.JOBS = [
  { id: 1, title: 'Product Analyst', company: 'MTN Ghana', loc: 'Accra · Hybrid', type: 'Full-time', paid: true, salary: 'GHS 6–8k / mo', match: 94, tags: ['Analytics', 'Excel', 'SQL'], cover: 'assets/jobs/mtn.jpg', logo: 'assets/logos/mtn.jpg' },
  { id: 2, title: 'Junior Software Engineer', company: 'Andela', loc: 'Remote · Africa', type: 'Full-time', paid: true, salary: 'Competitive', match: 88, tags: ['JavaScript', 'React'], cover: 'assets/jobs/andela.jpg', logo: 'assets/logos/andela.jpg' },
  { id: 3, title: 'Marketing Intern', company: 'Flutterwave', loc: 'Lagos', type: 'Internship', paid: true, salary: 'Stipend', match: 76, tags: ['Social', 'Copy'], cover: 'assets/jobs/flutterwave.jpg', logo: 'assets/logos/flutterwave.jpg' },
  { id: 4, title: 'Finance Associate', company: 'Equity Bank', loc: 'Nairobi', type: 'Full-time', paid: true, salary: 'KES competitive', match: 71, tags: ['Finance', 'Excel'], cover: 'assets/jobs/equity.jpg', logo: 'assets/logos/equity.jpg' },
  { id: 5, title: 'UX Design Intern', company: 'JA Africa', loc: 'Hybrid · Regional', type: 'Internship', paid: false, salary: 'Unpaid · mentorship', match: 91, tags: ['Figma', 'Research'], cover: 'assets/jobs/ja.jpg', logo: 'assets/logos/ja.jpg' },
  { id: 6, title: 'Operations Coordinator', company: 'Jumia', loc: 'Abidjan', type: 'Contract', paid: true, salary: 'XOF competitive', match: 64, tags: ['Ops', 'French'], cover: 'assets/jobs/jumia.jpg', logo: 'assets/logos/jumia.jpg' },
  { id: 7, title: 'Event Volunteer', company: 'JA Ghana', loc: 'Accra', type: 'Volunteer', paid: false, salary: 'Unpaid', match: 58, tags: ['Events', 'Community'], cover: 'assets/jobs/ja.jpg', logo: 'assets/logos/ja.jpg' },
  { id: 8, title: 'Part-time Data Tutor', company: 'Hubtel', loc: 'Accra · Remote', type: 'Part-time', paid: true, salary: 'GHS 80 / hr', match: 82, tags: ['SQL', 'Teaching'], cover: 'assets/jobs/mtn.jpg', logo: 'assets/logos/mtn.jpg' },
];

/** Spaces = cohort / interest groups with Moodle forum discussions */
JACC.SPACES = [
  {
    id: 'ja-ghana-2019',
    name: 'JA Ghana 2019',
    kind: 'Cohort',
    members: 420,
    unread: 6,
    desc: 'Your Company Programme cohort — announcements and peer support.',
    threads: [
      { id: 't1', title: 'Anyone interviewing at Hubtel this month?', author: 'Kwame Osei', replies: 12, time: '2h', pinned: false },
      { id: 't2', title: 'Summit carpool from Accra campus', author: 'Ama Mensah', replies: 8, time: 'Yesterday', pinned: true },
      { id: 't3', title: 'CV swap before Friday clinic', author: 'Efua Boateng', replies: 21, time: 'Mon', pinned: false },
    ],
  },
  {
    id: 'product-design',
    name: 'Product design',
    kind: 'Interest',
    members: 186,
    unread: 2,
    desc: 'Portfolio reviews, tools, and hiring tips for product & UX alumni.',
    threads: [
      { id: 't4', title: 'Figma file critique — drip campaign screens', author: 'Adaobi Nwosu', replies: 5, time: '4h', pinned: false },
      { id: 't5', title: 'Research ops templates we reuse', author: 'Wanjiru Kamau', replies: 14, time: '3d', pinned: false },
    ],
  },
  {
    id: 'women-in-tech',
    name: 'Women in tech',
    kind: 'Chapter',
    members: 310,
    unread: 0,
    desc: 'Peer discussions, opportunities, and solidarity across JA countries.',
    threads: [
      { id: 't6', title: 'Women in STEM Circle — who’s going?', author: 'Fatou Diallo', replies: 9, time: '1d', pinned: false },
    ],
  },
];

JACC.SPACE_POSTS = {
  t1: [
    { name: 'Kwame Osei', time: '2h', text: 'I have a case round next week — anyone sat it recently?' },
    { name: 'Ama Mensah', time: '1h', text: 'Yes — they lean product sense + a short SQL take-home. Happy to voice note tips.' },
    { name: 'Efua Boateng', time: '45m', text: 'Same here. Shortlisted for Product Analyst — we can prep together in this space.' },
  ],
  t2: [
    { name: 'Ama Mensah', time: 'Yesterday', text: 'Leaving campus 7:30am — 3 seats left. Drop a reply if you need a seat.' },
    { name: 'Yeboah Kofi', time: 'Yesterday', text: 'Count me in from Spintex road.' },
  ],
};

JACC.EXPERIENCE = [
  { id: 1, title: 'Product Analyst', company: 'Hubtel', place: 'Accra', from: 'Jan 2023', to: 'Present', current: true },
  { id: 2, title: 'Business Intern', company: 'MTN Ghana', place: 'Accra', from: 'Jun 2021', to: 'Aug 2021', current: false },
  { id: 3, title: 'Company Programme', company: 'JA Ghana', place: 'Accra', from: '2018', to: '2019', current: false },
];

JACC.OPEN_TO_WORK = {
  on: true,
  roles: 'Product Analyst, Associate PM',
  places: 'Accra · Remote Africa',
  types: ['Full-time', 'Contract'],
};

JACC.EVENTS = [
  { id: 1, title: 'Regional Alumni Summit 2026', cat: 'Networking', when: 'Sat 14 Mar · 09:00 WAT', where: 'Accra + Online', spots: '42 / 120', rsvp: true, cover: 'assets/events/summit.jpg' },
  { id: 2, title: 'CV Clinic with Nestlé HR', cat: 'Workshop', when: 'Wed 4 Mar · 18:00 WAT', where: 'Online', spots: '18 / 40', rsvp: false, cover: 'assets/events/cvclinic.jpg' },
  { id: 3, title: 'Women in STEM Circle', cat: 'Community', when: 'Fri 20 Mar · 17:30 WAT', where: 'Lagos Hub', spots: '9 / 25', rsvp: false, cover: 'assets/events/stem.jpg' },
  { id: 4, title: 'Startup Pitch Night', cat: 'Entrepreneurship', when: 'Thu 26 Mar · 19:00 WAT', where: 'Nairobi', spots: '55 / 80', rsvp: true, cover: 'assets/events/pitch.jpg' },
];

/** Job list thumb (logo photo) */
JACC.jobThumb = (j) =>
  `<div class="thumb img"><img src="${j.logo || j.cover}" alt="" loading="lazy" decoding="async"></div>`;

/** Job / event cover band */
JACC.coverBand = (src, minHeight = 160) =>
  `<div class="cover-band" style="height:${minHeight}px;background:url(${src}) center/cover"></div>`;

/** Event card media */
JACC.eventMedia = (e) =>
  `<div class="media" style="aspect-ratio:2/1;background:url('${e.cover}') center/cover;display:grid;place-items:end start;padding:12px">
    <span class="pill" style="background:rgba(255,255,255,.92);color:#22404D">${String(e.cat).replace(/</g, '')}</span>
  </div>`;

JACC.STORIES = [
  { name: 'Efua Boateng', cohort: 'JA Ghana · 2019', quote: 'The job board matched me to Hubtel — I landed my first product role within a month.', role: 'Product Manager' },
  { name: 'Ibrahim Touré', cohort: 'JA Côte d\'Ivoire · 2020', quote: 'I found my internship through the job board — then got hired full-time.', role: 'Software Engineer' },
  { name: 'Wanjiru Kamau', cohort: 'JA Kenya · 2018', quote: 'Events kept me connected across countries after I moved for work.', role: 'Policy Analyst' },
];

JACC.APPLICATIONS = [
  { job: 'Product Analyst · MTN', status: 'shortlisted', date: '12 Feb' },
  { job: 'UX Design Fellow · JA Africa', status: 'reviewing', date: '10 Feb' },
  { job: 'Marketing Intern · Flutterwave', status: 'submitted', date: '8 Feb' },
  { job: 'Finance Associate · Equity', status: 'not selected', date: '2 Feb' },
];

JACC.APPLICANTS = [
  { name: 'Adaobi Nwosu', match: 92, status: 'submitted', skills: 'SQL, Python' },
  { name: 'Yeboah Kofi', match: 88, status: 'reviewing', skills: 'Excel, Tableau' },
  { name: 'Aisha Bello', match: 85, status: 'shortlisted', skills: 'SQL, Communication' },
  { name: 'Pierre N\'Guessan', match: 79, status: 'submitted', skills: 'French, Analytics' },
];

JACC.ACTIVITY = [
  { t: 'Applied to Product Analyst at MTN Ghana', d: '2h ago', type: 'job' },
  { t: 'RSVP’d to Regional Alumni Summit', d: 'Yesterday', type: 'event' },
  { t: 'Saved UX Design Fellow at JA Africa', d: '2 days ago', type: 'job' },
  { t: 'Updated skills on your profile', d: '5 days ago', type: 'profile' },
];

JACC.MESSAGES = [
  { id: 1, name: 'Kwame Osei', preview: 'Congrats on the Andela shortlist — you’ve got this!', time: '10:42', unread: 2 },
  { id: 2, name: 'MTN Talent Team', preview: 'Thanks for your application — next steps…', time: 'Yesterday', unread: 0 },
  { id: 3, name: 'JA Events', preview: 'Your summit ticket is ready. Add to calendar?', time: 'Mon', unread: 1 },
];

JACC.MESSAGE_THREADS = {
  1: [
    { me: false, text: 'Saw you applied to Andela — how’s it going?' },
    { me: true, text: 'Shortlisted! Prepping for the product case round.' },
    { me: false, text: 'Congrats on the Andela shortlist — you’ve got this!' },
  ],
  2: [
    { me: false, text: 'Thanks for your application to Product Analyst.' },
    { me: false, text: 'Next steps: we’ll invite shortlisted candidates to a case round.' },
  ],
  3: [
    { me: false, text: 'Your summit ticket is ready. Add to calendar?' },
  ],
};

JACC.NOTIFICATIONS = [
  { id: 1, title: 'Application update', body: 'MTN Ghana marked your Product Analyst application as reviewing.', time: '12 min', unread: true, href: '#/applications' },
  { id: 2, title: 'Event reminder', body: 'Regional Alumni Summit starts in 6 days — confirm your RSVP.', time: '1h', unread: true, href: '#/ticket' },
  { id: 3, title: 'New job match', body: '3 roles match your Product + SQL skills this week.', time: 'Yesterday', unread: false, href: '#/careers' },
  { id: 4, title: 'CV health tip', body: 'Add a quantified outcome to raise your CV health above 85.', time: '2 days', unread: false, href: '#/cv-health' },
];

JACC.KPIS = [
  { n: '12.4k', l: 'Active alumni (30d)' },
  { n: '1,842', l: 'Job applications' },
  { n: '420', l: 'Open roles' },
  { n: '74%', l: 'Event show-up rate' },
];

JACC.SCREENS = [
  { group: 'Public & access', items: [
    { id: 'landing', label: 'Landing' },
    { id: 'login', label: 'Login' },
    { id: 'signup', label: 'Sign up' },
    { id: 'verify', label: 'Verify code' },
    { id: 'onboarding', label: 'Onboarding' },
    { id: 'pending', label: 'Pending approval' },
    { id: 'cohort-gate', label: 'Cohort locked' },
  ]},
  { group: 'Alumni hub', items: [
    { id: 'home', label: 'Home feed' },
    { id: 'profile', label: 'Profile' },
    { id: 'profile-edit', label: 'Edit profile' },
    { id: 'work-history', label: 'Work history' },
    { id: 'open-to-work', label: 'Open to work' },
    { id: 'privacy', label: 'Privacy' },
    { id: 'pathway', label: 'Career pathway' },
    { id: 'endorsements', label: 'Skill endorsements' },
  ]},
  { group: 'Spaces (forums)', items: [
    { id: 'spaces', label: 'Your spaces' },
    { id: 'space', label: 'Space · discussions' },
    { id: 'space-thread', label: 'Forum thread' },
    { id: 'space-new', label: 'Create space' },
  ]},
  { group: 'CV studio + AI', items: [
    { id: 'cv-start', label: 'CV studio' },
    { id: 'cv-upload', label: 'Upload' },
    { id: 'cv-parsing', label: 'AI parsing' },
    { id: 'cv-review', label: 'Review extract' },
    { id: 'cv-builder', label: 'Builder' },
    { id: 'cv-health', label: 'CV health' },
    { id: 'cv-share', label: 'Share link' },
    { id: 'cv-list', label: 'My CVs' },
  ]},
  { group: 'Careers', items: [
    { id: 'careers', label: 'Job board' },
    { id: 'job', label: 'Job detail' },
    { id: 'match-explain', label: 'Why this match' },
    { id: 'apply', label: 'Apply' },
    { id: 'saved', label: 'Saved jobs' },
    { id: 'saved-searches', label: 'Saved searches' },
    { id: 'digest', label: 'Job digest' },
    { id: 'applications', label: 'My applications' },
  ]},
  { group: 'Employer', items: [
    { id: 'employer', label: 'Employer home' },
    { id: 'post-job', label: 'Post a job' },
    { id: 'applicants', label: 'Applicants' },
    { id: 'employer-pipeline', label: 'Pipeline' },
    { id: 'company', label: 'Company' },
    { id: 'moderation', label: 'Job moderation' },
  ]},
  { group: 'Events & organise', items: [
    { id: 'events', label: 'Events' },
    { id: 'event', label: 'Event detail' },
    { id: 'ticket', label: 'Event ticket + QR' },
    { id: 'create-event', label: 'Create event' },
    { id: 'organise', label: 'Organise desk' },
    { id: 'organise-scan', label: 'QR scan' },
    { id: 'attendance', label: 'Attendance' },
    { id: 'stories', label: 'Stories' },
  ]},
  { group: 'Admin / plugin / M&E', items: [
    { id: 'admin', label: 'Content admin' },
    { id: 'plugin-settings', label: 'Plugin settings' },
    { id: 'moodle-block', label: 'Moodle /my block' },
    { id: 'cohorts-admin', label: 'Cohorts access' },
    { id: 'approvals', label: 'Account approvals' },
    { id: 'manage-stories', label: 'Manage stories' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'impact-map', label: 'Africa impact map' },
    { id: 'exports', label: 'Exports' },
    { id: 'settings', label: 'Settings' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'bilingual', label: 'Language EN / FR' },
    { id: 'a11y', label: 'Accessibility' },
  ]},
  { group: 'Legacy Career Connect', items: [
    { id: 'courses', label: 'Courses / skills' },
    { id: 'surveys', label: 'Surveys' },
  ]},
];
