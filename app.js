// Api
const apiKey = "55a24b050b9939de30e8175a96cc73e9";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// variables & elements
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherDet = document.querySelector(".weather");
const bubbles = document.querySelector(".bubbles");

// sound effect
const souEffect = new Audio(
  "./audios/mixkit-fast-double-click-on-mouse-275.wav"
);
const souEffect2 = new Audio("./audios/mixkit-mouse-click-close-1113.wav");

// for weather icon
function DayorNight() {
  const date = new Date();
  const H = date.getHours();
  let DayorNight;
  if (H > 6 && H < 19) {
    DayorNight = "Day";
  } else {
    DayorNight = "Night";
  }
  return DayorNight;
}

// async function
async function checkWeather(city) {
  // convert data to json & req to api
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  var data = await response.json();

  // check if response exist
  if (response.status == 404) {
    alert("Not Found...");
  } else if (searchBox.value == "") {
    alert("searchBox is empty!");
  } else {
    // elements
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    // conditions for weather icons
    if (data.weather[0].main == "Clear") {
      weatherIcon.src = `images/Clear-${DayorNight()}.svg`;
    } else if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/Clouds.svg";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/Rain.svg";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "images/Drizzle.svg";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "images/mist.png";
    }
    weatherDet.classList.add("active");
  }
}

// mouse click
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
  souEffect.play();
});

// "Enter" key press
searchBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    checkWeather(searchBox.value);
    souEffect2.play();
  }
});

searchBox.addEventListener("keyup", () => {
  if (searchBox.value == "") {
    weatherDet.classList.remove("active");
  }
});
