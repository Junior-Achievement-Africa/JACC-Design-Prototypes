/* JACC Design Prototype — router, shell, theme switcher */
(() => {
  const PUBLIC = new Set(['landing', 'login', 'signup', 'verify', 'onboarding', 'gallery']);
  const DEFAULT_THEME = 'baobab';

  const state = {
    theme: localStorage.getItem('jacc-theme') || DEFAULT_THEME,
    screen: 'gallery',
    role: localStorage.getItem('jacc-role') || 'alumni',
  };

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  function setTheme(id) {
    if (!JACC.THEMES.some((t) => t.id === id)) id = DEFAULT_THEME;
    state.theme = id;
    document.documentElement.setAttribute('data-theme', id);
    localStorage.setItem('jacc-theme', id);
    $$('.theme-chip').forEach((el) => el.classList.toggle('is-active', el.dataset.theme === id));
    const meta = JACC.THEMES.find((t) => t.id === id);
    const label = $('#theme-label');
    if (label && meta) label.textContent = `${meta.name} · ${meta.tagline}`;
  }

  function parseHash() {
    const raw = (location.hash || '#/gallery').replace(/^#\/?/, '');
    const [screen, ...rest] = raw.split('/');
    return { screen: screen || 'gallery', rest };
  }

  function navigate(screen) {
    if (location.hash !== `#/${screen}`) location.hash = `#/${screen}`;
    else render();
  }

  function shellVisible(screen) {
    return !PUBLIC.has(screen) && screen !== 'gallery';
  }

  function renderGallery() {
    document.body.classList.add('gallery-mode');
    $('#theme-bar')?.setAttribute('hidden', '');
    $('#app-shell')?.setAttribute('hidden', '');
    $('#bottom-nav')?.setAttribute('hidden', '');
    const root = $('#viewport');
    root.innerHTML = `
      <div class="gallery">
        <header class="gallery-hero">
          <div class="eyebrow"><span style="width:8px;height:8px;border-radius:50%;background:var(--ja-enterprise-aqua);display:inline-block"></span>
            JACC 3.0 · Client design review</div>
          <h1>Career Hub themes<br><em>for JA Africa</em></h1>
          <p>Five interactive prototypes — same features, same JA brand palette, different visual directions. Pick a theme to explore every screen, then use the <strong>Feedback</strong> button to pin suggestions for the team.</p>
          <div class="gallery-cta">
            <a class="btn btn-primary" href="#/baobab/home" style="background:var(--ja-enterprise-aqua);color:#22404D">Start with Baobab (current branch)</a>
            <a class="btn btn-secondary" href="#/baobab/landing" style="border-color:rgba(255,255,255,.25);color:#fff;background:transparent">View public landing</a>
          </div>
        </header>
        <div class="gallery-grid">
          ${JACC.THEMES.map((t) => `
            <button class="theme-card" type="button" data-open-theme="${t.id}">
              <div class="preview" style="background:${t.preview.bg};color:${t.preview.fg}">
                <div class="bar" style="background:${t.preview.primary}"></div>
                <div class="bar" style="width:45%;background:${t.preview.accent}"></div>
                <div class="chips">
                  <span class="chip" style="background:${t.preview.primary}"></span>
                  <span class="chip" style="background:${t.preview.accent}"></span>
                  <span class="chip" style="background:${t.swatches[4]}"></span>
                </div>
              </div>
              <div class="body">
                <h3>${t.name}</h3>
                <p>${t.tagline}</p>
                <div class="swatches">${t.swatches.map((c) => `<span class="swatch" style="background:${c}"></span>`).join('')}</div>
                <span class="go">Explore prototype →</span>
              </div>
            </button>`).join('')}
        </div>
        <section class="gallery-features">
          <h2>What’s inside each prototype</h2>
          <p>Mapped to stakeholder requirements US-01 → US-31 (Release 1 + key later stories).</p>
          <div class="feat-grid">
            ${[
              ['Hub & auth', 'Landing, signup, verify, onboarding, dashboard'],
              ['Profiles', 'Edit, privacy, CV upload, activity'],
              ['Careers', 'Search, match %, apply, save, applications'],
              ['Employers', 'Post jobs, applicants, moderation'],
              ['Mentorship', 'Match, book, mentor hub, feedback'],
              ['Events', 'RSVP, create, attendance, calendar'],
              ['Community', 'Stories, messaging'],
              ['Admin & M&E', 'Content admin, KPIs, CSV export'],
            ].map(([t, d]) => `<div class="feat-item"><strong>${t}</strong><span>${d}</span></div>`).join('')}
          </div>
        </section>
        <p class="tiny" style="text-align:center;margin-top:40px;color:#8e8e93">
          Palette: 16 official JA Worldwide colours only · Static HTML/CSS/JS for GitHub Pages
        </p>
      </div>`;

    $$('[data-open-theme]', root).forEach((btn) => {
      btn.addEventListener('click', () => {
        setTheme(btn.dataset.openTheme);
        navigate(`${btn.dataset.openTheme}/home`);
      });
    });
  }

  function renderThemeBar() {
    const bar = $('#theme-bar');
    if (!bar) return;
    bar.removeAttribute('hidden');
    const meta = JACC.THEMES.find((t) => t.id === state.theme);
    bar.innerHTML = `
      <a class="tb-brand" href="#/gallery">
        <span class="tb-mark">JA</span>
        <span>JACC review</span>
      </a>
      <span class="tb-meta" id="theme-label">${meta ? `${meta.name} · ${meta.tagline}` : ''}</span>
      <div class="theme-chips">
        ${JACC.THEMES.map((t) => `
          <button type="button" class="theme-chip ${t.id === state.theme ? 'is-active' : ''}" data-theme="${t.id}">
            <span class="dot" style="background:${t.preview.primary}"></span>${t.name}
          </button>`).join('')}
      </div>
      <div class="tb-actions">
        <a class="tb-link" href="#/gallery">All themes</a>
        <button type="button" class="tb-link" id="screen-menu-btn">Screens ▾</button>
      </div>`;

    $$('.theme-chip', bar).forEach((chip) => {
      chip.addEventListener('click', () => {
        setTheme(chip.dataset.theme);
        const { screen } = parseRoute();
        navigate(`${state.theme}/${screen === 'gallery' ? 'home' : screen}`);
      });
    });
    $('#screen-menu-btn')?.addEventListener('click', toggleScreenMenu);
  }

  function parseRoute() {
    const raw = (location.hash || '#/gallery').replace(/^#\/?/, '');
    const parts = raw.split('/').filter(Boolean);
    // #/gallery | #/baobab/home | #/home (legacy)
    if (parts[0] === 'gallery' || parts.length === 0) return { theme: state.theme, screen: 'gallery' };
    if (JACC.THEMES.some((t) => t.id === parts[0])) {
      return { theme: parts[0], screen: parts[1] || 'home' };
    }
    return { theme: state.theme, screen: parts[0] || 'home' };
  }

  function toggleScreenMenu() {
    let panel = $('#screen-panel');
    if (panel) {
      panel.remove();
      return;
    }
    panel = document.createElement('div');
    panel.id = 'screen-panel';
    panel.style.cssText = `
      position:fixed;top:60px;right:12px;z-index:250;width:min(360px,92vw);
      max-height:70vh;overflow:auto;padding:16px;border-radius:var(--radius-lg);
      background:var(--surface);border:var(--card-border);box-shadow:var(--shadow-float);
    `;
    panel.innerHTML = `
      <div class="row between" style="margin-bottom:10px"><strong>All screens</strong>
        <button type="button" class="btn btn-sm btn-ghost" id="close-screens">✕</button></div>
      ${JACC.SCREENS.map((g) => `
        <div style="margin-bottom:12px">
          <div class="tiny" style="margin-bottom:6px;text-transform:uppercase;letter-spacing:.04em">${g.group}</div>
          <div style="display:flex;flex-wrap:wrap;gap:6px">
            ${g.items.map((s) => `
              <a class="pill" href="#/${state.theme}/${s.id}" style="text-decoration:none">${s.label}</a>`).join('')}
          </div>
        </div>`).join('')}`;
    document.body.appendChild(panel);
    $('#close-screens')?.addEventListener('click', () => panel.remove());
    panel.addEventListener('click', (e) => {
      if (e.target.closest('a')) panel.remove();
    });
  }

  function renderShell(screen) {
    const shell = $('#app-shell');
    const bottom = $('#bottom-nav');
    if (!shellVisible(screen)) {
      shell?.setAttribute('hidden', '');
      bottom?.setAttribute('hidden', '');
      return;
    }
    shell.removeAttribute('hidden');
    bottom.removeAttribute('hidden');

    const nav = JACC.NAV.map((n) => `
      <a href="#/${state.theme}/${n.id}" class="${n.id === screen || (screen === 'job' && n.id === 'careers') || (screen === 'mentor' && n.id === 'mentors') || (screen === 'event' && n.id === 'events') ? 'is-active' : ''}">${n.label}</a>`).join('');

    shell.innerHTML = `
      <div class="row">
        <a class="brandmark" href="#/${state.theme}/home"><span class="logo">JA</span> Career Hub</a>
        <nav class="navpill">${nav}</nav>
        <div class="header-actions">
          <button class="icon-btn hide-mobile" title="Search" data-toast="Search (prototype)">${JACC.icon('search')}</button>
          <a class="icon-btn" href="#/${state.theme}/messages" title="Notifications">
            ${JACC.icon('bell')}<span class="badge">3</span>
          </a>
          <a class="avatar" href="#/${state.theme}/profile" title="Profile">E</a>
          <a class="btn btn-sm btn-primary hide-mobile" href="#/${state.theme}/post-job">Create</a>
        </div>
      </div>
      <nav class="subnav">
        <a href="#/${state.theme}/applications" class="${screen === 'applications' ? 'is-active' : ''}">Applications</a>
        <a href="#/${state.theme}/saved" class="${screen === 'saved' ? 'is-active' : ''}">Saved</a>
        <a href="#/${state.theme}/stories" class="${screen === 'stories' ? 'is-active' : ''}">Stories</a>
        <a href="#/${state.theme}/employer" class="${screen === 'employer' ? 'is-active' : ''}">Employer</a>
        <a href="#/${state.theme}/admin" class="${screen === 'admin' ? 'is-active' : ''}">Admin</a>
        <a href="#/${state.theme}/analytics" class="${screen === 'analytics' ? 'is-active' : ''}">Analytics</a>
        <a href="#/${state.theme}/settings" class="${screen === 'settings' ? 'is-active' : ''}">Settings</a>
      </nav>`;

    bottom.innerHTML = `
      ${JACC.NAV.slice(0, 2).map((n) => `
        <a href="#/${state.theme}/${n.id}" class="${n.id === screen ? 'is-active' : ''}">${JACC.icon(n.icon)}<span>${n.label}</span></a>`).join('')}
      <a class="create" href="#/${state.theme}/post-job" title="Create">${JACC.icon('plus')}</a>
      ${JACC.NAV.slice(2).map((n) => `
        <a href="#/${state.theme}/${n.id}" class="${n.id === screen ? 'is-active' : ''}">${JACC.icon(n.icon)}<span>${n.label}</span></a>`).join('')}`;
  }

  function showToast(msg) {
    let el = $('.toast');
    if (!el) {
      el = document.createElement('div');
      el.className = 'toast';
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove('show'), 2200);
  }

  function bindInteractions(root) {
    $$('[data-toast]', root).forEach((el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        showToast(el.dataset.toast);
        if (el.dataset.nav) setTimeout(() => { location.hash = el.dataset.nav.replace('#/', `#/${state.theme}/`); }, 400);
      });
    });
    $$('.filter-chip, .choice', root).forEach((el) => {
      el.addEventListener('click', () => {
        const group = el.parentElement;
        if (group?.classList.contains('filters') || group?.classList.contains('choice-grid')) {
          $$('.filter-chip, .choice', group).forEach((x) => x.classList.remove('is-active', 'is-on'));
        }
        el.classList.add(el.classList.contains('choice') ? 'is-on' : 'is-active');
      });
    });
  }

  function render() {
    const route = parseRoute();
    state.theme = route.theme;
    state.screen = route.screen;
    setTheme(state.theme);

    if (route.screen === 'gallery') {
      renderGallery();
      return;
    }

    document.body.classList.remove('gallery-mode');
    renderThemeBar();
    renderShell(route.screen);

    const root = $('#viewport');
    const view = JACC.Screens[route.screen];
    if (!view) {
      root.innerHTML = `<div class="card screen-enter"><h1>Screen not found</h1><p class="muted">No prototype for “${route.screen}”.</p><a class="btn btn-primary" href="#/${state.theme}/home">Go home</a></div>`;
      return;
    }

    // Role strip for multi-persona screens
    const roleScreens = ['home', 'employer', 'admin', 'mentor-hub'];
    let html = '';
    if (roleScreens.includes(route.screen)) {
      html += `<div class="role-switch">
        ${[['alumni','Alumni'],['mentor','Mentor'],['employer','Employer'],['admin','Admin']].map(([id, label]) =>
          `<button type="button" class="${state.role === id ? 'is-on' : ''}" data-role="${id}">${label}</button>`).join('')}
      </div>`;
    }
    html += view();
    root.innerHTML = html;
    bindInteractions(root);

    $$('[data-role]', root).forEach((btn) => {
      btn.addEventListener('click', () => {
        state.role = btn.dataset.role;
        localStorage.setItem('jacc-role', state.role);
        const map = { alumni: 'home', mentor: 'mentor-hub', employer: 'employer', admin: 'admin' };
        navigate(`${state.theme}/${map[state.role]}`);
      });
    });

    window.scrollTo(0, 0);
  }

  // Rewrite plain #/screen links inside rendered content to include theme
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#/"]');
    if (!a) return;
    const href = a.getAttribute('href');
    const path = href.replace(/^#\//, '');
    const first = path.split('/')[0];
    if (first === 'gallery' || JACC.THEMES.some((t) => t.id === first)) return;
    e.preventDefault();
    location.hash = `#/${state.theme}/${path}`;
  });

  window.addEventListener('hashchange', render);
  document.addEventListener('DOMContentLoaded', render);
})();
