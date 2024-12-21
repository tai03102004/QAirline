
checkbtn.onclick = checkTicket;

deletebtn.onclick = async function() {
    const ticketId = document.getElementById('ticketIdInput').value;

    // Kiểm tra xem người dùng đã nhập mã vé chưa
    if (!ticketId) {
        alert('Vui lòng nhập mã số vé để xóa!');
        return;
    }

    // Xác nhận trước khi xóa
    const confirmDelete = confirm(`Bạn có chắc chắn muốn xóa vé với mã số: ${ticketId}?`);
    if (!confirmDelete) {
        return;
    }

    try {
        // Gửi yêu cầu DELETE đến server
        const response = await fetch(`/ticketcheck/delete-ticket/${ticketId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Không thể xóa vé. Vui lòng kiểm tra lại!');
        }

        const result = await response.json();

        // Thông báo thành công
        if (result.success) {
            alert('Vé đã được xóa thành công!');
            document.getElementById('ticketIdInput').value = '';
            HideInfo();
        } else {
            alert('Không tìm thấy vé hoặc không thể xóa vé!');
        }
    } catch (error) {
        console.error('Lỗi khi xóa vé:', error);
        alert('Có lỗi xảy ra, vui lòng thử lại!');
    }
}

async function checkTicket() {
    const ticketId = document.getElementById('ticketIdInput').value;
    if (!ticketId) {
        alert('Vui lòng nhập mã số vé!');
        return;
    }

    try {
        const response = await fetch(`/ticketcheck/${ticketId}`);
        if (response.status === 404) {
            alert("Không tìm thấy vé")
        } else if (response.status === 200) {
            
            ticketboard.style.display = 'unset';
            deletebtn.style.display = 'unset';

            const result = await response.json();
            const booking = result.booking
            const departAirport = result.departAirport
            const arriveAirport = result.arriveAirport
            const departdate = new Date(booking.departureTime.replace('Z', ''));
            const arrivedate = new Date(booking.arrivalTime.replace('Z', ''));
            console.log(departdate.toLocaleString().substr(9))
            const date = departdate.toLocaleString().substr(9);
            bookingId.innerHTML = `<strong>Mã Đặt Chỗ:</strong> ${ticketId}`;
            departDate.innerHTML = `<strong>Khởi Hành Ngày:</strong> ${date}`;
            flightNumber.innerHTML = `<strong>Chuyến Bay:</strong> ${booking.flightNumber}`;
            flightDuration.innerHTML = `<strong>Thời Gian Bay:</strong> ${calculateTimeDifference(booking.departureTime, booking.arrivalTime)}`;
            seatclass.innerHTML = `<strong>Hạng:</strong> ${booking.seatClass}`;
            departLocation.innerHTML = `<strong>Khởi hành từ:</strong> ${departAirport.name} (${departAirport.province})`;
            const departtime = departdate.toLocaleTimeString('vi-VN');
            const arrivetime = arrivedate.toLocaleTimeString('vi-VN');
            departTime.innerHTML = `<strong>Giờ Khởi Hành:</strong> ${departtime}`;
            arriveLocation.innerHTML = `<strong>Điểm đến:</strong> ${arriveAirport.name} (${arriveAirport.province})`;
            arriveTime.innerHTML = `<strong>Giờ Đến:</strong> ${arrivetime}`;
            fullname.innerHTML = `<strong>Tên Hành Khách:</strong> ${booking.passengerName}`;
            seatNumber.innerHTML = `<strong>Ghế:</strong> ${booking.seatNumber}`;
        }
    } catch (error) {
        alert(error);
    }
}

function calculateTimeDifference(startTime, endTime) {
    const start = new Date(startTime);
    const end = new Date(endTime);
  
    const diff = end - start;
  
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
    var time =
      "" +
      (hours != 0 ? `${hours} tiếng ` : "") +
      (minutes != 0 ? `${minutes} phút` : "");
  
    return time;
  }

  document.getElementById('ticketIdInput').onchange = HideInfo;

  function HideInfo() {
    ticketboard.style.display = 'none';
    deletebtn.style.display = 'none';
  }