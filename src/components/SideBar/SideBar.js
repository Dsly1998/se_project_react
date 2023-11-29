import React, { useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext'; // Adjust the import path as needed
import "./SideBar.css";

const SideBar = ({ onLogout }) => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const createPlaceholderImage = (name) => {
    if (!name) return null;
    const initial = name.charAt(0).toUpperCase();
    return (
      <div className="sideBar__avatar-placeholder">
        {initial}
      </div>
    );
  };

  return (
    <div className="sideBar">
      <div className="sideBar__user-info">
        {currentUser && currentUser.avatar ? (
          <img
            className="sideBar__avatar"
            src={currentUser.avatar}
            alt={`${currentUser.name}'s avatar`}
          />
        ) : (
          createPlaceholderImage(currentUser?.name)
        )}
        <p className="sideBar__name">{currentUser?.name || "Guest"}</p>
      </div>
      <button className="sideBar__profile-edit">Change profile data</button>
      <button className="sideBar__logout-button" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
};

export default SideBar;
