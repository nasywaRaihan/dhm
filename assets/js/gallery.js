let currentGallery = 0;
let currentSlide = 0;

function initGallery() {
  const galleryPopup = document.getElementById('galleryPopup');

  const closeGallery = document.getElementById('closeGallery');

  const popupTitle = document.getElementById('popupGalleryTitle');

  const popupDesc = document.getElementById('popupGalleryDesc');

  const popupDetailBtn = document.getElementById('popupDetailBtn');

  const popupDate = document.querySelector('.popup-date');

  const prevBtn = document.getElementById('galleryPrev');

  const nextBtn = document.getElementById('galleryNext');

  const sliderTrack = document.getElementById('popupSliderTrack');
  let touchStartX = 0;
  let touchEndX = 0;

  const sliderDots = document.getElementById('popupSliderDots');

  function goToSlide(index) {
    const slides = sliderTrack.querySelectorAll('.popup-slide');

    if (!slides.length) return;

    currentSlide = index;

    const targetSlide = slides[currentSlide];

    sliderTrack.style.transform = `translateX(-${targetSlide.offsetLeft}px)`;

    document.querySelectorAll('.popup-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  /* LOAD GALLERY */
  function loadGallery(index) {
    const data = galleryData[index];

    if (!data) return;

    popupTitle.textContent = data.title;

    popupDate.textContent = data.date;

    const plainDesc = data.desc.replace(/<[^>]*>/g, '');

    if (plainDesc.length > 180) {
      popupDesc.textContent = plainDesc.substring(0, 180) + '...';
    } else {
      popupDesc.textContent = plainDesc;
    }

    popupDetailBtn.href = `gallery-detail.html?slug=${data.slug}`;

    /* RESET */
    sliderTrack.innerHTML = '';

    sliderDots.innerHTML = '';

    currentSlide = 0;

    /* IMAGES */
    data.images.forEach((img, i) => {
      const slide = document.createElement('div');
      slide.className = 'popup-slide';

      const image = document.createElement('img');
      image.src = img;

      slide.appendChild(image);

      sliderTrack.appendChild(slide);

      // DOT
      const dot = document.createElement('div');
      dot.classList.add('popup-dot');

      if (i === 0) {
        dot.classList.add('active');
      }

      dot.addEventListener('click', () => {
        goToSlide(i);
      });

      sliderDots.appendChild(dot);
    });

    requestAnimationFrame(() => {
      goToSlide(0);
    });
  }

  /* OPEN POPUP */
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.openGallery');

    if (!btn) return;

    e.preventDefault();

    const card = btn.closest('.home-gallery-card, .gallery-card');

    if (!card) return;

    currentGallery = parseInt(card.dataset.gallery);

    loadGallery(currentGallery);

    galleryPopup.classList.add('active');
  });

  /* NEXT */
  nextBtn.addEventListener('click', () => {
    currentGallery++;

    if (currentGallery >= galleryData.length) {
      currentGallery = 0;
    }

    loadGallery(currentGallery);
  });

  /* PREV */
  prevBtn.addEventListener('click', () => {
    currentGallery--;

    if (currentGallery < 0) {
      currentGallery = galleryData.length - 1;
    }

    loadGallery(currentGallery);
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

  sliderTrack.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  });

  sliderTrack.addEventListener('touchmove', (e) => {
    touchEndX = e.touches[0].clientX;
  });

  sliderTrack.addEventListener('touchend', () => {
    const distance = touchStartX - touchEndX;

    if (Math.abs(distance) < 50) return;

    const totalSlide = sliderTrack.querySelectorAll('.popup-slide').length;

    if (distance > 0) {
      // swipe kiri

      if (currentSlide < totalSlide - 1) {
        goToSlide(currentSlide + 1);
      }
    } else {
      // swipe kanan

      if (currentSlide > 0) {
        goToSlide(currentSlide - 1);
      }
    }
  });

  window.addEventListener('resize', () => {
    goToSlide(currentSlide);
  });
}
