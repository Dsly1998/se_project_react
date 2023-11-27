import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm"; // Update this path to your actual ModalWithForm component

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
      <h2>Sign Up</h2>
      <input
        type="email"
        value={email}
        onChange={handleEmailChange}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={handlePasswordChange}
        placeholder="Password"
      />
      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        placeholder="Name"
      />
      <input
        type="url"
        value={avatar}
        onChange={handleAvatarChange}
        placeholder="Avatar URL (optional)"
      />
      <button type="submit">Register</button>
    </ModalWithForm>
  );
};

export default RegisterModal;
