import { CreateFlightCard as _CreateFlightCard, CreatePopupContent as _CreatePopupContent, CreatePrice, CreateSeat } from './cardgenerator.js';
const CreateFlightCard = _CreateFlightCard;
const CreatePopupContent = _CreatePopupContent;


var container = document.getElementsByClassName("container")[0];
var content = document.getElementsByClassName("content")[0];
var flightNumber = document.getElementById("flightNumber");


// var flightList = [];

// const flights = flightsData

const passengersNumber = passengersTotal

passengers.value = passengersNumber

// flights.forEach((element) => {
//   var flight = CreateFlightCard(element);

//   flightList.push(flight);

//   flight.addEventListener("click", function () {
//     popup.classList.add("showPopup");
//     for (var i = 0; i < flightList.length; i++) {
//       if (flightList[i] == this) {
//         flightNumber.value = flights[i].flightNumber
//         popupText.appendChild(CreatePopupContent(flights[i]));
//         economyinfo.innerHTML = '';
//         economyinfo.appendChild(CreateSeat(flights[i].economySeats, "h4"))
//         economyinfo.appendChild(CreatePrice(flights[i].economySeats, "h4"))
//         businessinfo.innerHTML = '';
//         businessinfo.appendChild(CreateSeat(flights[i].businessSeats, "h4"))
//         businessinfo.appendChild(CreatePrice(flights[i].businessSeats, "h4"))
//         break;
//       }
//     }
//   });

//   content.appendChild(flight);

//   content.appendChild(document.createElement("br"));
// });

closePopup.addEventListener("click", function () {
  popup.classList.remove("showPopup");
  popupText.innerHTML = "";
});
window.addEventListener("click", function (event) {
  if (event.target == popup) {
    popup.classList.remove("showPopup");
    popupText.innerHTML = "";
  }
});

const totalpassengers = document.querySelector('#totalpassengers')
totalpassengers.value = parseInt(passengersTotal)

const departureLocation = document.querySelector('#departureLocation')
const arrivalLocation = document.querySelector('#arrivalLocation')
const departDate = document.querySelector('#departDate')
departureLocation.value = searchInfo.departureLocation
arrivalLocation.value = searchInfo.arrivalLocation

departDate.value = searchInfo.departDate

const economybtn = document.querySelector('#economyclass')
const businessbtn = document.querySelector('#businessclass')
const classchosen = document.querySelector('#classchosen')

classchosen.value = searchInfo.classchosen
if (classchosen.value === 'economyclass') {
  economybtn.classList.add('class-button-choose')
} else if (classchosen.value === 'businessclass') {
  businessbtn.classList.add('class-button-choose')
}

window.openDetail = function(flight) {
  popup.classList.add("showPopup");
  flightNumber.value = flight.flightNumber
  popupText.appendChild(CreatePopupContent(flight));
  economyinfo.innerHTML = '';
  economyinfo.appendChild(CreateSeat(flight.economySeats, "h4"))
  economyinfo.appendChild(CreatePrice(flight.economySeats, "h4"))
  businessinfo.innerHTML = '';
  businessinfo.appendChild(CreateSeat(flight.businessSeats, "h4"))
  businessinfo.appendChild(CreatePrice(flight.businessSeats, "h4"))  
}

const sort = document.querySelector(".sort");
if (sort) {
    let url = new URL(window.location.href);
    const sortSelect = sort.querySelector("[sort-select]");
    sortSelect.addEventListener("change", (e) => {
        e.preventDefault();
        const value = e.target.value; // positon-desc
        const [sortKey, sortValue] = value.split("-");

        url.searchParams.set("sortKey", sortKey);
        url.searchParams.set("sortValue", sortValue);

        window.location.href = url.href;
    })
    // Click vào clear để xoá sắp xếp : Xoá href ?sortKey=position&sortValue=asc
    const sortClear = sort.querySelector("[sort-clear]");
    if (sortClear) {
        sortClear.addEventListener("click", (e) => {
            url.searchParams.delete("sortKey");
            url.searchParams.delete("sortValue");
            window.location.href = url.href;
        })
    }
    // Khi lựa chọn thì nó sẽ không bị load lại cái mặc định
    const sortKey = url.searchParams.get("sortKey");
    const sortValue = url.searchParams.get("sortValue");
    if (sortKey && sortValue) {
        const stringSort = `${sortKey}-${sortValue}`;
        const optionSelected = sortSelect.querySelector(`option[value='${stringSort}']`);
        optionSelected.selected = true;
    }
}

window.changeToSaveBooking = function(isEconomy) {
  const seatClassChosen = document.querySelector('#seatClassChosen')
  if (isEconomy) {
    seatClassChosen.value = 'Economy'
  } else {
    seatClassChosen.value = 'Business'
  }
}