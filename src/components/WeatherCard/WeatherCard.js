import "./WeatherCard.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { weatherOptions } from "../../utils/contants";

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
