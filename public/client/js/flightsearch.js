// Xử lý cho dropdown depart
const departInput = document.querySelector('.depart-dropdown .dropdown-input');
const departContent = document.querySelector('.depart-dropdown .dropdown-content');
const departItems = departContent.querySelectorAll('ul li');

departInput.addEventListener('click', () => {
  departContent.style.display = 'block';
});

departInput.addEventListener('input', () => {
  const filter = departInput.value.toLowerCase().trim();
  let hasResults = false;

  departItems.forEach((item) => {
    const text = item.textContent.toLowerCase();
    if (text.includes(filter)) {
      item.style.display = ''; // Hiển thị
      hasResults = true;
    } else {
      item.style.display = 'none'; // Ẩn
    }
  });

  departContent.style.display = hasResults ? 'block' : 'none';
});

departItems.forEach((item) => {
  item.addEventListener('click', () => {
    departInput.value = item.textContent.trim(); // Đặt giá trị vào input
    departContent.style.display = 'none'; // Ẩn dropdown
  });
});

// Xử lý cho dropdown arrive
const arriveInput = document.querySelector('.arrive-dropdown .dropdown-input');
const arriveContent = document.querySelector('.arrive-dropdown .dropdown-content');
const arriveItems = arriveContent.querySelectorAll('ul li');

arriveInput.addEventListener('click', () => {
  arriveContent.style.display = 'block';
});

arriveInput.addEventListener('input', () => {
  const filter = arriveInput.value.toLowerCase().trim();
  let hasResults = false;

  arriveItems.forEach((item) => {
    const text = item.textContent.toLowerCase();
    if (text.includes(filter)) {
      item.style.display = ''; // Hiển thị
      hasResults = true;
    } else {
      item.style.display = 'none'; // Ẩn
    }
  });

  arriveContent.style.display = hasResults ? 'block' : 'none';
});

arriveItems.forEach((item) => {
  item.addEventListener('click', () => {
    arriveInput.value = item.textContent; // Đặt giá trị vào input
    arriveContent.style.display = 'none'; // Ẩn dropdown
  });
});

// Ẩn cả hai dropdown khi nhấn ra ngoài
document.addEventListener('click', (event) => {
  if (!departInput.contains(event.target) && !departContent.contains(event.target)) {
    departContent.style.display = 'none';
  }
  if (!arriveInput.contains(event.target) && !arriveContent.contains(event.target)) {
    arriveContent.style.display = 'none';
  }
});

document.addEventListener('DOMContentLoaded', () => {
    const oneWayRadio = document.getElementById('oneway');
    const roundTripRadio = document.getElementById('roundtrip');
    const returningGroup = document.getElementById('returning-group');

    // Hàm để cập nhật trạng thái hiển thị của "Returning"
    function toggleReturningField() {
        if (oneWayRadio.checked) {
            returningGroup.style.display = 'none'; // Ẩn trường Returning
        } else {
            returningGroup.style.display = 'block'; // Hiện trường Returning
        }
    }

    // Kiểm tra trạng thái ban đầu khi trang được tải
    toggleReturningField();

    // Lắng nghe sự thay đổi khi người dùng chọn các option
    oneWayRadio.addEventListener('change', toggleReturningField);
    roundTripRadio.addEventListener('change', toggleReturningField);
});

document.addEventListener('DOMContentLoaded', () => {
  const maxPassengers = 9; // Giới hạn tổng số hành khách
  const totalCountElement = document.querySelector('.total-count'); // Phần tử hiển thị tổng số hành khách

  // Hàm tính tổng số hành khách
  const calculateTotalPassengers = () => {
      const counts = document.querySelectorAll('.passenger-row .count');
      return Array.from(counts).reduce((total, span) => total + parseInt(span.textContent, 10), 0);
  };

  // Hàm cập nhật số lượng hành khách
  const updatePassengerCount = (button, increment) => {
      const countSpan = button.parentElement.querySelector('.count');
      let currentCount = parseInt(countSpan.textContent, 10);

      const totalPassengers = calculateTotalPassengers();

      // Kiểm tra giới hạn
      if (increment > 0 && totalPassengers >= maxPassengers) {
          alert(`You can only book a maximum of ${maxPassengers} passengers.`);
          return;
      }

      if (currentCount + increment >= 0 && currentCount + increment <= maxPassengers) {
          countSpan.textContent = currentCount + increment;

          // Cập nhật tổng số hành khách
          const updatedTotal = calculateTotalPassengers();
          totalCountElement.textContent = updatedTotal;
      }
  };

  // Lấy tất cả các nút tăng và giảm
  const incrementButtons = document.querySelectorAll('.btn-increment');
  const decrementButtons = document.querySelectorAll('.btn-decrement');

  // Gắn sự kiện click cho nút tăng
  incrementButtons.forEach(button => {
      button.addEventListener('click', () => updatePassengerCount(button, 1));
  });

  // Gắn sự kiện click cho nút giảm
  decrementButtons.forEach(button => {
      button.addEventListener('click', () => updatePassengerCount(button, -1));
  });
});
