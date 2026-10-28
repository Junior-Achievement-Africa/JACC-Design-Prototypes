/* Sample content for JACC Career Hub design prototype */
window.JACC = window.JACC || {};

const JA_SWATCHES = ['#EEF3F4', '#285F74', '#00C0CA', '#22404D', '#C2EDF0'];
const JA_PREVIEW = { bg: '#EEF3F4', fg: '#22404D', accent: '#00C0CA', primary: '#285F74' };

JACC.THEMES = [
  {
    id: 'baobab',
    name: 'Concept 1',
    tagline: 'Soft foundations — 3-column feed, calm cards',
    concept: 'Same JA colours · rounded shell · cohort rail',
    swatches: JA_SWATCHES,
    preview: JA_PREVIEW,
  },
  {
    id: 'horizon',
    name: 'Concept 2',
    tagline: 'Cinematic — full-bleed hero, featured match, side panel',
    concept: 'Same JA colours · hero + spotlight + sticky rail',
    swatches: JA_SWATCHES,
    preview: JA_PREVIEW,
  },
  {
    id: 'verdant',
    name: 'Concept 3',
    tagline: 'Editorial — centred magazine column, pull-quotes',
    concept: 'Same JA colours · serif headlines · story-led',
    swatches: JA_SWATCHES,
    preview: JA_PREVIEW,
  },
  {
    id: 'pulse',
    name: 'Concept 4',
    tagline: 'Full-width feed — live ticker, kinetic lists',
    concept: 'Same JA colours · wider canvas · motion accents',
    swatches: JA_SWATCHES,
    preview: JA_PREVIEW,
  },
  {
    id: 'spark',
    name: 'Concept 5',
    tagline: 'Lively — motion-first, bouncing energy',
    concept: 'Same JA colours · heavy animation · playful feed',
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
JACC.JOB_TYPES = ['Full-time', 'Internship', 'Apprenticeship', 'Contract', 'Part-time', 'Volunteer'];
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
  { id: 9, title: 'Digital Marketing Apprentice', company: 'MTN Ghana', loc: 'Accra · Hybrid', type: 'Apprenticeship', paid: true, salary: 'Stipend', match: 79, tags: ['Marketing', 'Social', 'Content'], cover: 'assets/jobs/mtn.jpg', logo: 'assets/logos/mtn.jpg' },
];

/** Spaces = cohort / interest groups with Moodle forum discussions */
JACC.SPACES = [
  {
    id: 'ja-ghana-2019',
    name: 'JA Ghana 2019',
    kind: 'Cohort',
    members: 420,
    unread: 6,
    cover: 'assets/events/summit.jpg',
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
    cover: 'assets/story.jpg',
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
    cover: 'assets/events/stem.jpg',
    desc: 'Peer discussions, opportunities, and solidarity across JA countries.',
    threads: [
      { id: 't6', title: 'Women in STEM Circle — who’s going?', author: 'Fatou Diallo', replies: 9, time: '1d', pinned: false },
    ],
  },
  {
    id: 'founders-circle',
    name: 'Founders circle',
    kind: 'Interest',
    members: 148,
    unread: 1,
    cover: 'assets/events/pitch.jpg',
    desc: 'Early-stage founders swapping fundraising, hiring, and go-to-market notes.',
    threads: [
      { id: 't7', title: 'Pitch Night — dry run partners?', author: 'Chinedu Okafor', replies: 6, time: '5h', pinned: false },
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

/** Filter jobs by search query + chip key (all | type | paid | unpaid | matched) */
JACC.filterJobs = (jobs, { query = '', filter = 'all' } = {}) => {
  const q = String(query || '').trim().toLowerCase();
  const list = jobs || JACC.JOBS || [];
  return list.filter((j) => {
    if (filter === 'paid' && !j.paid) return false;
    if (filter === 'unpaid' && j.paid) return false;
    if (filter === 'matched' && (j.match || 0) < 80) return false;
    if (filter && filter !== 'all' && filter !== 'paid' && filter !== 'unpaid' && filter !== 'matched') {
      if (String(j.type).toLowerCase() !== filter.toLowerCase()) return false;
    }
    if (!q) return true;
    const hay = [j.title, j.company, j.loc, j.type, j.salary, ...(j.tags || [])].join(' ').toLowerCase();
    return hay.includes(q);
  });
};

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
    { id: 'post-job', label: 'Post an opportunity' },
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

/**
 * Product feature backlog — shown on the gallery as “Features”.
 * Development ships these in phases. Mentorship is deferred (out of this prototype).
 *
 * phase: 1 | 2 | 3 | later
 * proto: in (clickable in this review) | partial | planned
 */
JACC.FEATURE_PHASES = [
  { id: 1, label: 'Phase 1', blurb: 'MVP — hub, profile, careers, events' },
  { id: 2, label: 'Phase 2', blurb: 'Spaces, CV studio, digests, admin depth' },
  { id: 3, label: 'Phase 3', blurb: 'M&E, pathways, integrations' },
  { id: 'later', label: 'Later', blurb: 'Deferred or out of this prototype' },
];

JACC.FEATURES = [
  /* Phase 1 */
  { id: 'hub-shell', name: 'Career Hub shell', desc: 'Moodle-native entry, primary nav, persona home', area: 'Hub', phase: 1, proto: 'in', screen: 'home' },
  { id: 'access-cohort', name: 'Cohort access gate', desc: 'Only allowed Moodle cohorts see the hub; locked screen for others', area: 'Hub', phase: 1, proto: 'in', screen: 'cohort-gate' },
  { id: 'plugin-settings', name: 'Plugin cohort settings', desc: 'Admins choose which cohorts unlock the hub', area: 'Admin', phase: 1, proto: 'in', screen: 'plugin-settings' },
  { id: 'auth-onboarding', name: 'Sign up & onboarding', desc: 'Login, verify, pending approval, first-run profile', area: 'Hub', phase: 1, proto: 'in', screen: 'signup' },
  { id: 'bilingual', name: 'English & French', desc: 'UI language follows preference; EN/FR toggle in review', area: 'Hub', phase: 1, proto: 'in', screen: 'bilingual' },
  { id: 'profile', name: 'Alumni profile', desc: 'Headline, skills, industry, cohort, activity', area: 'Profile', phase: 1, proto: 'in', screen: 'profile' },
  { id: 'privacy', name: 'Profile privacy', desc: 'Public / alumni / only me visibility', area: 'Profile', phase: 1, proto: 'in', screen: 'privacy' },
  { id: 'work-history', name: 'Work history', desc: 'Roles on profile used for matching', area: 'Profile', phase: 1, proto: 'in', screen: 'work-history' },
  { id: 'open-to-work', name: 'Open to work', desc: 'Declare availability for employers', area: 'Profile', phase: 1, proto: 'in', screen: 'open-to-work' },
  { id: 'job-board', name: 'Job board', desc: 'Search, multi-filters, types, paid/unpaid, match %', area: 'Careers', phase: 1, proto: 'in', screen: 'careers' },
  { id: 'job-apply', name: 'Apply & save jobs', desc: 'Cover letter, CV attach, no duplicates, saved list', area: 'Careers', phase: 1, proto: 'in', screen: 'apply' },
  { id: 'job-match', name: 'Match explanation', desc: 'Why this % — skills overlap on job detail', area: 'Careers', phase: 1, proto: 'in', screen: 'match-explain' },
  { id: 'employer-post', name: 'Employer opportunity posting', desc: 'Create/edit opportunities with cover image · types incl. apprenticeship', area: 'Careers', phase: 1, proto: 'in', screen: 'post-job' },
  { id: 'applicants', name: 'Applicant pipeline', desc: 'Statuses: submitted → hired; notify alumni', area: 'Careers', phase: 1, proto: 'in', screen: 'applicants' },
  { id: 'events-browse', name: 'Events browse & RSVP', desc: 'Filter by category; capacity; you’re going', area: 'Events', phase: 1, proto: 'in', screen: 'events' },
  { id: 'events-ticket', name: 'Event ticket & join link', desc: 'Ticket view, calendar add, meeting link', area: 'Events', phase: 1, proto: 'in', screen: 'ticket' },
  { id: 'events-create', name: 'Create events', desc: 'Image, capacity, meeting link for coordinators', area: 'Events', phase: 1, proto: 'in', screen: 'create-event' },
  { id: 'stories', name: 'Alumni success stories', desc: 'Featured stories on home; admin-managed', area: 'Community', phase: 1, proto: 'in', screen: 'stories' },
  { id: 'moodle-msg', name: 'Moodle messaging', desc: 'Header message icon → core_message drawer', area: 'Hub', phase: 1, proto: 'in', screen: 'home' },
  { id: 'moodle-notif', name: 'Moodle notifications', desc: 'Header bell → Moodle notification drawer', area: 'Hub', phase: 1, proto: 'in', screen: 'notifications' },

  /* Phase 2 */
  { id: 'spaces', name: 'Spaces (groups)', desc: 'Cohort, chapter, interest groups', area: 'Spaces', phase: 2, proto: 'in', screen: 'spaces' },
  { id: 'spaces-forum', name: 'Space discussions', desc: 'Moodle forum threads & replies inside a space', area: 'Spaces', phase: 2, proto: 'in', screen: 'space-thread' },
  { id: 'cv-studio', name: 'CV studio', desc: 'Upload, list, build, share polished CVs', area: 'CV', phase: 2, proto: 'in', screen: 'cv-start' },
  { id: 'cv-ai', name: 'AI CV parse', desc: 'Upload → parse → review fields → health score', area: 'CV', phase: 2, proto: 'in', screen: 'cv-upload' },
  { id: 'job-digest', name: 'Job match digests', desc: 'Email/in-hub digest of new matching roles', area: 'Careers', phase: 2, proto: 'in', screen: 'digest' },
  { id: 'saved-searches', name: 'Saved searches', desc: 'Reuse career filters and alerts', area: 'Careers', phase: 2, proto: 'in', screen: 'saved-searches' },
  { id: 'job-moderation', name: 'Job moderation', desc: 'Staff approve partner posts before live', area: 'Careers', phase: 2, proto: 'in', screen: 'moderation' },
  { id: 'events-attendance', name: 'Event attendance', desc: 'Mark attended / no-show for reporting', area: 'Events', phase: 2, proto: 'in', screen: 'attendance' },
  { id: 'admin-manage', name: 'Admin content hub', desc: 'Manage jobs, events, stories in one place', area: 'Admin', phase: 2, proto: 'in', screen: 'admin' },
  { id: 'approvals', name: 'Account approvals', desc: 'Programme team clears pending alumni', area: 'Admin', phase: 2, proto: 'in', screen: 'approvals' },
  { id: 'organise', name: 'Organise / scan', desc: 'Coordinator tools for in-person check-in', area: 'Events', phase: 2, proto: 'in', screen: 'organise' },

  /* Phase 3 */
  { id: 'analytics', name: 'Engagement analytics', desc: 'KPI snapshot for hub admins', area: 'M&E', phase: 3, proto: 'in', screen: 'analytics' },
  { id: 'exports', name: 'CSV exports', desc: 'Applications and engagement exports for funders', area: 'M&E', phase: 3, proto: 'in', screen: 'exports' },
  { id: 'impact-map', name: 'Africa impact map', desc: 'Disaggregated view by country / region', area: 'M&E', phase: 3, proto: 'in', screen: 'impact-map' },
  { id: 'pathway', name: 'Career pathway', desc: 'Timeline of skills, jobs, CVs, events', area: 'Profile', phase: 3, proto: 'in', screen: 'pathway' },
  { id: 'endorsements', name: 'Skill endorsements', desc: 'Peers endorse skills on profile', area: 'Profile', phase: 3, proto: 'in', screen: 'endorsements' },
  { id: 'a11y', name: 'Accessibility', desc: 'WCAG-minded contrast, focus, labels', area: 'Hub', phase: 3, proto: 'partial', screen: 'a11y' },
  { id: 'courses', name: 'Courses & skills', desc: 'CPD-style courses / skill tracks (legacy Connect)', area: 'Learning', phase: 3, proto: 'partial', screen: 'courses' },
  { id: 'surveys', name: 'Surveys', desc: 'Programme surveys for alumni (legacy Connect)', area: 'Learning', phase: 3, proto: 'partial', screen: 'surveys' },

  /* Later / deferred */
  { id: 'me-dashboards', name: 'M&E dashboards', desc: 'Metabase-style filters by country, cohort, gender', area: 'M&E', phase: 'later', proto: 'planned' },
  { id: 'crm-sync', name: 'Zoho Bigin sync', desc: 'Scheduled alumni contact sync for outreach', area: 'Integrations', phase: 'later', proto: 'planned' },
  { id: 'video-meet', name: 'Video meeting embed', desc: 'BBB / Zoom / Meet deep links from events & sessions', area: 'Integrations', phase: 'later', proto: 'planned' },
  { id: 'api', name: 'Partner API', desc: 'Web services for partner systems', area: 'Integrations', phase: 'later', proto: 'planned' },
  { id: 'mentorship', name: 'Mentorship', desc: 'Mentor profiles, matching, booking, feedback — deferred', area: 'Mentorship', phase: 'later', proto: 'planned' },
];
