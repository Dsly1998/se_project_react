import "./App.css";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./footer/Footer";
import ModalWithForm from "./ModalWithForm/ModalWithForm";
import { useEffect, useState } from "react";
import ItemModal from "./ItemModal/ItemModal";
import { getForcastWeather } from "./util/weatherApi";
import { parseWeatherData } from "./util/weatherApi";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);

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

  useEffect(() => {
    getForcastWeather().then((data) => {
      const temperature = parseWeatherData(data);
      setTemp(temperature);
    });
  }, []);

  return (
    <div className="app">
      <Header onCreateModal={handleCreateModal} />
      <Main weatherTemp={temp} onSelectCard={handleSelectedCard} />
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
          <div classname="modal__options">Select the weather type:</div>
          <div>
            <div className="modal__radios">
              <input
                className="modal__radio-input"
                type="radio"
                id="hot"
                value="hot"
              />
              <label>Hot</label>
            </div>
            <div>
              <input
                className="modal__radio-input"
                type="radio"
                id="warm"
                value="warm"
              />
              <label>Warm</label>
            </div>
            <div>
              <input
                className="modal__radio-input"
                type="radio"
                id="cold"
                value="cold"
              />
              <label>Cold</label>
            </div>
          </div>
        </ModalWithForm>
      )}
      {activeModal === "preview" && (
        <ItemModal selectedCard={selectedCard} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default App;
