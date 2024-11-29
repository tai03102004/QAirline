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

// const searchFlights = async (departure, arrival) => {
//     try {
//       const response = await fetch(`/api/flights?departureLocation=${departure}&arrivalLocation=${arrival}`);
//       const flights = await response.json();
//       return flights;
//     } catch (error) {
//       console.error('Lỗi khi lấy chuyến bay:', error);
//       return [];
//     }
//   };
  
//   // Xử lý khi người dùng nhấn nút tìm kiếm
//   document.querySelector('.search-button').addEventListener('click', async () => {
//     const departure = document.querySelector('.depart-dropdown .dropdown-input').value.trim();
//     const arrival = document.querySelector('.arrive-dropdown .dropdown-input').value.trim();
  
//     if (!departure || !arrival) {
//       alert('Vui lòng chọn điểm khởi hành và điểm đến!');
//       return;
//     }
  
//     const flights = await searchFlights(departure, arrival);
//   });
  