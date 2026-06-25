const apiKey = "1ad41bb818a73f0191377b7f8c55de14";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const errorMsg = document.getElementById("errorMsg");
const weatherInfo = document.getElementById("weatherInfo");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city === "") {
    return;
  }
  fetchWeather(city);
});

cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});

function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then(data => {
      errorMsg.textContent = "";
      weatherInfo.style.display = "block";
      cityName.textContent = data.name + ", " + data.sys.country;
      temperature.textContent = "Temperature: " + data.main.temp + " °C";
      description.textContent = "Condition: " + data.weather[0].description;
      humidity.textContent = "Humidity: " + data.main.humidity + " %";
      wind.textContent = "Wind Speed: " + data.wind.speed + " m/s";
    })
    .catch(error => {
      weatherInfo.style.display = "none";
      errorMsg.textContent = error.message;
    });
}
