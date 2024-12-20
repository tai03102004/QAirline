//Lấy dữ liệu sân bay
const locationDropdown = document.querySelectorAll('.locationDropdown')

async function fetchAllAirports() {
  let airportsFetchedData
  try {
    const response = await fetch('/getairports');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    airportsFetchedData = await response.json();
    console.log(airportsFetchedData);
  } catch (error) {
    console.error('Error fetching airports data:', error);
  }
  return airportsFetchedData
}

const airportData = await fetchAllAirports()

locationDropdown.forEach(dropdown => {
  dropdown.innerHTML = ''
  airportData.forEach(airport => {
    const airportLocation = document.createElement('li')
    airportLocation.innerText = `${airport.province} (${airport.code})`
    dropdown.appendChild(airportLocation)
  }) 
})

const departInput = document.querySelector('.depart-dropdown .dropdown-input');
const departContent = document.querySelector('.depart-dropdown .dropdown-content');
const departItems = departContent.querySelectorAll('ul li');

// Xử lý cho dropdown depart
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
          totalCountElement.value = updatedTotal;
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

const economybtn = document.querySelector('#economyclass')
const businessbtn = document.querySelector('#businessclass')
const classchosen = document.querySelector('#classchosen')

economybtn.onclick = function() {chooseClass(true)}
businessbtn.onclick = function() {chooseClass(false)}

function chooseClass(isEconomy) {
  if (isEconomy) {
    if (classchosen.value === 'economyclass') {
      economybtn.classList.remove('class-button-choose')
      classchosen.value = 'none'
    } else {
      economybtn.classList.add('class-button-choose')
      businessbtn.classList.remove('class-button-choose')
      classchosen.value = 'economyclass'
    }
  } else {
    if (classchosen.value === 'businessclass') {
      businessbtn.classList.remove('class-button-choose')
      classchosen.value = 'none'
    } else {
      economybtn.classList.remove('class-button-choose')
      businessbtn.classList.add('class-button-choose')
      classchosen.value = 'businessclass'
    }
  }
}