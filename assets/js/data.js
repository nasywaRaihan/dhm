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
    img: 'assets/roblox_asik.png',
    desc: 'Divisi Pengembangan Sumber Daya Insani berfokus pada pembinaan kader dakwah yang aktif dan berkualitas.',
  },

  {
    title: 'HUMMED',
    img: 'assets/roblox_asik.png',
    desc: 'Divisi HUMMED bertanggung jawab dalam media informasi dan publikasi kegiatan DHM.',
  },

  {
    title: 'PSDI',
    img: 'assets/roblox_asik.png',
    desc: 'Divisi PSDI berperan dalam pengembangan kaderisasi dan peningkatan SDM.',
  },

  {
    title: 'PS',
    img: 'assets/roblox_asik.png',
    desc: 'Divisi Pembinaan Siswa fokus pada pembinaan pelajar sekolah.',
  },

  {
    title: 'PM',
    img: 'assets/roblox_asik.png',
    desc: 'Divisi Pembinaan Masyarakat bergerak dalam pengabdian masyarakat.',
  },

  {
    title: 'Kemuslimahan',
    img: 'assets/roblox_asik.png',
    desc: 'Divisi Kemuslimahan fokus pada pembinaan muslimah aktif. Syududuuuuuuuuuuuuuu',
  },
];

const localGallery = localStorage.getItem('galleryData');

if (localGallery) {
  galleryData = JSON.parse(localGallery);
}
