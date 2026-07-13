function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');

  if (!container) return;

  const toast = document.createElement('div');

  toast.className = `toast ${type}`;

  const icon = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  };

  toast.innerHTML = `
    <div class="toast-icon">
      ${icon[type] || '✓'}
    </div>

    <div class="toast-content">
      ${message}
    </div>

    <div class="toast-progress"></div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('hide');

    setTimeout(() => {
      toast.remove();
    }, 350);
  }, 3000);
}

function showSuccess(message) {
  showToast(message, 'success');
}

function showError(message) {
  showToast(message, 'error');
}

function showWarning(message) {
  showToast(message, 'warning');
}

function showInfo(message) {
  showToast(message, 'info');
}
