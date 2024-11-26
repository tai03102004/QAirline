// Lấy các phần tử cần thiết
const dropdownInput = document.querySelector('.dropdown-input');
const dropdownContent = document.querySelector('.dropdown-content');
const dropdownItems = dropdownContent.querySelectorAll('ul li');

dropdownInput.addEventListener('click', () => {
  dropdownContent.style.display = 'block';
});

// Lọc danh sách theo từ khóa
dropdownInput.addEventListener('input', () => {
    const filter = dropdownInput.value.toLowerCase().trim();
    let hasResults = false;

    dropdownItems.forEach((item) => {
        const text = item.textContent.toLowerCase();
        if (text.includes(filter)) {
            item.style.display = ''; // Hiển thị
            hasResults = true;
        } else {
            item.style.display = 'none'; // Ẩn
        }
    });

    // Hiển thị dropdown nếu có kết quả
    dropdownContent.style.display = hasResults ? 'block' : 'none';
});

// Xử lý chọn mục trong dropdown
dropdownItems.forEach((item) => {
    item.addEventListener('click', () => {
        dropdownInput.value = item.textContent; // Đặt giá trị vào input
        dropdownContent.style.display = 'none'; // Ẩn dropdown
    });
});

// Ẩn dropdown khi nhấn ra ngoài
document.addEventListener('click', (event) => {
    if (!dropdownInput.contains(event.target) && !dropdownContent.contains(event.target)) {
        dropdownContent.style.display = 'none';
    }
});
