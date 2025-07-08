document.addEventListener('DOMContentLoaded', () => {
  // Navbar toggle
  const navBtn = document.querySelector('#navbar-toggler');
  const navDiv = document.querySelector('.navbar-collapse');

  navBtn.addEventListener('click', () => {
    navDiv.classList.toggle('showNav');
  });

  // Stopping animation and transition on window resizing
  let resizeTimer;
  window.addEventListener('resize', () => {
    document.body.classList.add('resize-animation-stopper');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      document.body.classList.remove('resize-animation-stopper');
    }, 400);
  });

  // Galerías de proyectos (lightbox)
  const galleries = [
    ["assets/proyecto1_1.jpg", "assets/proyecto1_2.jpg"],
    ["assets/proyecto2_1.jpg", "assets/proyecto2_2.jpg"],
    ["assets/proyecto3_1.jpg", "assets/proyecto3_2.jpg"],
    ["assets/proyecto4_1.jpg"],
    ["assets/proyecto5_1.jpg", "assets/proyecto5_2.jpg", "assets/proyecto5_3.jpg"],
    ["assets/proyecto6_1.jpg"],
    ["assets/proyecto7_1.jpg", "assets/proyecto7_2.jpg", "assets/proyecto7_3.jpg"],
    ["assets/proyecto8_1.jpg", "assets/proyecto8_2.jpg", "assets/proyecto8_3.jpg", "assets/proyecto8_4.jpg"]
  ];

  const items = document.querySelectorAll('.item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const closeBtn = document.getElementById('closeBtn');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const lightboxTitle = document.getElementById('lightboxTitle');

  let currentGallery = [];
  let currentIndex = 0;
  let currentProjectIndex = 0;

  items.forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      const galleryIndex = parseInt(item.dataset.gallery);
      console.log("Proyecto clickeado:", galleryIndex);

      if (isNaN(galleryIndex)) {
        console.error("El atributo data-gallery no está definido o es inválido en este elemento");
        return;
      }

      currentGallery = galleries[galleryIndex];
      currentIndex = 0;
      currentProjectIndex = galleryIndex;
      openLightbox();
    });
  });

  function openLightbox() {
    lightboxImg.src = currentGallery[currentIndex];
    const key = `project_${currentProjectIndex + 1}_title`;
    lightboxTitle.textContent = t(key); // Función t() debe estar definida globalmente
    lightbox.classList.add('active');
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % currentGallery.length;
    lightboxImg.src = currentGallery[currentIndex];
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
    lightboxImg.src = currentGallery[currentIndex];
  }

  closeBtn.addEventListener('click', closeLightbox);
  nextBtn.addEventListener('click', showNext);
  prevBtn.addEventListener('click', showPrev);

  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'Escape') closeLightbox();
  });
});
