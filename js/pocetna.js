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
  setTimeout(karusel, 2000);
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

document.addEventListener("DOMContentLoaded", () => {
  const svetlosniProzor = document.querySelector(".svetlosni-prozor");
  const svetlosneSlikeKontejner = document.querySelector(".svetlosne-slike");
  const prethodnoDugme = document.querySelector(".prethodno-dugme");
  const sledeceDugme = document.querySelector(".sledece-dugme");
  const zatvoriDugme = document.querySelector(".zatvori-dugme");

  // Slike za karticu Restoran
  const restoranSlike = [
    "slike/restoran1.jpg",
    "slike/restoran2.jpg",
    "slike/restoran3.jpg",
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

  // Pronađi link za Restoran
const restoranVeza = document.getElementById("restoran");
restoranVeza.addEventListener("click", (e) => {
  e.preventDefault();
  otvoriSvetlosniProzor();
});

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
});

