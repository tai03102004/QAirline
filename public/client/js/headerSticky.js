document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('authToken');

    if (token) {
        // Hiển thị nút "Hồ sơ" và "Đăng xuất" sau khi đăng nhập
        const menu = document.querySelector('nav ul');

        menu.innerHTML += `
            <li><a href="/profile">Hồ sơ</a></li>
            <li><a href="/logout">Đăng xuất</a></li>
        `;

        // Ẩn nút "Đăng nhập"
        const loginButton = menu.querySelector('a[href="/login"]');
        if (loginButton) loginButton.remove();
    }
});
