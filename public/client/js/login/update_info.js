document
  .getElementById("profileForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Lấy dữ liệu từ form
    const formData = {
      fullName: document.getElementById("fullName").value,
      gender: document.getElementById("gender").value,
      dob: document.getElementById("dob").value,
      nationality: document.getElementById("nationality").value,
      address: document.getElementById("address").value,
      province: document.getElementById("province").value,
      city: document.getElementById("city").value,
      phone: document.getElementById("phone").value,
      email: document.getElementById("email").value,
      passport: document.getElementById("passport").value,
    };

    // Lưu dữ liệu vào localStorage
    localStorage.setItem("profileData", JSON.stringify(formData));

    // Chuyển sang trang profile
    window.location.href = "profile.pug";
  });
