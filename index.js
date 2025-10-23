//updating the time
function updateTime(tZone) {
  const now = new Date();
  const formattedTime = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: tZone,
  });
  document.getElementById("timeCont").textContent = formattedTime;
}

// mapping the user's picked city to the altitude and longitude coordinates

//extracting the csv file content in another file
import { fetchOpenMeteo, getCities } from "./background.js";

const displayCities = async () => {
  const cities = await getCities();
  return cities;
};

const cities = await displayCities();

const locationsList = document.getElementById("locationsList");

const search = document.getElementById("locPic");

let userCity;

// prompting the user to pick a city

const infos = document.querySelectorAll(".intel");

if (userCity === undefined) {
  for (let info of infos) {
    info.style.display = "none";
  }
}

// showing the most relevant option that matches with the input
search.addEventListener("input", (event) => {
  let i = 0;

  const query = event.target.value.toLowerCase();

  locationsList.innerHTML = "";

  cities.forEach((city) => {
    if (query === "") {
      locationsList.innerHTML = "";
    }

    if (city[0].toLowerCase().includes(query) && i < 5) {
      const li = document.createElement("li");

      li.textContent = `${city[0].replaceAll(
        /[""]/g,
        ""
      )}, ${city[4].replaceAll(/[""]/g, "")}`;

      li.setAttribute("id", city[10]);
      li.setAttribute("class", "city");

      locationsList.appendChild(li);
      i++;
    }
  });
});

let displayedDay = 2;
let forecast;

// getting the info elements

const temp = document.getElementById("temp");
const weatherCode = document.getElementById("weatherCode");
const weatherImg = document.getElementById("weatherImg");
const humidity = document.getElementById("humidity");
const day = document.getElementById("day");
const wind = document.getElementById("wind");

// getting the bottom elements

const firstDay = document.getElementById("firstDay");
const firstDayCode = document.getElementById("firstDayCode");
const firstDayPic = document.getElementById("firstDayPic");

const secondDay = document.getElementById("secondDay");
const secondDayCode = document.getElementById("secondDayCode");
const secondDayPic = document.getElementById("secondDayPic");

function mapCodeToPic(txt, pic, code) {
  if (code === 0) {
    txt.textContent = "Sunny";
    pic.setAttribute("src", `./assets/weather_code/sun.png`);
  } else if ([1, 2, 3, 45, 48].includes(code)) {
    txt.textContent = "Cloudy";
    pic.setAttribute("src", `./assets/weather_code/cloudy.png`);
  } else if (
    [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)
  ) {
    txt.textContent = "Rainy";
    pic.setAttribute("src", `./assets/weather_code/rainy.png`);
  } else if ([71, 73, 75, 77, 85, 86].includes(code)) {
    txt.textContent = "Snowy";
    pic.setAttribute("src", `./assets/weather_code/snow.png`);
  } else if ([95, 96, 99].includes(code)) {
    txt.textContent = "Windy";
    pic.setAttribute("src", `./assets/weather_code/windy.png`);
  }
}

async function displayContent(lat, lang, scale) {
  //fetching the forecast from the openmeteo api
  forecast = await fetchOpenMeteo(lat, lang, scale);

  updateTime(forecast.timezone);
  setInterval(updateTime(forecast.timezone), 1000);
  //displaying the forecast for the selected city

  //setting the temperature
  temp.textContent = forecast.daily.temperature_2m_mean[displayedDay] + "°";

  //setting the weather code
  const code = forecast.daily.weather_code[displayedDay];
  mapCodeToPic(weatherCode, weatherImg, code);

  // setting the humidity

  humidity.textContent =
    forecast.daily.relative_humidity_2m_mean[displayedDay] + "%";

  // setting the day of the forecast

  switch (displayedDay) {
    case 0: {
      day.textContent = "Yesterday";
      firstDay.textContent = "Today";
      mapCodeToPic(firstDayCode, firstDayPic, forecast.daily.weather_code[1]);
      secondDay.textContent = "Tomorrow";
      mapCodeToPic(secondDayCode, secondDayPic, forecast.daily.weather_code[2]);
      break;
    }
    case 1: {
      day.textContent = "Today";
      firstDay.textContent = "Yesterday";
      mapCodeToPic(firstDayCode, firstDayPic, forecast.daily.weather_code[0]);
      secondDay.textContent = "Tomorrow";
      mapCodeToPic(secondDayCode, secondDayPic, forecast.daily.weather_code[2]);
      break;
    }
    case 2: {
      day.textContent = "Tomorrow";
      firstDay.textContent = "Yesterday";
      mapCodeToPic(firstDayCode, firstDayPic, forecast.daily.weather_code[0]);
      secondDay.textContent = "Today";
      mapCodeToPic(secondDayCode, secondDayPic, forecast.daily.weather_code[1]);
      break;
    }
  }

  //setting the wind speed
  wind.textContent = forecast.daily.wind_speed_10m_mean[displayedDay] + "km/h";
}

document.addEventListener("click", async (event) => {
  if (event.target.classList.contains("city")) {
    for (let city of cities) {
      if (city[10] === event.target.id) {
        // storing the user's pick

        userCity = city;

        locationsList.innerHTML = "";
        search.value = `${city[0].replaceAll(
          /[""]/g,
          ""
        )}, ${city[5].replaceAll(/[""]/g, "")}`;

        for (let info of infos) {
          info.style.display = "";
        }

        const lat = parseFloat(city[2].replace(/"/g, ""));
        const lang = parseFloat(city[3].replace(/"/g, ""));

        displayContent(lat, lang, scale);

        //rotating days on click
        const dayBtns = document.querySelectorAll(".dayCont");

        dayBtns.forEach((dayBtn) => {
          dayBtn.addEventListener("click", () => {
            if (dayBtn.id == "one") {
              if (firstDay.textContent === "Yesterday") {
                displayedDay = 0;
              } else if (firstDay.textContent === "Today") {
                displayedDay = 1;
              }
            } else if (dayBtn.id === "two") {
              if (secondDay.textContent === "Today") {
                displayedDay = 1;
              } else if (secondDay.textContent === "Tomorrow") {
                displayedDay = 2;
              }
            }
            displayContent(lat, lang, scale);
          });
        });
      }
    }
  }
});

// getting the scale

const scaleBtns = document.querySelectorAll(".scaleBtn");

let scale = "Cscale";

scaleBtns.forEach((scaleBtn) => {
  scaleBtn.addEventListener("click", () => {
    if (scaleBtn.id === "Fscale" && scale === "Cscale") {
      temp.textContent =
        ((9 / 5) * parseFloat(temp.textContent) + 32).toFixed(1) + "°";
    } else if (scaleBtn.id === "Cscale" && scale === "Fscale") {
      temp.textContent =
        ((5 / 9) * (parseFloat(temp.textContent) - 32)).toFixed(1) + "°";
    }

    scale = scaleBtn.id;

    for (let scale of scaleBtns) {
      scale.classList.remove("active");
    }
    scaleBtn.classList.add("active");
  });
});
