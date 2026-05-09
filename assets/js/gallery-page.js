const galleryGrid = document.getElementById('galleryGrid');

function renderGallery(data) {
  galleryGrid.innerHTML = '';

  data.forEach((item, index) => {
    const card = document.createElement('div');

    card.classList.add('gallery-card');

    card.dataset.gallery = index;

    card.innerHTML = `
    
      <div class="gallery-pin"></div>

      <div class="gallery-photo">
        <img src="${item.thumbnail}" alt="${item.title}">
      </div>

      <div class="gallery-info">

        <h3>
          ${item.title}
        </h3>

        <p>
          ${item.division}
        </p>

        <span>
          ${item.date}
        </span>

        <button class="openGallery">
          Selengkapnya
        </button>

      </div>

    `;

    galleryGrid.appendChild(card);
  });

  initGallery();
}

renderGallery(galleryData);

/* SEARCH */

const searchInput = document.getElementById('gallerySearch');

searchInput.addEventListener('input', (e) => {
  const keyword = e.target.value.toLowerCase();

  const filteredGallery = galleryData.filter((item) => {
    return item.title.toLowerCase().includes(keyword) || item.division.toLowerCase().includes(keyword) || item.category.toLowerCase().includes(keyword);
  });

  renderGallery(filteredGallery);
});
