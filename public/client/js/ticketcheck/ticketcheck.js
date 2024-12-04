console.log("ok")
checkbtn.onclick = checkTicket;
async function checkTicket() {
    const ticketId = document.getElementById('ticketIdInput').value;
    if (!ticketId) {
        alert('Vui lòng nhập mã số vé!');
        return;
    }

    try {
        const response = await fetch(`/ticketcheck/${ticketId}`);
        if (response.status === 404) {
            document.getElementById('ticketInfo').innerHTML = '<p>Không tìm thấy vé!</p>';
        } else if (response.status === 200) {
            ticketboard.style.display = 'unset';
            const booking = await response.json();
            const departdate = new Date(booking.departureTime);
            const arrivedate = new Date(booking.arrivalTime);
            console.log(departdate.toLocaleString().substr(9))
            const date = departdate.toLocaleString().substr(9);
            bookingId.innerHTML = `<strong>Mã Đặt Chỗ:</strong> ${ticketId}`;
            departDate.innerHTML = `<strong>Khởi Hành Ngày:</strong> ${date}`;
            flightNumber.innerHTML = `<strong>Chuyến Bay:</strong> ${booking.flightNumber}`;
            flightDuration.innerHTML = `<strong>Thời Gian Bay:</strong> ${calculateTimeDifference(booking.departureTime, booking.arrivalTime)}`;
            seatclass.innerHTML = `<strong>Hạng:</strong> ${booking.seatClass}`;
            departLocation.innerHTML = `<strong>Khởi hành từ</strong> ${booking.departureLocation}`;
            const departtime = departdate.toLocaleString().substr(0, 9);
            const arrivetime = arrivedate.toLocaleString().substr(0, 9);
            departTime.innerHTML = `<strong>Giờ Khởi Hành:</strong> ${departtime}`;
            arriveLocation.innerHTML = `<strong>Điểm đến</strong> ${booking.arrivalLocation}`;
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