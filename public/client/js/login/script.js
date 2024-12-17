function showRegister() {
    document.getElementById("login").classList.remove("active");
    document.getElementById("register").classList.add("active");
  }
  function showLogin() {
    document.getElementById("register").classList.remove("active");
    document.getElementById("login").classList.add("active");
  }
  showLogin()

  document.querySelectorAll('form').forEach((form) => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const formData = new FormData(form);
      const formDataObject = {};
      formData.forEach((value, key) => {
        formDataObject[key] = value;
      });
  
      try {
        console.log(form.action);
        const response = await fetch(form.action, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formDataObject),
        });
  
        const data = await response.json();
        if (response.status !== 200) {
          throw new Error(data.message || 'Đã xảy ra lỗi!');
        } else {
          window.location.href = '/';
        }
        alert(data.message);
      } catch (error) {
        console.error('Lỗi:', error.message);
        alert(error.message);
      }
    });
  });
  