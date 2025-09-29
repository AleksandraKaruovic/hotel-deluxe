// Definisanje cena
const cenaOdrasliPogledVrt = 900;
const cenaOdrasliDelimicniPogledMore = 930;
const cenaOdrasliPogledMore = 950;
const cenaDete = 850;

// Izračunavanje konačne cene
function izracunajCenu() {
  const datumPrijave = new Date(document.getElementById("datum-prijave").value);
  const datumOdjave  = new Date(document.getElementById("datum-odjave").value);
  const odrasli = parseInt(document.querySelector("select[name='odrasli']").value, 10) || 0;
  const deca    = parseInt(document.querySelector("select[name='deca']").value, 10) || 0;
  const pogledSobe = document.getElementById("pogled-sobe").value;

  const vremenskaRazlika = datumOdjave - datumPrijave;
  const nocenja = Math.ceil(vremenskaRazlika / (1000 * 60 * 60 * 24));
  if (isNaN(nocenja) || nocenja <= 0) {
    document.getElementById("ukupna-cena").textContent = "0 €";
    return;
  }

  let cenaOdrasliPoNoci;
  switch (pogledSobe) {
    case "more":
      cenaOdrasliPoNoci = cenaOdrasliPogledMore; break;
    case "delimično-more":
      cenaOdrasliPoNoci = cenaOdrasliDelimicniPogledMore; break;
    case "dvorište":
    default:
      cenaOdrasliPoNoci = cenaOdrasliPogledVrt;
  }

  const ukupnaCena = (odrasli * cenaOdrasliPoNoci + deca * cenaDete) * nocenja;
  document.getElementById("ukupna-cena").textContent = ukupnaCena + " €";
}

// Veži događaje kada se DOM učita
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("datum-prijave").addEventListener("change", izracunajCenu);
  document.getElementById("datum-odjave").addEventListener("change", izracunajCenu);
  document.querySelector("select[name='odrasli']").addEventListener("change", izracunajCenu);
  document.querySelector("select[name='deca']").addEventListener("change", izracunajCenu);
  document.getElementById("pogled-sobe").addEventListener("change", izracunajCenu);

  izracunajCenu(); // inicijalni proračun
});

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
      e.preventDefault(); // <— spreči submit
      showErrors([]);
      alert("Hvala, vaša rezervacija je prihvaćena!");
      window.location.href = "pocetna.html";
    }
  });

  // Uklanjaj poruke dok korisnik ispravlja
  forma.addEventListener("input", () => {
    if (box.style.display === "block") {
      box.style.display = "none";
    }
  });
});


