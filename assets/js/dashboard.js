/* ELEMENT */
let galleryData = [];

const totalGallery = document.getElementById('totalGallery');

const totalViews = document.getElementById('totalViews');

const topGallery = document.getElementById('topGallery');

const tableBody = document.getElementById('galleryTableBody');

const emptyState = document.getElementById('emptyState');

const searchInput = document.getElementById('searchInput');

/* INIT */
window.addEventListener('DOMContentLoaded', async () => {
  galleryData = await getAllGallery();

  console.log('galleryData =', galleryData);

  updateStats();

  console.log('Stats selesai');

  renderTable();

  console.log('Table selesai');

  initChart();

  console.log('Chart selesai');

  initSearch();

  initLogout();
});

/* STATS */
function updateStats() {
  totalGallery.textContent = galleryData.length;

  const views = galleryData.reduce((total, item) => {
    return total + (item.views || 0);
  }, 0);

  totalViews.textContent = views.toLocaleString();

  const popular = [...galleryData].sort((a, b) => {
    return b.views - a.views;
  })[0];

  topGallery.textContent = popular?.title || '-';
}

/* TABLE */
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
              ${formatTanggal(item.date)}
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

/* EDIT */
function initEditButtons() {
  const buttons = document.querySelectorAll('.edit-btn');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const gallery = galleryData[btn.dataset.index];

      window.location.href = `gallery-admin.html?id=${gallery.id}`;
    });
  });
}

/* DELETE */
function initDeleteButtons() {
  const buttons = document.querySelectorAll('.delete-btn');

  buttons.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const index = btn.dataset.index;

      const confirmDelete = confirm('Yakin ingin menghapus gallery ini?');

      if (!confirmDelete) return;

      const gallery = galleryData[index];

      await deleteGalleryComplete(gallery.id);

      galleryData.splice(index, 1);

      renderTable();

      updateStats();

      updateChart();
    });
  });
}

/* SEARCH */
function initSearch() {
  searchInput.addEventListener('input', () => {
    const keyword = searchInput.value.toLowerCase();

    const filtered = galleryData.filter((item) => {
      return item.title.toLowerCase().includes(keyword) || item.category?.toLowerCase().includes(keyword);
    });

    renderTable(filtered);
  });
}

/* CHART */
let galleryChart;

function initChart() {
  const ctx = document.getElementById('galleryChart');

  const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 400);

  gradient.addColorStop(0, '#405F3D');

  gradient.addColorStop(1, 'rgba(87, 153, 87, 0.04)');

  const shadowPlugin = {
    id: 'shadow',

    beforeDatasetsDraw(chart) {
      const { ctx } = chart;

      ctx.save();

      ctx.shadowColor = 'rgba(47,79,47,.25)';
      ctx.shadowBlur = 18;
      ctx.shadowOffsetY = 8;
    },

    afterDatasetsDraw(chart) {
      chart.ctx.restore();
    },
  };

  galleryChart = new Chart(ctx, {
    type: 'bar',

    data: {
      labels: galleryData.map(() => ''),

      datasets: [
        {
          data: galleryData.map((item) => item.views || 0),

          backgroundColor: gradient,

          borderRadius: 999,

          borderSkipped: false,

          maxBarThickness: 56,

          hoverBorderWidth: 0,

          hoverBackgroundColor: 'rgba(87, 153, 87, 0.58)',
        },
      ],
    },

    options: {
      responsive: true,

      maintainAspectRatio: false,

      animation: {
        duration: 1500,

        easing: 'easeOutQuart',
      },

      plugins: {
        legend: {
          display: false,
        },

        tooltip: {
          backgroundColor: '#2f4f2f',
          titleColor: '#fff',
          bodyColor: '#fff',

          padding: 18,

          cornerRadius: 18,

          displayColors: false,

          callbacks: {
            title(context) {
              return galleryData[context[0].dataIndex].title;
            },

            label(context) {
              return `👁 ${context.raw} Views`;
            },
          },
        },
      },

      scales: {
        x: {
          grid: {
            display: false,
          },

          ticks: {
            display: false,
          },
        },

        y: {
          beginAtZero: true,

          grid: {
            color: 'rgba(47,79,47,.08)',
            drawBorder: false,
          },

          ticks: {
            precision: 0,
            stepSize: 1,
          },
        },
      },
    },
  });
}

/* UPDATE CHART */
function updateChart() {
  galleryChart.data.labels = galleryData.map((item) => item.title);

  galleryChart.data.datasets[0].data = galleryData.map((item) => item.views || 0);

  galleryChart.update();
}

/* AUTH CHECK */
const isLoggedIn = localStorage.getItem('adminLoggedIn');

if (isLoggedIn !== 'true') {
  window.location.href = 'index.html';
}
