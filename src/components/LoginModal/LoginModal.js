import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

const LoginModal = ({
  isOpen,
  handleCloseModal,
  handleLogin,
  openRegisterModal,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const allFieldsFilled = email.length > 0 && password.length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (allFieldsFilled) {
      handleLogin(email, password, () => {
        handleCloseModal();
        history.push("/profile"); // Navigate to profile
      });
    }
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={handleCloseModal}
      onSubmit={handleSubmit}
    >
      <h2 className="Login__modal-title">Log in</h2>
      <label className="Login__modal-label">
        Email*
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
          className="Login__modal-input"
          required
        />
      </label>
      <label className="Login__modal-label">
        Password*
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
          className="Login__modal-input"
          required
        />
      </label>
      <div className="Login__modal-submit-button">
        <button
          className={`Login__modal-next-button ${
            allFieldsFilled ? "" : "disabled"
          }`}
          type="submit"
        >
          Login
        </button>
        <button
          className="Login__modal-login-button"
          type="button" // Important: Set to "button" to prevent form submission
          onClick={openRegisterModal}
        >
          or Register
        </button>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
