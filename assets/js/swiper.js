let swiperDivisi;

function initSwiper() {
  swiperDivisi = new Swiper('.divisiSwiper', {
    slidesPerView: 3,
    spaceBetween: 30,

    loop: true,

    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },

    breakpoints: {
      0: {
        slidesPerView: 1.15,
        centeredSlides: true,
        spaceBetween: 12,
      },

      768: {
        slidesPerView: 2,
      },

      1024: {
        slidesPerView: 3,
      },
    },
  });
}
