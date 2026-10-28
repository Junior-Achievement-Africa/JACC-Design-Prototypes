/* Avatars — African youth photos first, initials only when missing / failed */
window.JACC = window.JACC || {};

JACC.ME = {
  name: 'Efua Boateng',
  photo: 'assets/avatars/efua.jpg',
  headline: 'Product Analyst · Accra',
};

/** Local African youth portraits keyed by person name */
JACC.PHOTOS = {
  'Efua Boateng': 'assets/avatars/efua.jpg',
  'Ama Mensah': 'assets/avatars/ama.jpg',
  'Kwame Osei': 'assets/avatars/kwame.jpg',
  'Fatou Diallo': 'assets/avatars/fatou.jpg',
  'James Okoro': null, // intentional: initials fallback demo
  'Ngozi Adeyemi': 'assets/avatars/ngozi.jpg',
  'Samuel Kariuki': 'assets/avatars/samuel.jpg',
  'Ibrahim Touré': 'assets/avatars/ibrahim.jpg',
  'Wanjiru Kamau': 'assets/avatars/wanjiru.jpg',
  'Adaobi Nwosu': 'assets/avatars/adaobi.jpg',
  'Yeboah Kofi': 'assets/avatars/yeboah.jpg',
  'Aisha Bello': 'assets/avatars/aisha.jpg',
  "Pierre N'Guessan": 'assets/avatars/pierre.jpg',
  'Kwesi Addo': 'assets/avatars/kwesi.jpg',
  'Mariama Sy': 'assets/avatars/mariama.jpg',
  'Chinedu Okafor': 'assets/avatars/chinedu.jpg',
  'MTN Talent Team': 'assets/avatars/mtn.jpg',
  'JA Events': null,
};

JACC.initials = (name) => {
  const parts = String(name || '?').trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

JACC.photoFor = (name) => {
  if (!name) return null;
  if (Object.prototype.hasOwnProperty.call(JACC.PHOTOS, name)) return JACC.PHOTOS[name];
  return null;
};

/**
 * @param {string|{name:string,photo?:string|null}} person
 * @param {string} [sizeClass] e.g. 'lg' | 'sm' | 'sq'
 */
JACC.avatar = (person, sizeClass = '') => {
  const name = typeof person === 'string' ? person : (person?.name || '?');
  const photo = typeof person === 'string'
    ? JACC.photoFor(name)
    : (person?.photo !== undefined ? person.photo : JACC.photoFor(name));
  const initials = JACC.initials(name);
  const cls = ['avatar', sizeClass, photo ? 'has-photo' : ''].filter(Boolean).join(' ');
  const safeName = String(name).replace(/"/g, '&quot;');
  if (photo) {
    return `<span class="${cls}" title="${safeName}"><img src="${photo}" alt="" loading="lazy" decoding="async" data-fallback="${initials}" onerror="JACC.avatarFallback(this)"></span>`;
  }
  return `<span class="${cls}" title="${safeName}" aria-hidden="true">${initials}</span>`;
};

JACC.avatarFallback = (img) => {
  const wrap = img.parentElement;
  if (!wrap) return;
  const initials = img.getAttribute('data-fallback') || '?';
  wrap.classList.remove('has-photo');
  wrap.textContent = initials;
};

/** Apply photos onto existing data collections once */
JACC.hydratePeople = () => {
  (JACC.STORIES || []).forEach((s) => { if (s.photo === undefined) s.photo = JACC.photoFor(s.name); });
  (JACC.APPLICANTS || []).forEach((a) => { if (a.photo === undefined) a.photo = JACC.photoFor(a.name); });
  (JACC.MESSAGES || []).forEach((m) => { if (m.photo === undefined) m.photo = JACC.photoFor(m.name); });
};

document.addEventListener('DOMContentLoaded', () => JACC.hydratePeople());
JACC.hydratePeople();
