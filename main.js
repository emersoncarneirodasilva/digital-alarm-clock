/* Clock */
setInterval(() => {
  let hours = document.getElementById("hours");
  let minutes = document.getElementById("minutes");
  let seconds = document.getElementById("seconds");
  let ampm = document.getElementById("ampm");

  let hh = document.getElementById("hh");
  let mm = document.getElementById("mm");
  let ss = document.getElementById("ss");

  let h = new Date().getHours();
  let m = new Date().getMinutes();
  let s = new Date().getSeconds();
  let am = h >= 12 ? "PM" : "AM";

  let hr_dot = document.querySelector(".hr_dot");
  let min_dot = document.querySelector(".min_dot");
  let sec_dot = document.querySelector(".sec_dot");

  // Convert 24h clock to 12h clock
  if (h > 12) {
    h = h - 12;
  };

  // Add zero before single digit number
  h = (h < 10) ? "0" + h : h;
  m = (m < 10) ? "0" + m : m;
  s = (s < 10) ? "0" + s : s;

  hours.innerHTML = h + "<br/><span>Hours</span>";
  minutes.innerHTML = m + "<br/><span>Minutes</span>";
  seconds.innerHTML = s + "<br/><span>Seconds</span>";
  ampm.innerHTML = am;

  /* Circle color */  
  hh.style.strokeDashoffset = 440 - (440 * h) / 12; // 12hrs clock  
  mm.style.strokeDashoffset = 440 - (440 * m) / 60; // 60 minutes  
  ss.style.strokeDashoffset = 440 - (440 * s) / 60; // 60 seconds

  /* Circle rotation */
  hr_dot.style.transform = `rotate(${h * 30}deg)`; // 360 / 12 = 30
  min_dot.style.transform = `rotate(${m * 6}deg)`; // 360 / 60 = 6  
  sec_dot.style.transform = `rotate(${s * 6}deg)`; // 360 / 60 = 6

  if (alarmTime === `${h}:${m} ${am}`) {
    ringTone.play();
    ringTone.loop = true;
  };
});


/* Alarm */
const content = document.querySelector(".content");
const selectMenu = document.querySelectorAll("select");
const btnSetAlarm = document.querySelector("button");

let alarmTime, isAlarmSet, ringTone = new Audio("./audio/ringtone.mp3");

for (let i = 12; i > 0; i--) {
  i = i < 10 ? `0${i}` : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
};

for (let i = 59; i >= 0; i--) {
  i = i < 10 ? `0${i}` : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
};

for (let i = 2; i > 0; i--) {
  let ampm = i == 1 ? "AM" : "PM";
  let option = `<option value="${ampm}">${ampm}</option>`;
  selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
};

function setAlarm() {
  if (isAlarmSet) {
    alarmTime = "";
    ringTone.pause();
    content.classList.remove("disable");
    btnSetAlarm.innerHTML = 'Alarm "OFF"';
    return isAlarmSet = false;
  };
  
  let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
    if (time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")) {
      return alert("Por favor, insira um horário válido (Hours, Minutes e AM/PM) para ativar o alarme!");
    };

    alarmTime = time;
    isAlarmSet = true;
    content.classList.add("disable");
    btnSetAlarm.innerHTML = 'Alarm "ON"';
};

btnSetAlarm.addEventListener("click", setAlarm);