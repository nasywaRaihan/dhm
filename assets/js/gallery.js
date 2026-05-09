function initGallery() {
  let currentGallery = 0;

  const galleryPopup = document.getElementById('galleryPopup');

  const closeGallery = document.getElementById('closeGallery');

  const popupTitle = document.getElementById('popupGalleryTitle');

  const popupDesc = document.getElementById('popupGalleryDesc');

  const popupDate = document.querySelector('.popup-date');

  const prevBtn = document.getElementById('galleryPrev');

  const nextBtn = document.getElementById('galleryNext');

  const openGalleryBtns = document.querySelectorAll('.openGallery');

  const sliderTrack = document.getElementById('popupSliderTrack');

  const sliderDots = document.getElementById('popupSliderDots');

  function loadGallery(index) {
    const data = galleryData[index];

    popupTitle.textContent = data.title;

    popupDate.textContent = data.date;

    popupDesc.innerHTML = data.desc;

    /* RESET */
    sliderTrack.innerHTML = '';

    sliderDots.innerHTML = '';

    /* IMG */
    data.images.forEach((img, i) => {
      const image = document.createElement('img');

      image.src = img;

      sliderTrack.appendChild(image);

      /* DOT */
      const dot = document.createElement('div');

      dot.classList.add('popup-dot');

      if (i === 0) {
        dot.classList.add('active');
      }

      dot.addEventListener('click', () => {
        sliderTrack.style.transform = `translateX(-${i * 100}%)`;

        document.querySelectorAll('.popup-dot').forEach((d) => d.classList.remove('active'));

        dot.classList.add('active');
      });

      sliderDots.appendChild(dot);
    });
  }

  /* OPEN POPUP */

  openGalleryBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();

      const card = btn.closest('.gallery-card');

      currentGallery = parseInt(card.dataset.gallery);

      loadGallery(currentGallery);

      galleryPopup.classList.add('active');
    });
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
}
