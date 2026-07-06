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

document.addEventListener('DOMContentLoaded', async () => {
  galleryData = await getAllGallery();

  for (const gallery of galleryData) {
    const images = await getGalleryImages(gallery.id);

    gallery.images = images.map((img) => img.image_url);

    gallery.desc = gallery.description;
  }

  renderHomeGallery();

  if (typeof initNavbar === 'function') initNavbar();

  if (typeof initGallery === 'function') initGallery();

  if (typeof initSwiper === 'function') initSwiper();

  if (typeof initAnimation === 'function') initAnimation();

  if (typeof initDivisiPopup === 'function') initDivisiPopup();

  if (typeof initLoginPopup === 'function') initLoginPopup();
});
