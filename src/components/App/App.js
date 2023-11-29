import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
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
import { register, signin, checkToken } from "../../utils/Auth";
import { fetchItems, loadItems, removeItems } from "../../utils/Api";
import { getForcastWeather, parseWeatherData } from "../../utils/weatherApi";
import "./App.css";

function App() {
  // State variables
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Fetch clothing items from the server on component mount
  useEffect(() => {
    fetchItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Fetch weather data on component mount
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

  // Check for a valid token in local storage on component mount
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
  }, []);

  // Toggle temperature unit between Celsius and Fahrenheit
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "C" ? "F" : "C");
  };

  // Open the create item modal
  const handleCreateModal = () => setActiveModal("create");

  // Close the active modal
  const handleCloseModal = () => setActiveModal("");

  // Set the selected card and open the preview modal
  const handleSelectedCard = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  // Handle the addition of a new clothing item
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

  // Open the delete confirmation modal
  const handleDeleteConfirmationModal = (selectedCard) => {
    setSelectedCard(selectedCard);
    setActiveModal("confirmation-opened");
  };

  // Handle the deletion of a clothing item
  const handleDeleteButton = (cardElement) => {
    removeItems(cardElement)
      .then(() => {
        const newClothingItems = clothingItems.filter(
          (card) => card.id !== cardElement
        );
        setClothingItems(newClothingItems);
        handleCloseModal();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Handle user registration
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

  // Handle user login
  const handleLogin = (email, password) => {
    signin({ email, password })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setIsLoggedIn(true);
        setCurrentUser({ email });
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Login Error:", error);
      });
  };

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  return (
    <Router>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="app">
          {/* Header */}
          <Header
            onCreateModal={handleCreateModal}
            isLoggedIn={isLoggedIn}
            onLogin={() => setActiveModal("login")}
            onRegister={() => setActiveModal("register")}
            onLogout={handleLogout}
          />

          {/* Switch for Routes */}
          <Switch>
            <Route exact path="/">
              <Main
                weatherTemp={temp}
                onSelectCard={handleSelectedCard}
                clothingItems={clothingItems}
              />
            </Route>

            {/* Protected Route */}
            <Route path="/profile">
              {isLoggedIn ? (
                <Profile
                  onSelectCard={handleSelectedCard}
                  handleActiveCreateModal={handleCreateModal}
                  clothingItems={clothingItems}
                  selectedCard={selectedCard}
                  handleLogout={handleLogout}
                  loggedIn={isLoggedIn}
                />
              ) : (
                <Redirect to="/" />
              )}
            </Route>

            {/* Additional routes */}
          </Switch>

          {/* Footer */}
          <Footer />

          {/* Modals */}
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

          {/* Sign-up and Log-in buttons */}
          <button onClick={() => setActiveModal("register")}>Sign Up</button>
          <button onClick={() => setActiveModal("login")}>Log In</button>
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </Router>
  );
}

export default App;
