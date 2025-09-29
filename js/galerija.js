const slikeSoba = {
  "1": [
    "slike/soba1-1.jpg",
    "slike/soba1-2.jpg",
    "slike/soba1-3.jpg"
  ],
  "2": [
    "slike/soba2-1.jpeg",
    "slike/soba2-2.jpeg",
    "slike/soba2-3.jpeg"
  ],
  "3": [
    "slike/soba3-1.jpg",
    "slike/soba3-2.jpg",
    "slike/soba3-3.jpg"
  ],
  "4": [
    "slike/soba1-1.jpg",
    "slike/soba1-2.jpg",
    "slike/soba1-3.jpg"
  ],
  "5": [
    "slike/soba3-1.jpg",
    "slike/soba3-2.jpg",
    "slike/soba3-3.jpg"
  ],
  "6": [
    "slike/soba2-1.jpeg",
    "slike/soba2-2.jpeg",
    "slike/soba2-3.jpeg"
  ]
};

// Obrada klikova na dugmad za otvaranje svetlosnog prozora sa odgovarajućim slikama
document.querySelectorAll('.dugme').forEach(dugme => {
  dugme.addEventListener('click', function() {
    const idSobe = this.getAttribute('data-soba'); //  ID sobe

    // Uzmemo slike za kliknutu sobu
    const slike = slikeSoba[idSobe];

    // kontejner za slike u svetlosnom prozoru
    const kontejnerSlika = document.querySelector('.svetlosne-slike');
    kontejnerSlika.innerHTML = "";

    // Ubacivanje slika u svetlosni prozor
    slike.forEach((src, indeks) => {
      const slika = document.createElement('img');
      slika.src = src;
      slika.alt = `Slika ${indeks + 1} sobe ${idSobe}`;
      slika.style.display = (indeks === 0) ? 'block' : 'none'; // Prikazi prvu sliku
      kontejnerSlika.appendChild(slika);
    });

    // Prikažemo svetlosni prozor
    document.querySelector('.svetlosni-prozor').style.display = 'block';

    let trenutniIndeks = 0; // Pocinje od prve slike

    // Sledeće dugme
    document.querySelector('.sledece-dugme').addEventListener('click', function() {
      const slikeUProzoru = kontejnerSlika.querySelectorAll('img');
      slikeUProzoru[trenutniIndeks].style.display = 'none'; 
      trenutniIndeks = (trenutniIndeks + 1) % slikeUProzoru.length;
      slikeUProzoru[trenutniIndeks].style.display = 'block'; 
    });

    // Prethodno dugme
    document.querySelector('.prethodno-dugme').addEventListener('click', function() {
      const slikeUProzoru = kontejnerSlika.querySelectorAll('img');
      slikeUProzoru[trenutniIndeks].style.display = 'none'; 
      trenutniIndeks = (trenutniIndeks - 1 + slikeUProzoru.length) % slikeUProzoru.length;
      slikeUProzoru[trenutniIndeks].style.display = 'block'; 
    });
  });
});

// Zatvaranje svetlosnog prozora klikom na dugme
document.querySelector('.zatvori-dugme').addEventListener('click', function() {
  document.querySelector('.svetlosni-prozor').style.display = 'none';
});

  

