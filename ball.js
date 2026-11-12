/* ============================================
   БАЛ ВОЗМОЖНОСТЕЙ — логика страницы
   ============================================ */

/* ===== ТЕМА ===== */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const icon = document.getElementById('themeIcon');
  if (icon) icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  try { localStorage.setItem('sv_theme', theme); } catch (e) {}
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

/* ===== TOAST ===== */
function toast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

/* ===== FAQ ===== */
function toggleFaq(btn) {
  const item = btn.parentElement;
  item.classList.toggle('open');
}

/* ===== ОБРАТНЫЙ ОТСЧЁТ =====
   Конец регистрации: 21 ноября 2026, 23:59 МСК.
*/
const REG_END_DATE = new Date('2026-11-21T23:59:59+03:00').getTime();

function pad(n) {
  return String(n).padStart(2, '0');
}

function tickCountdown() {
  const diff = REG_END_DATE - Date.now();
  const dEl = document.getElementById('cdDays');
  const hEl = document.getElementById('cdHours');
  const mEl = document.getElementById('cdMin');
  const sEl = document.getElementById('cdSec');
  if (!dEl || !hEl || !mEl || !sEl) return;

  if (diff <= 0) {
    dEl.textContent = '0';
    hEl.textContent = '0';
    mEl.textContent = '0';
    sEl.textContent = '0';
    return;
  }

  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  dEl.textContent = d;
  hEl.textContent = pad(h);
  mEl.textContent = pad(m);
  sEl.textContent = pad(s);
}

/* ===== ИНИЦИАЛИЗАЦИЯ ===== */
document.addEventListener('DOMContentLoaded', () => {
  const saved = document.documentElement.getAttribute('data-theme') || 'light';
  const icon = document.getElementById('themeIcon');
  if (icon) icon.className = saved === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';

  tickCountdown();
  setInterval(tickCountdown, 1000);
});

