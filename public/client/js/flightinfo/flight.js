import { CreateFlightCard, CreatePopupContent } from "./cardgenerator.js";
import { Data } from "./data.js";

var container = document.getElementsByClassName("container")[0];
var content = document.getElementsByClassName("content")[0];
console.log(Data);

var flightList = [];

Data.forEach((element) => {
  var flight = CreateFlightCard(element);

  flightList.push(flight);

  flight.addEventListener("click", function () {
    popup.classList.add("showPopup");
    for (var i = 0; i < flightList.length; i++) {
      if (flightList[i] == this) {
        popupText.appendChild(CreatePopupContent(Data[i]));
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
