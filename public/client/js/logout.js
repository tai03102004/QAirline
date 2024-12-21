document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.querySelector('a[href="/logout"]');
    
    if (logoutButton) {
        logoutButton.addEventListener('click', (e) => {
            e.preventDefault();  

            localStorage.removeItem('authToken');

            // Ẩn "Hồ sơ" và hiển thị "Đăng nhập"
            const menu = document.querySelector('nav ul');
            menu.innerHTML = menu.innerHTML.replace(
                '<li><a href="/profile">Hồ sơ</a></li>',
                ''
            );
            menu.innerHTML = menu.innerHTML.replace(
                '<li><a href="/logout">Đăng xuất</a></li>',
                ''
            );

            // Thêm lại nút "Đăng nhập"
            menu.innerHTML += `
                <li><a href="/login">Đăng nhập</a></li>
            `;

            // Chuyển hướng về trang chủ sau khi đăng xuất
            window.location.href = '/';
        });
    }
});
