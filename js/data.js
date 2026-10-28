/* Sample content for JACC Career Hub design prototype */
window.JACC = window.JACC || {};

JACC.THEMES = [
  {
    id: 'baobab',
    name: 'Baobab',
    tagline: 'Foundations — 3-col feed, soft float motion, frosted nav pill',
    concept: 'Calm iOS-like shell with cohort composer and match rings',
    swatches: ['#EEF3F4', '#285F74', '#00C0CA', '#22404D', '#C2EDF0'],
    preview: { bg: '#EEF3F4', fg: '#22404D', accent: '#00C0CA', primary: '#285F74' },
  },
  {
    id: 'horizon',
    name: 'Horizon',
    tagline: 'Cinematic — full-bleed heroes, job carousels, slam-in motion',
    concept: 'Single-column spotlight; horizontal snap cards; skewed accents',
    swatches: ['#F4FBFC', '#008B9C', '#00C0CA', '#E3E24F', '#22404D'],
    preview: { bg: '#F4FBFC', fg: '#22404D', accent: '#E3E24F', primary: '#008B9C' },
  },
  {
    id: 'verdant',
    name: 'Verdant',
    tagline: 'Editorial — serif pull-quotes, asymmetric bento, magazine cards',
    concept: 'Story-led mentorship & impact; organic radii; slower fades',
    swatches: ['#F7F8EF', '#00763D', '#8FC440', '#F3F2B3', '#46B17B'],
    preview: { bg: '#F7F8EF', fg: '#22404D', accent: '#8FC440', primary: '#00763D' },
  },
  {
    id: 'pulse',
    name: 'Pulse',
    tagline: 'Night glass — neon CTAs, live ticker, kinetic list slides',
    concept: 'Power-user dark mode with glowing focus and activity stream',
    swatches: ['#121212', '#00C0CA', '#8FC440', '#F65F4E', '#1c1c1e'],
    preview: { bg: '#121212', fg: '#f2f2f7', accent: '#00C0CA', primary: '#00C0CA' },
  },
  {
    id: 'atlas',
    name: 'Atlas',
    tagline: 'Ops dense — tables first, sharp corners, zero fluff motion',
    concept: 'Admin/employer workstation; tabular actions; hairline chrome',
    swatches: ['#EEF3F4', '#22404D', '#F65F4E', '#285F74', '#00C0CA'],
    preview: { bg: '#EEF3F4', fg: '#22404D', accent: '#F65F4E', primary: '#22404D' },
  },
];

JACC.NAV = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'careers', label: 'Careers', icon: 'briefcase' },
  { id: 'mentors', label: 'Mentors', icon: 'users' },
  { id: 'events', label: 'Events', icon: 'calendar' },
  { id: 'messages', label: 'Messages', icon: 'message' },
];

JACC.JOBS = [
  { id: 1, title: 'Product Analyst', company: 'MTN Ghana', loc: 'Accra · Hybrid', type: 'Full-time', match: 94, tags: ['Analytics', 'Excel', 'SQL'], img: 'linear-gradient(135deg,#285F74,#00C0CA)' },
  { id: 2, title: 'Junior Software Engineer', company: 'Andela', loc: 'Remote · Africa', type: 'Full-time', match: 88, tags: ['JavaScript', 'React'], img: 'linear-gradient(135deg,#00763D,#46B17B)' },
  { id: 3, title: 'Marketing Intern', company: 'Flutterwave', loc: 'Lagos', type: 'Internship', match: 76, tags: ['Social', 'Copy'], img: 'linear-gradient(135deg,#008B9C,#E3E24F)' },
  { id: 4, title: 'Finance Associate', company: 'Equity Bank', loc: 'Nairobi', type: 'Full-time', match: 71, tags: ['Finance', 'Excel'], img: 'linear-gradient(135deg,#22404D,#8FC440)' },
  { id: 5, title: 'UX Design Fellow', company: 'JA Africa', loc: 'Hybrid · Regional', type: 'Fellowship', match: 91, tags: ['Figma', 'Research'], img: 'linear-gradient(135deg,#F65F4E,#285F74)' },
  { id: 6, title: 'Operations Coordinator', company: 'Jumia', loc: 'Abidjan', type: 'Contract', match: 64, tags: ['Ops', 'French'], img: 'linear-gradient(135deg,#00A0AF,#BBD153)' },
];

JACC.MENTORS = [
  { id: 1, name: 'Ama Mensah', role: 'Head of Product · Hubtel', industry: 'Technology', tags: ['Product', 'Leadership'], match: 96, verified: true, avail: 'Thu evenings' },
  { id: 2, name: 'Kwame Osei', role: 'Investment Analyst · Verod', industry: 'Finance', tags: ['Finance', 'Careers'], match: 89, verified: true, avail: 'Weekends' },
  { id: 3, name: 'Fatou Diallo', role: 'Founder · GreenSahel', industry: 'Entrepreneurship', tags: ['Startup', 'Impact'], match: 85, verified: true, avail: 'Flexible' },
  { id: 4, name: 'James Okoro', role: 'Engineering Manager · Paystack', industry: 'Technology', tags: ['Engineering', 'Mentorship'], match: 82, verified: false, avail: 'Tue lunch' },
  { id: 5, name: 'Ngozi Adeyemi', role: 'HR Director · Nestlé', industry: 'People Ops', tags: ['CV', 'Interviews'], match: 78, verified: true, avail: 'Mon–Wed' },
  { id: 6, name: 'Samuel Kariuki', role: 'Policy Advisor · UNEP', industry: 'Public Sector', tags: ['Policy', 'Sustainability'], match: 74, verified: true, avail: 'Monthly' },
];

