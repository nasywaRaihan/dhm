/* GET SLUG */

const params = new URLSearchParams(window.location.search);

const slug = params.get('slug');

/* FIND DATA */

const gallery = galleryData.find((item) => {
  return item.slug === slug;
});

/* ELEMENT */

const detailImage = document.getElementById('detailImage');

const detailDate = document.getElementById('detailDate');

const detailTitle = document.getElementById('detailTitle');

const detailDivision = document.getElementById('detailDivision');

const detailDesc = document.getElementById('detailDesc');

const detailGalleryImages = document.getElementById('detailGalleryImages');

/* RENDER */

if (gallery) {
  detailImage.src = gallery.thumbnail;

  detailDate.textContent = gallery.date;

  detailTitle.textContent = gallery.title;

  detailDivision.textContent = gallery.division;

  detailDesc.innerHTML = gallery.desc;

  if (gallery.images) {
    gallery.images.forEach((image) => {
      const img = document.createElement('img');

      img.src = image;

      img.className = 'detail-gallery-photo';

      detailGalleryImages.appendChild(img);
    });
  }
}
