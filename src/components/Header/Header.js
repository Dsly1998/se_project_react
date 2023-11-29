import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import CurrentUserContext from '../../contexts/CurrentUserContext';
import Logo from "../../images/Logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import "./Header.css";

const Header = ({ onCreateModal, onLogin, onRegister }) => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const createPlaceholderImage = (name) => {
    if (!name) return null; 

    const initial = name.charAt(0).toUpperCase();
    return (
      <div className="header__avatar-placeholder">
        {initial}
      </div>
    );
  };

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__left">
        <div>
          <Link to="/">
            <img src={Logo} alt="logo" />
          </Link>
        </div>
        <div className="header__date">{currentDate}, Florida</div>
      </div>
      <div className="header__right">
        <ToggleSwitch />
        {currentUser ? (
          <>
            <div>
              <button className="header__button" type="text" onClick={onCreateModal}>
                + Add clothes
              </button>
            </div>
            <Link className="header__name" to="/profile">
              {currentUser.name}
            </Link>
            <div>
              {currentUser.avatar ? (
                <img className="header__avatar" src={currentUser.avatar} alt={`${currentUser.name}'s avatar`} />
              ) : (
                createPlaceholderImage(currentUser.name)
              )}
            </div>
          </>
        ) : (
          <>
            <button onClick={onLogin}>Login</button>
            <button onClick={onRegister}>Register</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
