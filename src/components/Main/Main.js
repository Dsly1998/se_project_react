import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../Contexts/CurrentTemperatureUnitContext";
import "./Main.css";

const Main = ({ weatherTemp, onSelectCard, clothingItems }) => {
  const { CurrentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const isFahrenheit =
    CurrentTemperatureUnit === "F" || CurrentTemperatureUnit === undefined; // Set to true if CurrentTemperatureUnit is undefined
  const tempInFahrenheit = weatherTemp?.temperature?.["F"] || 999;
  const temp = isFahrenheit
    ? tempInFahrenheit
    : ((tempInFahrenheit - 32) * 5) / 9; // Convert to Celsius if needed

  const getWeatherTypeFahrenheit = (tempF) => {
    if (tempF >= 86) {
      return "hot";
    } else if (tempF >= 66 && tempF <= 85) {
      return "warm";
    } else if (tempF <= 65) {
      return "cold";
    }
  };

  const getWeatherTypeCelsius = (tempC) => {
    if (tempC >= 30) {
      return "hot";
    } else if (tempC >= 19 && tempC <= 29) {
      return "warm";
    } else if (tempC <= 18) {
      return "cold";
    }
  };

  const weatherType = isFahrenheit
    ? getWeatherTypeFahrenheit(tempInFahrenheit)
    : getWeatherTypeCelsius(temp);

  const filteredCards = clothingItems.filter((item) => {
    return item.weather.toLowerCase() === weatherType;
  });

  return (
    <main className="main">
      <WeatherCard
        day={true}
        type="cloud"
        weatherTemp={tempInFahrenheit}
        isFahrenheit={isFahrenheit}
      />
      <p className="main__text">
        Today is {Math.round(temp)}
        {isFahrenheit ? "°F" : "°C"} / You may want to wear:
      </p>
      <section className="main__cards">
        <div className="main__items">
          {filteredCards.map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                onSelectCard={onSelectCard}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Main;
