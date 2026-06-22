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

loadEditData();

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
/* LOAD EDIT DATA */
/* ===================================== */

function loadEditData() {
  const editIndex = localStorage.getItem('editGalleryIndex');

  if (editIndex === null) return;

  const gallery = galleryData[editIndex];

  if (!gallery) return;

  document.getElementById('galleryTitle').value = gallery.title;

  document.getElementById('galleryCategory').value = gallery.category;

  document.getElementById('galleryDivision').value = gallery.division;

  document.getElementById('galleryDate').value = gallery.date;

  document.getElementById('galleryDesc').value = gallery.desc;

  thumbnailData = gallery.thumbnail;

  thumbnailPreview.src = gallery.thumbnail;

  thumbnailPreview.style.display = 'block';

  submitBtn.innerHTML = '<span>Update Gallery</span>';

  document.querySelector('.form-section-title').textContent = 'Edit Gallery';

  document.querySelector('.gallery-admin-header h1').textContent = 'Edit Gallery';
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

    const editIndex = localStorage.getItem('editGalleryIndex');

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

    const isExist = galleryData.some((item, index) => {
      if (String(index) === editIndex) return false;

      return item.slug === slug;
    });

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

    /* ADD / UPDATE */

    if (editIndex !== null) {
      galleryData[editIndex] = {
        ...galleryData[editIndex],

        title,

        slug,

        category,

        division,

        thumbnail: thumbnailData,

        date,

        desc,
      };
    } else {
      galleryData.push(newGallery);
    }

    /* SAVE */

    localStorage.setItem('galleryData', JSON.stringify(galleryData));
    localStorage.removeItem('editGalleryIndex');

    /* SUCCESS */

    if (editIndex !== null) {
      showSuccess('Gallery berhasil diperbarui!');
    } else {
      showSuccess('Gallery berhasil ditambahkan!');
    }

    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 1500);

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

const isLoggedIn = localStorage.getItem('adminLoggedIn');

if (isLoggedIn !== 'true') {
  window.location.href = 'index.html';
}