JACC.EVENTS = [
  { id: 1, title: 'Regional Alumni Summit 2026', cat: 'Networking', when: 'Sat 14 Mar · 09:00 WAT', where: 'Accra + Online', spots: '42 / 120', rsvp: true },
  { id: 2, title: 'CV Clinic with Nestlé HR', cat: 'Workshop', when: 'Wed 4 Mar · 18:00 WAT', where: 'Online', spots: '18 / 40', rsvp: false },
  { id: 3, title: 'Women in STEM Circle', cat: 'Community', when: 'Fri 20 Mar · 17:30 WAT', where: 'Lagos Hub', spots: '9 / 25', rsvp: false },
  { id: 4, title: 'Startup Pitch Night', cat: 'Entrepreneurship', when: 'Thu 26 Mar · 19:00 WAT', where: 'Nairobi', spots: '55 / 80', rsvp: true },
];

JACC.STORIES = [
  { name: 'Efua Boateng', cohort: 'JA Ghana · 2019', quote: 'Mentorship on the hub helped me land my first product role at Hubtel.', role: 'Product Manager' },
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
  { t: 'Booked session with Ama Mensah', d: '2 days ago', type: 'mentor' },
  { t: 'Updated skills on your profile', d: '5 days ago', type: 'profile' },
];

JACC.MESSAGES = [
  { id: 1, name: 'Ama Mensah', preview: 'Looking forward to our Thursday session!', time: '10:42', unread: 2 },
  { id: 2, name: 'MTN Talent Team', preview: 'Thanks for your application — next steps…', time: 'Yesterday', unread: 0 },
  { id: 3, name: 'JA Events', preview: 'Your summit ticket is ready. Add to calendar?', time: 'Mon', unread: 1 },
];

JACC.KPIS = [
  { n: '12.4k', l: 'Active alumni (30d)' },
  { n: '1,842', l: 'Job applications' },
  { n: '638', l: 'Mentor sessions' },
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
    { id: 'apply', label: 'Apply' },
    { id: 'saved', label: 'Saved jobs' },
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
  { group: 'Mentorship', items: [
    { id: 'mentors', label: 'Find mentors' },
    { id: 'mentor', label: 'Mentor profile' },
    { id: 'book', label: 'Book session' },
    { id: 'mentor-hub', label: 'Mentor hub' },
    { id: 'mentor-requests', label: 'Requests' },
    { id: 'mentor-availability', label: 'Availability' },
    { id: 'mentor-notes', label: 'Notes' },
    { id: 'feedback', label: 'Feedback' },
    { id: 'mentor-verify', label: 'Verify mentors' },
  ]},
  { group: 'Events & organise', items: [
    { id: 'events', label: 'Events' },
    { id: 'event', label: 'Event detail' },
    { id: 'create-event', label: 'Create event' },
    { id: 'organise', label: 'Organise desk' },
    { id: 'organise-scan', label: 'QR scan' },
    { id: 'attendance', label: 'Attendance' },
    { id: 'stories', label: 'Stories' },
    { id: 'messages', label: 'Messages' },
  ]},
  { group: 'Admin / plugin / M&E', items: [
    { id: 'admin', label: 'Content admin' },
    { id: 'plugin-settings', label: 'Plugin settings' },
    { id: 'cohorts-admin', label: 'Cohorts access' },
    { id: 'approvals', label: 'Account approvals' },
    { id: 'manage-stories', label: 'Manage stories' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'exports', label: 'Exports' },
    { id: 'settings', label: 'Settings' },
    { id: 'notifications', label: 'Notifications' },
  ]},
  { group: 'Legacy Career Connect', items: [
    { id: 'forum', label: 'Forum' },
    { id: 'courses', label: 'Courses / skills' },
    { id: 'surveys', label: 'Surveys' },
  ]},
  { group: 'Ideas & Moodle-native', items: [
    { id: 'match-explain', label: 'Why this match' },
    { id: 'pathway', label: 'Career pathway' },
    { id: 'impact-map', label: 'Africa impact map' },
    { id: 'ticket', label: 'Event ticket + QR' },
    { id: 'endorsements', label: 'Skill endorsements' },
    { id: 'moodle-block', label: 'Moodle dashboard block' },
    { id: 'digest', label: 'Job digest email' },
    { id: 'a11y', label: 'Accessibility' },
    { id: 'bilingual', label: 'EN / FR language' },
    { id: 'saved-searches', label: 'Saved searches' },
  ]},
];
