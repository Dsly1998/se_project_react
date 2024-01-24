import React, { useContext } from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import "./Main.css";

const Main = ({
  weatherTemp,
  onSelectCard,
  clothingItems,
  onCardLike,
  onCardDislike,
}) => {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  // Determine if the current temperature unit is Fahrenheit; default to Fahrenheit if undefined
  const isFahrenheit =
    currentTemperatureUnit === "F" || currentTemperatureUnit === undefined;

  // Retrieve the temperature in Fahrenheit; default to a placeholder if unavailable
  const tempInFahrenheit = weatherTemp?.temperature?.["F"] || 999;

  // Convert temperature to Celsius if needed
  const temp = isFahrenheit
    ? tempInFahrenheit
    : ((tempInFahrenheit - 32) * 5) / 9;

  // Function to get weather type based on the temperature
  const getWeatherType = (temperature) => {
    if (isFahrenheit) {
      if (temperature >= 86) return "hot";
      else if (temperature >= 66) return "warm";
      else return "cold";
    } else {
      if (temperature >= 30) return "hot";
      else if (temperature >= 19) return "warm";
      else return "cold";
    }
  };

  // Determine the weather type based on the current temperature
  const weatherType = getWeatherType(temp);

  // Filter clothing items based on the determined weather type
  const filteredCards = clothingItems.filter(
    (item) => item.weather.toLowerCase() === weatherType
  );

  return (
    <main className="main">
      <WeatherCard
        day={true}
        type="cloud"
        weatherTemp={Math.round(temp)}
        isFahrenheit={isFahrenheit}
      />
      <p className="main__text">
        Today is {Math.round(temp)}
        {isFahrenheit ? "°F" : "°C"} / You may want to wear:
      </p>
      <section className="main__cards">
        <div className="main__items">
          {filteredCards.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onSelectCard={onSelectCard}
              onCardLike={onCardLike}
              onCardDislike={onCardDislike}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Main;
