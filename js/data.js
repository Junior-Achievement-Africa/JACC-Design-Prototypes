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
  { id: 'events', label: 'Events', icon: 'calendar' },
  { id: 'profile', label: 'Profile', icon: 'users' },
];

JACC.JOBS = [
  { id: 1, title: 'Product Analyst', company: 'MTN Ghana', loc: 'Accra · Hybrid', type: 'Full-time', match: 94, tags: ['Analytics', 'Excel', 'SQL'], cover: 'assets/jobs/mtn.jpg', logo: 'assets/logos/mtn.jpg' },
  { id: 2, title: 'Junior Software Engineer', company: 'Andela', loc: 'Remote · Africa', type: 'Full-time', match: 88, tags: ['JavaScript', 'React'], cover: 'assets/jobs/andela.jpg', logo: 'assets/logos/andela.jpg' },
  { id: 3, title: 'Marketing Intern', company: 'Flutterwave', loc: 'Lagos', type: 'Internship', match: 76, tags: ['Social', 'Copy'], cover: 'assets/jobs/flutterwave.jpg', logo: 'assets/logos/flutterwave.jpg' },
  { id: 4, title: 'Finance Associate', company: 'Equity Bank', loc: 'Nairobi', type: 'Full-time', match: 71, tags: ['Finance', 'Excel'], cover: 'assets/jobs/equity.jpg', logo: 'assets/logos/equity.jpg' },
  { id: 5, title: 'UX Design Fellow', company: 'JA Africa', loc: 'Hybrid · Regional', type: 'Fellowship', match: 91, tags: ['Figma', 'Research'], cover: 'assets/jobs/ja.jpg', logo: 'assets/logos/ja.jpg' },
  { id: 6, title: 'Operations Coordinator', company: 'Jumia', loc: 'Abidjan', type: 'Contract', match: 64, tags: ['Ops', 'French'], cover: 'assets/jobs/jumia.jpg', logo: 'assets/logos/jumia.jpg' },
];

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
    { id: 'privacy', label: 'Privacy' },
    { id: 'pathway', label: 'Career pathway' },
    { id: 'endorsements', label: 'Skill endorsements' },
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
    { id: 'forum', label: 'Forum' },
    { id: 'courses', label: 'Courses / skills' },
    { id: 'surveys', label: 'Surveys' },
  ]},
];
