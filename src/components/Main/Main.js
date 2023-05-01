import { defaultClothingItems } from "../util/contants";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { useMemo } from "react";
import "./Main.css";

const Main = ({ weatherTemp, onSelectCard }) => {
  const weatherType = useMemo(() => {
    if (weatherTemp >= 86) {
      return "hot";
    } else if (weatherTemp >= 66 && weatherTemp <= 85) {
      return "warm";
    } else if (weatherTemp <= 65) {
      return "cold";
    }
  }, [weatherTemp]);

  const filteredCards = defaultClothingItems.filter((item) => {
    return item.weather.toLowerCase() === weatherType;
  });

  return (
    <main className="main">
      <WeatherCard day={true} type="cloud" weatherTemp={weatherTemp} />
      <p className="main__text">
        Today is {weatherTemp}° F / You may want to wear:
      </p>
      <section className="main__cards" id="card-section">
        <div className="main__items">
          {filteredCards.map((x) => {
            return <ItemCard x={x} onSelectCard={onSelectCard} />;
          })}
        </div>
      </section>
    </main>
  );
};

export default Main;
