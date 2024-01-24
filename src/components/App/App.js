import React, { useState, useEffect } from "react";
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
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { register, signin, checkToken } from "../../utils/Auth";
import {
  fetchItems,
  loadItems,
  removeItems,
  updateUserProfile,
} from "../../utils/Api";
import { getForcastWeather, parseWeatherData } from "../../utils/weatherApi";
import { likeItem, dislikeItem } from "../../utils/Api";
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
    fetchItems().then(setClothingItems).catch(console.error);

    getForcastWeather()
      .then((data) => {
        setTemp(parseWeatherData(data));
      })

      .catch(console.error);

    const token = localStorage.getItem("jwt");

    if (token) {
      checkToken(token)
        .then((data) => {
          setIsLoggedIn(true);

          setCurrentUser(data);
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

  const handleModal = (modalType) => setActiveModal(modalType);

  const handleSelectedCard = (card) => {
    setSelectedCard(card);

    handleModal("preview");
  };

  const handleCloseModal = () => {
    handleModal("");
  };

  const onAddItem = (values) => {
    loadItems(values)
      .then((data) => {
        setClothingItems([data, ...clothingItems]);

        handleCloseModal();
      })

      .catch(console.error);
  };

  const handleDeleteButton = (cardElement) => {
    removeItems(cardElement)
      .then(() => {
        setClothingItems(
          clothingItems.filter((card) => card._id !== cardElement)
        );

        handleCloseModal();
      })

      .catch(console.error);
  };

  const handleRegistration = (email, password, name, avatar) => {
    register({ email, password, name, avatar })
      .then((data) => {
        localStorage.setItem("jwt", data.token);

        setIsLoggedIn(true);

        setCurrentUser({ email, name, avatar });

        handleCloseModal();
      })

      .catch(console.error);
  };

  const handleLogin = (email, password) => {
    signin({ email, password })
      .then((data) => {
        localStorage.setItem("jwt", data.token);

        setIsLoggedIn(true);

        handleCloseModal();
      })

      .catch(console.error);
  };

  const handleOpenEditProfileModal = () => setActiveModal("editProfile");

  const handleEditProfileSubmit = (updatedData) => {
    updateUserProfile(updatedData)
      .then((updatedUserData) => {
        setCurrentUser(updatedUserData);

        handleCloseModal();
      })

      .catch(console.error);
  };

  const handleCardLike = (itemId) => {
    likeItem(itemId)
      .then((updatedItem) => {
        setClothingItems(
          clothingItems.map((item) =>
            item._id === itemId ? updatedItem : item
          )
        );
      })

      .catch(console.error);
  };

  const handleCardDislike = (itemId) => {
    dislikeItem(itemId)
      .then((updatedItem) => {
        setClothingItems(
          clothingItems.map((item) =>
            item._id === itemId ? updatedItem : item
          )
        );
      })

      .catch(console.error);
  };

  return (
    <Router>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
          <div className="app">
            <Header
              onCreateModal={() => handleModal("create")}
              isLoggedIn={isLoggedIn}
              onLogin={() => handleModal("login")}
              onRegister={() => handleModal("register")}
            />

            <Switch>
              <Route exact path="/">
                <Main
                  weatherTemp={temp}
                  onSelectCard={handleSelectedCard}
                  clothingItems={clothingItems}
                  onCardLike={handleCardLike}
                  onCardDislike={handleCardDislike}
                />
              </Route>
              // In App.js, inside the return statement
              <ProtectedRoute path="/profile" isLoggedIn={isLoggedIn}>
                <Profile
                  onSelectCard={handleSelectedCard}
                  handleActiveCreateModal={() => handleModal("create")}
                  clothingItems={clothingItems}
                  selectedCard={selectedCard}
                  setIsLoggedIn={setIsLoggedIn}
                  handleOpenEditProfileModal={handleOpenEditProfileModal}
                  onCardLike={handleCardLike} // Add this line
                  onCardDislike={handleCardDislike} // Add this line
                />
              </ProtectedRoute>
              {/* Additional routes */}
            </Switch>

            <Footer />

            {activeModal === "create" && (
              <AddItemModal
                handleCloseModal={() => handleModal("")}
                isOpen={activeModal === "create"}
                onAddItem={onAddItem}
              />
            )}

            {activeModal === "preview" && (
              <ItemModal
                selectedCard={selectedCard}
                onClose={() => handleModal("")}
                handleDeleteButton={() => handleModal("confirmation-opened")}
              />
            )}

            {activeModal === "confirmation-opened" && (
              <DeleteModal
                onClose={() => handleModal("")}
                card={selectedCard}
                handleDeleteButton={handleDeleteButton}
              />
            )}

            {activeModal === "register" && (
              <RegisterModal
                isOpen={activeModal === "register"}
                handleCloseModal={() => handleModal("")}
                handleRegistration={handleRegistration}
                openLoginModal={() => handleModal("login")}
              />
            )}

            {activeModal === "login" && (
              <LoginModal
                isOpen={activeModal === "login"}
                handleCloseModal={() => handleModal("")}
                handleLogin={handleLogin}
                openRegisterModal={() => handleModal("register")}
              />
            )}

            {activeModal === "editProfile" && (
              <EditProfileModal
                isOpen={activeModal === "editProfile"}
                onClose={() => handleModal("")}
                handleSubmit={handleEditProfileSubmit}
              />
            )}
          </div>
        </CurrentUserContext.Provider>
      </CurrentTemperatureUnitContext.Provider>
    </Router>
  );
}

export default App;
