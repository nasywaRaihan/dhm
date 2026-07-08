/* GET PARAM */
const params = new URLSearchParams(window.location.search);
const slug = params.get('slug');

/* ELEMENT */
const detailImage = document.getElementById('detailImage');
const detailDate = document.getElementById('detailDate');
const detailTitle = document.getElementById('detailTitle');
const detailDivision = document.getElementById('detailDivision');
const detailDesc = document.getElementById('detailDesc');
const detailGalleryImages = document.getElementById('detailGalleryImages');
const shareBtn = document.getElementById('shareBtn');

/* INIT */
async function initGalleryDetail() {
  if (!slug) return;

  const gallery = await getGalleryBySlug(slug);

  if (!gallery) {
    detailTitle.textContent = 'Gallery tidak ditemukan';
    return;
  }

  // Hitung view (tidak akan double jika sebelumnya dari popup)
  countViewOnce(gallery.id, 'detail');

  detailImage.src = gallery.thumbnail;
  detailDate.textContent = formatTanggal(gallery.date);
  detailTitle.textContent = gallery.title;
  detailDivision.textContent = gallery.division;
  detailDesc.innerHTML = gallery.description;

  const images = await getGalleryImages(gallery.id);

  detailGalleryImages.innerHTML = '';

  images.forEach((item) => {
    const img = document.createElement('img');

    img.src = item.image_url;

    img.className = 'detail-gallery-photo';

    detailGalleryImages.appendChild(img);
  });
}

initGalleryDetail();

/* SHARE */
shareBtn.addEventListener('click', async () => {
  const shareData = {
    title: detailTitle.textContent,
    text: `Lihat dokumentasi kegiatan "${detailTitle.textContent}"`,
    url: window.location.href,
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch (err) {}

    return;
  }

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

window.addEventListener('pagehide', () => {
  resetGalleryView();
});
