import React, { useState, useEffect, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext"; // Adjust this path as necessary
import "./EditProfileModal.css";

const EditProfileModal = ({ isOpen, onClose, handleSubmit }) => {
  const { currentUser } = useContext(CurrentUserContext); // Consuming currentUser from context
  const [name, setName] = useState("");
  const [avatar, setAvatarUrl] = useState("");

  useEffect(() => {
    if (isOpen && currentUser) {
      setName(currentUser.name || "");
      setAvatarUrl(currentUser.avatar || "");
    }
  }, [currentUser, isOpen]);

  const handleNameChange = (e) => setName(e.target.value);
  const handleAvatarUrlChange = (e) => setAvatarUrl(e.target.value);

  const onFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit({ name, avatar });
  };

  const isFormFilled = name && avatar; // Check if both fields are filled

  return (
    <ModalWithForm isOpen={isOpen} onClose={onClose} onSubmit={onFormSubmit}>
      <h2 className="EditProfile__modal-title">Edit Profile</h2>

      <label className="EditProfile__modal-label">
        Name*
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Name"
          className="EditProfile__modal-input"
          required
        />
      </label>

      <label className="EditProfile__modal-label">
        Avatar URL
        <input
          type="text"
          value={avatar}
          onChange={handleAvatarUrlChange}
          placeholder="Avatar URL"
          className="EditProfile__modal-input"
          required
        />
      </label>

      <div className="EditProfile__modal-submit-button">
        <button
          className={`EditProfile__modal-save-button ${
            isFormFilled ? "" : "disabled"
          }`}
          type="submit"
          style={{ opacity: isFormFilled ? 1 : 0.5 }}
        >
          Save Changes
        </button>
      </div>
    </ModalWithForm>
  );
};

export default EditProfileModal;
