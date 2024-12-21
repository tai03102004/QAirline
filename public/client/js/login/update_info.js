document.getElementById('profileForm').addEventListener('submit', function (e) {
  e.preventDefault(); 

  const name = document.getElementById('name').value.trim();
  const gender = document.getElementById('gender').value.trim();
  const dob = document.getElementById('dob').value.trim();
  const nationality = document.getElementById('nationality').value.trim();
  const address = document.getElementById('address').value.trim();
  const province = document.getElementById('province').value.trim();
  const city = document.getElementById('city').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  const passport = document.getElementById('passport').value.trim();

  if (!name || !gender || !dob || !nationality || !address || !province || !city || !phone || !email) {
    alert('Vui lòng điền đầy đủ thông tin bắt buộc.');
    return;
  }

  const formData = {
    name,
    gender,
    dob,
    nationality,
    address,
    province,
    city,
    phone,
    email,
    passport,
  };

  fetch('/update-profile', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert('Thông tin đã được cập nhật!');
      } else {
        alert('Cập nhật không thành công: ' + data.message);
      }
    })
    .catch((error) => {
      alert('Lỗi: ' + error.message);
    });
});
