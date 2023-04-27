import { defaultClothingItems } from "../util/contants";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css"

const Main = ({ weatherTemp }) => {
  return (
    <main className="main">
      <WeatherCard day={false} type="rainy" weatherTemp={weatherTemp} />
      <section className="main__cards" id="card-section">
        Today is {weatherTemp} / You may want to wear:
        <div className="main__items">
          {defaultClothingItems.map((x) => {
            return <ItemCard x={x} />;
          })}
        </div>
      </section>
    </main>
  );
};

export default Main;
