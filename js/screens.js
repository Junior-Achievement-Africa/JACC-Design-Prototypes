/* Screen templates for JACC design prototype */
window.JACC = window.JACC || {};

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[c]));

const icon = (name) => {
  const paths = {
    home: '<path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5z"/>',
    briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M3 12h18"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><circle cx="17" cy="9" r="2.5"/><path d="M3 19c0-3 2.5-5 6-5s6 2 6 5"/><path d="M15 19c0-2 1.2-3.5 3.5-3.5S22 17 22 19"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    message: '<path d="M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-5 3V6a1 1 0 0 1 1-1z"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    search: '<circle cx="11" cy="11" r="6"/><path d="m20 20-3.5-3.5"/>',
    bell: '<path d="M6 9a6 6 0 0 1 12 0c0 7 3 7 3 7H3s3 0 3-7"/><path d="M10 19a2 2 0 0 0 4 0"/>',
    check: '<path d="m5 12 5 5L20 7"/>',
  };
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths[name] || paths.home}</svg>`;
};

const statusPill = (status) => {
  const map = {
    submitted: 'pill', reviewing: 'pill-accent', shortlisted: 'pill-success',
    hired: 'pill-success', 'not selected': 'pill-danger',
  };
  return `<span class="pill ${map[status] || 'pill'}">${esc(status)}</span>`;
};

JACC.Screens = {
  landing() {
    return `
      <section class="hero screen-enter" style="min-height:min(70vh,560px);display:flex;flex-direction:column;justify-content:flex-end;">
        <span class="eyebrow"><i></i> JA Africa · Career Hub</span>
        <h1>Find work. Get mentored. Stay connected.</h1>
        <p>One Moodle-native home for 160,000+ JA alumni across Africa — jobs, mentors, events, and impact stories.</p>
        <div class="actions">
          <a class="btn btn-primary" href="#/signup">Join the hub</a>
          <a class="btn btn-secondary" href="#/login">Sign in</a>
          <a class="btn btn-ghost" href="#/home" style="color:inherit">Preview as alumnus →</a>
        </div>
      </section>
      <div class="stat-grid screen-enter" style="margin-bottom:24px">
        <div class="stat"><div class="n">160k+</div><div class="l">Alumni accounts</div></div>
        <div class="stat"><div class="n">2.1k</div><div class="l">Open roles</div></div>
        <div class="stat"><div class="n">840</div><div class="l">Verified mentors</div></div>
        <div class="stat"><div class="n">120</div><div class="l">Events / quarter</div></div>
      </div>
      <div class="section-title"><h2>What you can do</h2></div>
      <div class="grid-3">
        ${[['Careers','Search, match, apply, and track applications.'],['Mentorship','Book sessions ranked by skills fit.'],['Events','RSVP, join links, calendar sync.']].map(([t,d]) => `
          <div class="card"><h3>${t}</h3><p class="muted" style="margin:0">${d}</p></div>`).join('')}
      </div>
      <div class="section-title" style="margin-top:28px"><h2>Alumni stories</h2><a href="#/stories">See all</a></div>
      <div class="grid-3">${JACC.STORIES.map(s => `
        <div class="card">
          <div class="row gap-sm" style="margin-bottom:10px">
            <div class="avatar">${s.name[0]}</div>
            <div><strong>${esc(s.name)}</strong><div class="tiny">${esc(s.cohort)}</div></div>
          </div>
          <p style="margin:0;font-style:italic">“${esc(s.quote)}”</p>
        </div>`).join('')}
      </div>`;
  },

  login() {
    return `
      <div class="auth-wrap screen-enter">
        <div class="hero" style="min-height:320px;margin:0">
          <span class="eyebrow"><i></i> Welcome back</span>
          <h1>Your next opportunity is waiting.</h1>
          <p>Jobs matched to your skills. Mentors ranked by fit. Events across the region.</p>
        </div>
        <div class="auth-panel">
          <h1>Sign in</h1>
          <p class="muted">Use your JA Africa Moodle account.</p>
          <div class="field"><label>Email</label><input type="email" value="efua.boateng@alumni.ja.org"></div>
          <div class="field"><label>Password</label><input type="password" value="••••••••"></div>
          <a class="btn btn-primary btn-block" href="#/verify">Continue</a>
          <p class="tiny" style="text-align:center;margin-top:14px">New here? <a href="#/signup"><strong>Create an account</strong></a></p>
        </div>
      </div>`;
  },

  signup() {
    return `
      <div class="auth-panel screen-enter" style="margin:40px auto">
        <h1>Create your alumni account</h1>
        <p class="muted">We’ll verify your JA programme history.</p>
        <div class="field"><label>Full name</label><input value="Efua Boateng"></div>
        <div class="field"><label>Email</label><input type="email" placeholder="you@email.com"></div>
        <div class="field"><label>Country</label>
          <select><option>Ghana</option><option>Nigeria</option><option>Kenya</option><option>Côte d'Ivoire</option><option>Other</option></select>
        </div>
        <div class="field"><label>Cohort / programme year</label><input value="JA Company Programme · 2019"></div>
        <a class="btn btn-primary btn-block" href="#/verify">Send verification code</a>
      </div>`;
  },

  verify() {
    return `
      <div class="auth-panel screen-enter" style="margin:40px auto;text-align:center">
        <h1>Enter your code</h1>
        <p class="muted">We sent a 6-digit code to your email.</p>
        <div class="code-inputs">
          ${[4,8,2,1,9,0].map(n => `<input maxlength="1" value="${n}">`).join('')}
        </div>
        <a class="btn btn-primary btn-block" href="#/onboarding">Verify & continue</a>
        <p class="tiny" style="margin-top:14px">Resend in 0:42</p>
      </div>`;
  },

  onboarding() {
    return `
      <div class="auth-panel screen-enter" style="margin:24px auto;max-width:520px">
        <div class="steps"><span class="is-done"></span><span class="is-on"></span><span></span><span></span></div>
        <h1>What are you here for?</h1>
        <p class="muted">We’ll personalise jobs, mentors, and events.</p>
        <div class="choice-grid">
          ${['Find a job','Get mentored','Attend events','Become a mentor','Post jobs (employer)','Explore first'].map((c,i) =>
            `<button class="choice ${i < 2 ? 'is-on' : ''}" type="button">${c}</button>`).join('')}
        </div>
        <div class="field" style="margin-top:18px"><label>Your industry</label>
          <select><option>Technology</option><option>Finance</option><option>Marketing</option><option>Public sector</option></select>
        </div>
        <div class="field"><label>Top skills (comma separated)</label>
          <input value="Product, SQL, Stakeholder management">
        </div>
        <a class="btn btn-primary btn-block" href="#/home">Finish & open hub</a>
      </div>`;
  },

  home() {
    return `
      <div class="split screen-enter">
        <div>
          <section class="hero">
            <span class="eyebrow"><i></i> Good morning, Efua</span>
            <h1>Your Career Hub</h1>
            <p>3 new job matches · 1 mentor session tomorrow · Summit this month.</p>
            <div class="actions">
              <a class="btn btn-primary" href="#/careers">Browse jobs</a>
              <a class="btn btn-secondary" href="#/mentors">Find a mentor</a>
            </div>
          </section>
          <div class="stat-grid" style="margin-bottom:18px">
            <div class="stat"><div class="n">12</div><div class="l">Job matches</div></div>
            <div class="stat"><div class="n">3</div><div class="l">Applications</div></div>
            <div class="stat"><div class="n">1</div><div class="l">Sessions</div></div>
            <div class="stat"><div class="n">2</div><div class="l">RSVPs</div></div>
          </div>
          <div class="section-title"><h2>For you</h2><a href="#/careers">Job board</a></div>
          <div class="stack">${JACC.JOBS.slice(0, 3).map(j => `
            <a class="list-card" href="#/job">
              <div class="thumb" style="background:${j.img}">${j.company[0]}</div>
              <div class="meta">
                <h3>${esc(j.title)}</h3>
                <div class="tiny">${esc(j.company)} · ${esc(j.loc)}</div>
                <div class="row gap-sm" style="margin-top:6px">${j.tags.map(t => `<span class="pill">${esc(t)}</span>`).join('')}</div>
              </div>
              <div class="match-ring" style="--m:${j.match}"><span>${j.match}%</span></div>
            </a>`).join('')}
          </div>
          <div class="section-title" style="margin-top:22px"><h2>Success stories</h2><a href="#/stories">More</a></div>
          <div class="card" style="display:flex;gap:14px;align-items:center">
            <img src="assets/story.jpg" alt="" style="width:88px;height:88px;border-radius:var(--radius-md);object-fit:cover">
            <div>
              <strong>${esc(JACC.STORIES[0].name)}</strong>
              <p class="muted" style="margin:4px 0 0;font-size:14px">“${esc(JACC.STORIES[0].quote)}”</p>
            </div>
          </div>
        </div>
        <aside class="stack hide-mobile">
          <div class="card">
            <div class="row between" style="margin-bottom:12px">
              <strong>Your profile</strong>
              <a class="tiny" href="#/profile">Edit</a>
            </div>
            <div class="row" style="margin-bottom:12px">
              <div class="avatar" style="width:52px;height:52px;font-size:18px">E</div>
              <div>
                <strong>Efua Boateng</strong>
                <div class="tiny">Product · Accra · JA Ghana 2019</div>
              </div>
            </div>
            <div class="bar-track"><div class="bar-fill" style="width:72%"></div></div>
            <div class="tiny" style="margin-top:6px">Profile 72% complete · <a href="#/cv">Add CV</a></div>
          </div>
          <div class="card">
            <strong>Recent activity</strong>
            <ul style="margin-top:12px">${JACC.ACTIVITY.map(a => `
              <li style="padding:10px 0;border-bottom:1px solid var(--line)">
                <div style="font-size:14px">${esc(a.t)}</div>
                <div class="tiny">${esc(a.d)}</div>
              </li>`).join('')}
            </ul>
          </div>
          <div class="card">
            <strong>Upcoming</strong>
            <p style="margin:10px 0 0;font-size:14px"><strong>Thu 18:00</strong> — Mentor session with Ama Mensah</p>
            <a class="btn btn-sm btn-secondary" style="margin-top:12px" href="#/feedback">Session details</a>
          </div>
        </aside>
      </div>`;
  },

  profile() {
    return `
      <div class="screen-enter">
        <div class="card" style="padding:0;overflow:hidden;margin-bottom:16px">
          <div style="height:120px;background:linear-gradient(135deg,var(--primary),var(--accent))"></div>
          <div style="padding:0 20px 20px;margin-top:-36px">
            <div class="avatar" style="width:72px;height:72px;font-size:28px;border-width:4px">E</div>
            <div class="row between" style="margin-top:10px;flex-wrap:wrap">
              <div>
                <h1 style="margin:0;font-size:1.6rem">Efua Boateng</h1>
                <p class="muted" style="margin:4px 0">Product Analyst seeking growth roles · Accra, Ghana</p>
                <div class="row gap-sm">${['Product','SQL','Stakeholder mgmt','JA Ghana 2019'].map(t => `<span class="pill">${t}</span>`).join('')}</div>
              </div>
              <div class="row gap-sm">
                <a class="btn btn-secondary btn-sm" href="#/profile-edit">Edit</a>
                <a class="btn btn-primary btn-sm" href="#/privacy">Privacy</a>
              </div>
            </div>
          </div>
        </div>
        <div class="grid-2">
          <div class="card">
            <h3>About</h3>
            <p class="muted">JA alumnus building products that serve West African users. Open to analyst and associate PM roles.</p>
            <h3>Industry</h3>
            <p class="muted" style="margin:0">Technology · Financial services</p>
          </div>
          <div class="card">
            <div class="row between"><h3 style="margin:0">Activity</h3><a class="tiny" href="#/applications">Applications</a></div>
            <ul style="margin-top:10px">${JACC.ACTIVITY.map(a => `
              <li class="tiny" style="padding:8px 0;border-bottom:1px solid var(--line)">${esc(a.t)} · ${esc(a.d)}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>`;
  },

  'profile-edit'() {
    return `
      <div class="auth-panel screen-enter" style="margin:0 auto;max-width:560px">
        <h1>Edit profile</h1>
        <div class="field"><label>Headline</label><input value="Product Analyst seeking growth roles"></div>
        <div class="field"><label>Industry</label><select><option>Technology</option><option>Finance</option></select></div>
        <div class="field"><label>Skills</label><input value="Product, SQL, Stakeholder management, Excel"></div>
        <div class="field"><label>Cohort / role</label><input value="JA Company Programme · 2019 · Alumnus"></div>
        <div class="field"><label>Bio</label><textarea>JA alumnus building products that serve West African users.</textarea></div>
        <div class="row" style="gap:10px">
          <a class="btn btn-primary" href="#/profile">Save</a>
          <a class="btn btn-ghost" href="#/profile">Cancel</a>
        </div>
      </div>`;
  },

  cv() {
    return `
      <div class="auth-panel screen-enter" style="margin:0 auto;max-width:560px">
        <h1>Upload your CV</h1>
        <p class="muted">Reuse it when applying — employers only see it when you apply or share.</p>
        <div class="card" style="border-style:dashed;text-align:center;padding:40px;margin-bottom:16px;cursor:pointer" data-toast="CV selected: Efua_Boateng_CV.pdf">
          <div style="font-size:2rem;margin-bottom:8px">📄</div>
          <strong>Drop PDF or DOCX here</strong>
          <div class="tiny">Max 5 MB</div>
        </div>
        <div class="list-card" style="cursor:default">
          <div class="thumb">CV</div>
          <div class="meta">
            <h3>Efua_Boateng_CV.pdf</h3>
            <div class="tiny">Uploaded 5 days ago · 240 KB</div>
          </div>
          <button class="btn btn-sm btn-secondary" data-toast="Share link copied">Share</button>
        </div>
        <a class="btn btn-primary btn-block" style="margin-top:16px" href="#/apply">Use on next application</a>
      </div>`;
  },

  privacy() {
    return `
      <div class="auth-panel screen-enter" style="margin:0 auto;max-width:560px">
        <h1>Who can see your profile?</h1>
        <p class="muted">US-04 — privacy controls for alumni profiles.</p>
        ${[['Public','Anyone with the link','pill'],['Alumni only','Signed-in JA alumni','pill-accent'],['Only me','Hidden from search & directory','pill']].map((o,i) => `
          <button class="choice ${i === 1 ? 'is-on' : ''}" style="width:100%;margin-bottom:10px;display:flex;justify-content:space-between;align-items:center" type="button">
            <span><strong>${o[0]}</strong><br><span class="tiny">${o[1]}</span></span>
            <span class="pill ${o[2]}">${i === 1 ? 'Selected' : ' '}</span>
          </button>`).join('')}
        <label class="row" style="margin:16px 0;gap:10px">
          <input type="checkbox" checked> Allow employers to message me after I apply
        </label>
        <a class="btn btn-primary btn-block" href="#/profile" data-toast="Privacy saved">Save preferences</a>
      </div>`;
  },

  careers() {
    return `
      <div class="screen-enter">
        <div class="section-title"><h1 style="font-size:1.6rem;margin:0">Job board</h1>
          <a class="btn btn-sm btn-secondary" href="#/saved">Saved</a></div>
        <div class="searchbar">${icon('search')}<input placeholder="Search roles, companies, skills…" value="product analyst"></div>
        <div class="filters">
          ${['All','Full-time','Internship','Remote','Hybrid','Matched'].map((f,i) =>
            `<button class="filter-chip ${i === 5 || i === 0 ? 'is-active' : ''}" type="button">${f}</button>`).join('')}
        </div>
        <div class="stack">${JACC.JOBS.map(j => `
          <a class="list-card" href="#/job">
            <div class="thumb" style="background:${j.img}">${j.company[0]}</div>
            <div class="meta">
              <div class="row gap-sm"><h3 style="margin:0">${esc(j.title)}</h3><span class="pill">${esc(j.type)}</span></div>
              <div class="tiny">${esc(j.company)} · ${esc(j.loc)}</div>
              <div class="row gap-sm" style="margin-top:6px">${j.tags.map(t => `<span class="pill">${esc(t)}</span>`).join('')}</div>
            </div>
            <div class="match-ring" style="--m:${j.match}"><span>${j.match}%</span></div>
          </a>`).join('')}
        </div>
        <p class="tiny" style="margin-top:16px;text-align:center">US-07 · US-09 — keyword, location, type filters + skill match %</p>
      </div>`;
  },

  job() {
    const j = JACC.JOBS[0];
    return `
      <div class="screen-enter" style="max-width:720px;margin:0 auto">
        <div class="card" style="padding:0;overflow:hidden">
          <div style="height:160px;background:${j.img}"></div>
          <div style="padding:20px">
            <div class="row gap-sm" style="margin-bottom:8px">
              <span class="pill-match pill">${j.match}% match</span>
              <span class="pill">${esc(j.type)}</span>
            </div>
            <h1 style="margin:0 0 6px">${esc(j.title)}</h1>
            <p class="muted">${esc(j.company)} · ${esc(j.loc)}</p>
            <div class="row" style="gap:10px;flex-wrap:wrap;margin:16px 0">
              <a class="btn btn-primary" href="#/apply">Apply now</a>
              <button class="btn btn-secondary" data-toast="Job saved">Save</button>
              <a class="btn btn-ghost" href="#/careers">Back</a>
            </div>
            <h3>About the role</h3>
            <p class="muted">Join MTN’s consumer insights team to turn alumni-market data into product decisions. You’ll partner with PMs and share findings with leadership.</p>
            <h3>Requirements</h3>
            <ul class="muted">${['2+ years analytics or strong internship track','SQL & Excel','Stakeholder communication','JA alumni preferred'].map(x => `<li style="margin:6px 0 6px 1em;list-style:disc">${x}</li>`).join('')}</ul>
          </div>
        </div>
      </div>`;
  },

  apply() {
    return `
      <div class="auth-panel screen-enter" style="margin:0 auto;max-width:560px">
        <h1>Apply · Product Analyst</h1>
        <p class="muted">MTN Ghana · Your profile + CV will be attached.</p>
        <div class="field"><label>Cover letter</label>
          <textarea>Dear hiring team — As a JA Ghana alumnus with product analytics experience…</textarea>
        </div>
        <div class="field"><label>CV</label>
          <select><option>Efua_Boateng_CV.pdf (profile)</option><option>Upload new…</option></select>
        </div>
        <label class="row" style="margin-bottom:16px;gap:8px"><input type="checkbox" checked> Notify me by email about status changes</label>
        <button class="btn btn-primary btn-block" data-toast="Application submitted" data-nav="#/applications">Submit application</button>
        <p class="tiny" style="margin-top:12px">US-08 — no duplicate applications; cover letter required.</p>
      </div>`;
  },

  saved() {
    return `
      <div class="screen-enter">
        <div class="section-title"><h1 style="font-size:1.5rem;margin:0">Saved jobs</h1></div>
        <div class="stack">${JACC.JOBS.slice(0, 3).map(j => `
          <div class="list-card">
            <div class="thumb" style="background:${j.img}">${j.company[0]}</div>
            <div class="meta"><h3>${esc(j.title)}</h3><div class="tiny">${esc(j.company)}</div></div>
            <a class="btn btn-sm btn-primary" href="#/apply">Apply</a>
          </div>`).join('')}
        </div>
      </div>`;
  },

  applications() {
    return `
      <div class="screen-enter">
        <div class="section-title"><h1 style="font-size:1.5rem;margin:0">My applications</h1></div>
        <div class="stack">${JACC.APPLICATIONS.map(a => `
          <div class="list-card" style="cursor:default">
            <div class="thumb">AP</div>
            <div class="meta">
              <h3>${esc(a.job)}</h3>
              <div class="tiny">Applied ${esc(a.date)}</div>
            </div>
            ${statusPill(a.status)}
          </div>`).join('')}
        </div>
      </div>`;
  },

  employer() {
    return `
      <div class="screen-enter">
        <div class="hero">
          <span class="eyebrow"><i></i> Employer workspace</span>
          <h1>Hire JA talent</h1>
          <p>Post roles, review applicants, and update hiring status — partners stay inside Moodle.</p>
          <div class="actions">
            <a class="btn btn-primary" href="#/post-job">Post a job</a>
            <a class="btn btn-secondary" href="#/applicants">Review applicants</a>
          </div>
        </div>
        <div class="stat-grid" style="margin-bottom:18px">
          <div class="stat"><div class="n">4</div><div class="l">Open roles</div></div>
          <div class="stat"><div class="n">37</div><div class="l">Applicants</div></div>
          <div class="stat"><div class="n">6</div><div class="l">Shortlisted</div></div>
          <div class="stat"><div class="n">2</div><div class="l">Hired YTD</div></div>
        </div>
        <div class="card">
          <div class="row between"><strong>Your listings</strong><a href="#/post-job">New</a></div>
          <div class="table-wrap" style="margin-top:12px;border:0">
            <table>
              <thead><tr><th>Role</th><th>Status</th><th>Applicants</th><th></th></tr></thead>
              <tbody>
                <tr><td>Product Analyst</td><td>${statusPill('reviewing')}</td><td>14</td><td><a href="#/applicants">Review</a></td></tr>
                <tr><td>Marketing Intern</td><td><span class="pill-success pill">live</span></td><td>23</td><td><a href="#/applicants">Review</a></td></tr>
                <tr><td>Ops Coordinator</td><td><span class="pill">closed</span></td><td>9</td><td><a href="#/applicants">View</a></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>`;
  },

  'post-job'() {
    return `
      <div class="auth-panel screen-enter" style="margin:0 auto;max-width:640px">
        <h1>Post a job</h1>
        <p class="muted">US-10 — create listings with optional card image.</p>
        <div class="field"><label>Job title</label><input placeholder="e.g. Product Analyst"></div>
        <div class="grid-2">
          <div class="field"><label>Location</label><input placeholder="Accra · Hybrid"></div>
          <div class="field"><label>Type</label><select><option>Full-time</option><option>Internship</option><option>Contract</option></select></div>
        </div>
        <div class="field"><label>Description</label><textarea placeholder="Role overview, responsibilities…"></textarea></div>
        <div class="field"><label>Card image (optional)</label><input type="file"></div>
        <div class="row" style="gap:10px">
          <button class="btn btn-primary" data-toast="Job submitted for review" data-nav="#/moderation">Publish</button>
          <button class="btn btn-secondary" data-toast="Draft saved">Save draft</button>
        </div>
      </div>`;
  },

  applicants() {
    return `
      <div class="screen-enter">
        <div class="section-title"><h1 style="font-size:1.5rem;margin:0">Applicants · Product Analyst</h1></div>
        <p class="muted">US-11 — statuses: submitted → reviewing → shortlisted → not selected → hired.</p>
        <div class="stack">${JACC.APPLICANTS.map(a => `
          <div class="list-card" style="cursor:default">
            <div class="avatar">${a.name[0]}</div>
            <div class="meta">
              <h3>${esc(a.name)}</h3>
              <div class="tiny">${esc(a.skills)} · ${a.match}% match</div>
            </div>
            <select style="min-height:36px;border-radius:var(--radius-md);border:1px solid var(--line-strong);padding:0 8px;background:var(--surface)">
              ${['submitted','reviewing','shortlisted','not selected','hired'].map(s =>
                `<option ${s === a.status ? 'selected' : ''}>${s}</option>`).join('')}
            </select>
          </div>`).join('')}
        </div>
        <button class="btn btn-primary" style="margin-top:16px" data-toast="Applicants notified of status changes">Save & notify</button>
      </div>`;
  },

  moderation() {
    return `
      <div class="screen-enter">
        <div class="section-title"><h1 style="font-size:1.5rem;margin:0">Job moderation queue</h1></div>
        <p class="muted">US-13 — JA staff approve partner-posted jobs before they go live.</p>
        <div class="stack">
          ${[['Product Analyst · MTN','Partner post · awaiting review'],['UX Fellow · JA Africa','Staff post · auto-approved'],['Sales Associate · Jumia','Partner post · changes requested']].map(([t,s],i) => `
            <div class="card">
              <div class="row between" style="flex-wrap:wrap;gap:10px">
                <div><strong>${t}</strong><div class="tiny">${s}</div></div>
                <div class="row gap-sm">
                  ${i !== 1 ? `<button class="btn btn-sm btn-primary" data-toast="Job approved & live">Approve</button>
                  <button class="btn btn-sm btn-secondary" data-toast="Changes requested">Request edits</button>` : '<span class="pill-success pill">Live</span>'}
                </div>
              </div>
            </div>`).join('')}
        </div>
      </div>`;
  },

  mentors() {
    return `
      <div class="screen-enter">
        <div class="section-title"><h1 style="font-size:1.5rem;margin:0">Find a mentor</h1>
          <a class="btn btn-sm btn-accent" href="#/mentor-hub">Mentor hub</a></div>
        <div class="searchbar">${icon('search')}<input placeholder="Skills, industry, name…"></div>
        <div class="filters">
          ${['Best match','Technology','Finance','Entrepreneurship','Verified'].map((f,i) =>
            `<button class="filter-chip ${i === 0 ? 'is-active' : ''}" type="button">${f}</button>`).join('')}
        </div>
        <div class="grid-2">${JACC.MENTORS.map(m => `
          <a class="card" href="#/mentor" style="display:block">
            <div class="row" style="margin-bottom:10px">
              <div class="avatar">${m.name[0]}</div>
              <div style="flex:1">
                <div class="row gap-sm"><strong>${esc(m.name)}</strong>
                  ${m.verified ? '<span class="pill-success pill">Verified</span>' : ''}
                </div>
                <div class="tiny">${esc(m.role)}</div>
              </div>
              <div class="match-ring" style="--m:${m.match}"><span>${m.match}%</span></div>
            </div>
            <div class="row gap-sm">${m.tags.map(t => `<span class="pill">${esc(t)}</span>`).join('')}</div>
            <div class="tiny" style="margin-top:10px">Available: ${esc(m.avail)}</div>
          </a>`).join('')}
        </div>
      </div>`;
  },

  mentor() {
    const m = JACC.MENTORS[0];
    return `
      <div class="screen-enter" style="max-width:640px;margin:0 auto">
        <div class="card">
          <div class="row" style="margin-bottom:16px">
            <div class="avatar" style="width:64px;height:64px;font-size:24px">${m.name[0]}</div>
            <div>
              <div class="row gap-sm"><h1 style="margin:0;font-size:1.4rem">${esc(m.name)}</h1><span class="pill-success pill">Verified</span></div>
              <div class="muted">${esc(m.role)}</div>
              <div class="tiny">${m.match}% skills & industry fit</div>
            </div>
          </div>
          <p class="muted">I help early-career product people navigate West African tech — from first PM role to leading squads.</p>
          <div class="row gap-sm" style="margin-bottom:16px">${m.tags.map(t => `<span class="pill">${esc(t)}</span>`).join('')}</div>
          <div class="card" style="background:var(--sunken);box-shadow:none;margin-bottom:16px">
            <strong>Default meeting link</strong>
            <div class="tiny">meet.google.com/ama-mentor-ja</div>
          </div>
          <a class="btn btn-primary btn-block" href="#/book">Book a session</a>
        </div>
      </div>`;
  },

  book() {
    return `
      <div class="auth-panel screen-enter" style="margin:0 auto;max-width:520px">
        <h1>Book with Ama Mensah</h1>
        <div class="field"><label>Topic</label><input value="Breaking into product management"></div>
        <div class="field"><label>Preferred date</label><input type="date" value="2026-03-12"></div>
        <div class="field"><label>Time (WAT)</label><select><option>18:00 – 18:45</option><option>19:00 – 19:45</option></select></div>
        <div class="field"><label>Notes for mentor</label><textarea>I’d love feedback on my PM transition plan.</textarea></div>
        <button class="btn btn-primary btn-block" data-toast="Booking sent — mentor notified" data-nav="#/mentor-hub">Request session</button>
        <p class="tiny" style="margin-top:12px">US-16 · US-18 — mentor can accept, decline, or reschedule.</p>
      </div>`;
  },

  'mentor-hub'() {
    return `
      <div class="screen-enter">
        <div class="hero">
          <span class="eyebrow"><i></i> Mentor hub</span>
          <h1>Your mentoring desk</h1>
          <p>Availability, requests, and session feedback in one place.</p>
        </div>
        <div class="grid-2">
          <div class="card">
            <h3>Pending requests</h3>
            <div class="stack">
              <div class="list-card" style="cursor:default">
                <div class="avatar">E</div>
                <div class="meta"><h3>Efua Boateng</h3><div class="tiny">Thu 18:00 · Product careers</div></div>
                <div class="row gap-sm">
                  <button class="btn btn-sm btn-primary" data-toast="Session accepted">Accept</button>
                  <button class="btn btn-sm btn-ghost" data-toast="Decline sent">Decline</button>
                </div>
              </div>
            </div>
          </div>
          <div class="card">
            <h3>Weekly availability</h3>
            ${['Mon — —','Tue 12:00–13:00','Wed — —','Thu 18:00–20:00','Fri — —'].map(d => `
              <div class="row between" style="padding:8px 0;border-bottom:1px solid var(--line)"><span>${d.split(' — ')[0] || d.slice(0,3)}</span><span class="tiny">${d.includes('—') && !d.includes(':') ? 'Unavailable' : d.slice(4)}</span></div>`).join('')}
            <button class="btn btn-secondary btn-sm" style="margin-top:12px" data-toast="Availability editor (prototype)">Edit slots</button>
          </div>
        </div>
      </div>`;
  },

  feedback() {
    return `
      <div class="auth-panel screen-enter" style="margin:0 auto;max-width:520px">
        <h1>Session feedback</h1>
        <p class="muted">Ama Mensah · 45 min · Join link used</p>
        <div class="field"><label>Rating</label>
          <div class="row" style="font-size:1.8rem;gap:6px">
            ${[1,2,3,4,5].map(n => `<button type="button" data-toast="Rated ${n}/5" style="opacity:${n <= 4 ? 1 : .35}">★</button>`).join('')}
          </div>
        </div>
        <div class="field"><label>What went well?</label><textarea>Clear advice on positioning my analytics work as product impact.</textarea></div>
        <div class="field"><label>Anything to improve?</label><textarea></textarea></div>
        <button class="btn btn-primary btn-block" data-toast="Thanks — feedback recorded" data-nav="#/home">Submit</button>
      </div>`;
  },

  events() {
    return `
      <div class="screen-enter">
        <div class="section-title"><h1 style="font-size:1.5rem;margin:0">Events</h1>
          <a class="btn btn-sm btn-secondary" href="#/create-event">Create</a></div>
        <div class="filters">
          ${['All','Networking','Workshop','Community','Entrepreneurship'].map((f,i) =>
            `<button class="filter-chip ${i === 0 ? 'is-active' : ''}" type="button">${f}</button>`).join('')}
        </div>
        <div class="grid-2">${JACC.EVENTS.map(e => `
          <a class="media-card" href="#/event">
            <div class="media" style="aspect-ratio:2/1;background:linear-gradient(135deg,var(--primary),var(--accent));display:grid;place-items:end start;padding:12px">
              <span class="pill" style="background:rgba(255,255,255,.9);color:#22404D">${esc(e.cat)}</span>
            </div>
            <div class="body">
              <h3>${esc(e.title)}</h3>
              <div class="tiny">${esc(e.when)}</div>
              <div class="tiny">${esc(e.where)} · ${esc(e.spots)} seats</div>
              <div style="margin-top:10px">${e.rsvp ? '<span class="pill-success pill">You’re going</span>' : '<span class="pill">RSVP open</span>'}</div>
            </div>
          </a>`).join('')}
        </div>
      </div>`;
  },

  event() {
    const e = JACC.EVENTS[0];
    return `
      <div class="screen-enter" style="max-width:720px;margin:0 auto">
        <div class="card" style="padding:0;overflow:hidden">
          <div style="height:200px;background:url(assets/hero.jpg) center/cover"></div>
          <div style="padding:20px">
            <span class="pill-accent pill">${esc(e.cat)}</span>
            <h1 style="margin:10px 0 6px">${esc(e.title)}</h1>
            <p class="muted">${esc(e.when)} · ${esc(e.where)}</p>
            <p class="muted">Connect with alumni leaders, employers, and mentors across JA Africa. Capacity enforced — ${esc(e.spots)} reserved.</p>
            <div class="row" style="gap:10px;flex-wrap:wrap;margin:16px 0">
              <button class="btn btn-primary" data-toast="RSVP confirmed — calendar updated">RSVP</button>
              <button class="btn btn-secondary" data-toast="Join link: meet.ja.africa/summit">Join link</button>
              <button class="btn btn-ghost" data-toast="Added to Moodle calendar">Add to calendar</button>
            </div>
            <p class="tiny">US-20 · US-21 — RSVP, capacity, join link after RSVP, calendar sync.</p>
          </div>
        </div>
      </div>`;
  },

  'create-event'() {
    return `
      <div class="auth-panel screen-enter" style="margin:0 auto;max-width:640px">
        <h1>Create event</h1>
        <p class="muted">US-22 — coordinators add image, capacity, and meeting link.</p>
        <div class="field"><label>Title</label><input placeholder="Event name"></div>
        <div class="grid-2">
          <div class="field"><label>Category</label><select><option>Networking</option><option>Workshop</option><option>Community</option></select></div>
          <div class="field"><label>Capacity</label><input type="number" value="80"></div>
        </div>
        <div class="grid-2">
          <div class="field"><label>Starts</label><input type="datetime-local"></div>
          <div class="field"><label>Meeting link</label><input placeholder="https://"></div>
        </div>
        <div class="field"><label>Cover image</label><input type="file"></div>
        <button class="btn btn-primary" data-toast="Event published" data-nav="#/events">Publish event</button>
      </div>`;
  },

  attendance() {
    return `
      <div class="screen-enter">
        <div class="section-title"><h1 style="font-size:1.5rem;margin:0">Attendance · CV Clinic</h1></div>
        <p class="muted">US-23 — mark attended / no-show for reporting.</p>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Attendee</th><th>RSVP</th><th>Status</th></tr></thead>
            <tbody>
              ${[['Efua Boateng','Yes'],['Kwame Osei','Yes'],['Aisha Bello','Yes'],['Pierre N\'Guessan','Waitlist']].map((r,i) => `
                <tr>
                  <td>${r[0]}</td>
                  <td>${r[1]}</td>
                  <td><select style="min-height:32px;border-radius:8px;border:1px solid var(--line);background:var(--surface)">
                    <option ${i < 2 ? 'selected' : ''}>Attended</option>
                    <option ${i === 2 ? 'selected' : ''}>No-show</option>
                    <option>Registered</option>
                  </select></td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
        <button class="btn btn-primary" style="margin-top:14px" data-toast="Attendance saved">Save attendance</button>
      </div>`;
  },

  stories() {
    return `
      <div class="screen-enter">
        <div class="hero">
          <span class="eyebrow"><i></i> Community</span>
          <h1>Alumni success stories</h1>
          <p>Inspiration managed by hub admins — featured on every dashboard.</p>
        </div>
        <div class="grid-3">${JACC.STORIES.map(s => `
          <div class="card">
            <img src="assets/story.jpg" alt="" style="width:100%;height:160px;object-fit:cover;border-radius:var(--radius-md);margin-bottom:12px">
            <strong>${esc(s.name)}</strong>
            <div class="tiny">${esc(s.role)} · ${esc(s.cohort)}</div>
            <p style="margin:10px 0 0;font-style:italic">“${esc(s.quote)}”</p>
          </div>`).join('')}
        </div>
      </div>`;
  },

  messages() {
    return `
      <div class="msg-layout screen-enter">
        <div class="card msg-list" style="padding:8px">
          ${JACC.MESSAGES.map((m,i) => `
            <div class="item ${i === 0 ? 'is-active' : ''}">
              <div class="avatar">${m.name[0]}</div>
              <div style="flex:1;min-width:0">
                <div class="row between"><strong style="font-size:14px">${esc(m.name)}</strong><span class="tiny">${esc(m.time)}</span></div>
                <div class="tiny" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(m.preview)}</div>
              </div>
              ${m.unread ? `<span class="pill-danger pill">${m.unread}</span>` : ''}
            </div>`).join('')}
        </div>
        <div class="msg-thread">
          <div class="row" style="margin-bottom:8px"><div class="avatar">A</div><strong>Ama Mensah</strong></div>
          <div class="bubble them">Hi Efua — Thursday 18:00 still good for you?</div>
          <div class="bubble me">Yes! I’ve prepped questions on PM interviews.</div>
          <div class="bubble them">Looking forward to our Thursday session!</div>
          <div style="margin-top:auto;display:flex;gap:8px">
            <input style="flex:1;min-height:44px;border-radius:var(--radius-pill);border:1px solid var(--line-strong);padding:0 16px;background:var(--sunken)" placeholder="Write a message…">
            <button class="btn btn-primary btn-sm" data-toast="Message sent">Send</button>
          </div>
        </div>
      </div>`;
  },

  admin() {
    return `
      <div class="screen-enter">
        <div class="section-title"><h1 style="font-size:1.5rem;margin:0">Content admin</h1>
          <a class="btn btn-sm btn-secondary" href="#/analytics">Analytics</a></div>
        <p class="muted">US-28 — manage jobs, events, and stories in one place.</p>
        <div class="grid-3">
          ${[['Jobs','12 live · 2 in moderation','#/moderation'],['Events','8 upcoming','#/create-event'],['Stories','3 featured','#/stories']].map(([t,s,h]) => `
            <a class="card" href="${h}"><h3>${t}</h3><p class="muted" style="margin:0">${s}</p><span class="tiny">Manage →</span></a>`).join('')}
        </div>
        <div class="card" style="margin-top:16px">
          <strong>Quick actions</strong>
          <div class="row" style="flex-wrap:wrap;gap:8px;margin-top:12px">
            <a class="btn btn-sm btn-primary" href="#/post-job">New job</a>
            <a class="btn btn-sm btn-secondary" href="#/create-event">New event</a>
            <button class="btn btn-sm btn-ghost" data-toast="Story editor (prototype)">New story</button>
            <a class="btn btn-sm btn-ghost" href="#/moderation">Moderation queue</a>
          </div>
        </div>
      </div>`;
  },

  analytics() {
    return `
      <div class="screen-enter">
        <div class="section-title"><h1 style="font-size:1.5rem;margin:0">Engagement & impact</h1>
          <button class="btn btn-sm btn-primary" data-toast="applications_export.csv downloaded">Export CSV</button></div>
        <p class="muted">US-29 · US-30 — KPI snapshot; disaggregated views proposed for later.</p>
        <div class="stat-grid" style="margin-bottom:18px">
          ${JACC.KPIS.map(k => `<div class="stat"><div class="n">${k.n}</div><div class="l">${k.l}</div></div>`).join('')}
        </div>
        <div class="grid-2">
          <div class="card">
            <h3>Applications by country</h3>
            ${[['Ghana',72],['Nigeria',58],['Kenya',41],['Côte d\'Ivoire',28]].map(([c,v]) => `
              <div style="margin:12px 0">
                <div class="row between"><span>${c}</span><span class="tiny">${v}%</span></div>
                <div class="bar-track"><div class="bar-fill" style="width:${v}%"></div></div>
              </div>`).join('')}
          </div>
          <div class="card">
            <h3>Filters (M&E)</h3>
            <div class="field"><label>Country</label><select><option>All</option><option>Ghana</option><option>Nigeria</option></select></div>
            <div class="field"><label>Cohort year</label><select><option>All</option><option>2019–2021</option><option>2022–2024</option></select></div>
            <div class="field"><label>Gender</label><select><option>All</option><option>Women</option><option>Men</option><option>Prefer not to say</option></select></div>
            <button class="btn btn-secondary btn-block" data-toast="Filters applied (prototype)">Apply filters</button>
          </div>
        </div>
      </div>`;
  },

  settings() {
    return `
      <div class="auth-panel screen-enter" style="margin:0 auto;max-width:560px">
        <h1>Settings</h1>
        <div class="stack">
          <a class="list-card" href="#/notifications"><div class="thumb">🔔</div><div class="meta"><h3>Notifications</h3><div class="tiny">Jobs, mentors, events</div></div></a>
          <a class="list-card" href="#/privacy"><div class="thumb">🔒</div><div class="meta"><h3>Privacy</h3><div class="tiny">Profile visibility</div></div></a>
          <a class="list-card" href="#/profile-edit"><div class="thumb">👤</div><div class="meta"><h3>Account</h3><div class="tiny">Name, email, language</div></div></a>
          <div class="list-card" style="cursor:default"><div class="thumb">🌐</div><div class="meta"><h3>Language</h3><div class="tiny">English · Français (starter)</div></div>
            <select style="min-height:36px;border-radius:8px;border:1px solid var(--line);background:var(--surface)"><option>English</option><option>Français</option></select>
          </div>
        </div>
      </div>`;
  },

  notifications() {
    return `
      <div class="auth-panel screen-enter" style="margin:0 auto;max-width:560px">
        <h1>Notification preferences</h1>
        <p class="muted">US-12 · US-24 — job digests and event reminders.</p>
        ${[['New jobs matching my skills','Weekly digest'],['Application status changes','Immediate'],['Mentor booking updates','Immediate'],['Event reminder (24h before)','On'],['Marketing from JA Africa','Off']].map(([t,s],i) => `
          <label class="row between" style="padding:14px 0;border-bottom:1px solid var(--line)">
            <span><strong>${t}</strong><div class="tiny">${s}</div></span>
            <input type="checkbox" ${i < 4 ? 'checked' : ''}>
          </label>`).join('')}
        <button class="btn btn-primary btn-block" style="margin-top:18px" data-toast="Preferences saved" data-nav="#/settings">Save</button>
      </div>`;
  },
};

JACC.icon = icon;
