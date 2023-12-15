import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./EditProfileModal.css";

const EditProfileModal = ({ isOpen, onClose, handleSubmit, currentUser }) => {
  const [name, setName] = useState("");
  const [avatar, setAvatarUrl] = useState("");

  // Load current user data when the modal opens
  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setAvatarUrl(currentUser.avatarUrl || "");
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
