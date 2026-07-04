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

const shareBtn = document.getElementById('shareBtn');

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

/* SHARE */

shareBtn.addEventListener('click', async () => {
  const shareData = {
    title: detailTitle.textContent,

    text: `Lihat dokumentasi kegiatan "${detailTitle.textContent}"`,

    url: window.location.href,
  };

  // HP / Browser yang support
  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch (err) {
      // user cancel
    }

    return;
  }

  // Desktop
  try {
    await navigator.clipboard.writeText(window.location.href);

    shareBtn.textContent = '✅ Link Disalin';

    setTimeout(() => {
      shareBtn.textContent = '🔗 Bagikan';
    }, 2000);
  } catch {
    alert('Gagal menyalin link.');
  }
});
