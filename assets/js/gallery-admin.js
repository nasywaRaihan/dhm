/* ========================= */
/* TOM SELECT */
/* ========================= */

new TomSelect('#galleryCategory', {
  create: false,

  controlInput: null,

  placeholder: 'Masukkan kategori',
});

new TomSelect('#galleryDivision', {
  create: false,

  controlInput: null,

  placeholder: 'Masukkan divisi',
});

/* ========================= */
/* FLATPICKR */
/* ========================= */

flatpickr('#galleryDate', {
  dateFormat: 'd F Y',

  altInput: true,

  altFormat: 'd F Y',

  disableMobile: true,

  position: 'auto center',
});

/* THUMBNAIL PREVIEW */
const thumbnailInput = document.getElementById('galleryThumbnail');

const thumbnailPreview = document.getElementById('thumbnailPreview');

let thumbnailData = '';

thumbnailInput.addEventListener('change', (e) => {
  const file = e.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = function (event) {
    thumbnailData = event.target.result;

    thumbnailPreview.src = thumbnailData;

    thumbnailPreview.style.display = 'block';
  };

  reader.readAsDataURL(file);
});

const galleryForm = document.getElementById('galleryForm');

galleryForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('galleryTitle').value;

  const category = document.getElementById('galleryCategory').value;

  const division = document.getElementById('galleryDivision').value;

  const date = document.getElementById('galleryDate').value;

  const thumbnail = thumbnailData;

  const desc = document.getElementById('galleryDesc').value;

  /* SLUG */

  const slug = title.toLowerCase().replaceAll(' ', '-');

  /* NEW DATA */

  const newGallery = {
    title,
    slug,
    category,
    division,
    thumbnail,
    date,

    views: 0,

    desc,

    images: [thumbnail],
  };

  /* PUSH */

  galleryData.push(newGallery);

  console.log(galleryData);

  alert('Gallery berhasil ditambahkan!');

  galleryForm.reset();
});
