import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ handleCloseModal, onAddItem, isOpen }) => {
  const [name, setName] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const [link, setUrl] = useState("");

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const [weather, setWeather] = useState("");

  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, link, weather });
  };

  return (
    <ModalWithForm
      title="New Garment"
      onClose={handleCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Name
        <input
          className="modal__input"
          type="text"
          name="name"
          minLength="1"
          maxLength="30"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label className="modal__label">
        Image
        <input
          className="modal__input"
          placeholder="Image URL"
          type="url"
          name="link"
          minLength="1"
          value={link}
          onChange={handleUrlChange}
        />
      </label>
      <div id="radio-options" className="modal__options">
        Select the weather type:
      </div>
      <div>
        <div className="modal__radios">
          <input
            className="modal__radio-input"
            type="radio"
            id="hot"
            value="hot"
            name="weather"
            onChange={handleWeatherChange}
          />
          <label className="modal__label-radio">Hot</label>
        </div>
        <div className="modal__radios">
          <input
            className="modal__radio-input"
            type="radio"
            id="warm"
            value="warm"
            name="weather"
            onChange={handleWeatherChange}
          />
          <label className="modal__label-radio">Warm</label>
        </div>
        <div>
          <input
            className="modal__radio-input"
            type="radio"
            id="cold"
            value="cold"
            name="weather"
            onChange={handleWeatherChange}
          />
          <label className="modal__label-radio">Cold</label>
        </div>
      </div>
    </ModalWithForm>
  );
};

export default AddItemModal;
