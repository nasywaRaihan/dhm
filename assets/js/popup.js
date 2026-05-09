function initDivisiPopup() {
  const modal = document.getElementById('divisiModal');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const closeModal = document.getElementById('closeModal');
  const openBtns = document.querySelectorAll('.openDivisi');

  openBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      modal.classList.add('active');

      modalTitle.textContent = divisiData[i].title;

      modalDesc.textContent = divisiData[i].desc;

      modalImg.src = divisiData[i].img;
    });
  });

  closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
}
