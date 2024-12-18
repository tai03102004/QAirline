const numPassengers = passengerNumData;
const flight = flightData

function generatePassengerForms() {
    
    const container = document.getElementById("passenger-info-container");
    container.innerHTML = "";

    for (let i = 1; i <= numPassengers; i++) {
      const passengerDiv = document.createElement("div");
      passengerDiv.className = "passenger";
      passengerDiv.innerHTML = `
            <h3>Passenger ${i}</h3>
            <label for="gender-${i}">Gender*</label>
            <select id="gender-${i}" name="gender-${i}" required>
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>

            <label for="first-name-${i}">Middle name and First/Given name (as in ID/passport)*</label>
            <input type="text" id="first-name-${i}" name="first-name-${i}" class="first-name" required>

            <label for="last-name-${i}">Last/Family name (as in passport)*</label>
            <input type="text" id="last-name-${i}" name="last-name-${i}" class="last-name" required>

            <label for="dob-${i}">Date of birth*</label>
            <input type="date" id="dob-${i}" name="dob-${i}" required>
        `;

      container.appendChild(passengerDiv);
    }
  }

generatePassengerForms();

document.getElementById('submitForm').addEventListener('click', async () => {
    const passengers = [];
    const passengerForms = document.getElementById('passenger-info-container').childNodes;
    const email = document.querySelector('.contact-email').value;
    const phone = document.querySelector('.contact-phone').value
    
    passengerForms.forEach(form => {
        
        const fullname = form.querySelector('.first-name').value + " " + form.querySelector('.last-name').value;
        console.log(new Date("2024-12-01T08:00:00Z"));
        var departureTime = new Date(`${flight.departureTime}Z`);
        var arrivalTime = new Date(`${flight.arrivalTime}Z`);
        const passenger = {
            flightId: flight._id,
            ticketId: flight._id.substring(flight._id.length - 3) + flight.flightNumber + "111",
            passengerName: fullname,
            passengerEmail: email,
            passengerPhone: phone,
            flightNumber: flight.flightNumber,
            departureTime: departureTime,
            arrivalTime: arrivalTime,
            departureLocation: flight.departureLocation,
            arrivalLocation: flight.arrivalLocation,
            seatNumber: "111",
            seatClass: 'Economy',
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
            alert('Thông tin hành khách đã được lưu thành công!');
        } else {
            alert('Lỗi khi lưu thông tin hành khách.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});