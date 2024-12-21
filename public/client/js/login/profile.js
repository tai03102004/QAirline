  document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');  

    fetch('/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);  
      if (data.user) {
        document.getElementById('name-display').innerText = data.user.name || 'Chưa cập nhật';
        document.getElementById('gender-display').innerText = data.user.gender || 'Chưa cập nhật';
        document.getElementById('dob-display').innerText = data.user.dob || 'Chưa cập nhật';
        document.getElementById('nationality-display').innerText = data.user.nationality || 'Chưa cập nhật';
        document.getElementById('address-display').innerText = data.user.address || 'Chưa cập nhật';
        document.getElementById('province-display').innerText = data.user.province || 'Chưa cập nhật';
        document.getElementById('city-display').innerText = data.user.city || 'Chưa cập nhật';
        document.getElementById('phone-display').innerText = data.user.phone || 'Chưa cập nhật';
        document.getElementById('email-display').innerText = data.user.email || 'Chưa cập nhật';
        document.getElementById('passport-display').innerText = data.user.passport || 'Chưa cập nhật';
        document.getElementById('editBtn').addEventListener('click', function() {
          window.location.href = "/update-profile";
        });
      } else {
        console.error("Dữ liệu không hợp lệ: ", data);
      }
    })
      
    .catch(error => console.error('Error:', error));
  });
