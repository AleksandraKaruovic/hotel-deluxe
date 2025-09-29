  // Padajući meni za Usluge
  const btn = document.getElementById('btnUsluge');
  const box = document.getElementById('sadrzajUsluge');

  if (btn && box) {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = box.classList.toggle('prikazi');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    window.addEventListener('click', (e) => {
      if (!e.target.closest('.padajuci') && box.classList.contains('prikazi')) {
        box.classList.remove('prikazi');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && box.classList.contains('prikazi')) {
        box.classList.remove('prikazi');
        btn.setAttribute('aria-expanded', 'false');
        btn.focus();
      }
    });
  }