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

  const navLabel = (n) => JACC.t(`nav.${n.id}`, {}) !== `nav.${n.id}` ? JACC.t(`nav.${n.id}`) : n.label;
  const subLabel = (s) => JACC.t(`sub.${s.id}`, {}) !== `sub.${s.id}` ? JACC.t(`sub.${s.id}`) : s.label;

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
    if (tag) tag.textContent = JACC.t('common.viewingAs', { name: p.label });
    if (navigateHome) navigate(`${state.theme}/${p.home}`);
  }

  function setLang(id) {
    JACC.setLang(id);
    render();
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

  const escHtml = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));

  function umIcon(name) {
    const paths = {
      user: '<circle cx="12" cy="8" r="3.5"/><path d="M5 19c0-3.2 2.8-5.5 7-5.5s7 2.3 7 5.5"/>',
      edit: '<path d="M4 20h4l10-10-4-4L4 16v4z"/><path d="m14 6 4 4"/>',
      cv: '<path d="M6 4h9l3 3v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"/><path d="M14 4v4h4M8 12h8M8 16h5"/>',
      path: '<circle cx="6" cy="6" r="2"/><circle cx="18" cy="12" r="2"/><circle cx="8" cy="18" r="2"/><path d="M8 7.5 16 11M16.5 13.5 9.5 17"/>',
      star: '<path d="m12 3 2.4 5.4L20 9.3l-4 4.2.9 5.5L12 16.4 7.1 19l.9-5.5-4-4.2 5.6-.9z"/>',
      lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
      grades: '<path d="M6 4h9l3 3v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"/><path d="M14 4v4h4M8 13h8M8 17h5"/>',
      cal: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
      files: '<path d="M4 6h7l2 2h7v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z"/><path d="M9 14h6"/>',
      prefs: '<circle cx="12" cy="12" r="3"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4"/>',
      lang: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18"/>',
      role: '<path d="M4 19V6a1 1 0 0 1 1-1h6l2 2h6a1 1 0 0 1 1 1v11"/><path d="M8 14h8M8 17h5"/>',
      logout: '<path d="M10 17H6a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h4"/><path d="M14 12H21M18 8l4 4-4 4"/>',
    };
    return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${paths[name] || paths.user}</svg>`;
  }

  function resolveSubnav(p, screen) {
    if (p.id === 'alumni' && typeof JACC.alumniSubnavFor === 'function') {
      return JACC.alumniSubnavFor(screen);
    }
    return p.subnav || [];
  }

  let msgThreadId = null;

  function unreadNotifCount() {
    return (JACC.NOTIFICATIONS || []).filter((n) => n.unread).length;
  }
  function unreadMsgCount() {
    return (JACC.MESSAGES || []).reduce((s, m) => s + (m.unread || 0), 0);
  }

  function syncHeaderBadges() {
    const nb = unreadNotifCount();
    const mb = unreadMsgCount();
    $$('[data-mdl-notif-badge]').forEach((el) => {
      el.textContent = nb || '';
      el.hidden = !nb;
    });
    $$('[data-mdl-msg-badge]').forEach((el) => {
      el.textContent = mb || '';
      el.hidden = !mb;
    });
  }

  function ensureMoodleChrome() {
    if ($('#mdl-overlay')) return;
    const overlay = document.createElement('div');
    overlay.id = 'mdl-overlay';
    overlay.className = 'mdl-overlay';
    overlay.setAttribute('hidden', '');
    const notif = document.createElement('aside');
    notif.id = 'mdl-notif-drawer';
    notif.className = 'mdl-drawer';
    notif.setAttribute('aria-hidden', 'true');
    notif.setAttribute('aria-label', 'Notifications');
    const msg = document.createElement('aside');
    msg.id = 'mdl-msg-drawer';
    msg.className = 'mdl-drawer';
    msg.setAttribute('aria-hidden', 'true');
    msg.setAttribute('aria-label', 'Messages');
    document.body.append(overlay, notif, msg);
  }

  function closeUserMenu() {
    const panel = $('#user-menu-panel');
    const btn = $('#user-menu-btn');
    if (!panel) return;
    panel.classList.remove('is-open');
    panel.hidden = true;
    btn?.setAttribute('aria-expanded', 'false');
  }

  function toggleUserMenu() {
    const panel = $('#user-menu-panel');
    const btn = $('#user-menu-btn');
    if (!panel) return;
    const open = panel.classList.toggle('is-open');
    panel.hidden = !open;
    btn?.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) closeDrawers({ keepOverlay: false });
  }

  function closeDrawers({ keepOverlay = false } = {}) {
    ['mdl-notif-drawer', 'mdl-msg-drawer'].forEach((id) => {
      const el = $(`#${id}`);
      if (!el) return;
      el.classList.remove('is-open');
      el.setAttribute('aria-hidden', 'true');
    });
    if (!keepOverlay) {
      const overlay = $('#mdl-overlay');
      if (overlay) {
        overlay.classList.remove('is-open');
        overlay.setAttribute('hidden', '');
      }
      document.body.style.overflow = '';
    }
  }

  function openDrawer(which) {
    ensureMoodleChrome();
    closeUserMenu();
    closeDrawers({ keepOverlay: true });
    const overlay = $('#mdl-overlay');
    overlay.classList.add('is-open');
    overlay.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    if (which === 'notif') {
      renderNotifDrawer();
      const d = $('#mdl-notif-drawer');
      d.classList.add('is-open');
      d.setAttribute('aria-hidden', 'false');
    } else {
      msgThreadId = null;
      renderMsgDrawer();
      const d = $('#mdl-msg-drawer');
      d.classList.add('is-open');
      d.setAttribute('aria-hidden', 'false');
    }
  }

  function renderNotifDrawer() {
    const d = $('#mdl-notif-drawer');
    if (!d) return;
    const items = JACC.NOTIFICATIONS || [];
    d.innerHTML = `
      <header>
        <h2>Notifications</h2>
        <button type="button" class="icon-btn" data-mdl-close aria-label="Close"><span style="font-size:18px;line-height:1">×</span></button>
      </header>
      <div class="mdl-body">
        <p class="mdl-note">Moodle notification drawer — Career Hub alerts (jobs, applications, events) appear here with unread counts on the bell.</p>
        ${items.map((n) => `
          <button type="button" class="mdl-item ${n.unread ? 'is-unread' : ''}" data-mdl-notif="${n.id}">
            <span class="mdl-dot ${n.unread ? '' : 'is-read'}"></span>
            <span class="mdl-meta">
              <strong>${escHtml(n.title)}</strong>
              <p>${escHtml(n.body)}</p>
            </span>
            <span class="mdl-time">${escHtml(n.time)}</span>
          </button>`).join('') || '<p class="mdl-note">No notifications</p>'}
      </div>
      <div class="mdl-foot">
        <button type="button" class="btn btn-sm btn-ghost" data-mdl-mark-all>Mark all as read</button>
        <a class="btn btn-sm btn-secondary" href="#/${state.theme}/notifications" data-mdl-close>Notification preferences</a>
      </div>`;
  }

  function renderMsgDrawer() {
    const d = $('#mdl-msg-drawer');
    if (!d) return;
    if (msgThreadId) {
      const m = (JACC.MESSAGES || []).find((x) => x.id === msgThreadId);
      const thread = (JACC.MESSAGE_THREADS && JACC.MESSAGE_THREADS[msgThreadId]) || [];
      d.innerHTML = `
        <header>
          <button type="button" class="icon-btn" data-mdl-msg-back aria-label="Back"><span style="font-size:18px">←</span></button>
          <h2>${escHtml(m?.name || 'Conversation')}</h2>
          <button type="button" class="icon-btn" data-mdl-close aria-label="Close"><span style="font-size:18px">×</span></button>
        </header>
        <div class="mdl-body" style="display:flex;flex-direction:column;padding:0">
          <div class="mdl-thread-head">
            ${JACC.avatar(m || { name: 'Peer' })}
            <div><strong>${escHtml(m?.name || '')}</strong><div class="tiny">via Moodle messaging</div></div>
          </div>
          <div class="mdl-bubbles">
            ${thread.map((b) => `<div class="bubble ${b.me ? 'me' : 'them'}">${escHtml(b.text)}</div>`).join('')}
          </div>
          <div class="mdl-compose">
            <input type="text" placeholder="Message via Moodle…" aria-label="Message">
            <button type="button" class="btn btn-sm btn-primary" data-mdl-send>Send</button>
          </div>
        </div>`;
      return;
    }
    const items = JACC.MESSAGES || [];
    d.innerHTML = `
      <header>
        <h2>Messages</h2>
        <button type="button" class="icon-btn" data-mdl-close aria-label="Close"><span style="font-size:18px">×</span></button>
      </header>
      <div class="mdl-body">
        <p class="mdl-note">Moodle <code>core_message</code> — no separate Career Hub chat. Use the header message icon (same as on staging).</p>
        ${items.map((m) => `
          <button type="button" class="mdl-item ${m.unread ? 'is-unread' : ''}" data-mdl-open-thread="${m.id}">
            ${JACC.avatar(m)}
            <span class="mdl-meta">
              <strong>${escHtml(m.name)}</strong>
              <p>${escHtml(m.preview)}</p>
            </span>
            <span class="mdl-time">${escHtml(m.time)}${m.unread ? `<br><span class="pill-danger pill" style="margin-top:4px">${m.unread}</span>` : ''}</span>
          </button>`).join('')}
      </div>
      <div class="mdl-foot">
        <button type="button" class="btn btn-sm btn-ghost" data-toast="Message requests (Moodle)">Message requests</button>
      </div>`;
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
          <p>All themes share the <strong>official JA colours</strong>. They differ by <strong>layout, width, and type</strong> only. Assume a persona for role-true nav. Try AI CV, cohort gates, and full-width Horizon / Pulse / Atlas.</p>
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
              ['Same JA palette', 'Themes vary layout & width — not colour'],
              ['Moodle messaging', 'Header message icon → core_message drawer'],
              ['Moodle notifications', 'Header bell → Moodle notification drawer'],
              ['Spaces', 'Cohort / interest groups with Moodle forum discussions'],
              ['Work history + open to work', 'Profile experience & employer availability'],
              ['Job types', 'Full-time, internship, contract, part-time, volunteer · paid/unpaid'],
              ['Cohort gate + plugin', 'Who sees the hub is Moodle-cohort based'],
              ['AI CV parser', 'Upload → parse → review → CV studio'],
              ['Job match explain', 'On job detail — Why 94%?'],
              ['Pathway & endorsements', 'On profile'],
              ['Tickets & digests', 'Events ticket · Careers digest'],
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
        <div class="lang-switch" title="${JACC.t('common.langMoodle')}">
          ${JACC.LANGS.map((l) => `
            <button type="button" class="lang-btn ${JACC.lang() === l.id ? 'is-on' : ''}" data-lang="${l.id}">${l.id.toUpperCase()}</button>`).join('')}
        </div>
        <a class="tb-link" href="#/gallery">${JACC.t('common.gallery')}</a>
        <button type="button" class="tb-link" id="screen-menu-btn">Screens ▾</button>
      </div>`;

    pbar.innerHTML = `
      <span class="persona-kicker" id="persona-label">${JACC.t('common.viewingAs', { name: p.label })}</span>
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
    $$('.lang-btn', bar).forEach((btn) => {
      btn.addEventListener('click', () => setLang(btn.dataset.lang));
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

    const careersScreens = new Set([
      'careers', 'job', 'apply', 'saved', 'saved-searches', 'applications', 'digest', 'match-explain',
    ]);
    const eventsScreens = new Set(['events', 'event', 'ticket', 'stories']);
    const spacesScreens = new Set(['spaces', 'space', 'space-thread', 'space-new', 'forum']);
    const profileScreens = new Set([
      'profile', 'profile-edit', 'pathway', 'endorsements', 'privacy', 'settings', 'notifications',
      'work-history', 'open-to-work',
    ]);
    const nav = p.nav.map((n) => {
      const active = n.id === screen
        || (n.id === 'careers' && careersScreens.has(screen))
        || (n.id === 'spaces' && spacesScreens.has(screen))
        || (n.id === 'events' && eventsScreens.has(screen))
        || (n.id === 'profile' && (profileScreens.has(screen) || screen.startsWith('cv-')))
        || (screen.startsWith('cv-') && n.id === 'home' && p.id !== 'alumni');
      return `<a href="#/${state.theme}/${n.id}" class="${active ? 'is-active' : ''}">${navLabel(n)}</a>`;
    }).join('');

    const homeLink = p.home;
    const headerPhoto = (p.id === 'alumni' || p.id === 'locked' || p.id === 'pending')
      ? JACC.ME
      : p.id === 'employer'
        ? { name: p.label, photo: 'assets/logos/mtn.jpg' }
        : p.id === 'admin' || p.id === 'me' || p.id === 'coordinator'
          ? { name: p.label, photo: 'assets/avatars/samuel.jpg' }
          : { name: p.label, photo: 'assets/avatars/ngozi.jpg' };

    shell.innerHTML = `
      <div class="row">
        <a class="brandmark" href="#/${state.theme}/${homeLink}"><span class="logo">JA</span> Career Hub</a>
        <nav class="navpill">${nav}</nav>
        <div class="header-actions">
          <button class="icon-btn" type="button" id="mdl-notif-btn" title="Notifications" aria-haspopup="dialog" aria-controls="mdl-notif-drawer">
            ${JACC.icon('bell')}<span class="badge" data-mdl-notif-badge>${(JACC.NOTIFICATIONS || []).filter((n) => n.unread).length || ''}</span>
          </button>
          <button class="icon-btn" type="button" id="mdl-msg-btn" title="Messages" aria-haspopup="dialog" aria-controls="mdl-msg-drawer">
            ${JACC.icon('message')}<span class="badge" data-mdl-msg-badge>${(JACC.MESSAGES || []).reduce((s, m) => s + (m.unread || 0), 0) || ''}</span>
          </button>
          <div class="user-menu" id="user-menu">
            <button type="button" class="avatar-btn" id="user-menu-btn" title="${p.label}" aria-haspopup="menu" aria-expanded="false">
              ${JACC.avatar(headerPhoto)}
            </button>
            <div class="user-menu-panel" id="user-menu-panel" role="menu" hidden>
              <div class="um-head">
                <strong>${escHtml(typeof headerPhoto === 'string' ? headerPhoto : headerPhoto.name || p.label)}</strong>
                <div class="tiny">${escHtml(p.label)} · Moodle account</div>
              </div>
              <a role="menuitem" href="#/${state.theme}/profile"><span class="um-icon">${umIcon('user')}</span>Profile</a>
              <a role="menuitem" href="#/${state.theme}/profile-edit"><span class="um-icon">${umIcon('edit')}</span>Edit profile</a>
              <a role="menuitem" href="#/${state.theme}/work-history"><span class="um-icon">${umIcon('cv')}</span>Work history</a>
              <a role="menuitem" href="#/${state.theme}/open-to-work"><span class="um-icon">${umIcon('star')}</span>Open to work</a>
              <a role="menuitem" href="#/${state.theme}/cv-start"><span class="um-icon">${umIcon('cv')}</span>CV studio</a>
              <a role="menuitem" href="#/${state.theme}/pathway"><span class="um-icon">${umIcon('path')}</span>Career pathway</a>
              <a role="menuitem" href="#/${state.theme}/endorsements"><span class="um-icon">${umIcon('star')}</span>Endorsements</a>
              <a role="menuitem" href="#/${state.theme}/privacy"><span class="um-icon">${umIcon('lock')}</span>Privacy</a>
              <div class="um-divider"></div>
              <button type="button" role="menuitem" data-toast="Moodle Grades (core)"><span class="um-icon">${umIcon('grades')}</span>Grades</button>
              <button type="button" role="menuitem" data-toast="Moodle Calendar (core)"><span class="um-icon">${umIcon('cal')}</span>Calendar</button>
              <button type="button" role="menuitem" data-toast="Moodle Private files (core)"><span class="um-icon">${umIcon('files')}</span>Private files</button>
              <div class="um-divider"></div>
              <a role="menuitem" href="#/${state.theme}/settings"><span class="um-icon">${umIcon('prefs')}</span>Preferences</a>
              <div role="menuitem" style="display:flex;align-items:center;gap:12px;min-height:42px;padding:0 16px;font-size:14px;font-weight:550">
                <span class="um-icon">${umIcon('lang')}</span>Language
                <span class="um-lang">
                  <button type="button" data-set-lang="en" class="${JACC.lang() === 'en' ? 'is-on' : ''}">EN</button>
                  <button type="button" data-set-lang="fr" class="${JACC.lang() === 'fr' ? 'is-on' : ''}">FR</button>
                </span>
              </div>
              <button type="button" role="menuitem" data-toast="Switch role… (Moodle core)"><span class="um-icon">${umIcon('role')}</span>Switch role to…</button>
              <div class="um-divider"></div>
              <a role="menuitem" href="#/${state.theme}/landing"><span class="um-icon">${umIcon('logout')}</span>Log out</a>
            </div>
          </div>
          ${p.id === 'employer' || p.id === 'admin' || p.id === 'coordinator'
            ? `<a class="btn btn-sm btn-primary hide-mobile" href="#/${state.theme}/${p.id === 'coordinator' ? 'create-event' : p.id === 'admin' ? 'plugin-settings' : 'post-job'}">${JACC.t('common.create')}</a>`
            : ''}
        </div>
      </div>
      ${(() => {
        const links = resolveSubnav(p, screen);
        if (!links.length) return '';
        return `<nav class="subnav" aria-label="Section">
          ${links.map((s) => `
            <a href="#/${state.theme}/${s.id}" class="${screen === s.id ? 'is-active' : ''}">${subLabel(s)}</a>`).join('')}
        </nav>`;
      })()}`;

    if (p.nav.length >= 2) {
      const mid = Math.min(2, p.nav.length);
      bottom.innerHTML = `
        ${p.nav.slice(0, mid).map((n) => `
          <a href="#/${state.theme}/${n.id}" class="${n.id === screen ? 'is-active' : ''}">${JACC.icon(n.icon || 'home')}<span>${navLabel(n)}</span></a>`).join('')}
        <a class="create" href="#/${state.theme}/${p.id === 'coordinator' ? 'create-event' : p.id === 'employer' ? 'post-job' : 'cv-start'}">${JACC.icon('plus')}</a>
        ${p.nav.slice(mid).map((n) => `
          <a href="#/${state.theme}/${n.id}" class="${n.id === screen ? 'is-active' : ''}">${JACC.icon(n.icon || 'home')}<span>${navLabel(n)}</span></a>`).join('')}`;
    }

    ensureMoodleChrome();
    syncHeaderBadges();
    bindChromeActions(shell);
  }

  function bindChromeActions(shell) {
    $('#mdl-notif-btn', shell)?.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openDrawer('notif');
    });
    $('#mdl-msg-btn', shell)?.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openDrawer('msg');
    });
    $('#user-menu-btn', shell)?.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleUserMenu();
    });
    $$('[data-toast]', shell).forEach((el) => {
      if (el.closest('.user-menu-panel')) {
        el.addEventListener('click', (e) => {
          if (el.tagName === 'A') return;
          e.preventDefault();
          showToast(el.dataset.toast);
          closeUserMenu();
        });
      }
    });
    $$('[data-set-lang]', shell).forEach((el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        setLang(el.dataset.setLang);
      });
    });
    $$('a[href^="#/"]', $('#user-menu-panel', shell) || shell).forEach((a) => {
      if (!a.closest('#user-menu-panel')) return;
      a.addEventListener('click', () => closeUserMenu());
    });
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
    $$('[data-set-lang]', root).forEach((el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        setLang(el.dataset.setLang);
      });
    });
    $$('.filter-chip, .choice', root).forEach((el) => {
      el.addEventListener('click', () => {
        if (el.dataset.setLang) return;
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
    if (!e.target.closest('#user-menu')) closeUserMenu();

    const closeEl = e.target.closest('[data-mdl-close]');
    if (closeEl) {
      closeDrawers();
      if (closeEl.tagName !== 'A') return;
    }
    if (e.target.id === 'mdl-overlay' || e.target.closest('#mdl-overlay')) {
      closeDrawers();
      return;
    }

    const notifItem = e.target.closest('[data-mdl-notif]');
    if (notifItem) {
      const id = Number(notifItem.dataset.mdlNotif);
      const n = (JACC.NOTIFICATIONS || []).find((x) => x.id === id);
      if (n) {
        n.unread = false;
        syncHeaderBadges();
        renderNotifDrawer();
        if (n.href) {
          closeDrawers();
          const path = n.href.replace(/^#\//, '');
          location.hash = `#/${state.theme}/${path}`;
        }
      }
      return;
    }

    if (e.target.closest('[data-mdl-mark-all]')) {
      (JACC.NOTIFICATIONS || []).forEach((n) => { n.unread = false; });
      syncHeaderBadges();
      renderNotifDrawer();
      showToast('All notifications marked read');
      return;
    }

    const openThread = e.target.closest('[data-mdl-open-thread]');
    if (openThread) {
      msgThreadId = Number(openThread.dataset.mdlOpenThread);
      const m = (JACC.MESSAGES || []).find((x) => x.id === msgThreadId);
      if (m) m.unread = 0;
      syncHeaderBadges();
      renderMsgDrawer();
      return;
    }

    if (e.target.closest('[data-mdl-msg-back]')) {
      msgThreadId = null;
      renderMsgDrawer();
      return;
    }

    if (e.target.closest('[data-mdl-send]')) {
      const input = $('#mdl-msg-drawer input');
      const text = input?.value?.trim();
      if (!text || !msgThreadId) {
        showToast('Type a message first');
        return;
      }
      if (!JACC.MESSAGE_THREADS[msgThreadId]) JACC.MESSAGE_THREADS[msgThreadId] = [];
      JACC.MESSAGE_THREADS[msgThreadId].push({ me: true, text });
      const m = (JACC.MESSAGES || []).find((x) => x.id === msgThreadId);
      if (m) { m.preview = text; m.time = 'Now'; }
      input.value = '';
      renderMsgDrawer();
      showToast('Sent via Moodle messaging');
      return;
    }

    const a = e.target.closest('a[href^="#/"]');
    if (!a) return;
    if (a.hasAttribute('data-mdl-close')) closeDrawers();
    const path = a.getAttribute('href').replace(/^#\//, '');
    const first = path.split('/')[0];
    if (first === 'gallery' || JACC.THEMES.some((t) => t.id === first)) return;
    e.preventDefault();
    location.hash = `#/${state.theme}/${path}`;
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeUserMenu();
      closeDrawers();
    }
  });

  window.addEventListener('hashchange', () => {
    closeUserMenu();
    closeDrawers();
    render();
  });
  document.addEventListener('DOMContentLoaded', () => {
    ensureMoodleChrome();
    render();
  });
})();
