// Podaci za slike vezane za svaku vrstu sobe
const slikeSoba = {
  "1": [
    "https://www.garrisoncollection.com/wordpress/wp-content/uploads/2015/07/Lyon-FC-Hotel-Maya-9-1600x1066.jpg",
    "https://www.garrisoncollection.com/wordpress/wp-content/uploads/2015/05/Lyon-FC-Hotel-Maya-5-1600x1066.jpg",
    "https://www.garrisoncollection.com/wordpress/wp-content/uploads/2015/07/Lyon-FC-Hotel-Maya-4-1600x1066.jpg"
  ],
  "2": [
    "https://theclifflipe.com/wp-content/uploads/2020/04/Grand-Deluxe-Garden-View-1.jpeg",
    "https://theclifflipe.com/wp-content/uploads/2020/04/Grand-Deluxe-Garden-View-2.jpeg",
    "https://theclifflipe.com/wp-content/uploads/2020/04/Grand-Deluxe-Garden-View-3.jpeg"
  ],
  "3": [
    "https://www.hotelsidari.com/app/uploads/sites/96/2019/01/7-1920x1280.jpg",
    "https://www.hotelsidari.com/app/uploads/sites/96/2019/01/8-1920x1280.jpg",
    "https://www.hotelsidari.com/app/uploads/sites/96/2019/01/5-1920x1280.jpg"
  ],
  "4": [
    "images/garden-view-2.jpg",
    "images/garden-view-2b.jpg",
    "images/garden-view-2c.jpg"
  ],
  "5": [
    "images/sea-view-4.jpg",
    "images/sea-view-4b.jpg",
    "images/sea-view-4c.jpg"
  ],
  "6": [
    "images/garden-view-3.jpg",
    "images/garden-view-3b.jpg",
    "images/garden-view-3c.jpg"
  ]
};

// Obrada klikova na dugmad za otvaranje svetlosnog prozora sa odgovarajućim slikama
document.querySelectorAll('.dugme').forEach(dugme => {
  dugme.addEventListener('click', function() {
    const idSobe = this.getAttribute('data-soba'); // Dobij ID sobe (1, 2, itd.)

    // Uzmemo slike za kliknutu sobu
    const slike = slikeSoba[idSobe];

    // Uzmemo kontejner za slike u svetlosnom prozoru i očistimo prethodne
    const kontejnerSlika = document.querySelector('.svetlosne-slike');
    kontejnerSlika.innerHTML = "";

    // Ubacimo slike u svetlosni prozor
    slike.forEach((src, indeks) => {
      const slika = document.createElement('img');
      slika.src = src;
      slika.alt = `Slika ${indeks + 1} sobe ${idSobe}`;
      slika.style.display = (indeks === 0) ? 'block' : 'none'; // Prikaži prvu sliku
      kontejnerSlika.appendChild(slika);
    });

    // Prikažemo svetlosni prozor
    document.querySelector('.svetlosni-prozor').style.display = 'block';

    let trenutniIndeks = 0; // Počinjemo od prve slike

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
