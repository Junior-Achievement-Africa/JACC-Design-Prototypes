/* Extra screens: cohort gate, plugin settings, AI CV, organise, spaces, profile extras */
window.JACC = window.JACC || {};
JACC.Screens = JACC.Screens || {};

(() => {
const esc = JACC.esc || ((s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[c])));

Object.assign(JACC.Screens, {
  pending() {
    return `
      <div class="auth-panel screen-enter" style="margin:48px auto;text-align:center;max-width:480px">
        <div class="ai-orb" aria-hidden="true"></div>
        <h1>You’re almost in</h1>
        <p class="muted">Your email is verified. The programme team is confirming you’re a JA alumnus before opening the Career Hub.</p>
        <div class="stack" style="text-align:left;margin:20px 0">
          ${[['Email verified','Done'],['Alumni check','In review'],['Cohort assignment','Next'],['Career Hub access','Waiting']].map(([t,s],i) => `
            <div class="row between" style="padding:10px 0;border-bottom:1px solid var(--line)">
              <strong>${t}</strong><span class="pill ${i === 0 ? 'pill-success' : i === 1 ? 'pill-accent' : ''}">${s}</span>
            </div>`).join('')}
        </div>
        <p class="tiny">We’ll email you at efua@… as soon as you’re approved.</p>
        <button class="btn btn-secondary btn-block" data-toast="Reminder sent to programme team">Nudge the team</button>
      </div>`;
  },

  'cohort-gate'() {
    return `
      <div class="screen-enter" style="max-width:640px;margin:0 auto">
        <div class="hero">
          <span class="eyebrow"><i></i> Access controlled by Moodle cohorts</span>
          <h1>Career Hub isn’t open for your account yet</h1>
          <p>Only members of selected Moodle cohorts can see jobs and events. Ask your country office to add you to an alumni cohort — or request access below.</p>
        </div>
        <div class="card">
          <h3>Why this exists</h3>
          <p class="muted">Being a Moodle user isn’t enough. Hub access is granted when you’re in an <strong>allowed cohort</strong> configured in plugin settings (e.g. JA Ghana 2019–2024).</p>
          <div class="field"><label>Your Moodle cohorts today</label>
            <div class="pill">site users</div> <div class="pill">course: Intro to Moodle</div>
            <div class="tiny" style="margin-top:8px">None of these are on the Career Hub allow-list.</div>
          </div>
          <div class="field"><label>Request access note</label>
            <textarea placeholder="I completed JA Company Programme Ghana 2019…"></textarea>
          </div>
          <button class="btn btn-primary" data-toast="Access request sent to Alumni Relations">Request cohort access</button>
          <a class="btn btn-ghost" href="#/plugin-settings">View plugin cohort settings (admin)</a>
        </div>
      </div>`;
  },

  'plugin-settings'() {
    return `
      <div class="screen-enter">
        <div class="section-title">
          <div>
            <h1 style="font-size:1.5rem;margin:0">Career Hub · plugin settings</h1>
            <p class="muted" style="margin:4px 0 0">Moodle Site administration → Plugins → Local plugins → JACC</p>
          </div>
          <button class="btn btn-sm btn-primary" data-toast="Settings saved">Save changes</button>
        </div>
        <div class="grid-2">
          <div class="card stack">
            <h3>Access & cohorts</h3>
            <label class="row between"><span><strong>Enable Career Hub</strong><div class="tiny">Master switch</div></span><input type="checkbox" checked></label>
            <label class="row between"><span><strong>New accounts need approval</strong><div class="tiny">Pending screen after email verify</div></span><input type="checkbox" checked></label>
            <label class="row between"><span><strong>Partner jobs need moderation</strong></span><input type="checkbox" checked></label>
            <div class="field" style="margin:0"><label>Who can see the hub</label>
              <div class="stack">${JACC.COHORTS.map((c) => `
                <label class="row between" style="padding:8px 10px;border:1px solid var(--line);border-radius:var(--radius-md)">
                  <span><strong>${c.name}</strong><div class="tiny">${c.members} members</div></span>
                  <input type="checkbox" ${c.allowed ? 'checked' : ''}>
                </label>`).join('')}
              </div>
            </div>
            <p class="tiny">Users must be in <em>at least one</em> checked cohort. Capability <code>local/jacc:view</code> is still required.</p>
          </div>
          <div class="card stack">
            <h3>AI CV parser</h3>
            <p class="muted">Carried from Career Connect: upload PDF/DOCX → extract profile fields → review → save to CV studio.</p>
            <label class="row between"><span><strong>Enable AI CV parsing</strong></span><input type="checkbox" checked></label>
            <div class="field"><label>Provider</label>
              <select><option>Built-in AI parser (Moodle AI / OpenAI compatible)</option><option>Affinda Resume Parser (legacy)</option><option>Offline rules-only (no cloud)</option></select>
            </div>
            <div class="field"><label>API endpoint / model</label><input value="https://api.openai.com/v1 · gpt-4o-mini"></div>
            <div class="field"><label>Secret (stored in Moodle config)</label><input type="password" value="••••••••••••"></div>
            <div class="field"><label>Fields to extract</label>
              <div class="filters">${['Name','Headline','Skills','Experience','Education','Links','Languages'].map((f) =>
                `<span class="filter-chip is-active">${f}</span>`).join('')}
              </div>
            </div>
            <a class="btn btn-secondary" href="#/cv-parsing">Preview parser UX →</a>
          </div>
        </div>
        <div class="card" style="margin-top:14px">
          <h3>Other plugin options</h3>
          <div class="grid-2">
            <label class="row between"><span>French starter language pack</span><input type="checkbox" checked></label>
            <label class="row between"><span>Show success stories on home</span><input type="checkbox" checked></label>
            <label class="row between"><span>Job match digest emails</span><input type="checkbox" checked></label>
            <label class="row between"><span>Event reminder 24h before</span><input type="checkbox" checked></label>
            <label class="row between"><span>Show Career Hub block on Moodle /my</span><input type="checkbox" checked></label>
            <div class="field"><label>Default profile visibility</label><select><option>Alumni only</option><option>Public</option><option>Only me</option></select></div>
            <div class="field"><label>Landing page</label><select><option>Enabled (public)</option><option>Redirect to login</option></select></div>
          </div>
          <a class="btn btn-secondary" style="margin-top:12px" href="#/moodle-block">Preview Moodle /my block →</a>
        </div>
      </div>`;
  },

  'cohorts-admin'() {
    return `
      <div class="screen-enter">
        <div class="section-title"><h1 style="font-size:1.5rem;margin:0">Cohorts with hub access</h1>
          <a class="btn btn-sm btn-secondary" href="#/plugin-settings">Plugin settings</a></div>
        <p class="muted">Synced from Moodle cohorts. Toggle which ones unlock Career Hub.</p>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Cohort</th><th>Members</th><th>Hub access</th><th></th></tr></thead>
            <tbody>${JACC.COHORTS.map((c) => `
              <tr>
                <td><strong>${c.name}</strong></td>
                <td>${c.members}</td>
                <td>${c.allowed ? '<span class="pill-success pill">Allowed</span>' : '<span class="pill">Blocked</span>'}</td>
                <td><button class="btn btn-sm btn-ghost" data-toast="${c.allowed ? 'Access removed' : 'Access granted'}">${c.allowed ? 'Revoke' : 'Allow'}</button></td>
              </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>`;
  },

  approvals() {
    return `
      <div class="screen-enter">
        <div class="section-title"><h1 style="font-size:1.5rem;margin:0">Account approvals</h1></div>
        <p class="muted">New sign-ups waiting for alumni verification (plugin: require approval).</p>
        <div class="stack">${[
          ['Kwesi Addo', 'JA Ghana claim · 2018', '2h ago'],
          ['Mariama Sy', "JA Sénégal claim · 2020", '1d ago'],
          ['Chinedu Okafor', 'JA Nigeria claim · 2019', '2d ago'],
        ].map(([n, c, t]) => `
          <div class="list-card" style="cursor:default">
            ${JACC.avatar(n)}
            <div class="meta"><h3>${n}</h3><div class="tiny">${c} · ${t}</div></div>
            <button class="btn btn-sm btn-primary" data-toast="Approved · cohort assigned">Approve</button>
            <button class="btn btn-sm btn-ghost" data-toast="Rejected with note">Reject</button>
          </div>`).join('')}
        </div>
      </div>`;
  },

  'cv-start'() {
    return `
      <div class="screen-enter" style="max-width:560px;margin:0 auto">
        <div class="section-title"><h1 style="font-size:1.5rem;margin:0">CV studio</h1></div>
        <p class="muted">Build from scratch or upload a CV — AI reads it and fills your profile (from Career Connect).</p>
        <a class="card option-card" href="#/cv-builder">
          <div class="row"><span class="opt-ico">✨</span><div class="grow"><h3 style="margin:0">Build a CV</h3><div class="tiny">Section cards + live preview</div></div><span class="pill-match pill">Fastest</span></div>
        </a>
        <a class="card option-card" href="#/cv-upload" style="margin-top:10px">
          <div class="row"><span class="opt-ico">🤖</span><div class="grow"><h3 style="margin:0">Upload & AI-parse</h3><div class="tiny">PDF/DOCX → skills, roles, education</div></div><span class="pill-accent pill">AI</span></div>
        </a>
        <a class="card option-card" href="#/cv-list" style="margin-top:10px">
          <div class="row"><span class="opt-ico">📄</span><div class="grow"><h3 style="margin:0">My CVs</h3><div class="tiny">2 versions · default for applications</div></div></div>
        </a>
        <p class="tiny" style="margin-top:14px">Privacy: CVs are Only me until you attach them to an application or share a link.</p>
      </div>`;
  },

  'cv-upload'() {
    return `
      <div class="auth-panel screen-enter" style="margin:0 auto;max-width:520px">
        <h1>Upload your CV</h1>
        <p class="muted">We’ll run the AI parser next — you review before anything saves to your profile.</p>
        <div class="dropzone" data-nav="#/cv-parsing" data-toast="File ready · starting AI parse">
          <div style="font-size:2rem">⬆️</div>
          <strong>Drop PDF or DOCX</strong>
          <div class="tiny">Max 5 MB · text-based files parse best</div>
        </div>
        <label class="row between" style="margin:14px 0"><span>Make default for applications</span><input type="checkbox" checked></label>
        <a class="btn btn-primary btn-block" href="#/cv-parsing">Continue to AI parse</a>
      </div>`;
  },

  'cv-parsing'() {
    return `
      <div class="auth-panel screen-enter" style="margin:40px auto;text-align:center;max-width:480px">
        <div class="ai-orb parsing" aria-hidden="true"></div>
        <h1>AI is reading your CV</h1>
        <p class="muted">Extracting name, skills, experience, education and links…</p>
        <div class="parse-steps">
          ${['Reading document', 'Finding sections', 'Extracting skills', 'Normalising dates', 'Ready for review'].map((s, i) => `
            <div class="parse-step ${i < 3 ? 'done' : i === 3 ? 'on' : ''}"><span></span>${s}</div>`).join('')}
        </div>
        <a class="btn btn-primary btn-block" href="#/cv-review" style="margin-top:20px" data-auto-review>Continue to review</a>
        <p class="tiny">Auto-continues in a moment…</p>
      </div>`;
  },

  'cv-review'() {
    return `
      <div class="screen-enter" style="max-width:720px;margin:0 auto">
        <div class="section-title">
          <div><h1 style="font-size:1.5rem;margin:0">Review AI extract</h1>
          <p class="muted" style="margin:0">Edit anything wrong before we write to your CV studio.</p></div>
          <span class="pill-accent pill">Confidence 91%</span>
        </div>
        <div class="grid-2">
          <div class="card">
            <div class="field"><label>Full name</label><input value="Efua Boateng"></div>
            <div class="field"><label>Headline</label><input value="Product Analyst · Accra"></div>
            <div class="field"><label>Skills</label><input value="SQL, Excel, Product analytics, Stakeholder management, Figma"></div>
            <div class="field"><label>Links</label><input value="linkedin.com/in/efuab · github.com/efua"></div>
          </div>
          <div class="card">
            <h3>Experience</h3>
            <div class="list-card" style="cursor:default;margin-bottom:8px">
              <div class="meta"><h3>Product Analyst · Hubtel</h3><div class="tiny">2022 — Present · Accra</div>
              <p class="tiny" style="margin-top:6px">Built dashboards for merchant growth; partnered with PMs on experiment readouts.</p></div>
            </div>
            <h3>Education</h3>
            <div class="list-card" style="cursor:default">
              <div class="meta"><h3>BSc Business Admin · University of Ghana</h3><div class="tiny">2016 — 2020</div></div>
            </div>
            <div class="field" style="margin-top:12px"><label>Job preference (from parser)</label>
              <select><option>Full-time · Hybrid</option><option>Full-time · Remote</option></select>
            </div>
          </div>
        </div>
        <div class="row" style="gap:10px;margin-top:16px;flex-wrap:wrap">
          <a class="btn btn-primary" href="#/cv-health">Save to CV studio</a>
          <a class="btn btn-secondary" href="#/profile-edit">Also update profile</a>
          <a class="btn btn-ghost" href="#/cv-upload">Re-upload</a>
        </div>
      </div>`;
  },

  'cv-list'() {
    return `
      <div class="screen-enter" style="max-width:560px;margin:0 auto">
        <div class="section-title"><h1 style="font-size:1.5rem;margin:0">My CVs</h1>
          <a class="btn btn-sm btn-primary" href="#/cv-start">New</a></div>
        <div class="stack">
          <a class="list-card" href="#/cv-builder">
            <div class="thumb img"><img src="assets/jobs/ja.jpg" alt=""></div>
            <div class="meta"><h3>Product Analyst · default</h3><div class="tiny">Health 82 · Updated today</div></div>
            <span class="pill-success pill">Default</span>
          </a>
          <a class="list-card" href="#/cv-builder">
            <div class="thumb img"><img src="assets/jobs/ja.jpg" alt=""></div>
            <div class="meta"><h3>UX Fellow tailored</h3><div class="tiny">Health 76 · From AI parse</div></div>
          </a>
        </div>
      </div>`;
  },

  'cv-builder'() {
    return `
      <div class="screen-enter cv-builder">
        <div class="section-title">
          <h1 style="font-size:1.4rem;margin:0">CV builder</h1>
          <div class="row gap-sm">
            <span class="pill-success pill">Health 82</span>
            <button class="btn btn-sm btn-secondary" data-toast="Tailor panel (prototype)">✨ Tailor for a job</button>
            <button class="btn btn-sm btn-primary" data-toast="Exported PDF">Export</button>
          </div>
        </div>
        <div class="cv-cols">
          <div class="stack">
            ${['Basics', 'Experience', 'Education', 'Skills', 'Projects'].map((s, i) => `
              <div class="card ${i === 0 ? 'is-focus' : ''}"><strong>${s}</strong>
                <div class="tiny">${i === 0 ? 'Efua Boateng · Product Analyst' : 'Tap to edit sections'}</div>
              </div>`).join('')}
          </div>
          <div class="card cv-preview">
            <div class="tiny">Live preview</div>
            <h2 style="margin:8px 0 4px">Efua Boateng</h2>
            <div class="muted">Product Analyst · Accra · efua@alumni.ja.org</div>
            <hr style="border:0;border-top:1px solid var(--line);margin:14px 0">
            <strong>Experience</strong>
            <p class="tiny">Hubtel — Product Analyst (2022–Present)</p>
            <strong>Skills</strong>
            <p class="tiny">SQL · Excel · Product analytics · Stakeholder management</p>
          </div>
          <div class="card hide-mobile">
            <h3>CV health</h3>
            <div class="stat"><div class="n">82</div><div class="l">Score</div></div>
            <div class="stack" style="margin-top:12px">
              <div class="tiny">✅ Contact details</div>
              <div class="tiny">✅ Recent experience</div>
              <div class="tiny">⚠️ Add quantified impact</div>
              <div class="tiny">⚠️ Add a project</div>
            </div>
            <a class="btn btn-sm btn-secondary" style="margin-top:12px" href="#/cv-health">Full tips</a>
          </div>
        </div>
      </div>`;
  },

  'cv-health'() {
    return `
      <div class="auth-panel screen-enter" style="margin:0 auto;max-width:520px">
        <h1>CV health · 82</h1>
        <div class="bar-track" style="height:12px;margin:12px 0 20px"><div class="bar-fill" style="width:82%"></div></div>
        ${[['Add metrics to Hubtel role','+6'],['Include a project link','+4'],['Tighten headline to 8 words','+3']].map(([t, s]) => `
          <div class="row between" style="padding:12px 0;border-bottom:1px solid var(--line)">
            <span>${t}</span><span class="pill-accent pill">${s}</span>
          </div>`).join('')}
        <a class="btn btn-primary btn-block" style="margin-top:18px" href="#/cv-builder">Back to builder</a>
        <a class="btn btn-ghost btn-block" href="#/cv-share">Create share link</a>
      </div>`;
  },

  'cv-share'() {
    return `
      <div class="auth-panel screen-enter" style="margin:0 auto;max-width:480px">
        <h1>Share CV link</h1>
        <p class="muted">Time-boxed link for employers — respects privacy settings.</p>
        <div class="field"><label>Expires</label><select><option>7 days</option><option>30 days</option><option>Once viewed</option></select></div>
        <div class="card" style="font-family:monospace;font-size:13px;word-break:break-all">https://hub.ja.africa/cv/s/efua-8f3a</div>
        <button class="btn btn-primary btn-block" style="margin-top:12px" data-toast="Link copied">Copy link</button>
      </div>`;
  },

  organise() {
    return `
      <div class="screen-enter">
        <div class="hero">
          <span class="eyebrow"><i></i> Organise · events staff</span>
          <h1>Your events desk</h1>
          <p>Create, publish, message attendees, scan QR check-in, mark attendance.</p>
          <div class="actions">
            <a class="btn btn-primary" href="#/create-event">Create event</a>
            <a class="btn btn-secondary" href="#/organise-scan">QR check-in</a>
          </div>
        </div>
        <div class="stat-grid" style="margin-bottom:16px">
          <div class="stat"><div class="n">8</div><div class="l">Upcoming</div></div>
          <div class="stat"><div class="n">3</div><div class="l">Awaiting approval</div></div>
          <div class="stat"><div class="n">142</div><div class="l">RSVPs week</div></div>
          <div class="stat"><div class="n">74%</div><div class="l">Show-up rate</div></div>
        </div>
        <div class="stack">${JACC.EVENTS.map((e) => `
          <div class="list-card" style="cursor:default">
            <div class="thumb img"><img src="assets/events/summit.jpg" alt=""></div>
            <div class="meta"><h3>${e.title}</h3><div class="tiny">${e.when} · ${e.spots}</div></div>
            <a class="btn btn-sm btn-secondary" href="#/attendance">Attendance</a>
            <a class="btn btn-sm btn-ghost" href="#/organise-scan">Scan</a>
          </div>`).join('')}
        </div>
      </div>`;
  },

  'organise-scan'() {
    return `
      <div class="auth-panel screen-enter" style="margin:24px auto;text-align:center;max-width:420px">
        <h1>QR check-in</h1>
        <p class="muted">Point the camera at an attendee ticket (Organise · scan).</p>
        <div class="scan-frame"><div class="scan-line"></div></div>
        <button class="btn btn-primary btn-block" data-toast="Checked in · Efua Boateng">Simulate successful scan</button>
        <a class="btn btn-ghost btn-block" href="#/attendance">Open attendance list</a>
      </div>`;
  },

  'employer-pipeline'() {
    return `
      <div class="screen-enter">
        <div class="section-title"><h1 style="font-size:1.5rem;margin:0">Hiring pipeline</h1>
          <span class="tiny">Product Analyst · MTN</span></div>
        <div class="pipe-board">
          ${[['Submitted', JACC.APPLICANTS.filter(a=>a.status==='submitted')],
             ['Reviewing', JACC.APPLICANTS.filter(a=>a.status==='reviewing')],
             ['Shortlisted', JACC.APPLICANTS.filter(a=>a.status==='shortlisted')],
             ['Hired', []]].map(([col, list]) => `
            <div class="pipe-col">
              <div class="row between"><strong>${col}</strong><span class="pill">${list.length}</span></div>
              ${list.map((a) => `
                <div class="card" style="padding:12px;margin-top:8px">
                  <div class="row" style="margin-bottom:6px">${JACC.avatar(a, 'sm')}<strong>${a.name}</strong></div>
                  <div class="tiny">${a.skills} · ${a.match}%</div>
                </div>`).join('') || '<div class="tiny" style="margin-top:8px">Empty</div>'}
            </div>`).join('')}
        </div>
      </div>`;
  },

  'employer-jobs'() {
    return JACC.Screens.employer();
  },

  company() {
    return `
      <div class="screen-enter" style="max-width:640px;margin:0 auto">
        <div class="card" style="padding:0;overflow:hidden">
          <div style="height:120px;background:linear-gradient(135deg,var(--primary),var(--accent))"></div>
          <div style="padding:20px">
            <h1 style="margin:0">MTN Ghana</h1>
            <p class="muted">Telecom · Accra · Partner employer</p>
            <div class="row gap-sm"><span class="pill-success pill">Verified partner</span><span class="pill">4 open roles</span></div>
            <p class="muted" style="margin-top:14px">We hire JA alumni into analytics, retail and digital roles across West Africa.</p>
            <a class="btn btn-secondary" href="#/post-job">Post a role</a>
          </div>
        </div>
      </div>`;
  },

  'manage-stories'() {
    return `
      <div class="screen-enter">
        <div class="section-title"><h1 style="font-size:1.5rem;margin:0">Success stories</h1>
          <button class="btn btn-sm btn-primary" data-toast="Story editor">New story</button></div>
        <div class="grid-3">${JACC.STORIES.map((s) => `
          <div class="card"><strong>${s.name}</strong><div class="tiny">${s.cohort}</div>
            <p style="font-style:italic;margin:8px 0">“${s.quote}”</p>
            <button class="btn btn-sm btn-ghost" data-toast="Featured on home">Feature</button>
          </div>`).join('')}
        </div>
      </div>`;
  },

  exports() {
    return `
      <div class="screen-enter" style="max-width:560px;margin:0 auto">
        <h1 style="font-size:1.5rem">Data exports</h1>
        <p class="muted">M&E CSV downloads for funder reporting.</p>
        <div class="stack">
          ${[['Applications (all)', 'US-29'],['Event attendance', 'US-23'],['Saved jobs + searches', 'US-08'],['Alumni engagement 30d', 'KPI']].map(([t, id]) => `
            <div class="list-card" style="cursor:default">
              <div class="meta"><h3>${t}</h3><div class="tiny">${id}</div></div>
              <button class="btn btn-sm btn-primary" data-toast="${t.replace(/ .*/,'').toLowerCase()}_export.csv">Download</button>
            </div>`).join('')}
        </div>
      </div>`;
  },

  /* Spaces — Moodle forum-backed discussions (US-26, from old JACC groups/forum) */
  spaces() {
    const spaces = JACC.SPACES || [];
    const initials = (name) => esc(name.split(' ').map((w) => w[0]).join('').slice(0, 2));
    return `
      <div class="screen-enter horizon-shell">
        <div class="section-title">
          <h1 style="font-size:1.6rem;margin:0">Your spaces</h1>
          <a class="btn btn-sm btn-primary" href="#/space-new">New space</a>
        </div>
        <p class="muted">Cohort, chapter, and interest groups — discussions use Moodle forums (not a separate chat app).</p>
        <div class="stack spaces-grid">${spaces.map((s) => `
          <a class="list-card space-teaser" href="#/space">
            <div class="space-teaser-media" data-kind="${esc(s.kind)}">
              <span class="space-initials">${initials(s.name)}</span>
              ${s.unread ? `<span class="pill-danger pill space-unread">${s.unread} new</span>` : ''}
            </div>
            <div class="meta">
              <div class="row gap-sm"><h3 style="margin:0">${esc(s.name)}</h3><span class="pill">${esc(s.kind)}</span></div>
              <div class="tiny" style="margin-top:8px">${esc(s.desc)}</div>
              <div class="tiny" style="margin-top:10px">${s.members} members · ${s.threads.length} discussions</div>
            </div>
          </a>`).join('')}
        </div>
      </div>`;
  },

  space() {
    const s = (JACC.SPACES || [])[0];
    return `
      <div class="screen-enter horizon-shell">
        <div class="section-title">
          <div>
            <div class="tiny"><a href="#/spaces">Spaces</a> · ${esc(s.kind)}</div>
            <h1 style="font-size:1.5rem;margin:4px 0 0">${esc(s.name)}</h1>
          </div>
          <button class="btn btn-sm btn-primary" data-toast="New discussion started" data-nav="#/space-thread">New discussion</button>
        </div>
        <div class="moodle-core-note">
          <div><strong>Moodle forum</strong> — threads, replies, and subscriptions use core forum in this space. Messaging stays on the header icon.</div>
        </div>
        <p class="muted">${esc(s.desc)} · ${s.members} members</p>
        <div class="stack thread-list">${s.threads.map((th) => `
          <a class="list-card thread-row" href="#/space-thread">
            <div class="meta" style="flex:1">
              <div class="row gap-sm">
                ${th.pinned ? '<span class="pill-accent pill">Pinned</span>' : ''}
                <h3 style="margin:0">${esc(th.title)}</h3>
              </div>
              <div class="tiny">${esc(th.author)} · ${th.replies} replies · ${esc(th.time)}</div>
            </div>
          </a>`).join('')}
        </div>
      </div>`;
  },

  'space-thread'() {
    const posts = JACC.SPACE_POSTS.t1 || [];
    return `
      <div class="screen-enter horizon-shell" style="max-width:720px">
        <div class="tiny"><a href="#/spaces">Spaces</a> · <a href="#/space">JA Ghana 2019</a></div>
        <h1 style="font-size:1.4rem;margin:8px 0 16px">Anyone interviewing at Hubtel this month?</h1>
        <div class="stack">${posts.map((p) => `
          <div class="card">
            <div class="row" style="margin-bottom:8px">${JACC.avatar(p.name)}
              <div><strong>${esc(p.name)}</strong><div class="tiny">${esc(p.time)}</div></div>
            </div>
            <p style="margin:0">${esc(p.text)}</p>
          </div>`).join('')}
        </div>
        <div class="card" style="margin-top:14px">
          <div class="field" style="margin:0"><label>Reply in this forum thread</label>
            <textarea placeholder="Share advice or ask a follow-up…"></textarea>
          </div>
          <button class="btn btn-primary btn-sm" style="margin-top:10px" data-toast="Posted to Moodle forum">Post reply</button>
        </div>
      </div>`;
  },

  'space-new'() {
    return `
      <div class="auth-panel screen-enter" style="margin:0 auto;max-width:560px">
        <h1>Create a space</h1>
        <p class="muted">Interest or chapter group with a Moodle forum for discussions.</p>
        <div class="field"><label>Name</label><input placeholder="e.g. Fintech founders"></div>
        <div class="field"><label>Type</label>
          <select><option>Interest</option><option>Chapter</option><option>Cohort</option></select>
        </div>
        <div class="field"><label>Description</label><textarea placeholder="What will members discuss?"></textarea></div>
        <label class="row" style="margin:0 0 14px;gap:8px"><input type="checkbox" checked> Create Moodle forum for this space</label>
        <button class="btn btn-primary btn-block" data-toast="Space created" data-nav="#/space">Create space</button>
      </div>`;
  },

  forum() {
    return JACC.Screens.spaces();
  },

  'work-history'() {
    const exp = JACC.EXPERIENCE || [];
    return `
      <div class="auth-panel screen-enter" style="margin:0 auto;max-width:640px">
        <h1>Work history</h1>
        <p class="muted">Roles shown on your profile and used for job matching — same as old JACC experience.</p>
        <div class="stack" style="margin-bottom:18px">${exp.map((e) => `
          <div class="list-card" style="cursor:default">
            <div class="meta">
              <h3>${esc(e.title)}</h3>
              <div class="tiny">${esc(e.company)} · ${esc(e.place)} · ${esc(e.from)} – ${esc(e.to)}</div>
            </div>
            <button class="btn btn-sm btn-ghost" data-toast="Edit role (prototype)">Edit</button>
          </div>`).join('')}
        </div>
        <h2 style="font-size:1.1rem">Add a role</h2>
        <div class="field"><label>Title</label><input placeholder="e.g. Product Analyst"></div>
        <div class="field"><label>Company</label><input placeholder="e.g. MTN Ghana"></div>
        <div class="field"><label>Place</label><input placeholder="Accra"></div>
        <div class="grid-2">
          <div class="field"><label>Start</label><input placeholder="Jan 2023"></div>
          <div class="field"><label>End</label><input placeholder="Present"></div>
        </div>
        <label class="row" style="margin:0 0 14px;gap:8px"><input type="checkbox" checked> I currently work here</label>
        <button class="btn btn-primary btn-block" data-toast="Work history saved" data-nav="#/profile">Save role</button>
      </div>`;
  },

  'open-to-work'() {
    const otw = JACC.OPEN_TO_WORK || { on: false, types: [] };
    return `
      <div class="auth-panel screen-enter" style="margin:0 auto;max-width:560px">
        <h1>Open to work</h1>
        <p class="muted">Tell employers you are available for roles. Only employers see this on your profile.</p>
        <label class="row between" style="padding:14px 0;border-bottom:1px solid var(--line)">
          <span><strong>Show employers I am open to work</strong><div class="tiny">Toggle availability</div></span>
          <input type="checkbox" ${otw.on ? 'checked' : ''}>
        </label>
        <div class="field" style="margin-top:14px"><label>Roles</label><input value="${esc(otw.roles || '')}" placeholder="e.g. Product Analyst, Associate PM"></div>
        <div class="field"><label>Places</label><input value="${esc(otw.places || '')}" placeholder="Accra · Remote Africa"></div>
        <div class="field"><label>Type</label>
          <div class="row gap-sm" style="flex-wrap:wrap;margin-top:6px">
            ${JACC.JOB_TYPES.map((x) => `
              <button type="button" class="filter-chip ${(otw.types || []).includes(x) ? 'is-active' : ''}">${x}</button>`).join('')}
          </div>
        </div>
        <button class="btn btn-primary btn-block" data-toast="Open to work updated" data-nav="#/profile">Save availability</button>
      </div>`;
  },

  courses() {
    return `
      <div class="screen-enter">
        <div class="hero">
          <span class="eyebrow"><i></i> From Career Connect</span>
          <h1>Courses & skills tests</h1>
          <p>CPD-style courses and skills assessments — deferred in stakeholder scope, shown for parity review.</p>
        </div>
        <div class="grid-2">
          <div class="media-card"><div class="media"></div><div class="body"><h3>Work readiness sprint</h3><div class="tiny">6 modules · badge</div></div></div>
          <div class="media-card"><div class="media" style="background:linear-gradient(135deg,#00763D,#00C0CA)"></div><div class="body"><h3>SQL skills check</h3><div class="tiny">20 min timed test</div></div></div>
        </div>
      </div>`;
  },

  surveys() {
    return `
      <div class="screen-enter">
        <div class="section-title"><h1 style="font-size:1.5rem;margin:0">Surveys</h1></div>
        <p class="muted">Old JACC admin survey builder + alumni responses — optional for M&E.</p>
        <div class="list-card"><div class="meta"><h3>Post-summit feedback</h3><div class="tiny">Open · 128 responses</div></div>
          <button class="btn btn-sm btn-primary" data-toast="Survey opened">Take survey</button></div>
      </div>`;
  },

  'match-explain'() {
    const j = JACC.JOBS[0];
    return `
      <div class="screen-enter" style="max-width:580px;margin:0 auto">
        <div class="row" style="margin-bottom:16px;gap:14px">
          <div class="thumb img" style="width:64px;height:64px;border-radius:var(--radius-md);overflow:hidden"><img src="${j.logo}" alt="" style="width:100%;height:100%;object-fit:cover"></div>
          <div>
            <div class="pill-match pill">${j.match}% match</div>
            <h1 style="font-size:1.45rem;margin:6px 0 0">${j.title}</h1>
            <div class="tiny">${j.company} · ${j.loc}</div>
          </div>
        </div>
        <p class="muted">Transparent scoring so alumni trust recommendations — and employers see why JA talent fits.</p>
        <div class="card">
          ${[
            ['Skills overlap', 42, 88, 'SQL · Excel · Stakeholder management'],
            ['Industry fit', 28, 70, 'Technology / fintech adjacent'],
            ['Location & type', 18, 90, 'Accra · Hybrid matches your prefs'],
            ['JA alumni preferred', 6, 100, 'Employer boost for JA alumni'],
          ].map(([label, pts, pct, hint]) => `
            <div class="explain-row">
              <div>
                <strong>${label}</strong>
                <div class="bar-track" style="margin-top:8px"><div class="bar-fill" style="width:${pct}%"></div></div>
                <div class="tiny" style="margin-top:6px">${hint}</div>
              </div>
              <span class="pill-match pill">+${pts}</span>
            </div>`).join('')}
        </div>
        <div class="row" style="gap:10px;margin-top:16px;flex-wrap:wrap">
          <a class="btn btn-primary" href="#/apply">Apply</a>
          <a class="btn btn-secondary" href="#/job">View role</a>
          <a class="btn btn-ghost" href="#/saved-searches">Alert me to similar</a>
        </div>
      </div>`;
  },

  pathway() {
    const steps = [
      { y: '2019', t: 'Joined JA Ghana cohort', tag: 'Onboarding', who: null },
      { y: '2022', t: 'First job board application', tag: 'Careers', who: null },
      { y: '2023', t: 'Applied to 4 roles · shortlisted twice', tag: 'Careers', who: null },
      { y: '2024', t: 'CV health 82 after AI parse', tag: 'CV studio', who: null },
      { y: 'Now', t: 'Summit RSVP · 12 fresh matches', tag: 'Today', who: null },
    ];
    return `
      <div class="screen-enter" style="max-width:640px;margin:0 auto">
        <div class="hero">
          <span class="eyebrow"><i></i> Career pathway</span>
          <h1>From JA Company to Product</h1>
          <p>Your hub history as a living story — skills, jobs, CVs and events in one timeline.</p>
        </div>
        <div class="row" style="margin-bottom:18px;gap:12px">
          ${JACC.avatar(JACC.ME, 'lg')}
          <div>
            <strong>Efua Boateng</strong>
            <div class="tiny">Product track · JA Ghana 2019</div>
            <div class="avatar-stack" style="margin-top:8px">
              ${JACC.avatar('Kwame Osei', 'sm')}
              ${JACC.avatar('Ibrahim Touré', 'sm')}
              ${JACC.avatar('Wanjiru Kamau', 'sm')}
              <span class="tiny" style="margin-left:8px">Peers on your path</span>
            </div>
          </div>
        </div>
        <div class="timeline">
          ${steps.map((s) => `
            <div class="timeline-item">
              <div class="card" style="margin:0">
                <div class="row between"><span class="pill">${s.y}</span><span class="tiny">${s.tag}</span></div>
                <h3 style="margin:8px 0 0;font-size:1rem">${s.t}</h3>
                ${s.who ? `<div class="row" style="margin-top:10px">${JACC.avatar(s.who, 'sm')}<span class="tiny">${s.who}</span></div>` : ''}
              </div>
            </div>`).join('')}
        </div>
      </div>`;
  },

  'impact-map'() {
    const dots = [
      { left: '32%', top: '48%', label: 'Ghana · 2.1k' },
      { left: '38%', top: '52%', label: 'Nigeria · 3.4k' },
      { left: '58%', top: '58%', label: 'Kenya · 1.8k' },
      { left: '28%', top: '55%', label: "Côte d'Ivoire · 0.9k" },
      { left: '52%', top: '72%', label: 'South Africa · 1.1k' },
    ];
    return `
      <div class="screen-enter">
        <div class="section-title"><h1 style="font-size:1.5rem;margin:0">Africa engagement map</h1>
          <a class="btn btn-sm btn-secondary" href="#/analytics">M&E view</a></div>
        <p class="muted">Where alumni are active this month — for country offices and funders.</p>
        <div class="map-stage">
          ${dots.map((d) => `<button type="button" class="map-dot" style="left:${d.left};top:${d.top}" title="${d.label}" data-toast="${d.label}"></button>`).join('')}
          <div style="position:absolute;inset:auto 16px 16px 16px">
            <strong>Live pulse · 30 days</strong>
            <div class="tiny">Tap a glow for country detail</div>
          </div>
        </div>
        <div class="map-legend">
          ${dots.map((d) => `<span class="pill">${d.label}</span>`).join('')}
        </div>
        <div class="stat-grid" style="margin-top:14px">
          <div class="stat"><div class="n">12.4k</div><div class="l">Active 30d</div></div>
          <div class="stat"><div class="n">38</div><div class="l">Countries</div></div>
          <div class="stat"><div class="n">1.8k</div><div class="l">Applications</div></div>
          <div class="stat"><div class="n">74%</div><div class="l">Event show-up</div></div>
        </div>
      </div>`;
  },

  ticket() {
    return `
      <div class="auth-panel ticket-card screen-enter" style="margin:24px auto;max-width:400px;text-align:center">
        <div class="row between">
          ${JACC.avatar(JACC.ME)}
          <span class="pill-success pill">You’re going</span>
        </div>
        <h1 style="margin-top:14px;font-size:1.35rem">Regional Alumni Summit</h1>
        <p class="muted">Sat 14 Mar · 09:00 WAT · Accra + Online</p>
        <div class="scan-frame" style="margin:20px auto" title="QR for Organise check-in"></div>
        <div class="ticket-stub">
          <div class="tiny">Ticket · EFUA-SUMMIT-2026</div>
          <div class="row" style="gap:8px;justify-content:center;margin-top:16px;flex-wrap:wrap">
            <button class="btn btn-secondary btn-sm" data-toast="Added to Moodle calendar">Moodle calendar</button>
            <button class="btn btn-primary btn-sm" data-toast="Join link copied">Join link</button>
          </div>
          <p class="tiny" style="margin-top:14px">Reminder via Moodle notification · 24h before</p>
        </div>
      </div>`;
  },

  endorsements() {
    const rows = [
      { skill: 'Product sense', who: 'Kwame Osei', role: 'Peer', n: 4 },
      { skill: 'SQL', who: 'Ibrahim Touré', role: 'Peer', n: 2 },
      { skill: 'Stakeholder mgmt', who: 'Wanjiru Kamau', role: 'Peer', n: 3 },
      { skill: 'Interview prep', who: 'Adaobi Nwosu', role: 'Peer', n: 1 },
    ];
    return `
      <div class="screen-enter" style="max-width:560px;margin:0 auto">
        <div class="row" style="margin-bottom:8px;gap:12px">
          ${JACC.avatar(JACC.ME, 'lg')}
          <div>
            <h1 style="font-size:1.45rem;margin:0">Skill endorsements</h1>
            <p class="muted" style="margin:4px 0 0">Alumni peers endorse skills — improves job match %.</p>
          </div>
        </div>
        <div class="stack">
          ${rows.map((r) => `
            <div class="list-card" style="cursor:default">
              ${JACC.avatar(r.who)}
              <div class="meta">
                <h3>${r.skill}</h3>
                <div class="tiny">${r.who} · ${r.role}</div>
                <div class="endorsement-bar" aria-label="${r.n} endorsements">${'★'.repeat(Math.min(r.n, 5))}</div>
              </div>
              <span class="pill-accent pill">${r.n}</span>
            </div>`).join('')}
        </div>
        <button class="btn btn-secondary" style="margin-top:14px" data-toast="Request sent via Moodle message">Ask a peer to endorse</button>
      </div>`;
  },

  'moodle-block'() {
    return `
      <div class="screen-enter" style="max-width:720px;margin:0 auto">
        <div class="moodle-core-note">
          <div><strong>Moodle dashboard block</strong> — Career Hub appears on <code>/my</code> so alumni see matches without leaving core Moodle. Uses the same cohort capability checks.</div>
        </div>
        <div class="card" style="background:var(--sunken);padding:20px">
          <div class="tiny" style="margin-bottom:10px">Moodle · My dashboard</div>
          <div class="card">
            <div class="row between">
              <div class="row">${JACC.avatar(JACC.ME, 'sm')}<strong>JACC Career Hub</strong></div>
              <span class="pill">Block</span>
            </div>
            <div class="stat-grid" style="margin:12px 0">
              <div class="stat"><div class="n">12</div><div class="l">Matches</div></div>
              <div class="stat"><div class="n">2</div><div class="l">RSVPs</div></div>
            </div>
            <div class="avatar-stack" style="margin-bottom:12px">
              ${['Kwame Osei', 'Ibrahim Touré', 'Wanjiru Kamau'].map((n) => JACC.avatar(n, 'sm')).join('')}
              <span class="tiny" style="margin-left:8px">Alumni active</span>
            </div>
            <a class="btn btn-sm btn-primary" href="#/home">Open hub</a>
          </div>
        </div>
      </div>`;
  },

  digest() {
    return `
      <div class="screen-enter" style="max-width:520px;margin:0 auto">
        <h1 style="font-size:1.5rem">Weekly job digest</h1>
        <div class="moodle-core-note"><div>Delivered as a <strong>Moodle notification email</strong> (+ optional popup) — not a separate email service.</div></div>
        <div class="card">
          <div class="row between">
            <div class="tiny">Preview · Monday 08:00 WAT</div>
            ${JACC.avatar(JACC.ME, 'sm')}
          </div>
          <h3 style="margin:10px 0">Hi Efua — 3 roles matched your skills</h3>
          ${JACC.JOBS.slice(0, 3).map((j) => `
            <div class="row between" style="padding:10px 0;border-bottom:1px solid var(--line)">
              <span><strong>${j.title}</strong><div class="tiny">${j.company}</div></span>
              <span class="pill-match pill">${j.match}%</span>
            </div>`).join('')}
          <a class="btn btn-primary btn-block" style="margin-top:12px" href="#/careers">See all matches</a>
          <a class="btn btn-ghost btn-block" href="#/notifications">Notification prefs</a>
        </div>
      </div>`;
  },

  a11y() {
    return `
      <div class="auth-panel screen-enter" style="margin:0 auto;max-width:520px">
        <h1>Accessibility</h1>
        <p class="muted">NFR-04 · WCAG 2.1 AA — user-facing controls on top of Moodle themes.</p>
        <label class="row between" style="padding:12px 0;border-bottom:1px solid var(--line)"><span><strong>Larger text</strong><div class="tiny">Increases hub type scale</div></span><input type="checkbox"></label>
        <label class="row between" style="padding:12px 0;border-bottom:1px solid var(--line)"><span><strong>Reduce motion</strong><div class="tiny">Respects prefers-reduced-motion</div></span><input type="checkbox"></label>
        <label class="row between" style="padding:12px 0;border-bottom:1px solid var(--line)"><span><strong>High contrast</strong></span><input type="checkbox"></label>
        <label class="row between" style="padding:12px 0;border-bottom:1px solid var(--line)"><span><strong>Underline links</strong></span><input type="checkbox" checked></label>
        <button class="btn btn-primary btn-block" style="margin-top:16px" data-toast="Accessibility prefs saved">Save</button>
      </div>`;
  },

  bilingual() {
    const lang = JACC.lang();
    return `
      <div class="screen-enter" style="max-width:560px;margin:0 auto">
        <div class="section-title"><h1 style="font-size:1.5rem;margin:0">${JACC.t('settings.langTitle')}</h1></div>
        <p class="muted">${JACC.t('settings.langP')}</p>
        <div class="choice-grid">
          <button class="choice ${lang === 'en' ? 'is-on' : ''}" type="button" data-set-lang="en">English ${lang === 'en' ? '· ' + JACC.t('settings.active') : ''}</button>
          <button class="choice ${lang === 'fr' ? 'is-on' : ''}" type="button" data-set-lang="fr">Français ${lang === 'fr' ? '· ' + JACC.t('settings.active') : ''}</button>
        </div>
        <div class="card" style="margin-top:16px">
          <div class="row">${JACC.avatar(JACC.ME, 'sm')}<strong>${JACC.t('common.langMoodle')}</strong></div>
          <p class="muted" style="margin:10px 0 0">${JACC.t('landing.h1')}</p>
        </div>
        <p class="tiny" style="margin-top:14px">Moodle profile language → Career Hub UI language (prototype).</p>
      </div>`;
  },

  'saved-searches'() {
    return `
      <div class="screen-enter" style="max-width:560px;margin:0 auto">
        <div class="section-title">
          <h1 style="font-size:1.5rem;margin:0">Saved searches</h1>
          <button class="btn btn-sm btn-primary" data-toast="Search saved from job board">New</button>
        </div>
        <p class="muted">US-12 — digests use Moodle notifications when new roles match.</p>
        <div class="stack">
          ${[
            ['Product analyst · Accra · Hybrid', '12 new · weekly digest on'],
            ['Remote · React · Africa', '3 new · weekly digest on'],
            ['Internship · Marketing · Lagos', '0 new · alerts off'],
          ].map(([q, s], i) => `
            <div class="list-card" style="cursor:default">
              <div class="meta"><h3>${q}</h3><div class="tiny">${s}</div></div>
              <a class="btn btn-sm btn-secondary" href="#/careers">Run</a>
              <button class="btn btn-sm btn-ghost" data-toast="${i < 2 ? 'Digest paused' : 'Digest enabled'}">${i < 2 ? 'Pause' : 'Enable'}</button>
            </div>`).join('')}
        </div>
      </div>`;
  },
});
})();
