/* Extra screens: cohort gate, plugin settings, AI CV, organise, old-JACC features */
window.JACC = window.JACC || {};
JACC.Screens = JACC.Screens || {};

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
          <p>Only members of selected Moodle cohorts can see jobs, mentors and events. Ask your country office to add you to an alumni cohort — or request access below.</p>
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
            <div class="field"><label>Default profile visibility</label><select><option>Alumni only</option><option>Public</option><option>Only me</option></select></div>
            <div class="field"><label>Landing page</label><select><option>Enabled (public)</option><option>Redirect to login</option></select></div>
          </div>
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
            <div class="avatar">${n[0]}</div>
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
            <div class="thumb">CV</div>
            <div class="meta"><h3>Product Analyst · default</h3><div class="tiny">Health 82 · Updated today</div></div>
            <span class="pill-success pill">Default</span>
          </a>
          <a class="list-card" href="#/cv-builder">
            <div class="thumb">CV</div>
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
            <div class="thumb">EV</div>
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
                  <strong>${a.name}</strong>
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

  'mentor-requests'() {
    return `
      <div class="screen-enter">
        <div class="section-title"><h1 style="font-size:1.5rem;margin:0">Session requests</h1></div>
        <div class="stack">
          <div class="list-card" style="cursor:default">
            <div class="avatar">E</div>
            <div class="meta"><h3>Efua Boateng</h3><div class="tiny">Thu 18:00 · Breaking into PM</div></div>
            <button class="btn btn-sm btn-primary" data-toast="Accepted">Accept</button>
            <button class="btn btn-sm btn-ghost" data-toast="Decline sent">Decline</button>
            <button class="btn btn-sm btn-secondary" data-toast="Reschedule proposed">Reschedule</button>
          </div>
        </div>
      </div>`;
  },

  'mentor-availability'() {
    return `
      <div class="screen-enter" style="max-width:520px;margin:0 auto">
        <h1 style="font-size:1.5rem">Weekly availability</h1>
        ${['Mon','Tue','Wed','Thu','Fri','Sat'].map((d, i) => `
          <label class="row between" style="padding:12px 0;border-bottom:1px solid var(--line)">
            <strong>${d}</strong>
            <input value="${i === 1 ? '12:00–13:00' : i === 3 ? '18:00–20:00' : 'Unavailable'}" style="min-height:36px;border-radius:8px;border:1px solid var(--line);padding:0 10px;background:var(--surface);width:140px">
          </label>`).join('')}
        <button class="btn btn-primary" style="margin-top:16px" data-toast="Availability saved">Save</button>
      </div>`;
  },

  'mentor-notes'() {
    return `
      <div class="screen-enter" style="max-width:560px;margin:0 auto">
        <h1 style="font-size:1.5rem">Private mentor notes</h1>
        <p class="muted">Only you see these — carried across sessions with a mentee.</p>
        <div class="card"><strong>Efua Boateng</strong>
          <p class="tiny">Prep: PM transition · suggested STAR stories for Hubtel impact.</p>
        </div>
        <div class="field" style="margin-top:12px"><label>Add note</label><textarea></textarea></div>
        <button class="btn btn-primary" data-toast="Note saved">Save note</button>
      </div>`;
  },

  'mentor-verify'() {
    return `
      <div class="screen-enter">
        <div class="section-title"><h1 style="font-size:1.5rem;margin:0">Verify mentors</h1></div>
        <div class="stack">${JACC.MENTORS.filter(m => !m.verified).concat(JACC.MENTORS.filter(m => m.verified).slice(0,1)).map((m) => `
          <div class="list-card" style="cursor:default">
            <div class="avatar">${m.name[0]}</div>
            <div class="meta"><h3>${m.name}</h3><div class="tiny">${m.role}</div></div>
            ${m.verified ? '<span class="pill-success pill">Verified</span>' :
              '<button class="btn btn-sm btn-primary" data-toast="Mentor verified">Verify</button>'}
          </div>`).join('')}
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
          ${[['Applications (all)', 'US-29'],['Event attendance', 'US-23'],['Mentor sessions + ratings', 'US-17'],['Alumni engagement 30d', 'KPI']].map(([t, id]) => `
            <div class="list-card" style="cursor:default">
              <div class="meta"><h3>${t}</h3><div class="tiny">${id}</div></div>
              <button class="btn btn-sm btn-primary" data-toast="${t.replace(/ .*/,'').toLowerCase()}_export.csv">Download</button>
            </div>`).join('')}
        </div>
      </div>`;
  },

  /* Old JACC feature surfaces (design placeholders for parity) */
  forum() {
    return `
      <div class="screen-enter">
        <div class="hero">
          <span class="eyebrow"><i></i> From Career Connect</span>
          <h1>Alumni forum</h1>
          <p>Cohort discussions & flagged moderation — proposed for a later JACC 3.0 release (US-26).</p>
        </div>
        <div class="card"><strong>Design note</strong><p class="muted" style="margin:8px 0 0">Old JACC shipped forum feeds, upvotes, and admin flagged content. Prototype shows IA placement under Community.</p></div>
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
    return `
      <div class="screen-enter" style="max-width:560px;margin:0 auto">
        <div class="section-title"><h1 style="font-size:1.5rem;margin:0">Why 94% match?</h1></div>
        <p class="muted">Product Analyst · MTN Ghana — explainable matching builds trust.</p>
        <div class="card">
          <div class="row between" style="margin-bottom:12px"><strong>Skills overlap</strong><span class="pill-match pill">+42</span></div>
          <div class="bar-track"><div class="bar-fill" style="width:88%"></div></div>
          <div class="tiny" style="margin-top:6px">SQL · Excel · Stakeholder management</div>
        </div>
        <div class="card">
          <div class="row between"><strong>Industry fit</strong><span class="pill-match pill">+28</span></div>
          <div class="tiny">Technology / fintech adjacent</div>
        </div>
        <div class="card">
          <div class="row between"><strong>Location & type</strong><span class="pill-match pill">+18</span></div>
          <div class="tiny">Accra · Hybrid matches your prefs</div>
        </div>
        <div class="card">
          <div class="row between"><strong>JA alumni preference</strong><span class="pill-success pill">+6</span></div>
          <div class="tiny">Employer marked “JA alumni preferred”</div>
        </div>
        <a class="btn btn-primary btn-block" href="#/apply">Apply with this context</a>
      </div>`;
  },

  pathway() {
    return `
      <div class="screen-enter" style="max-width:640px;margin:0 auto">
        <div class="hero">
          <span class="eyebrow"><i></i> Career pathway</span>
          <h1>From JA Company to Product</h1>
          <p>A living timeline of skills, mentors, jobs and events — your hub history as a story.</p>
        </div>
        <div class="stack">
          ${[
            ['2019', 'Joined JA Ghana cohort', 'Onboarding'],
            ['2022', 'First mentor session · Ama Mensah', 'Mentorship'],
            ['2023', 'Applied · 4 roles · 1 hire path', 'Careers'],
            ['2024', 'CV health 82 · AI parse', 'CV studio'],
            ['Now', 'Summit RSVP · 12 job matches', 'Today'],
          ].map(([y, t, tag]) => `
            <div class="list-card" style="cursor:default">
              <div class="thumb" style="background:var(--primary);font-size:11px">${y}</div>
              <div class="meta"><h3>${t}</h3><div class="tiny">${tag}</div></div>
            </div>`).join('')}
        </div>
      </div>`;
  },

  'impact-map'() {
    return `
      <div class="screen-enter">
        <div class="section-title"><h1 style="font-size:1.5rem;margin:0">Africa engagement map</h1>
          <a class="btn btn-sm btn-secondary" href="#/analytics">M&E view</a></div>
        <p class="muted">Where alumni are active this month — useful for country offices & funders.</p>
        <div class="card" style="min-height:280px;display:grid;place-items:center;background:
          radial-gradient(circle at 30% 45%, color-mix(in srgb, var(--ja-enterprise-aqua) 45%, transparent) 0 8%, transparent 9%),
          radial-gradient(circle at 48% 55%, color-mix(in srgb, var(--ja-leadership-lime) 50%, transparent) 0 12%, transparent 13%),
          radial-gradient(circle at 55% 48%, color-mix(in srgb, var(--ja-empowered-yellow) 40%, transparent) 0 6%, transparent 7%),
          radial-gradient(circle at 42% 62%, color-mix(in srgb, var(--ja-startup-jade) 40%, transparent) 0 7%, transparent 8%),
          var(--sunken)">
          <div style="text-align:center">
            <strong>Live pulse</strong>
            <div class="tiny">Ghana · Nigeria · Kenya · Côte d'Ivoire</div>
          </div>
        </div>
        <div class="stat-grid" style="margin-top:14px">
          <div class="stat"><div class="n">12.4k</div><div class="l">Active 30d</div></div>
          <div class="stat"><div class="n">38</div><div class="l">Countries</div></div>
          <div class="stat"><div class="n">638</div><div class="l">Sessions</div></div>
          <div class="stat"><div class="n">74%</div><div class="l">Event show-up</div></div>
        </div>
      </div>`;
  },

  ticket() {
    return `
      <div class="auth-panel screen-enter" style="margin:24px auto;max-width:400px;text-align:center">
        <div class="pill-success pill">You’re going</div>
        <h1 style="margin-top:12px">Regional Alumni Summit</h1>
        <p class="muted">Sat 14 Mar · 09:00 WAT · Accra + Online</p>
        <div class="scan-frame" style="margin:20px auto" title="QR for Organise check-in"></div>
        <div class="tiny">Ticket · EFUA-SUMMIT-2026</div>
        <div class="row" style="gap:8px;justify-content:center;margin-top:16px;flex-wrap:wrap">
          <button class="btn btn-secondary btn-sm" data-toast="Added to Moodle calendar">Moodle calendar</button>
          <button class="btn btn-primary btn-sm" data-toast="Join link copied">Join link</button>
        </div>
        <p class="tiny" style="margin-top:14px">Reminders fire through Moodle notifications 24h before.</p>
      </div>`;
  },

  endorsements() {
    return `
      <div class="screen-enter" style="max-width:560px;margin:0 auto">
        <h1 style="font-size:1.5rem">Skill endorsements</h1>
        <p class="muted">Mentors and peers can endorse skills after sessions — strengthens job match.</p>
        <div class="stack">
          ${[['Product sense', 'Ama Mensah · mentor', 4],['SQL', 'Kwame Osei · peer', 2],['Stakeholder mgmt', 'Ngozi Adeyemi · mentor', 3]].map(([s, w, n]) => `
            <div class="list-card" style="cursor:default">
              <div class="meta"><h3>${s}</h3><div class="tiny">${w}</div></div>
              <span class="pill-accent pill">${n} endorsements</span>
            </div>`).join('')}
        </div>
        <button class="btn btn-secondary" style="margin-top:14px" data-toast="Request sent via Moodle message">Ask mentor to endorse</button>
      </div>`;
  },

  'moodle-block'() {
    return `
      <div class="screen-enter" style="max-width:720px;margin:0 auto">
        <div class="moodle-core-note">
          <div><strong>Moodle dashboard block</strong> — Career Hub can appear as a block on the Moodle /my dashboard so alumni see matches without leaving core Moodle.</div>
        </div>
        <div class="card" style="background:var(--sunken);padding:20px">
          <div class="tiny" style="margin-bottom:10px">Moodle · Dashboard</div>
          <div class="card">
            <div class="row between"><strong>JACC Career Hub</strong><span class="pill">Block</span></div>
            <div class="stat-grid" style="margin:12px 0">
              <div class="stat"><div class="n">12</div><div class="l">Matches</div></div>
              <div class="stat"><div class="n">1</div><div class="l">Session</div></div>
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
        <div class="moodle-core-note"><div>Sent as a <strong>Moodle notification email</strong> (and optional popup) — not a separate ESP.</div></div>
        <div class="card">
          <div class="tiny">Preview · Monday 08:00 WAT</div>
          <h3 style="margin:8px 0">3 roles matched your skills</h3>
          ${JACC.JOBS.slice(0, 3).map((j) => `
            <div class="row between" style="padding:8px 0;border-bottom:1px solid var(--line)">
              <span>${j.title}<div class="tiny">${j.company}</div></span>
              <span class="pill-match pill">${j.match}%</span>
            </div>`).join('')}
          <a class="btn btn-primary btn-block" style="margin-top:12px" href="#/careers">See all matches</a>
        </div>
      </div>`;
  },

  a11y() {
    return `
      <div class="auth-panel screen-enter" style="margin:0 auto;max-width:520px">
        <h1>Accessibility</h1>
        <p class="muted">NFR-04 · WCAG 2.1 AA on hub pages — prototype of user-facing controls.</p>
        <label class="row between" style="padding:12px 0;border-bottom:1px solid var(--line)"><span>Larger text</span><input type="checkbox"></label>
        <label class="row between" style="padding:12px 0;border-bottom:1px solid var(--line)"><span>Reduce motion</span><input type="checkbox"></label>
        <label class="row between" style="padding:12px 0;border-bottom:1px solid var(--line)"><span>High contrast</span><input type="checkbox"></label>
        <label class="row between" style="padding:12px 0;border-bottom:1px solid var(--line)"><span>Underline links</span><input type="checkbox" checked></label>
        <button class="btn btn-primary btn-block" style="margin-top:16px" data-toast="Accessibility prefs saved">Save</button>
      </div>`;
  },

  bilingual() {
    return `
      <div class="screen-enter" style="max-width:560px;margin:0 auto">
        <div class="section-title"><h1 style="font-size:1.5rem;margin:0">Language · Langue</h1></div>
        <p class="muted">US-02 — follows Moodle language pack; French starter strings ship with the plugin.</p>
        <div class="choice-grid">
          <button class="choice is-on" type="button">English</button>
          <button class="choice" type="button">Français</button>
        </div>
        <div class="card" style="margin-top:16px">
          <strong>Aperçu</strong>
          <p class="muted" style="margin:8px 0 0">Trouvez un emploi. Trouvez un mentor. Restez connectés.</p>
        </div>
        <button class="btn btn-primary" style="margin-top:14px" data-toast="Would set Moodle lang preferred">Use French in Moodle</button>
      </div>`;
  },
});
