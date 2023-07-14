import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect, useState } from "react";
import ItemModal from "../ItemModal/ItemModal";
import { getForcastWeather } from "../../utils/weatherApi";
import { parseWeatherData } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../Contexts/CurrentTemperatureUnitContext";
import { Switch, Route } from "react-router-dom";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [CurrentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleCreateModal = () => {
    setActiveModal("create");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleToggleSwitchChange = () => {
    if (CurrentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (CurrentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  useEffect(() => {
    getForcastWeather()
      .then((data) => {
        const temperature = parseWeatherData(data);
        console.log(temperature);
        setTemp(temperature);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  //console.log(CurrentTemperatureUnit);
  return (
    <div className="app">
      <CurrentTemperatureUnitContext.Provider
        value={{ CurrentTemperatureUnit, handleToggleSwitchChange }}
      >
        <Header onCreateModal={handleCreateModal} />
        <Switch>
          <Route exact path="/">
            <Main weatherTemp={temp} onSelectCard={handleSelectedCard} />
          </Route>
          <Route path="/profile">Profile</Route>
        </Switch>
        <Footer />
        {activeModal === "create" && (
          <ModalWithForm title="New Garment" onClose={handleCloseModal}>
            <label className="modal__label">
              Name
              <input
                className="modal__input"
                type="text"
                name="name"
                minLength="1"
                maxLength="30"
                placeholder="Name"
              />
            </label>
            <label className="modal__label">
              Image
              <input
                className="modal__input"
                placeholder="Image URL"
                type="url"
                name="link"
                minLength="1"
                maxLength="30"
              />
            </label>
            <div id="radio-options" className="modal__options">
              Select the weather type:
            </div>
            <div>
              <div className="modal__radios">
                <input
                  className="modal__radio-input"
                  type="radio"
                  id="hot"
                  value="hot"
                />
                <label className="modal__label-radio">Hot</label>
              </div>
              <div className="modal__radios">
                <input
                  className="modal__radio-input"
                  type="radio"
                  id="warm"
                  value="warm"
                />
                <label className="modal__label-radio">Warm</label>
              </div>
              <div>
                <input
                  className="modal__radio-input"
                  type="radio"
                  id="cold"
                  value="cold"
                />
                <label className="modal__label-radio">Cold</label>
              </div>
            </div>
          </ModalWithForm>
        )}
        {activeModal === "preview" && (
          <ItemModal selectedCard={selectedCard} onClose={handleCloseModal} />
        )}
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
