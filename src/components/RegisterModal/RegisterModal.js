import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css"

const RegisterModal = ({ isOpen, handleCloseModal, handleRegistration, openLoginModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handleAvatarChange = (e) => setAvatar(e.target.value);

  const allFieldsFilled = email.length > 0 && password.length > 0 && name.length > 0 && avatar.length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (allFieldsFilled) {
      handleRegistration(email, password, name, avatar);
    }
  };

  return (
    <ModalWithForm isOpen={isOpen} onClose={handleCloseModal} onSubmit={handleSubmit}>
      <h2 className="Register__modal-title">Sign Up</h2>
      <label className="Register__modal-label">
        Email*
      <input
        type="email"
        value={email}
        onChange={handleEmailChange}
        placeholder="Email"
        className="Register__modal-input"
        required
      />
      </label>
      <label className="Register__modal-label">
      Password*
      <input
        type="password"
        value={password}
        onChange={handlePasswordChange}
        placeholder="Password"
        className="Register__modal-input"
        required
      />
      </label>
      <label className="Register__modal-label">
        Name*
      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        placeholder="Name"
        className="Register__modal-input"
        required
      />
      </label>
      <label className="Register__modal-label">
        Avatar URL*
      <input
        type="url"
        value={avatar}
        onChange={handleAvatarChange}
        placeholder="Avatar URL"
        className="Register__modal-input"
        required
      />
      </label>
      <div className="Register__modal-submit-button">      
        <button 
          className={`Register__modal-next-button ${allFieldsFilled ? '' : 'disabled'}`} 
          type="submit"
        >
          Next
        </button>
      <button 
        className="Register__modal-login-button" 
        type="button" // Set to "button" to prevent form submission
        onClick={openLoginModal}
      >
        or Log in
      </button>
      </div>
    </ModalWithForm>
  );
};

export default RegisterModal;
