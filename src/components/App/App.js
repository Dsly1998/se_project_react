import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { useEffect, useState } from "react";
import ItemModal from "../ItemModal/ItemModal";
import { getForcastWeather } from "../../utils/weatherApi";
import { parseWeatherData } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../Contexts/CurrentTemperatureUnitContext";
import { Switch, Route } from "react-router-dom";
import AddItemModal from "../../AddItemModal/AddItemModal";
import Profile from "../../Profile/Profile";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [CurrentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);


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

  const onAddItem = (values) => {
    console.log(values);
  };

  const handleItemCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleActiveCreateModal = () => {
    setActiveModal("create");
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

          <Route path="/profile">
            <Profile
              onSelectCard={handleItemCard}
              handleActiveCreateModal={handleActiveCreateModal}
              clothingItems={clothingItems}
            />
          </Route>
        </Switch>
        <Footer />
        {activeModal === "create" && (
          <AddItemModal
            handleCloseModal={handleCloseModal}
            isOpen={activeModal === "create"}
            onAddItem={onAddItem}
          />
        )}
        {activeModal === "preview" && (
          <ItemModal selectedCard={selectedCard} onClose={handleCloseModal} />
        )}
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
