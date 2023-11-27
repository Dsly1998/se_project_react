import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm"; // Update this path to your actual ModalWithForm component

const LoginModal = ({ isOpen, handleCloseModal, handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  return (
    <ModalWithForm isOpen={isOpen} onClose={handleCloseModal} onSubmit={handleSubmit}>
      <h2>Log In</h2>
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
      <button type="submit">Login</button>
    </ModalWithForm>
  );
};

export default LoginModal;
