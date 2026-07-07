let galleryData = [];

const galleryGrid = document.getElementById('galleryGrid');

const filterContainer = document.getElementById('galleryFilterButtons');

function renderGallery(data) {
  galleryGrid.innerHTML = '';

  data.forEach((item, index) => {
    const card = document.createElement('div');

    card.classList.add('gallery-card');

    card.dataset.gallery = galleryData.findIndex((g) => g.slug === item.slug);

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
          ${formatTanggal(item.date)}
        </span>

        <a href="gallery-detail.html?slug=${item.slug}" class="detail-btn">
            Selengkapnya
        </a>

      </div>

    `;

    galleryGrid.appendChild(card);
  });

  initGallery();
}

function renderFilterButtons() {
  const categories = ['Semua', ...new Set(galleryData.map((item) => item.category))];

  filterContainer.innerHTML = '';

  categories.forEach((category, index) => {
    const button = document.createElement('button');

    button.classList.add('filter-btn');

    if (index === 0) {
      button.classList.add('active');
    }

    button.dataset.category = category;

    button.textContent = category;

    button.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach((btn) => {
        btn.classList.remove('active');
      });

      button.classList.add('active');

      if (category === 'Semua') {
        renderGallery(galleryData);

        return;
      }

      const filteredGallery = galleryData.filter((item) => {
        return item.category === category;
      });

      renderGallery(filteredGallery);
    });

    filterContainer.appendChild(button);
  });
}

async function initGalleryPage() {
  galleryData = await getAllGallery();

  for (const gallery of galleryData) {
    const images = await getGalleryImages(gallery.id);

    gallery.images = images.map((img) => img.image_url);

    gallery.desc = gallery.description;
  }

  renderFilterButtons();

  renderGallery(galleryData);
}

initGalleryPage();

/* SEARCH */
const searchInput = document.getElementById('gallerySearch');

searchInput.addEventListener('input', (e) => {
  const keyword = e.target.value.toLowerCase();

  const filteredGallery = galleryData.filter((item) => {
    return item.title.toLowerCase().includes(keyword) || item.division.toLowerCase().includes(keyword) || item.category.toLowerCase().includes(keyword);
  });

  renderGallery(filteredGallery);
});
