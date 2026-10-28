/* Screen templates for JACC design prototype */
window.JACC = window.JACC || {};

/** Shared escape helper — classic scripts share one lexical scope for const/let */
JACC.esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[c]));

const esc = JACC.esc;
const t = (key, vars) => JACC.t(key, vars);

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
  return `<svg class="ui-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.home}</svg>`;
};

const statusPill = (status) => {
  const map = {
    submitted: 'pill', reviewing: 'pill-accent', shortlisted: 'pill-success',
    hired: 'pill-success', 'not selected': 'pill-danger',
  };
  return `<span class="pill ${map[status] || 'pill'}">${esc(t(`status.${status}`))}</span>`;
};

JACC.Screens = {
  landing() {
    return `
      <section class="hero screen-enter" style="min-height:min(70vh,560px);display:flex;flex-direction:column;justify-content:flex-end;">
        <span class="eyebrow"><i></i> ${t('landing.eyebrow')}</span>
        <h1>${t('landing.h1')}</h1>
        <p>${t('landing.p')}</p>
        <div class="actions">
          <a class="btn btn-primary" href="#/signup">${t('landing.join')}</a>
          <a class="btn btn-secondary" href="#/login">${t('landing.signIn')}</a>
          <a class="btn btn-ghost" href="#/home" style="color:inherit">${t('landing.preview')}</a>
        </div>
      </section>
      <div class="stat-grid screen-enter" style="margin-bottom:24px">
        <div class="stat"><div class="n">160k+</div><div class="l">${t('landing.statAlumni')}</div></div>
        <div class="stat"><div class="n">2.1k</div><div class="l">${t('landing.statRoles')}</div></div>
        <div class="stat"><div class="n">420</div><div class="l">${t('landing.statOpen')}</div></div>
        <div class="stat"><div class="n">120</div><div class="l">${t('landing.statEvents')}</div></div>
      </div>
      <div class="section-title"><h2>${t('landing.what')}</h2></div>
      <div class="grid-3">
        ${[[t('landing.careers'),t('landing.careersD')],[t('landing.cv'),t('landing.cvD')],[t('landing.events'),t('landing.eventsD')]].map(([title,d]) => `
          <div class="card"><h3>${title}</h3><p class="muted" style="margin:0">${d}</p></div>`).join('')}
      </div>
      <div class="section-title" style="margin-top:28px"><h2>${t('landing.stories')}</h2><a href="#/stories">${t('landing.seeAll')}</a></div>
      <div class="grid-3">${JACC.STORIES.map(s => `
        <div class="card">
          <div class="row gap-sm" style="margin-bottom:10px">
            ${JACC.avatar(s)}
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
          <span class="eyebrow"><i></i> ${t('auth.welcome')}</span>
          <h1>${t('auth.h1')}</h1>
          <p>${t('auth.p')}</p>
        </div>
        <div class="auth-panel">
          <h1>${t('auth.signIn')}</h1>
          <p class="muted">${t('auth.moodle')}</p>
          <div class="field"><label>${t('auth.email')}</label><input type="email" value="efua.boateng@alumni.ja.org"></div>
          <div class="field"><label>${t('auth.password')}</label><input type="password" value="••••••••"></div>
          <a class="btn btn-primary btn-block" href="#/verify">${t('auth.continue')}</a>
          <p class="tiny" style="text-align:center;margin-top:14px">${t('auth.new')} <a href="#/signup"><strong>${t('auth.create')}</strong></a></p>
        </div>
      </div>`;
  },

  signup() {
    return `
      <div class="auth-panel screen-enter" style="margin:40px auto">
        <h1>${t('auth.signupH1')}</h1>
        <p class="muted">${t('auth.signupP')}</p>
        <div class="field"><label>${t('auth.fullName')}</label><input value="Efua Boateng"></div>
        <div class="field"><label>Email</label><input type="email" placeholder="you@email.com"></div>
        <div class="field"><label>${t('auth.country')}</label>
          <select><option>Ghana</option><option>Nigeria</option><option>Kenya</option><option>Côte d'Ivoire</option><option>Other</option></select>
        </div>
        <div class="field"><label>${t('auth.cohort')}</label><input value="JA Company Programme · 2019"></div>
        <a class="btn btn-primary btn-block" href="#/verify">${t('auth.sendCode')}</a>
      </div>`;
  },

  verify() {
    return `
      <div class="auth-panel screen-enter" style="margin:40px auto;text-align:center">
        <h1>${t('auth.verifyH1')}</h1>
        <p class="muted">${t('auth.verifyP')}</p>
        <div class="code-inputs">
          ${[4,8,2,1,9,0].map(n => `<input maxlength="1" value="${n}">`).join('')}
        </div>
        <a class="btn btn-primary btn-block" href="#/onboarding">${t('auth.verifyBtn')}</a>
        <p class="tiny" style="margin-top:14px">${t('auth.resend')}</p>
      </div>`;
  },

  onboarding() {
    return `
      <div class="auth-panel screen-enter" style="margin:24px auto;max-width:520px">
        <div class="steps"><span class="is-done"></span><span class="is-on"></span><span></span><span></span></div>
        <h1>${t('auth.onboardH1')}</h1>
        <p class="muted">${t('auth.onboardP')}</p>
        <div class="choice-grid">
          ${[t('auth.goalJob'),t('auth.goalCv'),t('auth.goalEvents'),t('auth.goalEmployer'),t('auth.goalStory'),t('auth.goalExplore')].map((c,i) =>
            `<button class="choice ${i < 2 ? 'is-on' : ''}" type="button">${c}</button>`).join('')}
        </div>
        <div class="field" style="margin-top:18px"><label>Your industry</label>
          <select><option>Technology</option><option>Finance</option><option>Marketing</option><option>Public sector</option></select>
        </div>
        <div class="field"><label>Top skills (comma separated)</label>
          <input value="Product, SQL, Stakeholder management">
        </div>
        <a class="btn btn-primary btn-block" href="#/home">${t('auth.finish')}</a>
      </div>`;
  },

  home() {
    const jobCard = (j) => `
      <a class="list-card" href="#/job">
        ${JACC.jobThumb(j)}
        <div class="meta">
          <h3>${esc(j.title)}</h3>
          <div class="tiny">${esc(j.company)} · ${esc(j.loc)}</div>
          <div class="row gap-sm" style="margin-top:6px">${j.tags.map((tag) => `<span class="pill">${esc(tag)}</span>`).join('')}</div>
        </div>
        <div class="match-ring" style="--m:${j.match}"><span>${j.match}%</span></div>
      </a>`;
    const jobs = JACC.JOBS.slice(0, 3).map(jobCard).join('');
    const jobsWide = JACC.JOBS.slice(0, 6).map(jobCard).join('');
    const top = JACC.JOBS[0];

    return `
      <div class="baobab-home screen-enter">
        <section class="horizon-hero">
          <div class="horizon-hero-inner">
            <span class="eyebrow"><i></i> Career Hub</span>
            <h1>${t('home.hey', { name: 'Efua' })}</h1>
            <p>${t('home.sub')}</p>
            <div class="actions">
              <a class="btn btn-primary" href="#/careers">${t('common.jobBoard')}</a>
              <a class="btn btn-secondary" href="#/events">${t('common.events')}</a>
              <a class="btn btn-ghost" href="#/spaces" style="color:inherit">${t('common.spaces')}</a>
            </div>
          </div>
          <div class="horizon-hero-stats">
            <div><strong>12</strong><span>${t('home.jobMatches')}</span></div>
            <div><strong>3</strong><span>${t('home.apps')}</span></div>
            <div><strong>82</strong><span>${t('home.cvHealth')}</span></div>
            <div><strong>2</strong><span>${t('home.rsvps')}</span></div>
          </div>
        </section>

        <a class="horizon-featured" href="#/job">
          <div class="horizon-featured-media" style="background-image:url('${top.cover}')"></div>
          <div class="horizon-featured-body">
            <span class="pill-match pill">${top.match}% ${t('common.match')}</span>
            <h2>${esc(top.title)}</h2>
            <p>${esc(top.company)} · ${esc(top.loc)} · ${esc(top.type)} · ${top.paid ? t('careers.paid') : t('careers.unpaid')}</p>
            <div class="row gap-sm">${top.tags.map((tag) => `<span class="pill">${esc(tag)}</span>`).join('')}</div>
            <span class="btn btn-sm btn-primary" style="margin-top:14px;pointer-events:none">${t('common.apply')}</span>
          </div>
        </a>

        <aside class="home-rail hide-mobile">
          <div class="t-eyebrow">${t('common.spaces')}</div>
          ${(JACC.SPACES || []).map((s, i) => `
            <a class="rail-item ${i === 0 ? 'is-on' : ''}" href="#/space">
              <span class="avatar sq">${esc(s.name.split(' ').map((w) => w[0]).join('').slice(0, 2))}</span>
              ${esc(s.name)}
              ${s.unread ? `<span class="count">${s.unread}</span>` : ''}
            </a>`).join('')}
          <a class="rail-item" href="#/space-new"><span class="avatar sq">+</span> ${t('common.newSpace')}</a>
          <div class="t-eyebrow">${t('common.quick')}</div>
          <a class="rail-item" href="#/careers"><span class="qa t1">💼</span> ${t('common.jobs')} <span class="count">12</span></a>
          <a class="rail-item" href="#/events"><span class="qa t3">📅</span> ${t('common.events')} <span class="count">2</span></a>
          <a class="rail-item" href="#/cv-start"><span class="qa t4">✨</span> ${t('common.cvStudio')}</a>
          <a class="rail-item" href="#/applications"><span class="qa t2">📋</span> ${t('common.applications')}</a>
          <a class="rail-item" href="#/profile"><span class="qa t1">👤</span> ${t('common.profile')}</a>
        </aside>
        <div class="home-feed">
          <div class="home-phone-top">
            <div class="accent-slash" aria-hidden="true"></div>
            <h1 class="t-greet">${t('home.hey', { name: 'Efua' })}</h1>
            <p class="muted" style="margin:0">${t('home.sub')}</p>
          </div>

          <div class="live-ticker" aria-hidden="true">
            <div class="live-ticker-track">
              <span>💼 MTN role 94% match</span>
              <span>🎫 Summit ticket ready</span>
              <span>✨ CV health climbed to 82</span>
              <span>🟢 Shortlisted at MTN</span>
              <span>💼 MTN role 94% match</span>
              <span>🎫 Summit ticket ready</span>
              <span>✨ CV health climbed to 82</span>
              <span>🟢 Shortlisted at MTN</span>
            </div>
          </div>

          <div class="bento">
            <a class="bento-tile t1" href="#/careers"><span class="n">12</span><span class="l">${t('home.jobMatches')}</span></a>
            <a class="bento-tile t2" href="#/applications"><span class="n">3</span><span class="l">${t('home.apps')}</span></a>
            <a class="bento-tile t3" href="#/cv-health"><span class="n">82</span><span class="l">${t('home.cvHealth')}</span></a>
            <a class="bento-tile t4" href="#/events"><span class="n">2</span><span class="l">${t('home.rsvps')}</span></a>
          </div>

          <div class="pull-quote">“The job board matched me to Hubtel — I landed my first product role.” — ${esc(JACC.STORIES[0].name)}</div>

          <div class="spark-energy">
            <div class="spark-chip-row">
              <span class="spark-chip"><span class="spark-dot"></span> 12 fresh matches</span>
              <span class="spark-chip"><span class="spark-dot"></span> Summit this month</span>
              <span class="spark-chip"><span class="spark-dot"></span> CV health 82</span>
              <span class="spark-chip"><span class="spark-dot"></span> 3 spaces buzzing</span>
            </div>
          </div>

          <div class="card composer">
            <div class="row">${JACC.avatar(JACC.ME)}
              <input class="composer-input" placeholder="Share an update with your cohort…" readonly>
            </div>
            <div class="row between" style="margin-top:10px">
              <span class="pill">My cohort</span>
              <button class="btn btn-sm btn-primary" data-toast="Composer (prototype)">Post</button>
            </div>
          </div>

          <div class="section-title"><h2>${t('common.forYou')}</h2><a href="#/careers">${t('common.jobBoard')}</a></div>
          <div class="h-scroll">${jobsWide}</div>
          <div class="stack horizon-hide-when-scroll">${jobs}</div>

          <div class="section-title" style="margin-top:22px"><h2>${t('common.cohortWins')}</h2></div>
          <div class="card">
            <div class="row">${JACC.avatar("Kwame Osei")}<div><strong>Kwame landed Andela</strong><div class="tiny">Yesterday · JA Ghana 2019</div></div></div>
            <button class="btn btn-sm btn-secondary" style="margin-top:10px" data-toast="Moodle">${t('common.congratulate')}</button>
          </div>
          <div class="section-title" style="margin-top:22px"><h2>${t('common.successStories')}</h2><a href="#/stories">${t('common.more')}</a></div>
          <div class="card" style="display:flex;gap:14px;align-items:center">
            <img src="assets/story.jpg" alt="" style="width:88px;height:88px;border-radius:var(--radius-md);object-fit:cover">
            <div>
              <strong>${esc(JACC.STORIES[0].name)}</strong>
              <p class="muted" style="margin:4px 0 0;font-size:14px">“${esc(JACC.STORIES[0].quote)}”</p>
            </div>
          </div>
        </div>
        <aside class="home-side hide-mobile stack">
          <div class="card">
            <div class="row between" style="margin-bottom:12px"><strong>${t('common.profileStrength')}</strong><a class="tiny" href="#/profile">Edit</a></div>
            <div class="row" style="margin-bottom:12px">
              ${JACC.avatar(JACC.ME, "lg")}
              <div><strong>Efua Boateng</strong><div class="tiny">Product · JA Ghana 2019 cohort</div></div>
            </div>
            <div class="bar-track"><div class="bar-fill" style="width:72%"></div></div>
            <div class="tiny" style="margin-top:6px">72% · <a href="#/cv-start">AI-parse a CV</a></div>
          </div>
          <div class="card">
            <strong>${t('common.upcoming')}</strong>
            <p style="margin:10px 0 0;font-size:14px"><strong>Sat 14 Mar</strong> — Regional Alumni Summit</p>
            <a class="btn btn-sm btn-secondary" style="margin-top:12px" href="#/ticket">Ticket</a>
          </div>
          <div class="card">
            <strong>${t('common.activity')}</strong>
            <ul style="margin-top:10px">${JACC.ACTIVITY.map((a) => `
              <li style="padding:8px 0;border-bottom:1px solid var(--line);font-size:13px">${esc(a.t)}<div class="tiny">${esc(a.d)}</div></li>`).join('')}
            </ul>
          </div>
        </aside>
      </div>`;
  },

  profile() {
    const otw = JACC.OPEN_TO_WORK || { on: false };
    const exp = JACC.EXPERIENCE || [];
    return `
      <div class="screen-enter">
        <div class="card" style="padding:0;overflow:hidden;margin-bottom:16px">
          <div style="height:120px;background:linear-gradient(135deg,var(--primary),var(--accent))"></div>
          <div style="padding:0 20px 20px;margin-top:-36px">
            ${JACC.avatar(JACC.ME, "xl")}
            <div class="row between" style="margin-top:10px;flex-wrap:wrap">
              <div>
                <h1 style="margin:0;font-size:1.6rem">Efua Boateng</h1>
                <p class="muted" style="margin:4px 0">Product Analyst seeking growth roles · Accra, Ghana</p>
                <div class="row gap-sm">${['Product','SQL','Stakeholder mgmt','JA Ghana 2019'].map((x) => `<span class="pill">${x}</span>`).join('')}
                  ${otw.on ? '<span class="pill-success pill">Open to work</span>' : ''}
                </div>
              </div>
              <div class="row gap-sm">
                <a class="btn btn-secondary btn-sm" href="#/profile-edit">Edit</a>
                <a class="btn btn-primary btn-sm" href="#/privacy">Privacy</a>
              </div>
            </div>
          </div>
        </div>
        <div class="card" style="margin-bottom:16px">
          <div class="row between" style="flex-wrap:wrap;gap:10px">
            <div>
              <strong>Open to work</strong>
              <div class="tiny">${otw.on
                ? `Visible to employers · ${esc(otw.roles)} · ${esc(otw.places)}`
                : 'Turned off — employers will not see availability'}</div>
              ${otw.on && otw.types ? `<div class="row gap-sm" style="margin-top:8px">${otw.types.map((x) => `<span class="pill">${esc(x)}</span>`).join('')}</div>` : ''}
            </div>
            <a class="btn btn-sm btn-secondary" href="#/open-to-work">${otw.on ? 'Edit availability' : 'Declare availability'}</a>
          </div>
        </div>
        <div class="card" style="margin-bottom:16px">
          <div class="row between" style="margin-bottom:12px">
            <strong>Work history</strong>
            <a class="btn btn-sm btn-ghost" href="#/work-history">Add role</a>
          </div>
          <div class="stack">${exp.map((e) => `
            <div class="list-card" style="cursor:default">
              <div class="thumb img"><img src="assets/logos/mtn.jpg" alt=""></div>
              <div class="meta">
                <h3>${esc(e.title)}</h3>
                <div class="tiny">${esc(e.company)} · ${esc(e.place)}</div>
                <div class="tiny">${esc(e.from)} – ${esc(e.to)}${e.current ? ' · Current' : ''}</div>
              </div>
              <a class="btn btn-sm btn-ghost" href="#/work-history">Edit</a>
            </div>`).join('') || '<p class="muted">No roles yet — add your work history.</p>'}
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
            <ul style="margin-top:10px">${JACC.ACTIVITY.map((a) => `
              <li class="tiny" style="padding:8px 0;border-bottom:1px solid var(--line)">${esc(a.t)} · ${esc(a.d)}</li>`).join('')}
            </ul>
          </div>
          <a class="card" href="#/pathway" style="display:block">
            <h3>Career pathway</h3>
            <p class="muted" style="margin:0">Your hub timeline — skills, jobs, CVs, and events.</p>
            <span class="tiny">Open pathway →</span>
          </a>
          <a class="card" href="#/endorsements" style="display:block">
            <h3>Skill endorsements</h3>
            <p class="muted" style="margin:0">Peers endorsed Product sense, SQL, and more.</p>
            <span class="tiny">View endorsements →</span>
          </a>
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
    return JACC.Screens['cv-start']();
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
    const filters = [
      { key: 'all', label: t('careers.all') },
      ...JACC.JOB_TYPES.map((type) => ({ key: type, label: type })),
      { key: 'paid', label: t('careers.paid') },
      { key: 'unpaid', label: t('careers.unpaid') },
      { key: 'matched', label: t('careers.matched') },
    ];
    const jobRow = (j) => `
      <a class="list-card job-teaser" href="#/job" data-job-id="${j.id}"
        data-type="${esc(j.type)}" data-paid="${j.paid ? '1' : '0'}" data-match="${j.match || 0}"
        data-search="${esc([j.title, j.company, j.loc, j.type, j.salary, ...(j.tags || [])].join(' ').toLowerCase())}">
        <div class="job-teaser-media" style="background-image:url('${j.cover || j.logo}')">
          <div class="match-ring" style="--m:${j.match}"><span>${j.match}%</span></div>
        </div>
        ${JACC.jobThumb(j)}
        <div class="meta">
          <div class="row gap-sm"><h3 style="margin:0">${esc(j.title)}</h3></div>
          <div class="row gap-sm" style="margin-top:6px">
            <span class="pill">${esc(j.type)}</span>
            <span class="pill ${j.paid ? 'pill-success' : 'pill-danger'}">${j.paid ? t('careers.paid') : t('careers.unpaid')}</span>
          </div>
          <div class="tiny" style="margin-top:8px">${esc(j.company)} · ${esc(j.loc)}${j.salary ? ` · ${esc(j.salary)}` : ''}</div>
          <div class="row gap-sm" style="margin-top:8px">${j.tags.map((tag) => `<span class="pill">${esc(tag)}</span>`).join('')}</div>
        </div>
      </a>`;
    return `
      <div class="screen-enter horizon-shell horizon-board" data-careers-board>
        <div class="careers-toolbar">
          <div class="section-title"><h1 style="font-size:1.6rem;margin:0">${t('careers.h1')}</h1>
            <div class="row gap-sm">
              <a class="btn btn-sm btn-ghost" href="#/applications">${t('common.applications')}</a>
              <a class="btn btn-sm btn-ghost" href="#/saved-searches">${t('common.savedSearches')}</a>
              <a class="btn btn-sm btn-secondary" href="#/saved">${t('common.saved')}</a>
            </div></div>
          <div class="searchbar">${icon('search')}
            <input type="search" id="careers-search" placeholder="${t('careers.searchPh')}" value="" autocomplete="off" aria-label="${t('careers.searchPh')}">
          </div>
          <p class="tiny" style="margin:0 0 8px">Select one or more filters · combine with search</p>
          <div class="filters" role="group" aria-label="Job filters">
            ${filters.map((f, i) =>
              `<button class="filter-chip ${i === 0 ? 'is-active' : ''}" type="button" data-careers-filter="${esc(f.key)}" aria-pressed="${i === 0 ? 'true' : 'false'}">${esc(f.label)}</button>`).join('')}
          </div>
          <div class="card" style="margin-bottom:14px">
            <div class="row between" style="flex-wrap:wrap;gap:10px">
              <div>
                <strong>${t('common.digestTitle')}</strong>
                <div class="tiny">${t('common.digestHint')}</div>
              </div>
              <a class="btn btn-sm btn-secondary" href="#/digest">${t('common.digestPreview')}</a>
            </div>
          </div>
          <p class="tiny" id="careers-count" style="margin:0 0 10px">${JACC.JOBS.length} roles</p>
        </div>
        <div class="stack careers-grid" id="careers-results">${JACC.JOBS.map(jobRow).join('')}</div>
        <div class="card" id="careers-empty" hidden style="text-align:center;padding:28px">
          <strong>No roles match</strong>
          <p class="muted" style="margin:8px 0 0">Try another keyword or clear filters.</p>
          <button type="button" class="btn btn-sm btn-secondary" style="margin-top:12px" data-careers-reset>Clear search & filters</button>
        </div>
      </div>`;
  },

  job() {
    const j = JACC.JOBS[0];
    return `
      <div class="screen-enter detail-page">
        <div class="card detail-card" style="padding:0;overflow:hidden">
          ${JACC.coverBand(j.cover, 160)}
          <div style="padding:20px">
            <div class="row gap-sm" style="margin-bottom:8px">
              <span class="pill-match pill">${j.match}% ${t('common.match')}</span>
              <span class="pill">${esc(j.type)}</span>
              <span class="pill ${j.paid ? 'pill-success' : 'pill-danger'}">${j.paid ? t('careers.paid') : t('careers.unpaid')}</span>
            </div>
            <h1 style="margin:0 0 6px">${esc(j.title)}</h1>
            <p class="muted">${esc(j.company)} · ${esc(j.loc)}${j.salary ? ` · ${esc(j.salary)}` : ''}</p>
            <div class="row" style="gap:10px;flex-wrap:wrap;margin:16px 0">
              <a class="btn btn-primary" href="#/apply">${t('common.apply')}</a>
              <a class="btn btn-secondary" href="#/match-explain">${t('common.whyMatch', { n: j.match })}</a>
              <button class="btn btn-ghost" data-toast="${t('common.saved')}">${t('common.save')}</button>
            </div>
            <h3>${t('careers.about')}</h3>
            <p class="muted">Join MTN’s consumer insights team to turn alumni-market data into product decisions. You’ll partner with PMs and share findings with leadership.</p>
            <h3>${t('careers.requirements')}</h3>
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
      <div class="screen-enter horizon-shell horizon-board">
        <div class="section-title"><h1>Saved jobs</h1></div>
        <div class="stack">${JACC.JOBS.slice(0, 3).map(j => `
          <div class="list-card">
            ${JACC.jobThumb(j)}
            <div class="meta"><h3>${esc(j.title)}</h3><div class="tiny">${esc(j.company)}</div></div>
            <a class="btn btn-sm btn-primary" href="#/apply">Apply</a>
          </div>`).join('')}
        </div>
      </div>`;
  },

  applications() {
    return `
      <div class="screen-enter horizon-shell horizon-board">
        <div class="section-title"><h1>My applications</h1></div>
        <div class="stack">${JACC.APPLICATIONS.map(a => `
          <div class="list-card" style="cursor:default">
            <div class="thumb img"><img src="assets/logos/mtn.jpg" alt=""></div>
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
          <p>Post opportunities, review applicants, and update hiring status — partners stay inside Moodle.</p>
          <div class="actions">
            <a class="btn btn-primary" href="#/post-job">Post an opportunity</a>
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
        <h1>Post an opportunity</h1>
        <p class="muted">Jobs, internships, apprenticeships, contracts, part-time, or volunteer — mark paid or unpaid.</p>
        <div class="field"><label>Title</label><input placeholder="e.g. Product Analyst"></div>
        <div class="grid-2">
          <div class="field"><label>Location</label><input placeholder="Accra · Hybrid"></div>
          <div class="field"><label>Opportunity type</label>
            <select>${JACC.JOB_TYPES.map((x) => `<option>${x}</option>`).join('')}</select>
          </div>
        </div>
        <div class="grid-2">
          <div class="field"><label>Compensation</label>
            <select><option>Paid</option><option>Unpaid</option></select>
          </div>
          <div class="field"><label>Salary / stipend (optional)</label><input placeholder="e.g. GHS 6–8k / mo or Stipend"></div>
        </div>
        <label class="row" style="margin:0 0 14px;gap:8px"><input type="checkbox" checked> Show compensation on listing</label>
        <div class="field"><label>Description</label><textarea placeholder="Opportunity overview, responsibilities…"></textarea></div>
        <div class="field"><label>Card image (optional)</label><input type="file"></div>
        <div class="row" style="gap:10px">
          <button class="btn btn-primary" data-toast="Opportunity submitted for review" data-nav="#/moderation">Publish</button>
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
            ${JACC.avatar(a)}
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

  events() {
    return `
      <div class="screen-enter horizon-shell horizon-board">
        <div class="section-title"><h1>${t('events.h1')}</h1>
          <div class="row gap-sm">
            <a class="btn btn-sm btn-ghost" href="#/stories">${t('landing.stories')}</a>
            <a class="btn btn-sm btn-ghost" href="#/ticket">${t('common.myTicket')}</a>
            <a class="btn btn-sm btn-secondary" href="#/create-event">${t('common.create')}</a>
          </div></div>
        <div class="filters">
          ${[t('events.all'),t('events.networking'),t('events.workshop'),t('events.community'),t('events.entrepreneurship')].map((f,i) =>
            `<button class="filter-chip ${i === 0 ? 'is-active' : ''}" type="button">${f}</button>`).join('')}
        </div>
        <div class="events-grid">${JACC.EVENTS.map((e) => `
          <a class="media-card" href="${e.rsvp ? '#/ticket' : '#/event'}">
            ${JACC.eventMedia(e)}
            <div class="body">
              <h3>${esc(e.title)}</h3>
              <div class="tiny">${esc(e.when)}</div>
              <div class="tiny">${esc(e.where)} · ${esc(e.spots)} ${t('common.seats')}</div>
              <div style="margin-top:10px">${e.rsvp ? `<span class="pill-success pill">${t('common.youreGoing')}</span>` : `<span class="pill">${t('common.rsvpOpen')}</span>`}</div>
            </div>
          </a>`).join('')}
        </div>
      </div>`;
  },

  event() {
    const e = JACC.EVENTS[0];
    return `
      <div class="screen-enter detail-page">
        <div class="card detail-card" style="padding:0;overflow:hidden">
          ${JACC.coverBand(e.cover, 200)}
          <div style="padding:20px">
            <span class="pill-accent pill">${esc(e.cat)}</span>
            <h1 style="margin:10px 0 6px">${esc(e.title)}</h1>
            <p class="muted">${esc(e.when)} · ${esc(e.where)}</p>
            <p class="muted">${esc(e.spots)} ${t('common.seats')}</p>
            <div class="row" style="gap:10px;flex-wrap:wrap;margin:16px 0">
              <a class="btn btn-primary" href="#/ticket">${t('common.viewTicket')}</a>
              <button class="btn btn-secondary" data-toast="meet.ja.africa/summit">${t('common.joinLink')}</button>
              <button class="btn btn-ghost" data-toast="Moodle calendar">${t('common.addCalendar')}</button>
            </div>
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
      <div class="screen-enter horizon-shell horizon-board">
        <div class="hero">
          <span class="eyebrow"><i></i> Community</span>
          <h1>Alumni success stories</h1>
          <p>Inspiration managed by hub admins — featured on every dashboard.</p>
        </div>
        <div class="grid-3">${JACC.STORIES.map((s) => `
          <div class="card story-card">
            <div class="cover"><img src="assets/story.jpg" alt=""></div>
            <div class="row">${JACC.avatar(s)}
              <div><strong>${esc(s.name)}</strong><div class="tiny">${esc(s.role)} · ${esc(s.cohort)}</div></div>
            </div>
            <p style="margin:0;font-style:italic">“${esc(s.quote)}”</p>
          </div>`).join('')}
        </div>
      </div>`;
  },

  messages() {
    return `
      <div class="auth-panel screen-enter" style="margin:0 auto;max-width:560px">
        <h1>Messages live in Moodle</h1>
        <div class="moodle-core-note">
          <div><strong>No Career Hub Messages menu</strong> — use Moodle’s header message icon (with unread badge). Threads, requests, muting, and privacy stay in <code>core_message</code>.</div>
        </div>
        <p class="muted">Same pattern for alerts: the Moodle bell opens the notification drawer. Career Hub does not duplicate a notifications card on the dashboard.</p>
        <a class="btn btn-primary btn-block" href="#/home">Back to Career Hub</a>
      </div>`;
  },

  admin() {
    return `
      <div class="screen-enter">
        <div class="section-title"><h1 style="font-size:1.5rem;margin:0">Content admin</h1>
          <a class="btn btn-sm btn-secondary" href="#/analytics">Analytics</a></div>
        <p class="muted">US-28 — manage jobs, events, and stories in one place.</p>
        <div class="grid-3">
          ${[['Jobs','12 live · 2 in moderation','#/moderation'],['Events','8 upcoming','#/create-event'],['Stories','3 featured','#/manage-stories']].map(([t,s,h]) => `
            <a class="card" href="${h}"><h3>${t}</h3><p class="muted" style="margin:0">${s}</p><span class="tiny">Manage →</span></a>`).join('')}
        </div>
        <div class="card" style="margin-top:16px">
          <strong>Quick actions</strong>
          <div class="row" style="flex-wrap:wrap;gap:8px;margin-top:12px">
            <a class="btn btn-sm btn-primary" href="#/post-job">New opportunity</a>
            <a class="btn btn-sm btn-secondary" href="#/create-event">New event</a>
            <a class="btn btn-sm btn-ghost" href="#/moodle-block">Moodle /my block</a>
            <a class="btn btn-sm btn-ghost" href="#/moderation">Moderation queue</a>
          </div>
        </div>
      </div>`;
  },

  analytics() {
    return `
      <div class="screen-enter">
        <div class="section-title"><h1 style="font-size:1.5rem;margin:0">Engagement & impact</h1>
          <div class="row gap-sm">
            <a class="btn btn-sm btn-secondary" href="#/impact-map">Africa map</a>
            <button class="btn btn-sm btn-primary" data-toast="applications_export.csv downloaded">Export CSV</button>
          </div></div>
        <p class="muted">KPI snapshot for funders — open the map for country engagement.</p>
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
        <h1>${t('settings.h1')}</h1>
        <div class="stack">
          <a class="list-card" href="#/notifications"><div class="thumb img"><img src="assets/logos/ja.jpg" alt=""></div><div class="meta"><h3>${t('common.notifications')}</h3><div class="tiny">${t('settings.notifD')}</div></div></a>
          <a class="list-card" href="#/digest"><div class="thumb img"><img src="assets/jobs/mtn.jpg" alt=""></div><div class="meta"><h3>${t('settings.digest')}</h3><div class="tiny">${t('settings.digestD')}</div></div></a>
          <a class="list-card" href="#/bilingual"><div class="thumb img"><img src="assets/logos/jumia.jpg" alt=""></div><div class="meta"><h3>${t('settings.lang')}</h3><div class="tiny">${t('settings.langD')}</div></div></a>
          <a class="list-card" href="#/a11y"><div class="thumb img"><img src="assets/logos/andela.jpg" alt=""></div><div class="meta"><h3>${t('settings.a11y')}</h3><div class="tiny">${t('settings.a11yD')}</div></div></a>
          <a class="list-card" href="#/privacy"><div class="thumb img"><img src="assets/avatars/efua.jpg" alt=""></div><div class="meta"><h3>${t('common.privacy')}</h3><div class="tiny">${t('settings.privacyD')}</div></div></a>
          <a class="list-card" href="#/profile-edit"><div class="thumb img"><img src="assets/avatars/efua.jpg" alt=""></div><div class="meta"><h3>${t('settings.account')}</h3><div class="tiny">${t('settings.accountD')}</div></div></a>
        </div>
      </div>`;
  },

  notifications() {
    return `
      <div class="auth-panel screen-enter" style="margin:0 auto;max-width:560px">
        <h1>Notification preferences</h1>
        <div class="moodle-core-note">
          <div><strong>Moodle header icons</strong> — unread counts show on the bell (notifications) and message bubble. Digests and event reminders use Moodle processors + email; Career Hub only stores preference toggles here.</div>
        </div>
        ${[
          ['New jobs matching my skills', 'Email digest · Moodle processor'],
          ['Application status changes', 'Popup + email'],
          ['Saved-search alerts', 'Email digest'],
          ['Event reminder (24h before)', 'Moodle + calendar'],
          ['Marketing from JA Africa', 'Off'],
        ].map(([t, s], i) => `
          <label class="row between" style="padding:14px 0;border-bottom:1px solid var(--line)">
            <span><strong>${t}</strong><div class="tiny">${s}</div></span>
            <input type="checkbox" ${i < 4 ? 'checked' : ''}>
          </label>`).join('')}
        <a class="btn btn-secondary btn-block" style="margin-top:12px" href="#/digest">Preview weekly job digest</a>
        <a class="btn btn-ghost btn-block" href="#/saved-searches">Manage saved searches</a>
        <button class="btn btn-primary btn-block" style="margin-top:8px" data-toast="Hub prefs saved" data-nav="#/settings">Save hub prefs</button>
      </div>`;
  },
};

JACC.icon = icon;
