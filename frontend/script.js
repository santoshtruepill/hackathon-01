const button = document.getElementById("show");
const notification = document.getElementsByClassName("notification");
const closeBtn = document.getElementById("close");
const snooze = document.getElementById("snooze");
var mp3_url =
  "https://media.geeksforgeeks.org/wp-content/uploads/20190531135120/beep.mp3";

//Event listener
button.addEventListener("click", showAlert);
closeBtn.addEventListener("click", closeAlert);
snooze.addEventListener("click", snoozeAlert);

//Fucntions
function showAlert() {
  new Audio(mp3_url).play();
  notification[0].classList.add("display");
}

function closeAlert() {
  notification[0].classList.remove("display");
}

function snoozeAlert() {
  notification[0].classList.remove("display");
  setTimeout(showAlert, 3000);
}
