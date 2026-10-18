const raiz = document.documentElement;
const botao = document.getElementById('tema');

function aplicarTema(tema) {
  raiz.dataset.tema = tema;
  botao.textContent = tema === 'claro' ? '🌙' : '☀️';
}

let salvo = null;
try { salvo = localStorage.getItem('tema'); } catch (e) {}
const prefereClaro = window.matchMedia('(prefers-color-scheme: light)').matches;
aplicarTema(salvo || (prefereClaro ? 'claro' : 'escuro'));

botao.addEventListener('click', () => {
  const novo = raiz.dataset.tema === 'claro' ? 'escuro' : 'claro';
  aplicarTema(novo);
  try { localStorage.setItem('tema', novo); } catch (e) {}
});

document.getElementById('ano').textContent = new Date().getFullYear();

const observer = new IntersectionObserver((entradas) => {
  entradas.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('visivel'); observer.unobserve(e.target); }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
