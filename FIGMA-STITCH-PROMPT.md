# Prompt for Figma / Google Stitch — JACC Career Hub

Copy the block below into **Figma AI**, **Google Stitch**, or a similar design tool.  
Adjust the theme name (Baobab / Horizon / Verdant / Pulse / Atlas) per generation run.

---

## Master prompt (copy everything in this section)

```
Design a high-fidelity mobile + desktop UI kit and key screens for “JACC” — the JA Africa Alumni Career Hub (Moodle-native product). This is a career ecosystem for 160,000+ Junior Achievement alumni across Africa: jobs, mentorship, events, success stories, and admin analytics.

BRAND — use ONLY these official JA Worldwide colours (no greys except in dark theme surfaces; no purple, no generic blue-500):

Soft: Optimistic Ice #C2EDF0 · Reach for the Sky #99D9DF · Possibility Pearl #EEF3F4 · Confident Cream #F3F2B3
Bright: Enterprise Aqua #00C0CA · Gritty Green #BBD153 · Empowered Yellow #E3E24F · Leadership Lime #8FC440
Medium: Resilient Turquoise #00A0AF · Transforming Teal #008B9C · Adaptable Azure #28708B · Boundless Blue #285F74 · Startup Jade #46B17B · Global Green #009424 · Sustainable Forest #00763D
Dark/text: Immersive Blue-Black #22404D
Accent: Real World Red #F65F4E
White #FFFFFF for surfaces

PRODUCT PRINCIPLES
- Mobile-first, WCAG AA contrast (body text on pearl/white = Blue-Black; white text only on Boundless Blue / Immersive Blue-Black / Forest)
- 44px min tap targets; soft depth; clear hierarchy
- Moodle-embedded app shell: top nav (desktop) + bottom tab bar (mobile) with Home, Careers, Mentors, Events, Messages; raised Create (+)
- Skill “match %” rings on jobs and mentors
- Status pills: submitted / reviewing / shortlisted / not selected / hired
- English primary; show a small FR language affordance in settings

GENERATE FIVE THEME VARIANTS (separate frames), same IA and components, different personality:

1) BAOBAB (current product direction)
   Pearl background, white cards, Boundless Blue primary buttons, Enterprise Aqua accents, 14–20px radii, Apple-like calm density, system-sans feel. Sticky frosted header.

2) HORIZON
   Teal-forward (Transforming Teal + Enterprise Aqua), bold full-bleed hero bands with Immersive Blue-Black → teal gradients, Empowered Yellow CTA accents, expressive geometric display type, larger radii, fewer borders more shadow.

3) VERDANT
   Sustainable Forest primary, Leadership Lime / Confident Cream accents, editorial serif headlines + humanist sans body, organic large radii, growth/mentorship mood.

4) PULSE (dark)
   Background #121212 / cards #1c1c1e, Enterprise Aqua primary, Leadership Lime success, Real World Red danger, glass/blur chrome, neon-aqua focus — night mode for power users.

5) ATLAS (ops)
   Dense information design for employers & admins: Immersive Blue-Black primary, Real World Red sparse accent, tighter 4–8px radii, tabular lists, moderation queues, KPI dashboards.

SCREENS TO PRODUCE PER THEME (desktop 1280 and mobile 390)
A. Marketing landing — hero “Find work. Get mentored. Stay connected.”, stats, feature trio, alumni stories
B. Auth — login, signup, 6-digit email code, multi-step onboarding (goals + industry + skills)
C. Alumni home — greeting hero, match counts, for-you job list, profile completeness, activity, upcoming session
D. Profile — cover, headline, skills, privacy (Public / Alumni only / Only me), CV upload
E. Job board — search, filters, match %, job detail, apply (cover letter + CV), saved, my applications
F. Employer — post job with image, applicant table with status dropdowns, staff job moderation queue
G. Mentorship — mentor grid with verified badge + match %, mentor profile + meeting link, book session, mentor hub (accept/decline + availability), 1–5 star feedback
H. Events — category filters, RSVP, capacity, join link, calendar CTA, create event, attendance attended/no-show
I. Community — success stories, messaging thread (respects privacy)
J. Admin — content hub (jobs/events/stories), analytics KPIs + country bars + CSV export + gender/cohort filters, settings & notification prefs (job digest, 24h event reminder)

COMPONENT SET
Buttons (primary/secondary/accent/ghost), pills, match ring, search bar, filter chips, list cards, media cards, stats, form fields, code inputs, nav pill, bottom bar, toast, empty states, verified badge.

ART DIRECTION
Authentic African professional context (young alumni, workshops, coworking) — avoid stock clichés and avoid purple-gradient SaaS look. Photography can be suggested as placeholders; UI chrome must stay on-brand.

DELIVERABLES
- One Figma page per theme with Desktop / Mobile frames
- Shared component library linked across themes via variables (colour modes)
- Prototype links: Landing → Signup → Onboarding → Home → Job → Apply → Mentors → Book → Events → RSVP → Admin analytics
- Annotation layer mapping screens to user story IDs US-01 … US-31 where relevant
```

---

## Short Stitch / “quick generate” variant

```
Mobile app UI for JA Africa Career Hub (JACC). Palette only: #22404D #285F74 #00C0CA #00763D #8FC440 #EEF3F4 #F65F4E #FFFFFF.
Screens: alumni home with job match %, job board, mentor booking, event RSVP, employer applicant review, dark and light themes.
Style: [choose one: calm Apple-like | bold teal hero | forest editorial | aqua night glass | dense admin].
Clean, accessible, African alumni career community — no purple, no generic Material blue.
```

---

## Theme-specific one-liners

**Baobab:** Soft Possibility Pearl canvas, Boundless Blue CTAs, aqua highlights, rounded 16–20px cards, frosted nav — like a polished iOS productivity app for alumni careers.

**Horizon:** Immersive full-bleed teal gradients, Syne-like display headlines, yellow accent CTAs, cinematic landing and spacious job cards.

**Verdant:** Forest green primary, cream and lime washes, Fraunces headlines — warm editorial mentorship magazine meeting a careers product.

**Pulse:** True black/near-black UI, aqua glass, lime success chips, red alerts — premium night mode for messaging and mentor ops.

**Atlas:** Sharp dense tables, Blue-Black buttons, red moderation flags, KPI strips — built for JA staff and employer hiring workflows.
