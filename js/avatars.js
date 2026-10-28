/* Avatars — photo first, initials only when missing / failed */
window.JACC = window.JACC || {};

JACC.ME = {
  name: 'Efua Boateng',
  photo: 'https://randomuser.me/api/portraits/women/44.jpg',
  headline: 'Product Analyst · Accra',
};

/** Stable portrait URLs (randomuser) keyed by person name */
JACC.PHOTOS = {
  'Efua Boateng': 'https://randomuser.me/api/portraits/women/44.jpg',
  'Ama Mensah': 'https://randomuser.me/api/portraits/women/68.jpg',
  'Kwame Osei': 'https://randomuser.me/api/portraits/men/32.jpg',
  'Fatou Diallo': 'https://randomuser.me/api/portraits/women/90.jpg',
  'James Okoro': null, // intentional: initials fallback demo
  'Ngozi Adeyemi': 'https://randomuser.me/api/portraits/women/21.jpg',
  'Samuel Kariuki': 'https://randomuser.me/api/portraits/men/75.jpg',
  'Ibrahim Touré': 'https://randomuser.me/api/portraits/men/22.jpg',
  'Wanjiru Kamau': 'https://randomuser.me/api/portraits/women/33.jpg',
  'Adaobi Nwosu': 'https://randomuser.me/api/portraits/women/12.jpg',
  'Yeboah Kofi': 'https://randomuser.me/api/portraits/men/45.jpg',
  'Aisha Bello': 'https://randomuser.me/api/portraits/women/57.jpg',
  "Pierre N'Guessan": 'https://randomuser.me/api/portraits/men/11.jpg',
  'Kwesi Addo': 'https://randomuser.me/api/portraits/men/52.jpg',
  'Mariama Sy': 'https://randomuser.me/api/portraits/women/28.jpg',
  'Chinedu Okafor': 'https://randomuser.me/api/portraits/men/61.jpg',
  'MTN Talent Team': 'https://randomuser.me/api/portraits/men/83.jpg',
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
  (JACC.MENTORS || []).forEach((m) => { if (m.photo === undefined) m.photo = JACC.photoFor(m.name); });
  (JACC.STORIES || []).forEach((s) => { if (s.photo === undefined) s.photo = JACC.photoFor(s.name); });
  (JACC.APPLICANTS || []).forEach((a) => { if (a.photo === undefined) a.photo = JACC.photoFor(a.name); });
  (JACC.MESSAGES || []).forEach((m) => { if (m.photo === undefined) m.photo = JACC.photoFor(m.name); });
};

document.addEventListener('DOMContentLoaded', () => JACC.hydratePeople());
JACC.hydratePeople();
