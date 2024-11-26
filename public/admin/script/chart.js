// Lấy phần tử canvas
const ctx = document.getElementById('airlinesChart').getContext('2d');

// Tạo biểu đồ
const airlinesChart = new Chart(ctx, {
    type: 'doughnut', // Biểu đồ doughnut
    data: {
        labels: ['SkyHigh Airlines', 'FlyFast Airways', 'AeroJet', 'Nimbus Airlines'],
        datasets: [{
            data: [35, 30, 20, 15], // Phần trăm các hãng
            backgroundColor: ['#f6d788', '#333', '#777', '#bbb'], // Màu sắc
            hoverOffset: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: false // Ẩn legend mặc định
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `${context.label}: ${context.raw}%`;
                    }
                }
            }
        },
        cutout: '80%' // Kích thước phần giữa trống
    }
});