/* Interactive client feedback for JACC design prototypes */
(() => {
  const STORAGE_KEY = 'jacc-design-feedback-v1';
  const REVIEWER_KEY = 'jacc-design-reviewer';
  const LIST_TAB_KEY = 'jacc-design-feedback-tab';

  const REPO = {
    owner: 'Junior-Achievement-Africa',
    name: 'JACC-Design-Prototypes',
  };

  const TYPES = [
    { id: 'suggestion', label: 'Suggestion', emoji: '✏️' },
    { id: 'issue', label: 'Issue', emoji: '⚠️' },
    { id: 'love', label: 'Love this', emoji: '💚' },
    { id: 'question', label: 'Question', emoji: '❓' },
  ];

  let annotating = false;
  let pendingPoint = null;
  let items = load();
  let teamItems = [];
  let listTab = localStorage.getItem(LIST_TAB_KEY) || 'team';
  let editingId = null;
  let teamLoading = false;

  function syncConfig() {
    return window.JACC_FEEDBACK_SYNC || {};
  }

  function feedbackLabel() {
    return syncConfig().label || 'design-feedback';
  }

  function load() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
      return [];
    }
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    updateCount();
    renderPins();
    if ($('#fb-drawer')?.classList.contains('open')) renderList();
  }

  function reviewer() {
    return localStorage.getItem(REVIEWER_KEY) || '';
  }

  function setReviewer(name) {
    localStorage.setItem(REVIEWER_KEY, name.trim());
  }

  function routeInfo() {
    const raw = (location.hash || '#/gallery').replace(/^#\/?/, '');
    const parts = raw.split('/').filter(Boolean);
    if (parts[0] === 'gallery' || !parts.length) {
      return { theme: document.documentElement.getAttribute('data-theme') || 'baobab', screen: 'gallery' };
    }
    const themes = (window.JACC?.THEMES || []).map((t) => t.id);
    if (themes.includes(parts[0])) {
      return { theme: parts[0], screen: parts[1] || 'home' };
    }
    return {
      theme: document.documentElement.getAttribute('data-theme') || 'baobab',
      screen: parts[0] || 'home',
    };
  }

  function $(sel, root = document) {
    return root.querySelector(sel);
  }

  function uid() {
    return `fb_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
  }

  function syncStatusHtml() {
    const cfg = syncConfig();
    if (cfg.githubToken) {
      return 'New pins are shared to the team automatically (GitHub). Open the <strong>Team</strong> tab to see everyone’s notes.';
    }
    if (cfg.formEndpoint) {
      return 'New pins are emailed to the project inbox. Use <strong>Share with team</strong> if you also want a GitHub issue.';
    }
    return 'Pins start on this device. Tap <strong>Share with team</strong> on a note (or enable auto-sync in <code>feedback-config.js</code>) so the JA team can see them.';
  }

  function ensureUI() {
    if ($('#fb-root')) return;

    const root = document.createElement('div');
    root.id = 'fb-root';
    root.innerHTML = `
      <div class="fb-hint" id="fb-hint">Click anywhere on the screen to leave feedback</div>
      <div class="fb-fab">
        <button type="button" class="fb-main" id="fb-toggle" title="Leave design feedback">
          Feedback <span class="fb-count" id="fb-count">0</span>
        </button>
      </div>
      <div class="fb-drawer" id="fb-drawer" aria-hidden="true">
        <header>
          <h2>Client feedback</h2>
          <button type="button" class="icon-btn" id="fb-close" aria-label="Close">✕</button>
        </header>
        <div class="fb-body">
          <p class="fb-howto" id="fb-howto">${syncStatusHtml()}</p>
          <div class="fb-reviewer">
            <label for="fb-name">Your name (shown on comments)</label>
            <input id="fb-name" type="text" placeholder="e.g. Ama · Alumni Relations" value="${escapeAttr(reviewer())}">
          </div>
          <div class="fb-actions">
            <button type="button" class="primary" id="fb-arm">📍 Add pin on this screen</button>
            <button type="button" id="fb-refresh-team">↻ Refresh team feedback</button>
            <button type="button" id="fb-export-md">⬇ Export my notes (Markdown)</button>
            <button type="button" id="fb-export-json">⬇ Export my notes (JSON)</button>
            <button type="button" id="fb-copy">📋 Copy my notes</button>
            <a class="primary" id="fb-issue" href="#" target="_blank" rel="noopener">↗ Send my notes as GitHub Issue</a>
            <button type="button" class="danger" id="fb-clear">Clear my local notes</button>
          </div>
          <div class="fb-tabs" role="tablist">
            <button type="button" class="fb-tab" data-tab="team" role="tab">Team</button>
            <button type="button" class="fb-tab" data-tab="mine" role="tab">Mine</button>
          </div>
          <div id="fb-list" class="fb-list"></div>
        </div>
      </div>
    `;
    document.body.appendChild(root);

    const layer = document.createElement('div');
    layer.className = 'fb-layer';
    layer.id = 'fb-layer';
    document.body.appendChild(layer);
    document.body.style.position = 'relative';

    $('#fb-toggle').addEventListener('click', () => {
      if (annotating) stopAnnotating();
      else openDrawer();
    });
    $('#fb-close').addEventListener('click', closeDrawer);
    $('#fb-arm').addEventListener('click', () => {
      closeDrawer();
      startAnnotating();
    });
    $('#fb-name').addEventListener('change', (e) => setReviewer(e.target.value));
    $('#fb-export-md').addEventListener('click', () => download('jacc-feedback.md', toMarkdown(), 'text/markdown'));
    $('#fb-export-json').addEventListener('click', () => download('jacc-feedback.json', JSON.stringify(items, null, 2), 'application/json'));
    $('#fb-copy').addEventListener('click', async () => {
      await navigator.clipboard.writeText(toMarkdown());
      toast('Feedback report copied');
    });
    $('#fb-issue').addEventListener('click', onSendGitHubIssue);
    $('#fb-refresh-team').addEventListener('click', () => fetchTeamFeedback({ force: true, toastOnDone: true }));
    $('#fb-clear').addEventListener('click', () => {
      if (!items.length) return;
      if (confirm('Clear all feedback stored in this browser? Team notes on GitHub are kept.')) {
        items = [];
        save();
        toast('Local feedback cleared');
      }
    });
    root.querySelectorAll('.fb-tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        listTab = tab.dataset.tab;
        localStorage.setItem(LIST_TAB_KEY, listTab);
        renderList();
      });
    });
    updateIssueLink();
    updateCount();
    renderList();
  }

  function loadHtml2Canvas() {
    if (window.html2canvas) return Promise.resolve(window.html2canvas);
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js';
      s.async = true;
      s.onload = () => (window.html2canvas ? resolve(window.html2canvas) : reject(new Error('html2canvas missing')));
      s.onerror = () => reject(new Error('Could not load screenshot library'));
      document.head.appendChild(s);
    });
  }

  function downloadBlob(filename, blob) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function captureFeedbackShot() {
    const html2canvas = await loadHtml2Canvas();
    closeDrawer();
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    renderPins();
    const canvas = await html2canvas(document.body, {
      useCORS: true,
      allowTaint: true,
      logging: false,
      scale: Math.min(2, window.devicePixelRatio || 1),
      backgroundColor: getComputedStyle(document.body).backgroundColor || '#ffffff',
      ignoreElements: (el) => !!(
        el.id === 'fb-drawer'
        || el.id === 'fb-scrim'
        || el.id === 'fb-hint'
        || el.id === 'fb-root'
        || el.classList?.contains('theme-bar')
        || el.id === 'persona-bar'
        || el.classList?.contains('fb-modal-backdrop')
        || el.classList?.contains('toast')
      ),
    });
    return canvas;
  }

  async function onSendGitHubIssue(e) {
    e.preventDefault();
    if (!items.length) return;
    const a = $('#fb-issue');
    const prev = a.textContent;
    a.textContent = 'Capturing screenshot…';
    a.style.pointerEvents = 'none';
    try {
      updateIssueLink({ withScreenshotNote: true });
      const canvas = await captureFeedbackShot();
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
      if (blob) {
        const stamp = new Date().toISOString().slice(0, 10);
        const { theme, screen } = routeInfo();
        downloadBlob(`jacc-feedback-${theme}-${screen}-${stamp}.png`, blob);
        toast('Screenshot downloaded — drop it onto the GitHub issue');
      }
      window.open(a.href, '_blank', 'noopener');
    } catch (err) {
      console.warn(err);
      updateIssueLink({ withScreenshotNote: false });
      toast('Opened issue without screenshot — attach Export Markdown if needed');
      window.open(a.href, '_blank', 'noopener');
    } finally {
      a.textContent = prev;
      a.style.pointerEvents = items.length ? 'auto' : 'none';
      updateIssueLink();
    }
  }

  function escapeAttr(s) {
    return String(s || '').replace(/"/g, '&quot;');
  }

  function escapeHtml(s) {
    return String(s ?? '').replace(/[&<>"']/g, (c) => (
      { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
    ));
  }

  function openDrawer() {
    ensureUI();
    $('#fb-drawer').classList.add('open');
    $('#fb-drawer').setAttribute('aria-hidden', 'false');
    const howto = $('#fb-howto');
    if (howto) howto.innerHTML = syncStatusHtml();
    renderList();
    updateIssueLink();
    fetchTeamFeedback();
    let scrim = $('#fb-scrim');
    if (!scrim) {
      scrim = document.createElement('div');
      scrim.id = 'fb-scrim';
      scrim.className = 'fb-scrim';
      scrim.addEventListener('click', closeDrawer);
      document.body.appendChild(scrim);
    }
  }

  function closeDrawer() {
    $('#fb-drawer')?.classList.remove('open');
    $('#fb-drawer')?.setAttribute('aria-hidden', 'true');
    $('#fb-scrim')?.remove();
  }

  function startAnnotating() {
    annotating = true;
    document.body.classList.add('fb-annotating');
    $('#fb-toggle')?.classList.add('is-armed');
    $('#fb-toggle').innerHTML = 'Click UI to pin · Esc cancel';
    const hint = $('#fb-hint');
    hint?.classList.add('show');
    setTimeout(() => hint?.classList.remove('show'), 2500);
  }

  function stopAnnotating() {
    annotating = false;
    document.body.classList.remove('fb-annotating');
    $('#fb-toggle')?.classList.remove('is-armed');
    updateCount();
  }

  function updateCount() {
    const btn = $('#fb-toggle');
    if (!btn || annotating) return;
    const local = items.length;
    const team = teamItems.length;
    const label = team ? `${local}<span class="fb-count-sep">·</span>${team}` : `${local}`;
    btn.innerHTML = `Feedback <span class="fb-count" title="Local · Team">${label}</span>`;
  }

  function mergedPinsForScreen() {
    const { theme, screen } = routeInfo();
    const map = new Map();
    teamItems.filter((i) => i.theme === theme && i.screen === screen).forEach((i) => map.set(i.id, { ...i, source: 'team' }));
    items.filter((i) => i.theme === theme && i.screen === screen).forEach((i) => {
      if (!map.has(i.id)) map.set(i.id, { ...i, source: i.shared ? 'shared' : 'local' });
    });
    return [...map.values()];
  }

  function renderPins() {
    const layer = $('#fb-layer');
    if (!layer) return;
    const h = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight, window.innerHeight);
    layer.style.height = `${h}px`;
    const list = mergedPinsForScreen();
    layer.innerHTML = list.map((item, idx) => `
      <button type="button" class="fb-pin ${item.source === 'team' ? 'is-team' : ''}" data-type="${escapeAttr(item.type)}" data-id="${escapeAttr(item.id)}"
        style="left:${item.x * 100}%;top:${item.y * 100}%" title="${escapeAttr(item.message)}">
        <span>${idx + 1}</span>
      </button>`).join('');

    layer.querySelectorAll('.fb-pin').forEach((pin) => {
      pin.addEventListener('click', (e) => {
        e.stopPropagation();
        listTab = teamItems.some((t) => t.id === pin.dataset.id) ? 'team' : 'mine';
        localStorage.setItem(LIST_TAB_KEY, listTab);
        openDrawer();
        highlightItem(pin.dataset.id);
      });
    });
  }

  function highlightItem(id) {
    renderList();
    const el = $(`[data-fb-item="${id}"]`);
    el?.scrollIntoView({ block: 'nearest' });
    el?.style.setProperty('outline', '2px solid var(--ja-enterprise-aqua)');
    setTimeout(() => el?.style.removeProperty('outline'), 1600);
  }

  function renderList() {
    const host = $('#fb-list');
    if (!host) return;

    document.querySelectorAll('.fb-tab').forEach((tab) => {
      tab.classList.toggle('is-on', tab.dataset.tab === listTab);
      tab.setAttribute('aria-selected', tab.dataset.tab === listTab ? 'true' : 'false');
    });

    if (listTab === 'team') {
      if (teamLoading && !teamItems.length) {
        host.innerHTML = `<div class="fb-empty">Loading team feedback…</div>`;
        return;
      }
      if (!teamItems.length) {
        host.innerHTML = `<div class="fb-empty">No shared team notes yet.<br>When someone taps <strong>Share with team</strong> (or auto-sync is on), their pins show up here for everyone.</div>`;
        return;
      }
      const sorted = [...teamItems].sort((a, b) => b.ts - a.ts);
      host.innerHTML = sorted.map((item) => listCard(item, { team: true })).join('');
    } else if (!items.length) {
      host.innerHTML = `<div class="fb-empty">No local notes yet.<br>Use “Add pin” while reviewing a screen.</div>`;
    } else {
      const sorted = [...items].sort((a, b) => b.ts - a.ts);
      host.innerHTML = sorted.map((item) => listCard(item, { team: false })).join('');
    }

    host.querySelectorAll('[data-goto]').forEach((btn) => {
      btn.addEventListener('click', () => {
        closeDrawer();
        location.hash = `#/${btn.dataset.goto}`;
      });
    });
    host.querySelectorAll('[data-edit]').forEach((btn) => {
      btn.addEventListener('click', () => openComposer(null, btn.dataset.edit));
    });
    host.querySelectorAll('[data-del]').forEach((btn) => {
      btn.addEventListener('click', () => {
        items = items.filter((i) => i.id !== btn.dataset.del);
        save();
        toast('Comment removed');
      });
    });
    host.querySelectorAll('[data-share]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const item = items.find((i) => i.id === btn.dataset.share);
        if (item) shareItem(item);
      });
    });
    host.querySelectorAll('[data-issue-url]').forEach((btn) => {
      btn.addEventListener('click', () => window.open(btn.dataset.issueUrl, '_blank', 'noopener'));
    });
  }

  function listCard(item, { team }) {
    const type = TYPES.find((t) => t.id === item.type) || TYPES[0];
    const shared = item.shared || team;
    return `
      <article class="fb-item ${team ? 'is-team' : ''}" data-fb-item="${escapeAttr(item.id)}">
        <div class="meta">
          <span class="pill">${type.emoji} ${type.label}</span>
          <span class="pill">${escapeHtml(item.theme)} / ${escapeHtml(item.screen)}</span>
          ${shared ? '<span class="pill fb-pill-team">Team</span>' : '<span class="pill">Local only</span>'}
          <span class="tiny">${escapeHtml(item.author || 'Anonymous')} · ${new Date(item.ts).toLocaleString()}</span>
        </div>
        <p class="msg">${escapeHtml(item.message)}</p>
        <div class="row-actions">
          <button type="button" data-goto="${escapeAttr(item.theme)}/${escapeAttr(item.screen)}">Open screen</button>
          ${team && item.issueUrl ? `<button type="button" data-issue-url="${escapeAttr(item.issueUrl)}">View on GitHub</button>` : ''}
          ${!team ? `<button type="button" data-share="${escapeAttr(item.id)}">${item.shared ? 'Shared ✓' : 'Share with team'}</button>` : ''}
          ${!team ? `<button type="button" data-edit="${escapeAttr(item.id)}">Edit</button>` : ''}
          ${!team ? `<button type="button" data-del="${escapeAttr(item.id)}">Delete</button>` : ''}
        </div>
      </article>`;
  }

  function itemPayload(item) {
    return {
      id: item.id,
      type: item.type,
      message: item.message,
      author: item.author,
      theme: item.theme,
      screen: item.screen,
      x: item.x,
      y: item.y,
      href: item.href,
      ts: item.ts,
    };
  }

  function issueBodyForItem(item) {
    const type = TYPES.find((t) => t.id === item.type)?.label || item.type;
    const payload = JSON.stringify(itemPayload(item));
    return [
      `### ${type}`,
      '',
      `- Author: ${item.author}`,
      `- Screen: ${prototypeUrl(item.theme, item.screen)}`,
      `- Theme / screen: \`${item.theme}\` / \`${item.screen}\``,
      `- Position: ${Math.round(item.x * 100)}% × ${Math.round(item.y * 100)}%`,
      `- When: ${new Date(item.ts).toISOString()}`,
      '',
      item.message,
      '',
      `<!--jacc-feedback ${payload} -->`,
      '',
    ].join('\n');
  }

  function parseTeamIssue(issue) {
    const body = issue.body || '';
    const marker = body.match(/<!--jacc-feedback\s+(\{[\s\S]*?\})\s*-->/);
    let data = null;
    if (marker) {
      try { data = JSON.parse(marker[1]); } catch { /* ignore */ }
    }
    if (!data) {
      const themeScreen = body.match(/Theme \/ screen:\s*`([^`]+)`\s*\/\s*`([^`]+)`/);
      const pos = body.match(/Position:\s*(\d+)%\s*×\s*(\d+)%/);
      if (!themeScreen) return null;
      data = {
        id: `gh_${issue.number}`,
        type: 'suggestion',
        message: issue.title.replace(/^\[[^\]]+\]\s*/, ''),
        author: issue.user?.login || 'GitHub',
        theme: themeScreen[1],
        screen: themeScreen[2],
        x: pos ? Number(pos[1]) / 100 : 0.5,
        y: pos ? Number(pos[2]) / 100 : 0.2,
        ts: Date.parse(issue.created_at) || Date.now(),
      };
    }
    return {
      ...data,
      id: data.id || `gh_${issue.number}`,
      shared: true,
      source: 'team',
      issueUrl: issue.html_url,
      issueNumber: issue.number,
      ts: data.ts || Date.parse(issue.created_at) || Date.now(),
    };
  }

  async function fetchTeamFeedback({ force = false, toastOnDone = false } = {}) {
    if (teamLoading && !force) return;
    teamLoading = true;
    if ($('#fb-drawer')?.classList.contains('open') && listTab === 'team') renderList();
    try {
      const label = encodeURIComponent(feedbackLabel());
      const url = `https://api.github.com/repos/${REPO.owner}/${REPO.name}/issues?state=open&labels=${label}&per_page=100`;
      const headers = { Accept: 'application/vnd.github+json' };
      const token = syncConfig().githubToken;
      if (token) headers.Authorization = `Bearer ${token}`;
      const res = await fetch(url, { headers });
      if (!res.ok) throw new Error(`GitHub ${res.status}`);
      const issues = await res.json();
      teamItems = (Array.isArray(issues) ? issues : [])
        .map(parseTeamIssue)
        .filter(Boolean);
      updateCount();
      renderPins();
      if ($('#fb-drawer')?.classList.contains('open')) renderList();
      if (toastOnDone) toast(`Loaded ${teamItems.length} team note(s)`);
    } catch (err) {
      console.warn('Team feedback fetch failed', err);
      if (toastOnDone) toast('Could not refresh team feedback');
    } finally {
      teamLoading = false;
      if ($('#fb-drawer')?.classList.contains('open') && listTab === 'team') renderList();
    }
  }

  async function publishViaGitHubApi(item) {
    const token = syncConfig().githubToken;
    if (!token) return null;
    const type = TYPES.find((t) => t.id === item.type)?.label || item.type;
    const title = `[${type}] ${item.theme}/${item.screen}: ${item.message.slice(0, 72)}`;
    const res = await fetch(`https://api.github.com/repos/${REPO.owner}/${REPO.name}/issues`, {
      method: 'POST',
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        body: issueBodyForItem(item),
        labels: [feedbackLabel()],
      }),
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || `GitHub ${res.status}`);
    }
    return res.json();
  }

  async function publishViaForm(item) {
    const endpoint = syncConfig().formEndpoint;
    if (!endpoint) return null;
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...itemPayload(item),
        _subject: `JACC design feedback · ${item.theme}/${item.screen}`,
      }),
    });
    if (!res.ok) throw new Error(`Form ${res.status}`);
    return true;
  }

  function openManualShare(item) {
    const type = TYPES.find((t) => t.id === item.type)?.label || item.type;
    const title = encodeURIComponent(`[${type}] ${item.theme}/${item.screen}: ${item.message.slice(0, 72)}`);
    let body = issueBodyForItem(item);
    if (body.length > 5500) body = `${body.slice(0, 5500)}\n\n_Truncated_`;
    const labels = encodeURIComponent(feedbackLabel());
    const url = `https://github.com/${REPO.owner}/${REPO.name}/issues/new?title=${title}&labels=${labels}&body=${encodeURIComponent(body)}`;
    window.open(url, '_blank', 'noopener');
  }

  async function shareItem(item, { quiet = false } = {}) {
    try {
      const issue = await publishViaGitHubApi(item);
      if (issue) {
        item.shared = true;
        item.issueUrl = issue.html_url;
        item.issueNumber = issue.number;
        save();
        await fetchTeamFeedback({ force: true });
        if (!quiet) toast('Shared with the team');
        return 'api';
      }
      await publishViaForm(item);
      if (syncConfig().formEndpoint) {
        item.shared = true;
        save();
        if (!quiet) toast('Sent to the project inbox');
        return 'form';
      }
      openManualShare(item);
      if (!quiet) toast('Finish by submitting the GitHub issue');
      return 'manual';
    } catch (err) {
      console.warn(err);
      openManualShare(item);
      if (!quiet) toast('Opened GitHub — submit the issue to share');
      return 'manual';
    }
  }

  function openComposer(point, editId) {
    editingId = editId || null;
    const existing = editId ? items.find((i) => i.id === editId) : null;
    pendingPoint = point;

    const backdrop = document.createElement('div');
    backdrop.className = 'fb-modal-backdrop';
    backdrop.id = 'fb-modal';
    const selected = existing?.type || 'suggestion';
    const canAutoShare = !!(syncConfig().githubToken || syncConfig().formEndpoint);
    backdrop.innerHTML = `
      <div class="fb-modal" role="dialog" aria-modal="true" aria-labelledby="fb-modal-title">
        <h3 id="fb-modal-title">${existing ? 'Edit feedback' : 'Add feedback'}</h3>
        <p class="sub">${existing
          ? `${existing.theme} · ${existing.screen}`
          : `${routeInfo().theme} · ${routeInfo().screen} · pin at ${Math.round((point?.x || 0) * 100)}%, ${Math.round((point?.y || 0) * 100)}%`}</p>
        <div class="fb-types">
          ${TYPES.map((t) => `
            <button type="button" data-type="${t.id}" class="${t.id === selected ? 'is-on' : ''}">${t.emoji} ${t.label}</button>`).join('')}
        </div>
        <textarea id="fb-message" placeholder="What should we change or keep? Be specific…">${escapeHtml(existing?.message || '')}</textarea>
        ${!existing ? `
          <label class="fb-share-toggle">
            <input type="checkbox" id="fb-share-now" ${canAutoShare ? 'checked' : 'checked'}>
            Share with the JA team (so it appears for everyone)
          </label>` : ''}
        <div class="modal-actions">
          <button type="button" id="fb-cancel">Cancel</button>
          <button type="button" class="save" id="fb-save">Save</button>
        </div>
      </div>`;
    document.body.appendChild(backdrop);

    let type = selected;
    backdrop.querySelectorAll('[data-type]').forEach((btn) => {
      btn.addEventListener('click', () => {
        type = btn.dataset.type;
        backdrop.querySelectorAll('[data-type]').forEach((b) => b.classList.toggle('is-on', b === btn));
      });
    });
    $('#fb-cancel', backdrop).addEventListener('click', () => backdrop.remove());
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) backdrop.remove();
    });
    $('#fb-save', backdrop).addEventListener('click', async () => {
      const message = $('#fb-message', backdrop).value.trim();
      if (!message) {
        $('#fb-message', backdrop).focus();
        return;
      }
      const name = ($('#fb-name')?.value || reviewer()).trim();
      if (name) setReviewer(name);
      const shareNow = $('#fb-share-now', backdrop)?.checked;

      let saved = existing;
      if (existing) {
        existing.message = message;
        existing.type = type;
        existing.author = name || existing.author;
        existing.ts = Date.now();
      } else {
        const { theme, screen } = routeInfo();
        saved = {
          id: uid(),
          type,
          message,
          author: name || 'Anonymous',
          theme,
          screen,
          x: point.x,
          y: point.y,
          href: location.href,
          ts: Date.now(),
          ua: navigator.userAgent.slice(0, 120),
          shared: false,
        };
        items.push(saved);
      }
      save();
      updateIssueLink();
      backdrop.remove();
      stopAnnotating();
      listTab = shareNow ? 'team' : 'mine';
      localStorage.setItem(LIST_TAB_KEY, listTab);
      openDrawer();
      if (!existing && shareNow && saved) {
        toast('Sharing with team…');
        await shareItem(saved, { quiet: true });
        toast((saved.shared || syncConfig().githubToken) ? 'Pinned & shared with the team' : 'Pinned — submit the GitHub issue to finish sharing');
      } else {
        toast(existing ? 'Feedback updated' : 'Feedback pinned');
      }
    });
    setTimeout(() => $('#fb-message', backdrop)?.focus(), 50);
  }

  function prototypeUrl(theme, screen) {
    const base = `${location.origin}${location.pathname}`.replace(/\/$/, '') || location.href.split('#')[0];
    return `${base}/#/${theme}/${screen}`;
  }

  function toMarkdown({ withScreenshotNote = false } = {}) {
    const byScreen = {};
    items.forEach((i) => {
      const key = `${i.theme} / ${i.screen}`;
      (byScreen[key] ||= []).push(i);
    });
    const lines = [
      '# JACC Design Prototype Feedback',
      '',
      `Generated: ${new Date().toISOString()}`,
      `Reviewer(s): ${[...new Set(items.map((i) => i.author))].join(', ') || '—'}`,
      `Total notes: ${items.length}`,
      '',
    ];
    if (withScreenshotNote) {
      lines.push(
        '> **Screenshot:** a PNG was downloaded with this report. Drag that file onto this issue so the pins are visible.',
        '',
      );
    }
    Object.entries(byScreen).forEach(([key, list]) => {
      const sample = list[0];
      lines.push(`## ${key}`, '');
      if (sample) lines.push(`- Screen: ${prototypeUrl(sample.theme, sample.screen)}`, '');
      list.forEach((i, idx) => {
        const type = TYPES.find((t) => t.id === i.type)?.label || i.type;
        lines.push(
          `### ${idx + 1}. ${type}`,
          `- Author: ${i.author}`,
          `- Position: ${Math.round(i.x * 100)}% × ${Math.round(i.y * 100)}%`,
          `- When: ${new Date(i.ts).toISOString()}`,
          '',
          i.message,
          '',
          `<!--jacc-feedback ${JSON.stringify(itemPayload(i))} -->`,
          '',
        );
      });
    });
    if (!items.length) lines.push('_No feedback captured yet._', '');
    return lines.join('\n');
  }

  function download(filename, text, type) {
    const blob = new Blob([text], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    toast(`Downloaded ${filename}`);
  }

  function updateIssueLink(opts = {}) {
    const a = $('#fb-issue');
    if (!a) return;
    const title = encodeURIComponent(`Design feedback · ${items.length} note(s) · ${new Date().toISOString().slice(0, 10)}`);
    let body = toMarkdown(opts);
    if (body.length > 5500) {
      body = `${body.slice(0, 5500)}\n\n---\n_Truncated — please also attach the exported Markdown/JSON from the prototype._\n`;
    }
    const labels = encodeURIComponent(feedbackLabel());
    a.href = `https://github.com/${REPO.owner}/${REPO.name}/issues/new?title=${title}&labels=${labels}&body=${encodeURIComponent(body)}`;
    a.style.opacity = items.length ? '1' : '.5';
    a.style.pointerEvents = items.length ? 'auto' : 'none';
  }

  function toast(msg) {
    let el = $('.toast');
    if (!el) {
      el = document.createElement('div');
      el.className = 'toast';
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove('show'), 2400);
  }

  function onPointer(e) {
    if (!annotating) return;
    if (e.target.closest('#fb-root, .fb-pin, .fb-modal-backdrop, .theme-bar, .app-header, .bottom-nav, .fb-drawer, .mdl-drawer, .mdl-overlay, .user-menu-panel')) return;
    e.preventDefault();
    e.stopPropagation();
    const w = Math.max(document.documentElement.scrollWidth, window.innerWidth);
    const h = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight, window.innerHeight);
    const point = {
      x: Math.min(0.98, Math.max(0.02, e.pageX / w)),
      y: Math.min(0.98, Math.max(0.02, e.pageY / h)),
    };
    stopAnnotating();
    openComposer(point);
  }

  document.addEventListener('click', onPointer, true);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      stopAnnotating();
      $('#fb-modal')?.remove();
      closeDrawer();
    }
  });

  window.addEventListener('hashchange', () => {
    renderPins();
    updateIssueLink();
  });

  const mo = new MutationObserver(() => renderPins());
  document.addEventListener('DOMContentLoaded', () => {
    ensureUI();
    renderPins();
    fetchTeamFeedback();
    const app = $('#app');
    if (app) mo.observe(app, { childList: true, subtree: true });
  });

  window.JACCFeedback = {
    getAll: () => [...items],
    getTeam: () => [...teamItems],
    exportMarkdown: toMarkdown,
    refreshTeam: () => fetchTeamFeedback({ force: true, toastOnDone: true }),
    clear: () => { items = []; save(); },
  };
})();
