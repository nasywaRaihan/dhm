console.log('ADMIN LOGOUT LOADED');

function initLogout() {
  console.log('INIT LOGOUT JALAN');

  const logoutBtn = document.getElementById('logoutBtn');

  const logoutPopup = document.getElementById('logoutPopup');

  const cancelLogout = document.getElementById('cancelLogout');

  const confirmLogout = document.getElementById('confirmLogout');

  if (!logoutBtn || !logoutPopup) return;

  logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();

    console.log('LOGOUT DIKLIK');

    logoutPopup.classList.add('active');
  });

  cancelLogout?.addEventListener('click', () => {
    logoutPopup.classList.remove('active');
  });

  logoutPopup.addEventListener('click', (e) => {
    if (e.target === logoutPopup) {
      logoutPopup.classList.remove('active');
    }
  });

  confirmLogout?.addEventListener('click', () => {
    localStorage.removeItem('adminLoggedIn');

    window.location.href = 'index.html';
  });
}

document.addEventListener('DOMContentLoaded', initLogout);
