import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext"; // Import the context
import { register, signin, checkToken } from "../../utils/Auth";
import { fetchItems, loadItems, removeItems } from "../../utils/Api";
import { getForcastWeather, parseWeatherData } from "../../utils/weatherApi";
import "./App.css";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    getForcastWeather()
      .then((data) => {
        const temperature = parseWeatherData(data);
        setTemp(temperature);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((data) => {
          setIsLoggedIn(true);
          setCurrentUser(data); // Update according to your API response
        })
        .catch(() => {
          localStorage.removeItem("jwt");
          setIsLoggedIn(false);
        });
    }
  }, [isLoggedIn]);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "C" ? "F" : "C");
  };

  const handleCreateModal = () => setActiveModal("create");

  const handleCloseModal = () => setActiveModal("");

  const handleSelectedCard = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const onAddItem = (values) => {
    loadItems(values)
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        handleCloseModal();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleDeleteConfirmationModal = (selectedCard) => {
    setSelectedCard(selectedCard);
    setActiveModal("confirmation-opened");
  };

  const handleDeleteButton = (cardElement) => {
    removeItems(cardElement)
      .then(() => {
        const newClothingItems = clothingItems.filter(
          (card) => card._id !== cardElement
        );
        setClothingItems(newClothingItems);
        handleCloseModal();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleRegistration = (email, password, name, avatar) => {
    register({ email, password, name, avatar })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setIsLoggedIn(true);
        setCurrentUser({ email, name, avatar });
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Registration Error:", error);
      });
  };

  // App.js

  const handleLogin = (email, password) => {
    signin({ email, password })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setIsLoggedIn(true);
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Login Error:", error);
      });
  };

  return (
    <Router>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
          {" "}
          {/* Updated to use CurrentUserProvider */}
          <div className="app">
            <Header
              onCreateModal={handleCreateModal}
              isLoggedIn={isLoggedIn}
              onLogin={() => setActiveModal("login")}
              onRegister={() => setActiveModal("register")}
            />
            <Switch>
              <Route exact path="/">
                <Main
                  weatherTemp={temp}
                  onSelectCard={handleSelectedCard}
                  clothingItems={clothingItems}
                />
              </Route>
              <ProtectedRoute path="/profile" isLoggedIn={isLoggedIn}>
                <Profile
                  onSelectCard={handleSelectedCard}
                  handleActiveCreateModal={handleCreateModal}
                  clothingItems={clothingItems}
                  selectedCard={selectedCard}
                  setIsLoggedIn={setIsLoggedIn}
                />
              </ProtectedRoute>
              {/* Additional routes */}
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
              <ItemModal
                selectedCard={selectedCard}
                currentUser={currentUser} // Pass currentUser as a prop
                onClose={handleCloseModal}
                handleDeleteButton={handleDeleteConfirmationModal}
              />
            )}

            {activeModal === "confirmation-opened" && (
              <DeleteModal
                onClose={handleCloseModal}
                card={selectedCard}
                handleDeleteButton={handleDeleteButton}
              />
            )}
            {activeModal === "register" && (
              <RegisterModal
                isOpen={activeModal === "register"}
                handleCloseModal={handleCloseModal}
                handleRegistration={handleRegistration}
              />
            )}
            {activeModal === "login" && (
              <LoginModal
                isOpen={activeModal === "login"}
                handleCloseModal={handleCloseModal}
                handleLogin={handleLogin}
              />
            )}
          </div>
        </CurrentUserContext.Provider>
      </CurrentTemperatureUnitContext.Provider>
    </Router>
  );
}

export default App;
