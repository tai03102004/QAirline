const loginForm = document.getElementById('login');
const registerForm = document.getElementById('register');

// Chuyển sang form đăng ký
function showRegister() {
  loginForm.style.display = 'none'; 
  registerForm.style.display = 'block'; 
}

// Chuyển sang form đăng nhập
function showLogin() {
  registerForm.style.display = 'none'; 
  loginForm.style.display = 'block'; 
}

// Khi trang được tải xong, mặc định hiển thị form đăng nhập
document.addEventListener('DOMContentLoaded', () => {
  loginForm.style.display = 'block';
  registerForm.style.display = 'none'; 
});

// Đăng ký
registerForm.querySelector('form').addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.querySelector('#register #user').value;
  const email = document.querySelector('#register #email').value;
  const password = document.querySelector('#register #password').value;

  fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      alert('Registration successful');
      window.location.href = '/profile';
    } else {
      alert('Registration failed: ' + data.message);
    }
  })
  .catch(err => {
    alert('Error: ' + err.message);
  });
});

// Đăng nhập
loginForm.querySelector('form').addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.querySelector('#login #user').value;
  const password = document.querySelector('#login #password').value;

  fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
  .then(res => res.json())
  .then(data => {
    if (data.token) {
      alert('Login successful');
      localStorage.setItem('token', data.token); // Lưu token vào localStorage
      window.location.href = '/flight_listlist';
    } else {
      alert('Login failed: ' + data.message);
    }
  })
  .catch(err => {
    alert('Error: ' + err.message);
  });
});
