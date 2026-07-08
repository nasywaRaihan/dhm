/* GALLERY SERVICE */
const GALLERY_BUCKET = 'gallery';

/* GET ALL GALLERY */
async function getAllGallery() {
  const { data: galleries, error } = await window.db.from('gallery').select('*').order('created_at', { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  for (const gallery of galleries) {
    const { data: images, error } = await window.db.from('gallery_images').select('image_url').eq('gallery_id', gallery.id);

    if (error) {
      console.error(error);
    }

    gallery.images = (images ?? []).map((img) => img.image_url);
  }

  return galleries;
}

/* GET GALLERY BY SLUG */
async function getGalleryBySlug(slug) {
  const { data, error } = await window.db.from('gallery').select('*').eq('slug', slug).maybeSingle();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}

/* DELETE GALLERY */
async function deleteGallery(id) {
  const { error } = await window.db.from('gallery').delete().eq('id', id);

  if (error) {
    console.error(error);
    return false;
  }

  return true;
}

/* UPLOAD IMAGE */
async function uploadImage(file, folder = '') {
  const fileName = `${Date.now()}-${crypto.randomUUID()}-${file.name.replace(/\s+/g, '-')}`;

  const filePath = folder ? `${folder}/${fileName}` : fileName;

  const { error } = await window.db.storage.from(GALLERY_BUCKET).upload(filePath, file);

  if (error) {
    console.error(error);
    return null;
  }

  const { data } = window.db.storage.from(GALLERY_BUCKET).getPublicUrl(filePath);

  return data.publicUrl;
}

/* CREATE GALLERY */
async function createGallery(gallery) {
  const { data, error } = await window.db.from('gallery').insert(gallery).select().single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}

/* SAVE GALLERY IMAGES */
async function saveGalleryImages(galleryId, images) {
  if (!images.length) return true;

  const rows = images.map((url) => ({
    gallery_id: galleryId,
    image_url: url,
  }));

  const { error } = await window.db.from('gallery_images').insert(rows);

  if (error) {
    console.error(error);
    return false;
  }

  return true;
}

/* GET GALLERY BY ID */
async function getGalleryById(id) {
  const { data, error } = await window.db.from('gallery').select('*').eq('id', id).single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}

/* GET GALLERY IMAGES */
async function getGalleryImages(galleryId) {
  const { data, error } = await window.db.from('gallery_images').select('*').eq('gallery_id', galleryId);

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

/* UPDATE GALLERY */
async function updateGallery(id, gallery) {
  const { data, error } = await window.db.from('gallery').update(gallery).eq('id', id).select().single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}

/* DELETE GALLERY IMAGES */
async function deleteGalleryImages(galleryId) {
  const { error } = await window.db.from('gallery_images').delete().eq('gallery_id', galleryId);

  if (error) {
    console.error(error);
    return false;
  }

  return true;
}

/* DELETE STORAGE IMAGE */
async function deleteStorageImage(url) {
  if (!url) return true;

  const marker = `/storage/v1/object/public/${GALLERY_BUCKET}/`;

  const filePath = url.includes(marker) ? url.split(marker)[1] : null;

  if (!filePath) return false;

  const { error } = await window.db.storage.from(GALLERY_BUCKET).remove([filePath]);

  if (error) {
    console.error(error);
    return false;
  }

  return true;
}

/* DELETE GALLERY COMPLETE */
async function deleteGalleryComplete(id) {
  const gallery = await getGalleryById(id);

  if (!gallery) return false;

  const images = await getGalleryImages(id);

  // hapus thumbnail dan gambar
  await Promise.all([deleteStorageImage(gallery.thumbnail), ...images.map((img) => deleteStorageImage(img.image_url))]);

  // hapus data gambar gallery
  const imageDeleted = await deleteGalleryImages(id);

  if (!imageDeleted) return false;

  return await deleteGallery(id);
}

/* FORMAT TANGGAL */
function formatTanggal(dateString) {
  if (!dateString) return '-';

  const date = new Date(dateString);

  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

/* INCREMENT VIEW */
async function incrementGalleryView(id) {
  const { data, error } = await window.db.rpc('increment_gallery_view', {
    gallery_id_input: id,
  });

  if (error) {
    console.error(error);
    return false;
  }

  return true;
}

/* COUNT VIEW ONCE */
function countViewOnce(id) {
  const key = `gallery_view_${id}`;

  if (sessionStorage.getItem(key)) return;

  sessionStorage.setItem(key, true);

  incrementGalleryView(id);
}
