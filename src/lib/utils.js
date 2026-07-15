export const CATEGORIES = ['green','black','white','oolong','herbal','chai','matcha','fruit','rooibos','other'];

export const CATEGORY_EMOJI = {
  green: '🍵', black: '☕', white: '🤍', oolong: '🌀',
  herbal: '🌿', chai: '🫖', matcha: '💚', fruit: '🍓',
  rooibos: '🟤', other: '🍃'
};

export function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(5 - full - (half ? 1 : 0));
}

let toastTimer = null;
export function showToast(msg) {
  const existing = document.getElementById('__toast__');
  if (existing) existing.remove();
  if (toastTimer) clearTimeout(toastTimer);
  const el = document.createElement('div');
  el.id = '__toast__';
  el.className = 'toast';
  el.textContent = msg;
  document.body.appendChild(el);
  toastTimer = setTimeout(() => el.remove(), 2500);
}
