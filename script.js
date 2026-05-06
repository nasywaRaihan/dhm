gsap.registerPlugin(ScrollTrigger);

/* REVEAL */
gsap.utils.toArray('.reveal').forEach((el) => {
  gsap.from(el, {
    opacity: 0,
    y: 60,
    duration: 1,
    scrollTrigger: {
      trigger: el,
      start: 'top 85%',
    },
  });
});

/* HERO PARALLAX */
gsap.to('.hero-left img', {
  y: 60,
  scrollTrigger: {
    trigger: '.hero',
    scrub: true,
  },
});

/* SWIPER */
let swiperDivisi;

function initSwiper() {
  swiperDivisi = new Swiper('.divisiSwiper', {
    slidesPerView: 3,
    spaceBetween: 30,

    loop: true,

    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },

    breakpoints: {
      0: {
        slidesPerView: 1.15,
        centeredSlides: true,
        spaceBetween: 12,
      },

      768: {
        slidesPerView: 2,
      },

      1024: {
        slidesPerView: 3,
      },
    },
  });
}

initSwiper();

/* HOVER EFFECT */
const btn = document.querySelector('.hero-btn a');

if (btn) {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    btn.style.setProperty('--x', `${x}px`);
    btn.style.setProperty('--y', `${y}px`);
  });
}

/* ========================= */
/* 🔥 NAVBAR SYSTEM (FIXED) */
/* ========================= */

const toggle = document.getElementById('menuToggle');
const nav = document.getElementById('navMenu');
const navbar = document.querySelector('.navbar');
const links = document.querySelectorAll('#navMenu a');

/* OPEN MENU */
function openMenu() {
  nav.classList.add('active');
  toggle.classList.add('active');
  document.body.classList.add('menu-open');
  navbar.classList.add('menu-open');

  // stagger animation
  links.forEach((link, i) => {
    link.style.opacity = '0';
    link.style.transform = 'translateY(10px)';

    setTimeout(() => {
      link.style.transition = '0.3s';
      link.style.opacity = '1';
      link.style.transform = 'translateY(0)';
    }, i * 80);
  });
}

/* CLOSE MENU */
function closeMenu() {
  nav.classList.remove('active');
  toggle.classList.remove('active');
  document.body.classList.remove('menu-open');
  navbar.classList.remove('menu-open');
}

/* TOGGLE CLICK */
toggle.addEventListener('click', () => {
  const isOpen = nav.classList.contains('active');

  if (isOpen) {
    closeMenu();
  } else {
    openMenu();
  }
});

/* CLICK LINK → CLOSE */
links.forEach((link) => {
  link.addEventListener('click', () => {
    closeMenu(); // 🔥 sekarang full reset
  });
});

/* CLICK OUTSIDE → CLOSE */
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    closeMenu(); // 🔥 konsisten
  }
});

/* SCROLL SHRINK */
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ACTIVE LINK (SCROLL SPY) */
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;

    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  links.forEach((a) => {
    a.classList.remove('active');
    if (a.getAttribute('href') === `#${current}`) {
      a.classList.add('active');
    }
  });
});

/* TOGGLE FULL DIVISI */
const divisiBtn = document.getElementById('toggleDivisi');
const divisiSwiperEl = document.querySelector('.divisiSwiper');

let showAll = false;

divisiBtn.addEventListener('click', () => {
  showAll = !showAll;

  if (showAll) {
    divisiSwiperEl.classList.add('show-all');

    swiperDivisi.destroy(true, true);

    divisiBtn.textContent = 'Sembunyikan';
  } else {
    divisiSwiperEl.classList.remove('show-all');

    initSwiper();

    divisiBtn.textContent = 'Lihat Seluruh Divisi';
  }
});

/* ========================= */
/* 🔥 POPUP DIVISI */
/* ========================= */

window.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('divisiModal');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const closeModal = document.getElementById('closeModal');

  const divisiData = [
    {
      title: 'PH',
      img: 'assets/roblox_asik.png',
      desc: 'Divisi Pengembangan Sumber Daya Insani berfokus pada pembinaan kader dakwah yang aktif dan berkualitas.',
    },

    {
      title: 'HUMMED',
      img: 'assets/roblox_asik.png',
      desc: 'Divisi HUMMED bertanggung jawab dalam media informasi dan publikasi kegiatan DHM.',
    },

    {
      title: 'PSDI',
      img: 'assets/roblox_asik.png',
      desc: 'Divisi PSDI berperan dalam pengembangan kaderisasi dan peningkatan SDM.',
    },

    {
      title: 'PS',
      img: 'assets/roblox_asik.png',
      desc: 'Divisi Pembinaan Siswa fokus pada pembinaan pelajar sekolah.',
    },

    {
      title: 'PM',
      img: 'assets/roblox_asik.png',
      desc: 'Divisi Pembinaan Masyarakat bergerak dalam pengabdian masyarakat.',
    },

    {
      title: 'Kemuslimahan',
      img: 'assets/roblox_asik.png',
      desc: 'Divisi Kemuslimahan fokus pada pembinaan muslimah aktif. Syududuuuuuuuuuuuuuu',
    },
  ];

  const openBtns = document.querySelectorAll('.openDivisi');

  openBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      modal.classList.add('active');

      modalTitle.textContent = divisiData[i].title;

      modalDesc.textContent = divisiData[i].desc;

      modalImg.src = divisiData[i].img;
    });
  });

  closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
});

