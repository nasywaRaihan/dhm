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

  confirmLogout?.addEventListener('click', async () => {
    // Logout dari Supabase
    await window.db.auth.signOut();

    // Hapus data lokal yang masih dipakai
    localStorage.removeItem('adminName');
    localStorage.removeItem('adminRole');
    localStorage.removeItem('adminEmail');

    // Kembali ke homepage
    window.location.replace('index.html');
  });
}

document.addEventListener('DOMContentLoaded', initLogout);
