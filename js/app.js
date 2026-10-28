/* JACC Design Prototype — router, themes, persona assume-role */
(() => {
  const PUBLIC = new Set(['landing', 'login', 'signup', 'verify', 'onboarding', 'gallery', 'pending']);
  const DEFAULT_THEME = 'baobab';
  const DEFAULT_PERSONA = 'alumni';

  const state = {
    theme: localStorage.getItem('jacc-theme') || DEFAULT_THEME,
    persona: localStorage.getItem('jacc-persona') || DEFAULT_PERSONA,
    screen: 'gallery',
  };

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  function persona() {
    return JACC.persona(state.persona);
  }

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

  function setPersona(id, { navigateHome = true } = {}) {
    const p = JACC.persona(id);
    state.persona = p.id;
    localStorage.setItem('jacc-persona', p.id);
    document.documentElement.setAttribute('data-persona', p.id);
    $$('.persona-chip').forEach((el) => el.classList.toggle('is-active', el.dataset.persona === p.id));
    const tag = $('#persona-label');
    if (tag) tag.textContent = `Viewing as ${p.label}`;
    if (navigateHome) navigate(`${state.theme}/${p.home}`);
  }

  function navigate(path) {
    const hash = `#/${path.replace(/^#\/?/, '')}`;
    if (location.hash !== hash) location.hash = hash;
    else render();
  }

  function parseRoute() {
    const raw = (location.hash || '#/gallery').replace(/^#\/?/, '');
    const parts = raw.split('/').filter(Boolean);
    if (!parts.length || parts[0] === 'gallery') return { theme: state.theme, screen: 'gallery' };
    if (JACC.THEMES.some((t) => t.id === parts[0])) {
      return { theme: parts[0], screen: parts[1] || persona().home };
    }
    return { theme: state.theme, screen: parts[0] || persona().home };
  }

  function shellVisible(screen, p) {
    if (screen === 'gallery') return false;
    if (!p.shell) return false;
    if (PUBLIC.has(screen) && screen !== 'onboarding') return false;
    return true;
  }

  function renderGallery() {
    document.body.classList.add('gallery-mode');
    $('#theme-bar')?.setAttribute('hidden', '');
    $('#persona-bar')?.setAttribute('hidden', '');
    $('#app-shell')?.setAttribute('hidden', '');
    $('#bottom-nav')?.setAttribute('hidden', '');
    const root = $('#viewport');
    root.innerHTML = `
      <div class="gallery">
        <header class="gallery-hero">
          <div class="eyebrow"><span style="width:8px;height:8px;border-radius:50%;background:var(--ja-enterprise-aqua);display:inline-block"></span>
            JACC 3.0 · Moodle Career Hub · client review</div>
          <h1>Themes, personas<br><em>&amp; real access rules</em></h1>
          <p>Themes change <strong>layout, motion, and IA</strong> — not just colour. Assume a persona for role-true nav. Messaging & notifications use <strong>Moodle core</strong>. Try AI CV, cohort gates, and new ideas like match explain & pathway.</p>
          <div class="gallery-cta">
            <a class="btn btn-primary" href="#/baobab/home" style="background:var(--ja-enterprise-aqua);color:#22404D">Enter as Alumni (Baobab)</a>
            <a class="btn btn-secondary" href="#/baobab/plugin-settings" style="border-color:rgba(255,255,255,.25);color:#fff;background:transparent">Plugin cohort settings</a>
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
                </div>
              </div>
              <div class="body">
                <h3>${t.name}${t.id === 'baobab' ? ' · foundations' : ''}</h3>
                <p>${t.tagline}</p>
                <p class="tiny" style="color:#8e8e93;margin:0 0 10px">${t.concept || ''}</p>
                <div class="swatches">${t.swatches.map((c) => `<span class="swatch" style="background:${c}"></span>`).join('')}</div>
                <span class="go">Explore →</span>
              </div>
            </button>`).join('')}
        </div>
        <section class="gallery-features">
          <h2>Assume a role</h2>
          <p>Each persona changes navigation, home, and permissions — including locked cohort access.</p>
          <div class="feat-grid">
            ${JACC.PERSONAS.map((p) => `
              <button type="button" class="feat-item persona-pick" data-persona="${p.id}" style="text-align:left;cursor:pointer;border:0;width:100%">
                <strong><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${p.color};margin-right:6px"></span>${p.label}</strong>
                <span>${p.blurb}</span>
              </button>`).join('')}
          </div>
        </section>
        <section class="gallery-features" style="margin-top:20px">
          <h2>Feature coverage</h2>
          <div class="feat-grid">
            ${[
              ['5 design systems', 'Layout + motion + components differ per theme'],
              ['Moodle messaging', 'core_message — not a parallel chat app'],
              ['Moodle notifications', 'Bell + digests via core processors'],
              ['Cohort gate + plugin', 'Who sees the hub is Moodle-cohort based'],
              ['AI CV parser', 'Upload → parse → review → CV studio'],
              ['Match explain', 'Why 94% — skills, industry, location'],
              ['Pathway & map', 'Career timeline + Africa engagement pulse'],
              ['Tickets & block', 'QR ticket + /my dashboard block'],
            ].map(([t, d]) => `<div class="feat-item"><strong>${t}</strong><span>${d}</span></div>`).join('')}
          </div>
        </section>
      </div>`;

    $$('[data-open-theme]', root).forEach((btn) => {
      btn.addEventListener('click', () => {
        setTheme(btn.dataset.openTheme);
        setPersona('alumni', { navigateHome: false });
        navigate(`${btn.dataset.openTheme}/home`);
      });
    });
    $$('.persona-pick', root).forEach((btn) => {
      btn.addEventListener('click', () => {
        setTheme(state.theme === 'gallery' ? 'baobab' : state.theme);
        setPersona(btn.dataset.persona);
      });
    });
  }

  function renderChrome() {
    const bar = $('#theme-bar');
    const pbar = $('#persona-bar');
    if (!bar || !pbar) return;
    bar.removeAttribute('hidden');
    pbar.removeAttribute('hidden');
    const meta = JACC.THEMES.find((t) => t.id === state.theme);
    const p = persona();

    bar.innerHTML = `
      <a class="tb-brand" href="#/gallery"><span class="tb-mark">JA</span><span>JACC review</span></a>
      <span class="tb-meta" id="theme-label">${meta ? `${meta.name} · ${meta.tagline}` : ''}</span>
      <div class="theme-chips">
        ${JACC.THEMES.map((t) => `
          <button type="button" class="theme-chip ${t.id === state.theme ? 'is-active' : ''}" data-theme="${t.id}">
            <span class="dot" style="background:${t.preview.primary}"></span>${t.name}
          </button>`).join('')}
      </div>
      <div class="tb-actions">
        <a class="tb-link" href="#/gallery">Gallery</a>
        <button type="button" class="tb-link" id="screen-menu-btn">Screens ▾</button>
      </div>`;

    pbar.innerHTML = `
      <span class="persona-kicker" id="persona-label">Viewing as ${p.label}</span>
      <div class="persona-chips">
        ${JACC.PERSONAS.map((x) => `
          <button type="button" class="persona-chip ${x.id === p.id ? 'is-active' : ''}" data-persona="${x.id}" title="${x.blurb}">
            <span class="dot" style="background:${x.color}"></span>${x.short}
          </button>`).join('')}
      </div>
      <span class="persona-hint hide-mobile">${p.blurb}</span>`;

    $$('.theme-chip', bar).forEach((chip) => {
      chip.addEventListener('click', () => {
        setTheme(chip.dataset.theme);
        const { screen } = parseRoute();
        navigate(`${state.theme}/${screen === 'gallery' ? persona().home : screen}`);
      });
    });
    $$('.persona-chip', pbar).forEach((chip) => {
      chip.addEventListener('click', () => setPersona(chip.dataset.persona));
    });
    $('#screen-menu-btn')?.addEventListener('click', toggleScreenMenu);
  }

  function toggleScreenMenu() {
    let panel = $('#screen-panel');
    if (panel) { panel.remove(); return; }
    panel = document.createElement('div');
    panel.id = 'screen-panel';
    panel.className = 'screen-panel';
    panel.innerHTML = `
      <div class="row between" style="margin-bottom:10px"><strong>All screens</strong>
        <button type="button" class="btn btn-sm btn-ghost" id="close-screens">✕</button></div>
      ${JACC.SCREENS.map((g) => `
        <div style="margin-bottom:12px">
          <div class="tiny" style="margin-bottom:6px;text-transform:uppercase;letter-spacing:.04em">${g.group}</div>
          <div style="display:flex;flex-wrap:wrap;gap:6px">
            ${g.items.map((s) => `<a class="pill" href="#/${state.theme}/${s.id}">${s.label}</a>`).join('')}
          </div>
        </div>`).join('')}`;
    document.body.appendChild(panel);
    $('#close-screens')?.addEventListener('click', () => panel.remove());
    panel.addEventListener('click', (e) => { if (e.target.closest('a')) panel.remove(); });
  }

  function renderShell(screen) {
    const shell = $('#app-shell');
    const bottom = $('#bottom-nav');
    const p = persona();
    if (!shellVisible(screen, p)) {
      shell?.setAttribute('hidden', '');
      bottom?.setAttribute('hidden', '');
      return;
    }
    shell.removeAttribute('hidden');
    if (p.nav.length) bottom.removeAttribute('hidden');
    else bottom.setAttribute('hidden', '');

    const nav = p.nav.map((n) => {
      const active = n.id === screen
        || (screen === 'job' && n.id === 'careers')
        || (screen.startsWith('cv-') && n.id === 'home' && p.id === 'alumni')
        || (screen === 'mentor' && n.id === 'mentors')
        || (screen === 'event' && n.id === 'events');
      return `<a href="#/${state.theme}/${n.id}" class="${active ? 'is-active' : ''}">${n.label}</a>`;
    }).join('');

    const homeLink = p.home;
    shell.innerHTML = `
      <div class="row">
        <a class="brandmark" href="#/${state.theme}/${homeLink}"><span class="logo">JA</span> Career Hub</a>
        <nav class="navpill">${nav}</nav>
        <div class="header-actions">
          <button class="icon-btn hide-mobile" data-toast="Search (prototype)">${JACC.icon('search')}</button>
          <a class="icon-btn" href="#/${state.theme}/messages">${JACC.icon('bell')}<span class="badge">3</span></a>
          <a href="#/${state.theme}/profile" title="${p.label}" class="avatar-link">${JACC.avatar(p.id === 'alumni' || p.id === 'mentor' || p.id === 'locked' || p.id === 'pending' ? JACC.ME : { name: p.label, photo: null })}</a>
          ${p.id === 'employer' || p.id === 'admin' || p.id === 'coordinator'
            ? `<a class="btn btn-sm btn-primary hide-mobile" href="#/${state.theme}/${p.id === 'coordinator' ? 'create-event' : p.id === 'admin' ? 'plugin-settings' : 'post-job'}">Create</a>`
            : `<a class="btn btn-sm btn-secondary hide-mobile" href="#/${state.theme}/cv-start">CV studio</a>`}
        </div>
      </div>
      <nav class="subnav">
        ${(p.subnav || []).map((s) => `
          <a href="#/${state.theme}/${s.id}" class="${screen === s.id ? 'is-active' : ''}">${s.label}</a>`).join('')}
      </nav>`;

    if (p.nav.length >= 2) {
      const mid = Math.min(2, p.nav.length);
      bottom.innerHTML = `
        ${p.nav.slice(0, mid).map((n) => `
          <a href="#/${state.theme}/${n.id}" class="${n.id === screen ? 'is-active' : ''}">${JACC.icon(n.icon || 'home')}<span>${n.label}</span></a>`).join('')}
        <a class="create" href="#/${state.theme}/${p.id === 'coordinator' ? 'create-event' : p.id === 'employer' ? 'post-job' : 'cv-start'}">${JACC.icon('plus')}</a>
        ${p.nav.slice(mid).map((n) => `
          <a href="#/${state.theme}/${n.id}" class="${n.id === screen ? 'is-active' : ''}">${JACC.icon(n.icon || 'home')}<span>${n.label}</span></a>`).join('')}`;
    }
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
        if (el.tagName === 'A' && el.getAttribute('href')?.startsWith('#/') && !el.dataset.nav) return;
        e.preventDefault();
        showToast(el.dataset.toast);
        if (el.dataset.nav) {
          setTimeout(() => {
            location.hash = el.dataset.nav.replace('#/', `#/${state.theme}/`);
          }, 350);
        }
      });
    });
    $$('.dropzone', root).forEach((el) => {
      el.addEventListener('click', () => {
        if (el.dataset.toast) showToast(el.dataset.toast);
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
    document.documentElement.setAttribute('data-persona', state.persona);

    if (route.screen === 'gallery') {
      renderGallery();
      return;
    }

    document.body.classList.remove('gallery-mode');
    renderChrome();
    renderShell(route.screen);

    const root = $('#viewport');
    const view = JACC.Screens[route.screen];
    if (!view) {
      root.innerHTML = `<div class="card screen-enter"><h1>Screen not found</h1><p class="muted">No prototype for “${route.screen}”.</p>
        <a class="btn btn-primary" href="#/${state.theme}/${persona().home}">Go to ${persona().label} home</a></div>`;
      return;
    }
    root.innerHTML = view();
    bindInteractions(root);
    if (route.screen === 'cv-parsing') {
      clearTimeout(window.__cvParseTimer);
      window.__cvParseTimer = setTimeout(() => {
        if (parseRoute().screen === 'cv-parsing') {
          location.hash = `#/${state.theme}/cv-review`;
        }
      }, 2600);
    }
    window.scrollTo(0, 0);
  }

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#/"]');
    if (!a) return;
    const path = a.getAttribute('href').replace(/^#\//, '');
    const first = path.split('/')[0];
    if (first === 'gallery' || JACC.THEMES.some((t) => t.id === first)) return;
    e.preventDefault();
    location.hash = `#/${state.theme}/${path}`;
  });

  window.addEventListener('hashchange', render);
  document.addEventListener('DOMContentLoaded', render);
})();
