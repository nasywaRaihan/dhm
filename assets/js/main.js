function renderHomeGallery() {
  const homeGalleryList = document.getElementById('homeGalleryList');

  if (!homeGalleryList) return;

  homeGalleryList.innerHTML = '';

  const latestGallery = [...galleryData].reverse().slice(0, 4);

  latestGallery.forEach((item) => {
    const card = document.createElement('div');

    card.classList.add('home-gallery-card');

    card.dataset.gallery = galleryData.findIndex((g) => g.slug === item.slug);

    card.innerHTML = `
      <div class="gallery-pin"></div>

      <div class="home-gallery-photo">
        <img src="${item.thumbnail}" alt="${item.title}">
      </div>

      <div class="home-gallery-info">
        <h3>${item.title}</h3>

        <p>${item.division}</p>

        <span>${item.date}</span>

        <button class="openGallery">
          Selengkapnya
        </button>
      </div>
    `;

    homeGalleryList.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderHomeGallery();

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

  /* LOGIN POPUP */
  if (typeof initLoginPopup === 'function') {
    initLoginPopup();
  }
});
