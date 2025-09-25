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

