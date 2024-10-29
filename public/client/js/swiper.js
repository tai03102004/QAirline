const swiper = new Swiper('.swiper-container', {
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

const playPauseBtn = document.querySelector('.play-pause-btn');
let isPlaying = true; // Trạng thái ban đầu là đang chạy

playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        swiper.autoplay.stop();
        playPauseBtn.innerHTML = '<i class="ri-play-circle-line"></i>';
    } else {
        swiper.autoplay.start();
        playPauseBtn.innerHTML = '<i class="ri-pause-circle-line"></i>';
    }
    isPlaying = !isPlaying;
});