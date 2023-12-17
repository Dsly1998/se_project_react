import React, { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext"; // Import CurrentUserContext
import "./ItemModal.css";
import closeIcon from "../../images/Closex.svg";

const ItemModal = ({ selectedCard, onClose, handleDeleteButton }) => {
  const { currentUser } = useContext(CurrentUserContext); // Use currentUser from context

  const isOwn = selectedCard && currentUser && selectedCard.owner === currentUser._id;

  const itemDeleteButtonClassName = `modal__delete-button ${
    isOwn ? 'modal__delete-button_visible' : 'modal__delete-button_hidden'
  }`;

  return (
    <div className="modal">
      <div className="modal__content-preview">
        <button
          className="modal__preview-close"
          type="button"
          onClick={onClose}
        >
          <img src={closeIcon} alt="Close icon" />
        </button>
        <img
          className="modal__image-preview"
          src={selectedCard.imageUrl}
          alt="Clothing item"
        />
        {isOwn && (
          <button
            className={itemDeleteButtonClassName}
            type="button"
            onClick={() => handleDeleteButton(selectedCard)}
          >
            Delete item
          </button>
        )}
        <div className="modal__card-name">{selectedCard.name}</div>
        <div className="modal__card-description">
          Weather type: {selectedCard.weather}
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
