function initLoginPopup() {
  const loginPopup = document.getElementById('loginPopup');

  const closeLogin = document.getElementById('closeLogin');

  const loginLinks = document.querySelectorAll('.admin-link');

  const loginForm = document.getElementById('loginForm');

  /* OPEN */
  loginLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      loginPopup.classList.add('active');
    });
  });

  /* CLOSE */
  closeLogin.addEventListener('click', () => {
    loginPopup.classList.remove('active');
  });

  /* OUTSIDE CLICK */
  loginPopup.addEventListener('click', (e) => {
    if (e.target === loginPopup) {
      loginPopup.classList.remove('active');
    }
  });

  /* LOGIN */
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;

    const password = document.getElementById('loginPassword').value;

    /* DUMMY LOGIN */
    if (email === 'admin@gmail.com' && password === 'admin123') {
      window.location.href = 'dashboard.html';
    } else {
      alert('Email atau password salah!');
    }
  });
}
