/* TOTAL */

const totalGallery = document.getElementById('totalGallery');

const totalViews = document.getElementById('totalViews');

const topGallery = document.getElementById('topGallery');

/* TABLE */

const tableBody = document.getElementById('galleryTableBody');

/* STATS */

totalGallery.textContent = galleryData.length;

/* TOTAL VIEWS */

const allViews = galleryData.reduce((total, item) => {
  return total + item.views;
}, 0);

totalViews.textContent = allViews;

/* MOST POPULAR */

const mostPopular = [...galleryData].sort((a, b) => {
  return b.views - a.views;
})[0];

topGallery.textContent = mostPopular.title;

/* RENDER TABLE */

function renderTable() {
  tableBody.innerHTML = '';

  galleryData.forEach((item, index) => {
    const row = document.createElement('tr');

    row.innerHTML = `
    
      <td>
        <img
          src="${item.thumbnail}"
          class="gallery-thumb"
          alt="${item.title}"
        />
      </td>

      <td>
        ${item.title}
      </td>

      <td>
        ${item.category}
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
}

/* DELETE */

function initDeleteButtons() {
  const deleteButtons = document.querySelectorAll('.delete-btn');

  deleteButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const index = btn.dataset.index;

      galleryData.splice(index, 1);

      renderTable();

      updateStats();

      updateChart();
    });
  });
}

/* UPDATE STATS */

function updateStats() {
  totalGallery.textContent = galleryData.length;

  const total = galleryData.reduce((sum, item) => {
    return sum + item.views;
  }, 0);

  totalViews.textContent = total;

  const popular = [...galleryData].sort((a, b) => {
    return b.views - a.views;
  })[0];

  if (popular) {
    topGallery.textContent = popular.title;
  } else {
    topGallery.textContent = '-';
  }
}

/* CHART */

const ctx = document.getElementById('galleryChart');

let galleryChart = new Chart(ctx, {
  type: 'bar',

  data: {
    labels: galleryData.map((item) => {
      return item.title;
    }),

    datasets: [
      {
        label: 'Jumlah Views',

        data: galleryData.map((item) => {
          return item.views;
        }),

        borderRadius: 12,
      },
    ],
  },

  options: {
    responsive: true,

    plugins: {
      legend: {
        display: false,
      },
    },

    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

/* UPDATE CHART */

function updateChart() {
  galleryChart.data.labels = galleryData.map((item) => {
    return item.title;
  });

  galleryChart.data.datasets[0].data = galleryData.map((item) => {
    return item.views;
  });

  galleryChart.update();
}

/* INIT */

renderTable();

/* LOGOUT */

const logoutBtn = document.getElementById('logoutBtn');

logoutBtn.addEventListener('click', (e) => {
  e.preventDefault();

  window.location.href = 'index.html';
});
