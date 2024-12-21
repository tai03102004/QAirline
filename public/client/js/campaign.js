document.addEventListener('DOMContentLoaded', () => {
    const swiper = new Swiper('.swiper', {
        slidesPerView: 3, // Hiển thị 3 thẻ cùng lúc
        spaceBetween: 20, // Khoảng cách giữa các thẻ
        loop: true, // Lặp lại
        autoplay: {
            delay: 3000, // Thời gian mỗi slide
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.swiper-button-next', // Nút next
            prevEl: '.swiper-button-prev', // Nút prev
        },
        pagination: {
            el: '.swiper-pagination', // Hiển thị các điểm nhỏ để chỉ slide
            clickable: true,
        },
    });
});