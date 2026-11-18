// Il passaggio fra le pagine del sito: uscendo la pagina sfuma nel bianco, e quella nuova ne esce (mezzo secondo in
// tutto). L'entrata è un'animazione CSS del velo (.velo-pagina.entra in src/styles/scena.css); qui c'è l'uscita.
// Lo caricano tutte le pagine, compresa quella della password (strumenti/prepara.mjs).
(() => {
  const velo = document.querySelector('.velo-pagina');
  if (!velo) throw new Error('passaggio.js: manca .velo-pagina nella pagina');
  const USCITA_MS = 250;
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href]');
    if (!link || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || link.target) return;
    const meta = new URL(link.href, location.href);
    // solo verso un'altra pagina di questo sito: non le ancore della stessa pagina, non mailto, non l'esterno
    if (meta.origin !== location.origin || meta.pathname === location.pathname) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    e.preventDefault();
    velo.classList.add('esce');
    setTimeout(() => { location.href = meta.href; }, USCITA_MS);
  });
  // tornando indietro il browser può rimostrare la pagina com'era, col velo bianco sopra: lo si toglie
  addEventListener('pageshow', (e) => { if (e.persisted) velo.classList.remove('esce'); });
})();