/* ========================= */
/* GALLERY POPUP */
/* ========================= */
let currentGallery = 0;
let currentImage = 0;

const popupGalleryImg = document.getElementById('popupGalleryImg');

const prevBtn = document.getElementById('galleryPrev');

const nextBtn = document.getElementById('galleryNext');

window.addEventListener('DOMContentLoaded', () => {
  const galleryPopup = document.getElementById('galleryPopup');

  const closeGallery = document.getElementById('closeGallery');

  const popupTitle = document.getElementById('popupGalleryTitle');

  const popupDesc = document.getElementById('popupGalleryDesc');

  const popupDate = document.querySelector('.popup-date');

  const openGalleryBtns = document.querySelectorAll('.openGallery');

  openGalleryBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();

      const card = btn.closest('.gallery-card');

      currentGallery = parseInt(card.dataset.gallery);

      currentImage = 0;

      const data = galleryData[currentGallery];

      popupTitle.textContent = data.title;

      popupDate.textContent = data.date;

      popupDesc.innerHTML = data.desc;

      popupGalleryImg.src = data.images[currentImage];

      galleryPopup.classList.add('active');
    });
  });

  /* CLOSE */

  closeGallery.addEventListener('click', () => {
    galleryPopup.classList.remove('active');
  });

  /* CLICK OUTSIDE */

  galleryPopup.addEventListener('click', (e) => {
    if (e.target === galleryPopup) {
      galleryPopup.classList.remove('active');
    }
  });
});

const galleryData = [
  {
    title: 'Relawan Ramadhan 1446/1447 H',

    date: '12 Februari - 13 Februari 2026',

    desc: `
      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

      <br><br>

      Duis aute irure dolor in reprehenderit in voluptate velit esse.
    `,

    images: ['assets/gallery1.jpg', 'assets/gallery2.jpg', 'assets/gallery3.jpg'],
  },

  {
    title: 'Dauroh Kampus',

    date: '20 Februari 2026',

    desc: `
      Dokumentasi kegiatan dauroh bersama mahasiswa.
    `,

    images: ['assets/gallery4.jpg', 'assets/gallery5.jpg'],
  },

  {
    title: 'Kajian Rutin',

    date: '1 Maret 2026',

    desc: `
      Kajian rutin mingguan DHM.
    `,

    images: ['assets/gallery6.jpg', 'assets/gallery7.jpg', 'assets/gallery8.jpg'],
  },
  {
    title: 'Kajian Akbar',

    date: '5 Maret 2026',

    desc: `
    Dokumentasi kegiatan kajian akbar DHM.Dokumentasi kegiatan kajian akbar DHM.Dokumentasi kegiatan kajian akbar DHM.Dokumentasi kegiatan kajian akbar DHM.Dokumentasi kegiatan kajian akbar DHM.Dokumentasi kegiatan kajian akbar DHM.Dokumentasi kegiatan kajian akbar DHM.Dokumentasi kegiatan kajian akbar DHM.Dokumentasi kegiatan kajian akbar DHM.Dokumentasi kegiatan kajian akbar DHM.Dokumentasi kegiatan kajian akbar DHM.Dokumentasi kegiatan kajian akbar DHM.Dokumentasi kegiatan kajian akbar DHM.
  `,

    images: ['assets/gallery9.jpg', 'assets/gallery10.jpg'],
  },
];

/* NEXT */

nextBtn.addEventListener('click', () => {
  const images = galleryData[currentGallery].images;

  currentImage++;

  if (currentImage >= images.length) {
    currentImage = 0;
  }

  popupGalleryImg.src = images[currentImage];
});

/* PREV */

prevBtn.addEventListener('click', () => {
  const images = galleryData[currentGallery].images;

  currentImage--;

  if (currentImage < 0) {
    currentImage = images.length - 1;
  }

  popupGalleryImg.src = images[currentImage];
});
