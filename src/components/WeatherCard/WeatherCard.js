import "./WeatherCard.css";

const weatherOptions = [
  { url: "/images/weather/day-sunny.svg", day: true, type: "sunny" },
  { url: "/images/weather/day-storm.svg", day: true, type: "storm" },
  { url: "/images/weather/day-snow.svg", day: true, type: "snow" },
  { url: "/images/weather/day-rain.svg", day: true, type: "rain" },
  { url: "/images/weather/day-fog.svg", day: true, type: "fog" },
  { url: "/images/weather/day-cloudy.svg", day: true, type: "cloud" },
  { url: "/images/weather/night-sunny.svg", day: false, type: "moon" },
  { url: "/images/weather/night-storm.svg", day: false, type: "stormy" },
  { url: "/images/weather/night-snow.svg", day: false, type: "snowy" },
  { url: "/images/weather/night-rain.svg", day: false, type: "rainy" },
  { url: "/images/weather/night-fog.svg", day: false, type: "foggy" },
  { url: "/images/weather/night-cloudy.svg", day: false, type: "cloudy" },
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
