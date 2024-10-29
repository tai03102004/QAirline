// Danh sách các địa điểm với thông tin chi tiết
const places = [{
        image: '/client/images/home/SGN.jpg',
        title: 'Sài Gòn',
        national: 'Việt Nam',
        temperature: 'Nhiệt độ 28 °C',
        description: 'Hòn ngọc Viễn Đông của Đông Nam Á để lại ấn tượng sâu sắc ngay từ lần đầu tiên với bất kỳ ai đã từng một lần đặt chân tới.'
    },
    {
        image: '/client/images/home/DAD.jpg',
        title: 'Đà Nẵng',
        national: 'Việt Nam',
        temperature: 'Nhiệt độ 30 °C',
        description: 'Đến với Đà Nẵng để mê mẩn trước những bãi cát trắng, đắm mình giữa làn nước xanh dưới cái nắng vàng ươm. Bạn sẽ ngỡ mình đang lạc vào chốn tiên cảnh nhân gian.'
    },
    {
        image: '/client/images/home/BKK.jpg',
        title: 'Bangkok',
        national: 'Thái Lan',
        temperature: 'Nhiệt độ 30 °C',
        description: '"Sawadee", mời bạn bước vào hành trình khám phá xứ chùa Vàng.'
    },
    {
        image: '/client/images/home/nha-trang.webp',
        title: 'Nha Trang',
        national: 'Việt Nam',
        temperature: 'Nhiệt độ 30 °C',
        description: 'Khám phá thành phố biển, nơi chiêm ngưỡng trọn vẹn bình minh và hoàng hôn ngay trên biển.'
    }
];

let currentPlaceIndex = 0;
const imageElement = document.getElementById('dynamicImage');
const titleElement = document.getElementById('placeTitle');
const nationalElement = document.getElementById('placeNational');
const temperatureElement = document.getElementById('placeTemperature');
const descriptionElement = document.getElementById('placeDescription');

const nextImageElement = document.getElementById('dynamicNextImage');
const nextTitlePlace = document.getElementById('placeNextTitle');

const playPause = document.querySelector('.pausePlay');
let isPlay = true;

function updatePlaceByButton() {
    const buttonItem = document.querySelectorAll(".slick-slide-button");

    buttonItem.forEach((item, index) => {
        item.addEventListener("click", () => {
            currentPlaceIndex = index;
            updatePlaceContent();
            updateNextPlaceContent();
            stopInterval();
            startInterval();
        })
    });
}

updatePlaceByButton();

function updatePlaceContent() {

    const place = places[currentPlaceIndex];

    // Tạm thời ẩn nội dung trong khi chờ ảnh tải
    titleElement.style.visibility = 'hidden';
    nationalElement.style.visibility = 'hidden';
    temperatureElement.style.visibility = 'hidden';
    descriptionElement.style.visibility = 'hidden';

    imageElement.src = place.image;

    imageElement.onload = () => {
        // Khi ảnh tải xong, cập nhật nội dung và hiển thị lại
        titleElement.textContent = place.title;
        nationalElement.textContent = place.national;
        temperatureElement.innerHTML = place.temperature;
        descriptionElement.textContent = place.description;

        titleElement.style.visibility = 'visible';
        nationalElement.style.visibility = 'visible';
        temperatureElement.style.visibility = 'visible';
        descriptionElement.style.visibility = 'visible';
    };
}

function updateNextPlaceContent() {
    const nextPlaceIndex = (currentPlaceIndex + 1) % places.length;
    // Dot:
    const dots = document.querySelector(".slick-dots");
    if (dots) {
        const dotsItem = document.querySelectorAll(".slicky-li");

        dotsItem.forEach(item => {
            item.classList.remove("slicky-active");
        });

        // Thêm class .slicky-active vào item hiện tại
        const currentItem = dotsItem[currentPlaceIndex];
        if (currentItem) {
            currentItem.classList.add("slicky-active");
        }
    }

    const nextPlace = places[nextPlaceIndex];

    nextImageElement.src = nextPlace.image;
    nextImageElement.onload = () => {
        nextTitlePlace.textContent = nextPlace.title;
    };
}

let intervalId;

function startInterval() {
    intervalId =
        setInterval(() => {
            currentPlaceIndex = (currentPlaceIndex + 1) % places.length;
            updatePlaceContent();
            updateNextPlaceContent();
        }, 3000);
}

function stopInterval() {
    clearInterval(intervalId);
}


playPause.addEventListener('click', () => {
    if (isPlay) {
        stopInterval();
        playPause.innerHTML = '<i class="ri-play-circle-line"></i>';
    } else {
        startInterval();
        playPause.innerHTML = '<i class="ri-pause-circle-line"></i>';
    }
    isPlay = !isPlay;
});

// Khởi tạo nội dung lần đầu
startInterval();
updatePlaceContent();
updateNextPlaceContent();