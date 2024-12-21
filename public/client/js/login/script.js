document.querySelectorAll('form').forEach((form) => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    try {
      console.log("Dữ liệu gửi đi:", formDataObject); // In dữ liệu gửi đi

      const url = form.action;  
      const method = 'POST';   

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataObject),
      });

      if (!response.ok) {
        throw new Error('Lỗi từ server: ' + response.statusText);
      }

      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        console.log("Phản hồi từ server:", data); 

        if (response.status !== 200) {
          throw new Error(data.message || 'Đã xảy ra lỗi!');
        } else {
          if (url.includes('loginaccount')) {
            alert("Đăng nhập thành công!");
            window.location.href = '/';  
          } else if (url.includes('signupaccount')) {
            alert("Đăng ký thành công!");
            window.location.href = '/profile';  
          }
        }
      } else {
        const text = await response.text();
        throw new Error('Dữ liệu trả về không phải JSON: ' + text);
      }
    } catch (error) {
      console.error('Lỗi:', error.message);
      alert(error.message);
    }
  });
});
