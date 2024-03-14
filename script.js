let form = document.querySelector("#form");
let submit_btn = document.querySelector(".submit-btn");
let score_wrapper = document.querySelector(".scoreboard-wrapper");
let delete_btn = document.querySelectorAll(".deletebtn");
let data = [
  {
    firstName: "AANVI",
    lastName: "SINGH",
    country: "INDIA",
    playerScore: 85,
    date: new Date("2024/01/24, 12:08"),
  },
  {
    firstName: "TARUN",
    lastName: "SHARMA",
    country: "INDIA",
    playerScore: 95,
    date: new Date("2024/01/23, 01:12"),
  },
  {
    firstName: "VIRAT",
    lastName: "KOHLI",
    country: "INDIA",
    playerScore: 70,
    date: new Date("2024/01/27, 4:55"),
  },
];

function displayRecord() {
  score_wrapper.innerHTML = "";
  sortData();
  for (let user of data) {
    displayUser(user);
  }

}
function displayUser(user) {
  score_wrapper.innerHTML +=
    `<div class="scoreboard_box">
  <div>
  <p class="player-name">${user.firstName} ${user.lastName}</p>
  <p class="time-stamp">${formatDate(user.date)}</p>
  </div>
  <p class="player-country">${user.country}</p>
  <p class="player-score">${user.playerScore}</p>
  <div class="scoreboard-btn-container">
  <button name = "${user.firstName}" class ="deletebtn">&#x1f5d1;</button>
  <button name = "${user.firstName}" class="incrementBtn">+5</button>
  <button name = "${user.firstName}" class="decrementBtn">-5</button>
  </div>
    </div>`;
}
function sortData() {
  data.sort((a, b) => b.playerScore - a.playerScore)

}
function formatDate(date) {
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
    hour12:true,
  }).format(date)
}



//adding user
form.addEventListener("submit", function(e) {
  e.preventDefault();
  const formData = new FormData(form, submit_btn);
  const userdata = {};

  for (const [key, value] of formData.entries()) {
    if (key == "playerScore") {
      userdata[key] = Number(value);
    } else {
      userdata[key] = value;
    }
  }

  userdata["date"] = new Date();

  form.reset();

  data.push(userdata);
  displayRecord();
});

//deleting user
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('deletebtn')) {
    const firstName = e.target.getAttribute('name');
    data = data.filter(user => user.firstName !== firstName);
    displayRecord();
  }
});

//incrementing user score
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('incrementBtn')) {
    const firstName = e.target.getAttribute('name');
    data = data.map(user => user.firstName === firstName ? { ...user, playerScore: user.playerScore + 5 } : user);
    displayRecord();
  }
});

//decrementing user score
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('decrementBtn')) {
    const firstName = e.target.getAttribute('name');
    data = data.map(user => user.firstName === firstName ? { ...user, playerScore: user.playerScore > 0 ? user.playerScore - 5 : 0 } : user);
    displayRecord();
  }
});

displayRecord();