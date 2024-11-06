function CreateFlightCard(info) {
  var flight = document.createElement("div");
  flight.className = "flight";

  var journey = document.createElement("div");
  journey.className = "journey";

  var start = document.createElement("div");
  start.className = "start";
  start.innerHTML =
    "<br>" +
    `<b style='font-size: x-large'>${info.startTime.substr(-8, 5)}</b>` +
    "<br>" +
    info.start;
  journey.appendChild(start);

  var road = document.createElement("div");
  road.className = "road";
  road.innerHTML = info.duration;
  journey.appendChild(road);

  var days = Math.floor(
    info.duration.indexOf("g") > -1
      ? parseInt(info.duration.substr(0, 2)) / 24
      : 0
  );

  var end = document.createElement("div");
  end.className = "end";
  end.innerHTML =
    `<span style='font-size: medium'>${
      days >= 1 ? `+${days} ngày` : ""
    }</span>` +
    "<br>" +
    `<b style='font-size: x-large'>${info.endTime.substr(-8, 5)}</b>` +
    "<br>" +
    info.end;
  journey.appendChild(end);

  flight.appendChild(journey);

  var price = document.createElement("div");
  price.className = "price";

  var economy = document.createElement("div");
  economy.className = "economy";
  economy.innerHTML = `<b>Hạng phổ thông</b><br>từ<br><b style="font-size: x-large">${info.economy}</b><br>VND`;
  price.appendChild(economy);

  var business = document.createElement("div");
  business.className = "business";
  business.innerHTML = `<b>Hạng thương gia</b><br>từ<br><b style="font-size: x-large">${info.business}</b><br>VND`;
  price.appendChild(business);

  flight.appendChild(price);

  return flight;
}

function CreatePopupContent(info) {
  var content = document.createElement("div");

  var startTime = `${info.startTime.substr(11, 8)} ngày ${info.startTime.substr(
    0,
    10
  )}`;

  content.innerHTML = `Chuyến bay xuất phát từ ${startTime} <br>
  Số hiệu: <br>
  Bắt đầu từ ${info.start} đến ${info.end}<br>
  Tổng thời gian: ${info.duration}`;
  return content;
}

export { CreateFlightCard, CreatePopupContent };
