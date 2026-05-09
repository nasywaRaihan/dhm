document.addEventListener('DOMContentLoaded', () => {
  /* NAVBAR */
  if (typeof initNavbar === 'function') {
    initNavbar();
  }

  /* GALLERY */
  if (typeof initGallery === 'function') {
    initGallery();
  }

  /* SWIPER */
  if (typeof initSwiper === 'function') {
    initSwiper();
  }

  /* ANIMATION */
  if (typeof initAnimation === 'function') {
    initAnimation();
  }

  /* DIVISI POPUP */
  if (typeof initDivisiPopup === 'function') {
    initDivisiPopup();
  }
});
