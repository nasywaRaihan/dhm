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
gsap.to('.hero-img img', {
  y: 60,
  scrollTrigger: {
    trigger: '.hero',
    scrub: true,
  },
});

/* SWIPER */
new Swiper('.perjalananSwiper', {
  slidesPerView: 'auto',
  spaceBetween: 20,
  centeredSlides: true,
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
});

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
