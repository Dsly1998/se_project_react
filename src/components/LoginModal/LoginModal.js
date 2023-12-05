import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({ isOpen, handleCloseModal, handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password, () => {
      handleCloseModal();
      history.push("/profile"); // Navigate to profile
    });
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
