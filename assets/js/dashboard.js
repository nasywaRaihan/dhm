/* ELEMENT */
let galleryData = [];
let currentPage = 1;
let rowsPerPage = 10;
let deletePopup;
let confirmDeleteBtn;
let cancelDeleteBtn;

let selectedDeleteIndex = null;

const totalGallery = document.getElementById('totalGallery');

const totalViews = document.getElementById('totalViews');

const topGallery = document.getElementById('topGallery');

const tableBody = document.getElementById('galleryTableBody');

const emptyState = document.getElementById('emptyState');

const searchInput = document.getElementById('searchInput');

const tableInfo = document.getElementById('tableInfo');

/* INIT */
window.addEventListener('DOMContentLoaded', async () => {
  // ==========================
  // AUTH CHECK
  // ==========================
  const {
    data: { session },
  } = await window.db.auth.getSession();

  if (!session) {
    window.location.replace('index.html');
    return;
  }

  // simpan info admin (opsional)
  localStorage.setItem('adminEmail', session.user.email);

  // ==========================
  // LOAD DASHBOARD
  // ==========================

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

  deletePopup = document.getElementById('deletePopup');
  confirmDeleteBtn = document.getElementById('confirmDelete');
  cancelDeleteBtn = document.getElementById('cancelDelete');

  cancelDeleteBtn.addEventListener('click', () => {
    deletePopup.classList.remove('active');
  });

  deletePopup.addEventListener('click', (e) => {
    if (e.target === deletePopup) {
      deletePopup.classList.remove('active');
    }
  });

  confirmDeleteBtn.addEventListener('click', async () => {
    try {
      const gallery = galleryData[selectedDeleteIndex];

      console.log('Gallery yang akan dihapus:', gallery);

      const success = await deleteGalleryComplete(gallery.id);

      console.log('Delete result:', success);

      if (!success) {
        showError('Gagal menghapus gallery');
        return;
      }

      deletePopup.classList.remove('active');

      galleryData = await getAllGallery();

      updateStats();
      renderTable();
      updateChart();

      selectedDeleteIndex = null;

      showSuccess('Gallery berhasil dihapus');
    } catch (err) {
      console.error(err);

      showError('Terjadi kesalahan saat menghapus gallery');
    }
  });

  document.getElementById('pageSize').addEventListener('change', (e) => {
    rowsPerPage = Number(e.target.value);
    currentPage = 1;
    renderTable();
  });
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

  if (!data.length) {
    emptyState.style.display = 'flex';
    return;
  }

  emptyState.style.display = 'none';

  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;

  const pageData = data.slice(start, end);

  const from = data.length === 0 ? 0 : start + 1;
  const to = Math.min(end, data.length);

  tableInfo.textContent = `Menampilkan ${from} - ${to} dari ${data.length} gallery`;

  pageData.forEach((item) => {
    const realIndex = galleryData.findIndex((g) => g.id === item.id);

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
            data-index="${realIndex}"
          >
            Edit
          </button>

          <button
            class="delete-btn"
            data-index="${realIndex}"
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

  renderPagination(data.length);
}

/*RENDER*/
function renderPagination(totalRows) {
  const pagination = document.getElementById('pagination');

  pagination.innerHTML = '';

  const totalPages = Math.ceil(totalRows / rowsPerPage);

  if (totalPages <= 1) return;

  // Prev

  const prev = document.createElement('button');

  prev.innerHTML = '←';

  prev.disabled = currentPage === 1;

  prev.onclick = () => {
    currentPage--;

    renderTable();
  };

  pagination.appendChild(prev);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');

    btn.innerHTML = i;

    if (i === currentPage) {
      btn.classList.add('active');
    }

    btn.onclick = () => {
      currentPage = i;

      renderTable();
    };

    pagination.appendChild(btn);
  }

  const next = document.createElement('button');

  next.innerHTML = '→';

  next.disabled = currentPage === totalPages;

  next.onclick = () => {
    currentPage++;

    renderTable();
  };

  pagination.appendChild(next);
}

/*UPDATE TABEL*/
function updateTableInfo(totalRows) {
  const info = document.getElementById('tableInfo');

  const showing = Math.max(0, Math.min(rowsPerPage, totalRows - (currentPage - 1) * rowsPerPage));

  info.textContent = `Menampilkan ${showing} dari ${totalRows} gallery`;
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
  console.log('INIT DELETE BUTTONS');

  const buttons = document.querySelectorAll('.delete-btn');

  console.log('Jumlah tombol:', buttons.length);

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      console.log('DELETE DIKLIK');

      selectedDeleteIndex = Number(btn.dataset.index);

      console.log(selectedDeleteIndex);

      deletePopup.classList.add('active');
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

    currentPage = 1;

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
async function checkAuth() {
  const {
    data: { session },
  } = await window.db.auth.getSession();

  if (!session) {
    window.location.replace('index.html');
    return;
  }

  // simpan email kalau diperlukan
  localStorage.setItem('adminEmail', session.user.email);
}

checkAuth();
