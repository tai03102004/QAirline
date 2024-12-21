document.addEventListener('DOMContentLoaded', function () {
    const today = new Date();
    const start = new Date(today.getFullYear(), 10, 1); // Ngày bắt đầu: 1/11
    const end = new Date(today.getFullYear(), 11, 30);  // Ngày kết thúc: 30/12

    if (today >= start && today <= end) {
        const maxSnowflakes = 40; 
        const snowflakes = []; 

        function createSnowflake() {
            if (snowflakes.length >= maxSnowflakes) {
                return; // Không tạo thêm nếu đạt giới hạn
            }

            let snowflake = document.createElement('div'); 
            snowflake.className = 'snowflake';
            
            // Tạo kích thước ngẫu nhiên cho bông tuyết
            const size = Math.random() * 15 + 12; // Kích thước từ 10px đến 25px
            snowflake.style.width = `${size}px`;
            snowflake.style.height = `${size}px`;

            snowflake.style.left = Math.random() * window.innerWidth + 'px'; 
            snowflake.style.animationDuration = (Math.random() * 5 + 5) + 's'; 
            snowflake.style.animationDelay = Math.random() * 5 + 's'; 
            document.body.appendChild(snowflake);

            snowflakes.push(snowflake); 

            // Xóa bông tuyết sau khi rơi xong
            snowflake.addEventListener('animationend', function () {
                snowflake.remove(); 
                const index = snowflakes.indexOf(snowflake); 
                if (index > -1) {
                    snowflakes.splice(index, 1);
                }
            });
        }

        // Tạo bông tuyết liên tục
        setInterval(() => {
            createSnowflake();
        }, 1000); // Mỗi 1000ms tạo 1 bông tuyết
    }
});
