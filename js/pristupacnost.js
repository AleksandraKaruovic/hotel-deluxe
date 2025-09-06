/* KOLAČIĆI (COOKIES) */
function postaviKolacic(naziv, vrednost, dani = 180) {
  const datum = new Date();
  datum.setTime(datum.getTime() + (dani*24*60*60*1000));
  const istek = "expires=" + datum.toUTCString();
  document.cookie = `${encodeURIComponent(naziv)}=${encodeURIComponent(vrednost)}; ${istek}; path=/; SameSite=Lax`;
}
function procitajKolacic(naziv) {
  const ime = encodeURIComponent(naziv) + "=";
  const delovi = document.cookie.split(';');
  for (let c of delovi) {
    c = c.trim();
    if (c.indexOf(ime) === 0) {
      return decodeURIComponent(c.substring(ime.length, c.length));
    }
  }
  return null;
}

/*  TEMA (svetla / tamna) */
// POSTOJEĆA: toggluje .tamna-tema na <body>
function PromenaTeme() {
  document.body.classList.toggle('tamna-tema');
  // sačuvaj novu vrednost u kolačiću
  const tema = document.body.classList.contains('tamna-tema') ? 'tamna' : 'svetla';
  postaviKolacic('tema', tema);
}

/*  SKALIRANJE FONTA */

// Globalni faktor (1 = 100%)
let faktorSkaliranja = 1;

// Prvi put zapamti bazne veličine pa skaluje
function zapamtiBazneVelicine() {
  const elementi = document.querySelectorAll('body *:not(script):not(style)');
  elementi.forEach(el => {
    if (!el.dataset.fs0) {
      const stil = window.getComputedStyle(el);
      const vel = parseFloat(stil.fontSize);
      if (!isNaN(vel) && vel > 0) {
        el.dataset.fs0 = String(vel);
      }
    }
  });
}

function primeniSkaliranje() {
  zapamtiBazneVelicine();
  const elementi = document.querySelectorAll('body *[data-fs0]');
  elementi.forEach(el => {
    const bazna = parseFloat(el.dataset.fs0);
    el.style.fontSize = (bazna * faktorSkaliranja) + 'px';
  });
  // sačuvaj trenutni faktor u kolačiću
  postaviKolacic('font_skala', String(faktorSkaliranja));
}

function povecajFont() {
  const next = +(faktorSkaliranja + 0.1).toFixed(2);
  if (next <= 1.5) {
    faktorSkaliranja = next;
    primeniSkaliranje();
  }
}

function smanjiFont() {
  const next = +(faktorSkaliranja - 0.1).toFixed(2);
  if (next >= 0.7) {
    faktorSkaliranja = next;
    primeniSkaliranje();
  }
}

/* OBNOVA IZ KOLAČIĆA  */
document.addEventListener('DOMContentLoaded', () => {
  // Tema
  const sacuvanaTema = procitajKolacic('tema'); // 'tamna' | 'svetla' | null
  if (sacuvanaTema === 'tamna') {
    document.body.classList.add('tamna-tema');
  } else if (sacuvanaTema === 'svetla') {
    document.body.classList.remove('tamna-tema');
  }
  // Font
  const sacuvanaSkala = parseFloat(procitajKolacic('font_skala') || '1');
  if (!isNaN(sacuvanaSkala) && sacuvanaSkala >= 0.7 && sacuvanaSkala <= 1.5) {
    faktorSkaliranja = sacuvanaSkala;
  }
  primeniSkaliranje();
});

