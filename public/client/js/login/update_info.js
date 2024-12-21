document.getElementById('profileForm').addEventListener('submit', function (e) {
  e.preventDefault(); 

  // Collect form data
  const name = document.getElementById('name').value;
  const gender = document.getElementById('gender').value;
  const dob = document.getElementById('dob').value;
  const nationality = document.getElementById('nationality').value;
  const address = document.getElementById('address').value;
  const province = document.getElementById('province').value;
  const city = document.getElementById('city').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const passport = document.getElementById('passport').value;

  // Prepare data to send
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

  // Send the data to the server using fetch
  fetch('/api/account/profile', {
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
