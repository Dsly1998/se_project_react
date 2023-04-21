import logo from "./logo.svg";
import "./App.css";
import Header from "./Header/Header";
import WeatherCard from "./WeatherCard/WeatherCard";

function App() {
  return (
    <div>
      <Header />
      <main className="main">
        <WeatherCard day={false} type="rainy" />
        <section id="card-section"></section>
      </main>
    </div>
  );
}

export default App;
