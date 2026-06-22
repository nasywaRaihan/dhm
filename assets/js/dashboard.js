/* ====================================== */
/* ELEMENT */
/* ====================================== */

const totalGallery = document.getElementById('totalGallery');

const totalViews = document.getElementById('totalViews');

const topGallery = document.getElementById('topGallery');

const tableBody = document.getElementById('galleryTableBody');

const emptyState = document.getElementById('emptyState');

const searchInput = document.getElementById('searchInput');

/* ====================================== */
/* INIT */
/* ====================================== */

window.addEventListener('DOMContentLoaded', () => {
  updateStats();

  renderTable();

  initChart();

  initSearch();

  initLogout();
});

/* ====================================== */
/* STATS */
/* ====================================== */

function updateStats() {
  totalGallery.textContent = galleryData.length;

  const views = galleryData.reduce((total, item) => {
    return total + item.views;
  }, 0);

  totalViews.textContent = views.toLocaleString();

  const popular = [...galleryData].sort((a, b) => {
    return b.views - a.views;
  })[0];

  topGallery.textContent = popular?.title || '-';
}

/* ====================================== */
/* TABLE */
/* ====================================== */

function renderTable(data = galleryData) {
  tableBody.innerHTML = '';

  if (data.length === 0) {
    emptyState.style.display = 'flex';

    return;
  }

  emptyState.style.display = 'none';

  data.forEach((item, index) => {
    const row = document.createElement('tr');

    row.innerHTML = `
    
      <td>

        <div class="gallery-info">

          <img
            src="${item.thumbnail}"
            class="gallery-thumb"
            alt="${item.title}"
          />

          <div>

            <h4>
              ${item.title}
            </h4>

            <p>
              ${item.date}
            </p>

          </div>

        </div>

      </td>

      <td>
        <span class="table-badge">
          ${item.category}
        </span>
      </td>

      <td>
        ${item.division}
      </td>

      <td>
        ${item.views}
      </td>

      <td>

        <div class="table-actions">

          <button
            class="edit-btn"
            data-index="${index}"
          >
            Edit
          </button>

          <button
            class="delete-btn"
            data-index="${index}"
          >
            Delete
          </button>

        </div>

      </td>

    `;

    tableBody.appendChild(row);
  });

  initDeleteButtons();

  initEditButtons();
}

/* ====================================== */
/* EDIT */
/* ====================================== */

function initEditButtons() {
  const buttons = document.querySelectorAll('.edit-btn');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const index = btn.dataset.index;

      localStorage.setItem('editGalleryIndex', index);

      window.location.href = 'gallery-admin.html';
    });
  });
}

/* ====================================== */
/* DELETE */
/* ====================================== */

function initDeleteButtons() {
  const buttons = document.querySelectorAll('.delete-btn');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const index = btn.dataset.index;

      const confirmDelete = confirm('Yakin ingin menghapus gallery ini?');

      if (!confirmDelete) return;

      galleryData.splice(index, 1);

      localStorage.setItem('galleryData', JSON.stringify(galleryData));

      renderTable();

      updateStats();

      updateChart();
    });
  });
}

/* ====================================== */
/* SEARCH */
/* ====================================== */

function initSearch() {
  searchInput.addEventListener('input', () => {
    const keyword = searchInput.value.toLowerCase();

    const filtered = galleryData.filter((item) => {
      return item.title.toLowerCase().includes(keyword) || item.category.toLowerCase().includes(keyword);
    });

    renderTable(filtered);
  });
}

/* ====================================== */
/* CHART */
/* ====================================== */

let galleryChart;

function initChart() {
  const ctx = document.getElementById('galleryChart');

  const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 400);

  gradient.addColorStop(0, 'rgba(47,79,47,0.9)');

  gradient.addColorStop(1, 'rgba(47,79,47,0.2)');

  galleryChart = new Chart(ctx, {
    type: 'bar',

    data: {
      labels: galleryData.map((item) => item.title),

      datasets: [
        {
          data: galleryData.map((item) => item.views),

          backgroundColor: gradient,

          borderRadius: 16,

          borderSkipped: false,

          maxBarThickness: 56,
        },
      ],
    },

    options: {
      responsive: true,

      maintainAspectRatio: false,

      animation: {
        duration: 1200,
      },

      plugins: {
        legend: {
          display: false,
        },

        tooltip: {
          backgroundColor: '#2f4f2f',

          padding: 14,

          cornerRadius: 14,
        },
      },

      scales: {
        x: {
          grid: {
            display: false,
          },
        },

        y: {
          beginAtZero: true,

          grid: {
            color: 'rgba(0,0,0,0.05)',
          },
        },
      },
    },
  });
}

/* ====================================== */
/* UPDATE CHART */
/* ====================================== */

function updateChart() {
  galleryChart.data.labels = galleryData.map((item) => item.title);

  galleryChart.data.datasets[0].data = galleryData.map((item) => item.views);

  galleryChart.update();
}

/* ====================================== */
/* AUTH CHECK */
/* ====================================== */

const isLoggedIn = localStorage.getItem('adminLoggedIn');

if (isLoggedIn !== 'true') {
  window.location.href = 'index.html';
}
