import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm"; // Update this path to your actual ModalWithForm component
import { register } from "../../utils/Auth";
import "./RegisterModal.css"

const RegisterModal = ({ isOpen, handleCloseModal, handleRegistration }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handleAvatarChange = (e) => setAvatar(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(email, password, name, avatar);
  };

  return (
    <ModalWithForm isOpen={isOpen} onClose={handleCloseModal} onSubmit={handleSubmit}>
      <form className="Register__modal-container">
      <h2 className="Register__modal-title">Sign Up</h2>
      <label className="Register__modal-label">
        Email*
      <input
        type="email"
        value={email}
        onChange={handleEmailChange}
        placeholder="Email"
        className="Register__modal-input"
      />
      </label>
      Password*
      <label className="Register__modal-label">
      <input
        type="password"
        value={password}
        onChange={handlePasswordChange}
        placeholder="Password"
        className="Register__modal-input"
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
      />
      </label>
      <div className="Register__modal-submit-button">      
      <button className="Register__modal-next-button" type="submit">Next</button>
      <button className="Register__modal-login-button" type="submit">or Log in</button>
      </div>
      </form>
    </ModalWithForm>
  );
};

export default RegisterModal;
