/* ELEMENT */
const galleryForm = document.getElementById('galleryForm');

const thumbnailInput = document.getElementById('galleryThumbnail');

const thumbnailPreview = document.getElementById('thumbnailPreview');

const submitBtn = document.querySelector('.submit-gallery-btn');

const galleryImagesInput = document.getElementById('galleryImages');

const imagesPreview = document.getElementById('imagesPreview');

/* STATE */
let oldGalleryImages = [];

let editGalleryId = null;

let oldThumbnail = '';

let categorySelect;
let divisionSelect;
let datePicker;

/* INIT */
async function init() {
  initSelect();

  initDatepicker();

  await loadEditData();

  handleThumbnail();

  handleGalleryImages();

  handleSubmit();
}

init();

/* TOM SELECT */
function initSelect() {
  categorySelect = new TomSelect('#galleryCategory', {
    create: false,
    controlInput: null,
    placeholder: 'Pilih kategori',
  });

  divisionSelect = new TomSelect('#galleryDivision', {
    create: false,
    controlInput: null,
    placeholder: 'Pilih divisi',
  });
}

/* DATEPICKER */
function initDatepicker() {
  datePicker = flatpickr('#galleryDate', {
    dateFormat: 'd F Y',

    altInput: true,

    altFormat: 'd F Y',

    disableMobile: true,

    position: 'auto center',
  });
}

/* THUMBNAIL */
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
      thumbnailPreview.src = event.target.result;

      thumbnailPreview.style.display = 'block';
    };

    reader.readAsDataURL(file);
  });
}

/* LOAD EDIT DATA */
async function loadEditData() {
  const params = new URLSearchParams(window.location.search);

  const id = params.get('id');

  if (!id) return;

  editGalleryId = id;

  const gallery = await getGalleryById(id);

  if (!gallery) return;

  document.getElementById('galleryTitle').value = gallery.title;

  categorySelect.setValue(gallery.category);

  divisionSelect.setValue(gallery.division);

  datePicker.setDate(gallery.date);

  document.getElementById('galleryDesc').value = gallery.description;

  oldThumbnail = gallery.thumbnail;

  thumbnailPreview.src = gallery.thumbnail;

  thumbnailPreview.style.display = 'block';

  const images = await getGalleryImages(id);

  oldGalleryImages = images;

  imagesPreview.innerHTML = '';

  images.forEach((img) => {
    const image = document.createElement('img');

    image.src = img.image_url;

    image.className = 'gallery-image-preview';

    imagesPreview.appendChild(image);
  });

  submitBtn.innerHTML = '<span>Update Gallery</span>';
}

/* SUBMIT */
function handleSubmit() {
  galleryForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('galleryTitle').value.trim();
    const category = document.getElementById('galleryCategory').value;
    const division = document.getElementById('galleryDivision').value;
    const date = document.getElementById('galleryDate').value;
    const desc = document.getElementById('galleryDesc').value.trim();

    const thumbnailFile = thumbnailInput.files[0];

    /* VALIDASI FORM */
    if (!title || !category || !division || !date || !desc) {
      showError('Lengkapi semua data!');
      return;
    }

    let thumbnailUrl = oldThumbnail;

    if (!editGalleryId && !thumbnailFile) {
      showError('Thumbnail wajib diupload');

      return;
    }

    const imageFiles = [...galleryImagesInput.files];

    let imageUrls = oldGalleryImages.map((i) => i.image_url);

    if (!editGalleryId && imageFiles.length === 0) {
      showError('Minimal upload 1 foto dokumentasi!');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Uploading...';

    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

    try {
      /* Upload Thumbnail*/
      const exist = await getGalleryBySlug(slug);

      if (exist && String(exist.id) !== String(editGalleryId)) {
        showError('Gallery sudah ada!');

        submitBtn.disabled = false;

        submitBtn.innerHTML = editGalleryId ? '<span>Update Gallery</span>' : '<span>Simpan Gallery</span>';

        return;
      }

      if (thumbnailFile) {
        thumbnailUrl = await uploadImage(thumbnailFile, 'thumbnail');

        if (!thumbnailUrl) throw new Error('Thumbnail gagal diupload');
      }

      if (!thumbnailUrl) throw new Error('Thumbnail gagal diupload');

      /*Upload Dokumentasi */
      if (imageFiles.length > 0) {
        imageUrls = [];

        for (const file of imageFiles) {
          const url = await uploadImage(file, 'documentation');

          if (!url) {
            throw new Error('Foto dokumentasi gagal diupload');
          }

          imageUrls.push(url);
        }
      }

      /*Simpan Gallery */
      let gallery;
      const payload = {
        title,

        slug,

        category,

        division,

        thumbnail: thumbnailUrl,

        date,

        description: desc,
      };

      if (!editGalleryId) {
        payload.views = 0;
      }

      if (editGalleryId) {
        gallery = await updateGallery(editGalleryId, payload);
      } else {
        gallery = await createGallery(payload);
      }

      if (!gallery) throw new Error('Gagal membuat gallery');

      /*Simpan Semua Foto*/
      if (editGalleryId) {
        await deleteGalleryImages(editGalleryId);
      }

      await saveGalleryImages(gallery.id, imageUrls);

      showSuccess(editGalleryId ? 'Gallery berhasil diperbarui!' : 'Gallery berhasil ditambahkan!');

      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1200);
    } catch (err) {
      console.error(err);

      showError(err.message);
    } finally {
      submitBtn.disabled = false;

      submitBtn.innerHTML = editGalleryId ? '<span>Update Gallery</span>' : '<span>Simpan Gallery</span>';
    }
  });
}

/* GALLERY IMAGES */
function handleGalleryImages() {
  galleryImagesInput.addEventListener('change', (e) => {
    const files = [...e.target.files];

    imagesPreview.innerHTML = '';

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = function (event) {
        const img = document.createElement('img');

        img.src = event.target.result;

        img.className = 'gallery-image-preview';

        imagesPreview.appendChild(img);
      };

      reader.readAsDataURL(file);
    });
  });
}

/* SUCCESS */
function showSuccess(message) {
  submitBtn.innerHTML = 'Berhasil Disimpan ✓';

  submitBtn.classList.add('success');

  setTimeout(() => {
    submitBtn.classList.remove('success');

    submitBtn.innerHTML = editGalleryId ? '<span>Update Gallery</span>' : '<span>Simpan Gallery</span>';
  }, 2000);
}

/* ERROR */
function showError(message) {
  alert(message);
}

const isLoggedIn = localStorage.getItem('adminLoggedIn');

if (isLoggedIn !== 'true') {
  window.location.href = 'index.html';
}
