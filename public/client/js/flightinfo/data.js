import { Flight } from "./model.js";
var data = [
  new Flight(
    "HN",
    "LS",
    "2023-11-01T02:30:00",
    "2023-11-01T05:00:00",
    100000,
    500000
  ),
  new Flight(
    "HN",
    "NA",
    "2023-11-01T12:00:00",
    "2023-11-01T13:30:00",
    300000,
    800000
  ),
  new Flight(
    "HN",
    "HN",
    "2023-11-01T05:15:00",
    "2023-11-02T06:00:00",
    750000,
    10000000
  ),
  new Flight(
    "HN",
    "BN",
    "2023-11-01T01:00:00",
    "2023-11-01T01:30:00",
    77000,
    100000
  ),
  new Flight(
    "HN",
    "HCM",
    "2023-11-01T02:30:00",
    "2023-11-03T03:00:00",
    1000000,
    5000000
  ),
];

export { data as Data };
