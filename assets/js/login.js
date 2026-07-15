function initLoginPopup() {
  const loginPopup = document.getElementById('loginPopup');

  const closeLogin = document.getElementById('closeLogin');

  const loginLinks = document.querySelectorAll('.admin-link');

  const loginForm = document.getElementById('loginForm');

  /* AUTO LOGIN */
  window.db.auth.getSession().then(({ data: { session } }) => {
    if (session) {
      window.location.replace('dashboard.html');
    }
  });

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
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    const loginBtn = loginForm.querySelector('.login-btn');

    loginBtn.disabled = true;
    loginBtn.innerHTML = `
    <span class="spinner"></span>
    Sedang Masuk...
`;

    // Login menggunakan Supabase Auth
    const { data: authData, error } = await window.db.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      showToast('Email atau password salah!', 'error');

      loginBtn.disabled = false;
      loginBtn.textContent = 'Login Sekarang';

      return;
    }

    // Ambil data admin
    const { data: admin, error: adminError } = await window.db.from('admin').select('*').eq('email', email).single();

    if (adminError || !admin) {
      showToast('Data admin tidak ditemukan!', 'error');

      loginBtn.disabled = false;
      loginBtn.textContent = 'Login Sekarang';

      return;
    }

    // Simpan data admin
    localStorage.setItem('adminName', admin.nama);
    localStorage.setItem('adminRole', admin.role);
    localStorage.setItem('adminEmail', admin.email);

    // Tampilkan toast
    showToast('Login berhasil. Selamat datang Admin DHM!', 'success');

    // Ubah tombol
    loginBtn.innerHTML = '✅ Berhasil!';

    // Redirect
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 1200);
  });
}

function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');

  const toast = document.createElement('div');

  toast.className = `toast ${type}`;

  toast.innerHTML = `
      <div class="toast-icon">
          ${type === 'success' ? '✓' : '⚠'}
      </div>

      <div>${message}</div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('hide');

    setTimeout(() => toast.remove(), 350);
  }, 3000);
}
