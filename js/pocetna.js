var mojIndeks = 0;
karusel();

function karusel() {
  var i;
  var baneri = document.getElementsByClassName("baner");
  for (i = 0; i < baneri.length; i++) {
    baneri[i].style.display = "none";
  }
  mojIndeks++;
  if (mojIndeks > baneri.length) { mojIndeks = 1 }
  baneri[mojIndeks - 1].style.display = "block";
  setTimeout(karusel, 3500);
}

function otvoriIskacuciProzor(URL, nazivProzora, sirinaProzora, visinaProzora) {
  var centarLevo = (screen.width / 2) - (sirinaProzora / 2);
  var centarGore = (screen.height / 2) - (visinaProzora / 2);
  var opcijeProzora = 'toolbar=no, location=no, directories=no, status=no, menubar=no, titlebar=no, scrollbars=no, resizable=no, ';
  return window.open(
    URL,
    nazivProzora,
    opcijeProzora + ' width=' + sirinaProzora + ', height=' + visinaProzora + ', top=' + centarGore + ', left=' + centarLevo
  );
};

function mojaFunkcija() {
  alert("Hvala!");
}

document.addEventListener("DOMContentLoaded", () => {
  const svetlosniProzor = document.querySelector(".svetlosni-prozor");
  const svetlosneSlikeKontejner = document.querySelector(".svetlosne-slike");
  const prethodnoDugme = document.querySelector(".prethodno-dugme");
  const sledeceDugme = document.querySelector(".sledece-dugme");
  const zatvoriDugme = document.querySelector(".zatvori-dugme");

  // Slike za karticu Restoran
  const restoranSlike = [
    "https://toohotel.com/wp-content/uploads/2022/09/TOO_restaurant_Panoramique_vue_Paris_Seine_Tour_Eiffel_2.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Restaurant_N%C3%A4sinneula.jpg/1200px-Restaurant_N%C3%A4sinneula.jpg",
    "https://toohotel.com/wp-content/uploads/2022/09/TOO_restaurant_Panoramique_vue_Paris_nuit_v2-scaled.jpg",
  ];
  let trenutniIndeksSlike = 0;

  // Otvori svetlosni prozor
  const otvoriSvetlosniProzor = () => {
    // Ubaci slike restorana dinamički u svetlosni prozor
    svetlosneSlikeKontejner.innerHTML = restoranSlike
      .map(
        (slika, indeks) =>
          `<img src="${slika}" class="svetlosna-slika" style="display: ${
            indeks === 0 ? "block" : "none"
          };">`
      )
      .join("");
    svetlosniProzor.style.display = "block";
  };

  // Zatvori svetlosni prozor
  const zatvoriSvetlosniProzor = () => {
    svetlosniProzor.style.display = "none";
  };

  // Sledeća slika
  const prikaziSledecuSliku = () => {
    const svetlosneSlike = document.querySelectorAll(".svetlosna-slika");
    svetlosneSlike[trenutniIndeksSlike].style.display = "none";
    trenutniIndeksSlike = (trenutniIndeksSlike + 1) % restoranSlike.length;
    svetlosneSlike[trenutniIndeksSlike].style.display = "block";
  };

  // Prethodna slika
  const prikaziPrethodnuSliku = () => {
    const svetlosneSlike = document.querySelectorAll(".svetlosna-slika");
    svetlosneSlike[trenutniIndeksSlike].style.display = "none";
    trenutniIndeksSlike =
      (trenutniIndeksSlike - 1 + restoranSlike.length) % restoranSlike.length;
    svetlosneSlike[trenutniIndeksSlike].style.display = "block";
  };

  // Pronađi link za „Restoran”
  const kartice = document.querySelectorAll(".o-nama-kartica");
  let restoranVeza = null;

  kartice.forEach((kartica) => {
    const elementNaslova = kartica.querySelector(".o-nama-kartica-naslov span");
    if (elementNaslova && elementNaslova.textContent.trim() === "Restoran") {
      restoranVeza = elementNaslova.parentElement; // <a> element
    }
  });

  if (restoranVeza) {
    console.log("Pronađena veza ka Restoranu!");
    restoranVeza.addEventListener("click", (e) => {
      e.preventDefault();
      otvoriSvetlosniProzor();
    });
  } else {
    console.error("Veza ka Restoranu nije pronađena!");
  }

  // Kontrole svetlosnog prozora
  zatvoriDugme.addEventListener("click", zatvoriSvetlosniProzor);
  sledeceDugme.addEventListener("click", prikaziSledecuSliku);
  prethodnoDugme.addEventListener("click", prikaziPrethodnuSliku);

  // Zatvaranje klikom van sadržaja
  svetlosniProzor.addEventListener("click", (e) => {
    if (e.target === svetlosniProzor) {
      zatvoriSvetlosniProzor();
    }
  });

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
});

