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

function CreateFlightCard(info) {
  var duration = calculateTimeDifference(info.departureTime, info.arrivalTime);
  var flight = document.createElement("div");
  flight.className = "flight";

  var journey = document.createElement("div");
  journey.className = "journey";

  var start = document.createElement("div");
  start.className = "start";
  start.innerHTML =
    "<br>" +
    `<b style='font-size: x-large'>${info.departureTime.substr(-8, 5)}</b>` +
    "<br>" +
    info.departureLocation;
  journey.appendChild(start);

  var road = document.createElement("div");
  road.className = "road";
  road.innerHTML = duration;
  journey.appendChild(road);

  var days = Math.floor(
    duration.indexOf("g") > -1
      ? parseInt(duration.substr(0, 2)) / 24
      : 0
  );

  var end = document.createElement("div");
  end.className = "end";
  end.innerHTML =
    `<span style='font-size: medium'>${
      days >= 1 ? `+${days} ngày` : ""
    }</span>` +
    "<br>" +
    `<b style='font-size: x-large'>${info.arrivalTime.substr(-8, 5)}</b>` +
    "<br>" +
    info.arrivalLocation;
  journey.appendChild(end);

  flight.appendChild(journey);

  var price = document.createElement("div");
  price.className = "price";

  var economy = document.createElement("div");
  economy.className = "economy";
  economy.innerHTML = `<b>Hạng phổ thông</b><br>từ<br><b style="font-size: x-large">${info.economySeats.price}</b><br>VND`;
  price.appendChild(economy);

  var business = document.createElement("div");
  business.className = "business";
  business.innerHTML = `<b>Hạng thương gia</b><br>từ<br><b style="font-size: x-large">${info.businessSeats.price}</b><br>VND`;
  price.appendChild(business);

  flight.appendChild(price);

  return flight;
}

function CreatePopupContent(info) {
  var duration = calculateTimeDifference(info.departureTime, info.arrivalTime);
  var content = document.createElement("div");

  var startTime = `${info.departureTime.substr(11, 8)} ngày ${info.departureTime.substr(
    0,
    10
  )}`;

  content.innerHTML = `Chuyến bay xuất phát từ ${startTime} <br>
  Số hiệu: ${info.flightNumber}<br>
  Bắt đầu từ ${info.departureLocation} đến ${info.arrivalLocation}<br>
  Tổng thời gian: ${duration}`;
  return content;
}

export { CreateFlightCard, CreatePopupContent };
