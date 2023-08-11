import "./WeatherCard.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

const weatherOptions = [
  {
    url: require("../../images/weather/day-sunny.svg").default,
    day: true,
    type: "sunny",
  },
  {
    url: require("../../images/weather/day-storm.svg").default,
    day: true,
    type: "storm",
  },
  {
    url: require("../../images/weather/day-snow.svg").default,
    day: true,
    type: "snow",
  },
  {
    url: require("../../images/weather/day-rain.svg").default,
    day: true,
    type: "rain",
  },
  {
    url: require("../../images/weather/day-fog.svg").default,
    day: true,
    type: "fog",
  },
  {
    url: require("../../images/weather/day-cloudy.svg").default,
    day: true,
    type: "cloud",
  },
  {
    url: require("../../images/weather/night-sunny.svg").default,
    day: false,
    type: "moon",
  },
  {
    url: require("../../images/weather/night-storm.svg").default,
    day: false,
    type: "stormy",
  },
  {
    url: require("../../images/weather/night-snow.svg").default,
    day: false,
    type: "snowy",
  },
  {
    url: require("../../images/weather/night-rain.svg").default,
    day: false,
    type: "rainy",
  },
  {
    url: require("../../images/weather/night-fog.svg").default,
    day: false,
    type: "foggy",
  },
  {
    url: require("../../images/weather/night-cloudy.svg").default,
    day: false,
    type: "cloudy",
  },
];

const WeatherCard = ({ day, type, weatherTemp = "", isFahrenheit }) => {
  const imageSrc = weatherOptions.filter((i) => {
    return i.day === day && i.type === type;
  });

  const imageSrcUrl = imageSrc[0].url || "";

  // Convert temperature from Fahrenheit to Celsius if needed
  const temperature = isFahrenheit ? weatherTemp : ((weatherTemp - 32) * 5) / 9;

  return (
    <section className="weather" id="weather">
      <div className="weather__info">
        {Math.round(temperature)}
        {isFahrenheit ? "°F" : "°C"}
      </div>
      <img src={imageSrcUrl} className="weather__bar" alt="weather bar" />
    </section>
  );
};

export default WeatherCard;
