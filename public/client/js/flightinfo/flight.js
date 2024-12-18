import { CreateFlightCard as _CreateFlightCard, CreatePopupContent as _CreatePopupContent, CreatePrice, CreateSeat } from './cardgenerator.js';
const CreateFlightCard = _CreateFlightCard;
const CreatePopupContent = _CreatePopupContent;


var container = document.getElementsByClassName("container")[0];
var content = document.getElementsByClassName("content")[0];
var flightNumber = document.getElementById("flightNumber");


var flightList = [];

const flights = flightsData

const passengersNumber = passengersTotal

passengers.value = passengersNumber

flights.forEach((element) => {
  var flight = CreateFlightCard(element);

  flightList.push(flight);

  flight.addEventListener("click", function () {
    popup.classList.add("showPopup");
    for (var i = 0; i < flightList.length; i++) {
      if (flightList[i] == this) {
        flightNumber.value = flights[i].flightNumber
        popupText.appendChild(CreatePopupContent(flights[i]));
        economyinfo.innerHTML = '';
        economyinfo.appendChild(CreateSeat(flights[i].economySeats, "h4"))
        economyinfo.appendChild(CreatePrice(flights[i].economySeats, "h4"))
        businessinfo.innerHTML = '';
        businessinfo.appendChild(CreateSeat(flights[i].businessSeats, "h4"))
        businessinfo.appendChild(CreatePrice(flights[i].businessSeats, "h4"))
        break;
      }
    }
  });

  content.appendChild(flight);

  content.appendChild(document.createElement("br"));
});

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
console.log(searchInfo)
const departureLocation = document.querySelector('#departureLocation')
const arrivalLocation = document.querySelector('#arrivalLocation')
const departDate = document.querySelector('#departDate')
departureLocation.value = searchInfo.departureLocation
arrivalLocation.value = searchInfo.arrivalLocation
console.log(typeof searchInfo.departDate)
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
