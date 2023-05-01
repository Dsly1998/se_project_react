import "./WeatherCard.css";

const weatherOptions = [
  { url: "/src/images/weather/day-sunny.svg", day: true, type: "sunny" },
  { url: "/src/images/weather/day-storm.svg", day: true, type: "storm" },
  { url: "/src/images/weather/day-snow.svg", day: true, type: "snow" },
  { url: "/src/images/weather/day-rain.svg", day: true, type: "rain" },
  { url: "/src/images/weather/day-fog.svg", day: true, type: "fog" },
  { url: "/src/images/weather/day-cloudy.svg", day: true, type: "cloud" },
  { url: "/src/images/weather/night-sunny.svg", day: false, type: "moon" },
  { url: "/src/images/weather/night-storm.svg", day: false, type: "stormy" },
  { url: "/src/images/weather/night-snow.svg", day: false, type: "snowy" },
  { url: "/src/images/weather/night-rain.svg", day: false, type: "rainy" },
  { url: "/src/images/weather/night-fog.svg", day: false, type: "foggy" },
  { url: "/src/images/weather/night-cloudy.svg", day: false, type: "cloudy" },
];

const WeatherCard = ({ day, type, weatherTemp = "" }) => {
  const imageSrc = weatherOptions.filter((i) => {
    return i.day === day && i.type === type;
  });

  const imageSrcUrl = imageSrc[0].url || "";

  return (
    <section className="weather" id="weather">
      <div className="weather__info">{weatherTemp}°F</div>
      <img src={imageSrcUrl} className="weather__bar" />
    </section>
  );
};

export default WeatherCard;
