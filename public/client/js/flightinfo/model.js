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

class Flight {
  start;
  end;
  duration;
  economy;
  business;
  startTime;
  endTime;
  constructor(st, en, stt, ent, eco, busi) {
    this.start = st;
    this.end = en;
    this.startTime = stt;
    this.endTime = ent;
    this.duration = calculateTimeDifference(this.startTime, this.endTime);
    this.economy = eco;
    this.business = busi;
  }
}

export { Flight };
