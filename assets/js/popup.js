function initDivisiPopup() {
  const modal = document.getElementById('divisiModal');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const closeModal = document.getElementById('closeModal');
  const openBtns = document.querySelectorAll('.openDivisi');

  openBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const index = Number(btn.dataset.index);

      modal.classList.add('active');

      modalTitle.textContent = divisiData[index].title;
      modalDesc.textContent = divisiData[index].desc;
      modalImg.src = divisiData[index].img;
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
