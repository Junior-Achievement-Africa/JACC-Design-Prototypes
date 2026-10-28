/* Interactive client feedback for JACC design prototypes */
(() => {
  const STORAGE_KEY = 'jacc-design-feedback-v1';
  const REVIEWER_KEY = 'jacc-design-reviewer';

  // Filled after repo is known; update if fork/rename
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
  let editingId = null;

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
          <p class="fb-howto">
            Tap <strong>Add pin</strong>, then click the part of the UI you want to comment on.
            Feedback is saved in this browser. Export or open a GitHub Issue so the team can collect it.
          </p>
          <div class="fb-reviewer">
            <label for="fb-name">Your name (shown on comments)</label>
            <input id="fb-name" type="text" placeholder="e.g. Ama · Alumni Relations" value="${escapeAttr(reviewer())}">
          </div>
          <div class="fb-actions">
            <button type="button" class="primary" id="fb-arm">📍 Add pin on this screen</button>
            <button type="button" id="fb-export-md">⬇ Export Markdown</button>
            <button type="button" id="fb-export-json">⬇ Export JSON</button>
            <button type="button" id="fb-copy">📋 Copy report</button>
            <a class="primary" id="fb-issue" href="#" target="_blank" rel="noopener">↗ Send as GitHub Issue</a>
            <button type="button" class="danger" id="fb-clear">Clear all locally</button>
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
    $('#fb-clear').addEventListener('click', () => {
      if (!items.length) return;
      if (confirm('Clear all feedback stored in this browser?')) {
        items = [];
        save();
        toast('Local feedback cleared');
      }
    });
    updateIssueLink();
    updateCount();
    renderList();
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
    renderList();
    updateIssueLink();
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
    const n = items.length;
    btn.innerHTML = `Feedback <span class="fb-count">${n}</span>`;
  }

  function currentPins() {
    const { theme, screen } = routeInfo();
    return items.filter((i) => i.theme === theme && i.screen === screen);
  }

  function renderPins() {
    const layer = $('#fb-layer');
    if (!layer) return;
    const h = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight, window.innerHeight);
    layer.style.height = `${h}px`;
    const list = currentPins();
    layer.innerHTML = list.map((item, idx) => `
      <button type="button" class="fb-pin" data-type="${escapeAttr(item.type)}" data-id="${escapeAttr(item.id)}"
        style="left:${item.x * 100}%;top:${item.y * 100}%" title="${escapeAttr(item.message)}">
        <span>${idx + 1}</span>
      </button>`).join('');

    layer.querySelectorAll('.fb-pin').forEach((pin) => {
      pin.addEventListener('click', (e) => {
        e.stopPropagation();
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
    if (!items.length) {
      host.innerHTML = `<div class="fb-empty">No feedback yet.<br>Use “Add pin” while reviewing a screen.</div>`;
      return;
    }
    const sorted = [...items].sort((a, b) => b.ts - a.ts);
    host.innerHTML = sorted.map((item) => {
      const type = TYPES.find((t) => t.id === item.type) || TYPES[0];
      return `
        <article class="fb-item" data-fb-item="${escapeAttr(item.id)}">
          <div class="meta">
            <span class="pill">${type.emoji} ${type.label}</span>
            <span class="pill">${escapeHtml(item.theme)} / ${escapeHtml(item.screen)}</span>
            <span class="tiny">${escapeHtml(item.author || 'Anonymous')} · ${new Date(item.ts).toLocaleString()}</span>
          </div>
          <p class="msg">${escapeHtml(item.message)}</p>
          <div class="row-actions">
            <button type="button" data-goto="${escapeAttr(item.theme)}/${escapeAttr(item.screen)}">Open screen</button>
            <button type="button" data-edit="${escapeAttr(item.id)}">Edit</button>
            <button type="button" data-del="${escapeAttr(item.id)}">Delete</button>
          </div>
        </article>`;
    }).join('');

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
  }

  function openComposer(point, editId) {
    editingId = editId || null;
    const existing = editId ? items.find((i) => i.id === editId) : null;
    pendingPoint = point;

    const backdrop = document.createElement('div');
    backdrop.className = 'fb-modal-backdrop';
    backdrop.id = 'fb-modal';
    const selected = existing?.type || 'suggestion';
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
    $('#fb-save', backdrop).addEventListener('click', () => {
      const message = $('#fb-message', backdrop).value.trim();
      if (!message) {
        $('#fb-message', backdrop).focus();
        return;
      }
      const name = ($('#fb-name')?.value || reviewer()).trim();
      if (name) setReviewer(name);

      if (existing) {
        existing.message = message;
        existing.type = type;
        existing.author = name || existing.author;
        existing.ts = Date.now();
      } else {
        const { theme, screen } = routeInfo();
        items.push({
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
        });
      }
      save();
      updateIssueLink();
      backdrop.remove();
      stopAnnotating();
      openDrawer();
      toast(existing ? 'Feedback updated' : 'Feedback pinned');
    });
    setTimeout(() => $('#fb-message', backdrop)?.focus(), 50);
  }

  function toMarkdown() {
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
    Object.entries(byScreen).forEach(([key, list]) => {
      lines.push(`## ${key}`, '');
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

  function updateIssueLink() {
    const a = $('#fb-issue');
    if (!a) return;
    const title = encodeURIComponent(`Design feedback · ${items.length} note(s) · ${new Date().toISOString().slice(0, 10)}`);
    let body = toMarkdown();
    // GitHub URL length safety
    if (body.length > 5500) {
      body = `${body.slice(0, 5500)}\n\n---\n_Truncated — please also attach the exported Markdown/JSON from the prototype._\n`;
    }
    a.href = `https://github.com/${REPO.owner}/${REPO.name}/issues/new?title=${title}&body=${encodeURIComponent(body)}`;
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
    el._t = setTimeout(() => el.classList.remove('show'), 2000);
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

  // Re-render pins after app paints a screen
  const mo = new MutationObserver(() => renderPins());
  document.addEventListener('DOMContentLoaded', () => {
    ensureUI();
    renderPins();
    const app = $('#app');
    if (app) mo.observe(app, { childList: true, subtree: true });
  });

  // Expose for debugging / future integrations
  window.JACCFeedback = {
    getAll: () => [...items],
    exportMarkdown: toMarkdown,
    clear: () => { items = []; save(); },
  };
})();
