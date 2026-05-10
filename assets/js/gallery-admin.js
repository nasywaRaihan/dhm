/* ===================================== */
/* ELEMENT */
/* ===================================== */

const galleryForm = document.getElementById('galleryForm');

const thumbnailInput = document.getElementById('galleryThumbnail');

const thumbnailPreview = document.getElementById('thumbnailPreview');

const submitBtn = document.querySelector('.submit-gallery-btn');

/* ===================================== */
/* STATE */
/* ===================================== */

let thumbnailData = '';

/* ===================================== */
/* INIT */
/* ===================================== */

initSelect();

initDatepicker();

handleThumbnail();

handleSubmit();

/* ===================================== */
/* TOM SELECT */
/* ===================================== */

function initSelect() {
  new TomSelect('#galleryCategory', {
    create: false,
    controlInput: null,
    placeholder: 'Pilih kategori',
  });

  new TomSelect('#galleryDivision', {
    create: false,
    controlInput: null,
    placeholder: 'Pilih divisi',
  });
}

/* ===================================== */
/* DATEPICKER */
/* ===================================== */

function initDatepicker() {
  flatpickr('#galleryDate', {
    dateFormat: 'd F Y',

    altInput: true,

    altFormat: 'd F Y',

    disableMobile: true,

    position: 'auto center',
  });
}

/* ===================================== */
/* THUMBNAIL */
/* ===================================== */

function handleThumbnail() {
  thumbnailInput.addEventListener('change', (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

    if (!allowedTypes.includes(file.type)) {
      showError('Format file tidak didukung!');

      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      showError('Ukuran gambar maksimal 2MB!');

      return;
    }

    const reader = new FileReader();

    reader.onload = function (event) {
      thumbnailData = event.target.result;

      thumbnailPreview.src = thumbnailData;

      thumbnailPreview.style.display = 'block';
    };

    reader.readAsDataURL(file);
  });
}

/* ===================================== */
/* SUBMIT */
/* ===================================== */

function handleSubmit() {
  galleryForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('galleryTitle').value.trim();

    const category = document.getElementById('galleryCategory').value;

    const division = document.getElementById('galleryDivision').value;

    const date = document.getElementById('galleryDate').value;

    const desc = document.getElementById('galleryDesc').value.trim();

    if (!thumbnailData) {
      showError('Thumbnail wajib diupload!');

      return;
    }

    /* SLUG */

    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

    /* DUPLICATE */

    const isExist = galleryData.some((item) => item.slug === slug);

    if (isExist) {
      showError('Gallery sudah ada!');

      return;
    }

    /* NEW DATA */

    const newGallery = {
      title,

      slug,

      category,

      division,

      thumbnail: thumbnailData,

      date,

      views: 0,

      desc,

      images: [thumbnailData],
    };

    /* PUSH */

    galleryData.push(newGallery);

    /* SAVE */

    localStorage.setItem('galleryData', JSON.stringify(galleryData));

    /* SUCCESS */

    showSuccess('Gallery berhasil ditambahkan!');

    /* RESET */

    galleryForm.reset();

    thumbnailPreview.style.display = 'none';

    thumbnailPreview.src = '';

    thumbnailData = '';

    submitBtn.innerHTML = '<span>Simpan Gallery</span>';
  });
}

/* ===================================== */
/* SUCCESS */
/* ===================================== */

function showSuccess(message) {
  submitBtn.innerHTML = 'Berhasil Disimpan ✓';

  submitBtn.classList.add('success');

  setTimeout(() => {
    submitBtn.classList.remove('success');

    submitBtn.innerHTML = '<span>Simpan Gallery</span>';
  }, 2000);
}

/* ===================================== */
/* ERROR */
/* ===================================== */

function showError(message) {
  alert(message);
}
