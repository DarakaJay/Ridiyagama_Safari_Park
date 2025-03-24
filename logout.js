
const logoutBtn = document.getElementById('logout-btn');
const cancelBtn = document.getElementById('cancel-btn');


logoutBtn.addEventListener('click', () => {
  alert('Logging out...');

  setTimeout(() => {
    window.location.href = 'home4.html';
  }, 1000);
});


cancelBtn.addEventListener('click', () => {
  alert('Logout canceled.');

  window.history.back();
});





