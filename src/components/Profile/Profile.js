import React, { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext'; // Adjust the import path as needed
import SideBar from '../SideBar/SideBar'; // Adjust the import path as needed
import ClothesSection from '../ClothesSection/ClothesSection'; // Adjust the import path as needed
import './Profile.css';

const Profile = ({ onSelectCard, handleActiveCreateModal, clothingItems, setIsLoggedIn, handleOpenEditProfileModal }) => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  return (
    <section className="profile">
      <SideBar onLogout={handleLogout} onEditProfile={handleOpenEditProfileModal} /> 
      <ClothesSection
        onSelectCard={onSelectCard}
        handleActiveCreateModal={handleActiveCreateModal}
        clothingItems={clothingItems}
        currentUser={currentUser}
      />
    </section>
  );
};

export default Profile;
