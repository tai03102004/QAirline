const numPassengers = passengerNumData;
const flight = flightData
const classChosen = seatClass

function generatePassengerForms() {
    
    const container = document.getElementById("passenger-info-container");
    container.innerHTML = "";

    for (let i = 1; i <= numPassengers; i++) {
      const passengerDiv = document.createElement("div");
      passengerDiv.className = "passenger";
      passengerDiv.innerHTML = `
            <h3>Hành khách ${i}</h3>
            <label for="gender-${i}">Giới tính*</label>
            <select id="gender-${i}" name="gender-${i}" required>
                <option value="">Lựa chọn</option>
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
                <option value="other">Khác</option>
            </select>

            <label for="first-name-${i}">Tên đệm và Tên (giống trong ID / Hộ chiếu)*</label>
            <input type="text" id="first-name-${i}" name="first-name-${i}" class="first-name" required>

            <label for="last-name-${i}">Họ (giống trong Hộ chiếu)*</label>
            <input type="text" id="last-name-${i}" name="last-name-${i}" class="last-name" required>

            <label for="dob-${i}">Ngày sinh*</label>
            <input type="date" id="dob-${i}" name="dob-${i}" required>
        `;

      container.appendChild(passengerDiv);
    }
  }

generatePassengerForms();

const bookingForm = document.querySelector('#booking-form')

document.getElementById('submitForm').addEventListener('click', async () => {
    if (!bookingForm.checkValidity()) {
        bookingForm.reportValidity()
        return
    }
    const passengers = [];
    const passengerForms = document.getElementById('passenger-info-container').childNodes;
    const email = document.querySelector('.contact-email').value;
    const phone = document.querySelector('.contact-phone').value;

    passengerForms.forEach(form => {
        const fullname = form.querySelector('.first-name').value.trim() + " " + form.querySelector('.last-name').value.trim();

        var departureTime = new Date(`${flight.departureTime}Z`);
        var arrivalTime = new Date(`${flight.arrivalTime}Z`);
        const passenger = {
            flightId: flight._id,
            ticketId: flight._id.substring(flight._id.length - 3) + flight.flightNumber + "111",
            passengerName: fullname,
            passengerEmail: email.trim(),
            passengerPhone: phone,
            flightNumber: flight.flightNumber,
            departureTime: departureTime,
            arrivalTime: arrivalTime,
            departureLocation: flight.departureLocation,
            arrivalLocation: flight.arrivalLocation,
            seatNumber: "111",
            seatClass: classChosen,
            totalAmount: flight.economySeats.price
        };
        passengers.push(passenger);
    });

    try {
        const response = await fetch('/save-passenger', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ passengers, flight })
        });

        if (response.status === 200) {
            alert('Thông tin hành khách đã được lưu thành công!\nVui lòng kiểm tra thông tin trong email quý khách đăng ký');
            window.location.href = '/';
        } else {
            alert('Lỗi khi lưu thông tin hành khách.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});