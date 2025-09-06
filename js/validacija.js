document.addEventListener("DOMContentLoaded", () => {
  const forma  = document.getElementById("forma-rezervacija");
  const box    = document.getElementById("poruke-greske");
  if (!forma || !box) return;

  // helper za prikaz poruka
  const showErrors = (msgs) => {
    if (!msgs.length) { 
      box.style.display = "none"; 
      box.innerHTML = ""; 
      return; 
    }
    box.innerHTML = "<ul>" + msgs.map(m => `<li>${m}</li>`).join("") + "</ul>";
    box.style.display = "block";
  };

  forma.addEventListener("submit", (e) => {
    const greske = [];
    const ime = document.getElementById("ime");
    const prezime = document.getElementById("prezime");
    const email = document.getElementById("email");
    const telefon = document.getElementById("telefon");
    const d1 = document.getElementById("datum-prijave");
    const d2 = document.getElementById("datum-odjave");

    // IME
    if (!/^[A-ZČĆŽŠĐ][a-zčćžšđ]{1,29}$/.test(ime.value.trim())) {
      greske.push("Ime mora početi velikim slovom i imati 2–30 slova.");
    }
    // PREZIME
    if (prezime.value.trim().length < 2) {
      greske.push("Prezime mora imati bar 2 slova.");
    }
    // EMAIL
    if (!/^[\w.-]+@[\w.-]+\.\w+$/.test(email.value.trim())) {
      greske.push("Unesite ispravan email.");
    }
    // TELEFON
    if (!/^\+?\d{9,12}$/.test(telefon.value.trim())) {
      greske.push("Telefon mora imati 9–12 cifara (dozvoljen + na početku).");
    }
    // DATUMI
    if (d1.value && d2.value) {
      const start = new Date(d1.value);
      const end   = new Date(d2.value);
      if (!(end > start)) {
        greske.push("Datum odjave mora biti posle datuma prijave.");
      }
    } else {
      greske.push("Unesite oba datuma (prijave i odjave).");
    }

    if (greske.length) {
      e.preventDefault();
      showErrors(greske);
      box.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      showErrors([]);
      alert("Hvala, vaša rezervacija je prihvaćena!");
      // forma se normalno šalje ili možeš dodati još logike
    }
  });

  // Uklanjaj poruke dok korisnik ispravlja
  forma.addEventListener("input", () => {
    if (box.style.display === "block") {
      box.style.display = "none";
    }
  });
});
