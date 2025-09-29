document.addEventListener("DOMContentLoaded", () => {
  // nadji formu
  const form = document.querySelector(".kontejner form");
  if (!form) return;

  // box za greske
  let box = document.getElementById("poruke-greske");
  if (!box) {
    box = document.createElement("div");
    box.id = "poruke-greske";
    const container = document.querySelector(".kontejner");
    if (container) container.insertBefore(box, container.firstChild);
  }

  // Polja
  const get = (sel) => form.querySelector(sel);
  const ime     = get('[name="ime"]');
  const prezime = get('[name="prezime"]');
  const email   = get('[name="email"]');
  const telefon = get('[name="telefon"]');
  const poruka  = form.querySelector('textarea[name="poruka"]') || form.querySelector("textarea");

  // Pravila
  const rIme = /^[A-ZČĆŽŠĐ][a-zčćžšđ]{1,29}$/;
  const rPrezime = /^[A-ZČĆŽŠĐ][a-zčćžšđ]{1,29}$/;
  const rEmail   = /^[\w.-]+@[\w.-]+\.\w+$/;
  const rTelefon = /^\+?\d{9,12}$/;

  const showErrors = (msgs) => {
    if (!msgs.length) {
      box.style.display = "none";
      box.innerHTML = "";
      return;
    }
    box.innerHTML = "<ul>" + msgs.map(m => `<li>${m}</li>`).join("") + "</ul>";
    box.style.display = "block";
  };

  // Submit
  form.addEventListener("submit", (e) => {
    const greske = [];

    if (!ime || !rIme.test(ime.value.trim()))
      greske.push("Ime mora početi velikim slovom i imati 2–30 slova.");

    if (!prezime || !rPrezime.test(prezime.value.trim()))
      greske.push("Prezime mora početi velikim slovom i imati 2–30 slova.");

    if (!email || !rEmail.test(email.value.trim()))
      greske.push("Unesite ispravan email.");

    if (!telefon || !rTelefon.test(telefon.value.trim()))
      greske.push("Telefon mora imati 9–12 cifara (dozvoljen + na početku).");

    if (poruka && poruka.value.trim().length === 0)
      greske.push("Unesite poruku.");

    if (greske.length) {
      e.preventDefault();
      showErrors(greske);
      box.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      e.preventDefault();
      showErrors([]);
      alert("Hvala! Vaša poruka je poslata.");
      form.reset();
    }
  });

  // sakrij poruke dok korisnik ispravlja
  form.addEventListener("input", () => {
    if (box.style.display === "block") box.style.display = "none";
  });
});
