const sideMenu = document.querySelector('aside');
const menuBtn = document.querySelector('#menu_bar');
const closeBtn = document.querySelector('#close_btn');

// Select all sidebar items (assuming they are <a> elements inside .sidebar)
const sidebarItems = document.querySelectorAll('.sidebar a');
const activeIndex = localStorage.getItem('activeSidebarIndex');

sidebarItems.forEach(i => i.classList.remove("active"));

// Nếu có chỉ số "active" trong localStorage, chỉ đặt lớp "active" cho mục đó
if (activeIndex !== null) {
    sidebarItems[activeIndex].classList.add("active");
}

sidebarItems.forEach((item, index) => {
    item.addEventListener("click", (event) => {
        sidebarItems.forEach(i => i.classList.remove("active"));

        item.classList.add("active");

        localStorage.setItem('activeSidebarIndex', index);
    });
});

const loginForm = document.querySelector("form.login");
cosole.log(loginForm);
if (loginForm) {
    loginForm.addEventListener("submit", () => {
        // Reset active sidebar index to 0
        localStorage.setItem('activeSidebarIndex', 0);
    });
}


const themeToggler = document.querySelector('.theme-toggler');

menuBtn.addEventListener('click', () => {
    sideMenu.style.display = "block"
})
closeBtn.addEventListener('click', () => {
    sideMenu.style.display = "none"
})

themeToggler.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme-variables')
    themeToggler.querySelector('span:nth-child(1').classList.toggle('active')
    themeToggler.querySelector('span:nth-child(2').classList.toggle('active')
})