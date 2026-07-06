let galleryData = [
  {
    title: 'Kajian Akbar',

    slug: 'kajian-akbar',

    category: 'Kajian',

    division: 'Pembinaan Siswa',

    thumbnail: 'assets/gallery9.jpg',

    date: '5 Maret 2026',

    desc: `
    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

      <br><br>

      Duis aute irure dolor in reprehenderit in voluptate velit esse.
    `,

    images: ['assets/gallery9.jpg', 'assets/gallery10.jpg'],
  },

  {
    title: 'Dauroh Kampus',

    slug: 'dauroh-kampus',

    category: 'Dauroh',

    division: 'Pembinaan Siswa',

    thumbnail: 'assets/gallery4.jpg',

    date: '20 Februari 2026',

    desc: `
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

      <br><br>

      Duis aute irure dolor in reprehenderit in voluptate velit esse.
    `,

    images: ['assets/gallery4.jpg', 'assets/gallery5.jpg'],
  },

  {
    title: 'Kajian Rutin',

    slug: 'kajian-rutin',

    category: 'Kajian',

    division: 'Pembinaan Siswa',

    thumbnail: 'assets/gallery6.jpg',

    date: '1 Maret 2026',

    desc: `
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

      <br><br>

      Duis aute irure dolor in reprehenderit in voluptate velit esse.
    `,

    images: ['assets/gallery6.jpg', 'assets/gallery7.jpg', 'assets/gallery8.jpg'],
  },
  {
    title: 'Kajian Akbar',

    slug: 'kajian-akbar',

    category: 'Kajian',

    division: 'Pembinaan Siswa',

    thumbnail: 'assets/gallery9.jpg',

    date: '5 Maret 2026',

    desc: `
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

      <br><br>

      Duis aute irure dolor in reprehenderit in voluptate velit esse.
  `,

    images: ['assets/gallery9.jpg', 'assets/gallery10.jpg'],
  },
];

const divisiData = [
  {
    title: 'PH',
    img: 'assets/img/roblox_asik.png',
    desc: 'Pengurus Harian (PH) merupakan tim inti yang menjaga roda organisasi tetap berjalan. Divisi ini berperan dalam monitoring program kerja, pengelolaan administrasi, surat-menyurat, koordinasi internal, serta pengelolaan keuangan organisasi agar seluruh agenda dakwah dapat berjalan tertib dan berkesinambungan.',
  },

  {
    title: 'HUMMED',
    img: 'assets/img/roblox_asik.png',
    desc: 'Divisi Humas dan Media (HUMMED) berperan dalam menyebarkan dakwah secara kreatif di ruang digital. Divisi ini mengelola media sosial, podcast, konten kreatif, serta dokumentasi kegiatan. Selain itu, divisi ini juga menjalin relasi melalui studi banding dengan lembaga dakwah lain untuk memperluas jaringan dan menghadirkan inovasi dakwah.',
  },

  {
    title: 'PSDI',
    img: 'assets/img/roblox_asik.png',
    desc: 'Divisi Pengembangan Sumber Daya Insani (PSDI) berfokus pada pembinaan internal anggota DHM. Melalui kegiatan seperti Majlis Ilmu, Rihlah, Liga DHM, dan Lailatul Ukhuwah, divisi ini memperkuat softskill, ukhuwah, kebersamaan, serta semangat persaudaraan antaranggota.',
  },

  {
    title: 'PS',
    img: 'assets/img/roblox_asik.png',
    desc: 'Divisi Pembinaan Siswa fokus pada pembinaan pelajar sekolah.',
  },

  {
    title: 'PM',
    img: 'assets/img/roblox_asik.png',
    desc: 'Divisi Pembinaan Masyarakat (PM) hadir sebagai bentuk kepedulian DHM kepada masyarakat, khususnya melalui dusun binaan. Program yang dijalankan meliputi Relawan Ramadhan, Kajian Dakwah, Daurah Fiqhiyah, Bakti Sosial, serta penyaluran hewan Qurban sebagai wujud kontribusi nyata dalam membangun masyarakat yang lebih religius dan peduli.',
  },

  {
    title: 'Kemuslimahan',
    img: 'assets/img/roblox_asik.png',
    desc: 'Divisi Kemuslimahan menjadi ruang pembinaan dan pengembangan potensi muslimah di lingkungan DHM. Melalui Kajian Kemuslimahan dan Ruang Sapa Singgah, divisi ini hadir untuk memperkuat ilmu, akhlak, ukhuwah, serta peran mahasiswi dalam dakwah. ',
  },
];

const localGallery = localStorage.getItem('galleryData');

if (localGallery) {
  galleryData = JSON.parse(localGallery);
}
