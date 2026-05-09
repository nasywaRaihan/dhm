function initAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray('.reveal').forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      y: 60,
      duration: 1,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
      },
    });
  });

  gsap.to('.hero-left img', {
    y: 60,
    scrollTrigger: {
      trigger: '.hero',
      scrub: true,
    },
  });
}
