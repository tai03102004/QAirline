const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'bar', // Chọn kiểu biểu đồ
    data: {
        labels: ["Not Departed", "In Flight", "Arrived"],
        datasets: [{
            label: 'Tỉ lệ chuyến bay',
            data: [
                0.3,
                0.1,
                0.82,
            ],
            backgroundColor: ['#4CAF50', '#FF9800', '#E91E63'],
            borderColor: '#333',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Trạng thái chuyến bay',
                font: {
                    size: 20 // Điều chỉnh kích thước font nếu cần
                },
                color: '#F0F0F0', // Màu tiêu đề
                padding: {
                    top: 10,
                    bottom: 30
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});