import "./WeatherCard.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { weatherOptions } from "../../utils/contants";

const WeatherCard = ({ day, type, weatherTemp = "", isFahrenheit }) => {
  const imageSrc = weatherOptions.filter((i) => {
    return i.day === day && i.type === type;
  });

  const imageSrcUrl = imageSrc[0].url || "";

  return (
    <section className="weather" id="weather">
      <div className="weather__info">
        {Math.round(weatherTemp)}
        {isFahrenheit ? "°F" : "°C"}
      </div>
      <img src={imageSrcUrl} className="weather__bar" alt="weather bar" />
    </section>
  );
};

export default WeatherCard;
