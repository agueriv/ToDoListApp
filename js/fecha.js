// Poner la fecha actual en la App
const fechaContainer = document.getElementById("fecha");
let meses = new Array(
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
);
let diasSemana = new Array(
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
);
let f = new Date();
fechaContainer.innerHTML =
  diasSemana[f.getDay()] +
  ", " +
  f.getDate() +
  " de " +
  meses[f.getMonth()] +
  " de " +
  f.getFullYear();
