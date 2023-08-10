import React from "react";
import "./DeleteModal.css";

const DeleteModal = ({ onClose, card, handleDeleteButton }) => {
  console.log(card);
  return (
    <section className="modal" onClick={onClose}>
      <div className="delete__modal">
        <button
          className="delete__modal-button_exit"
          type="button"
          onClick={onClose}
        ></button>
        <div className="delete__modal-wrapper">
          <p className="delete__modal-text">
            Are you sure you want to delete this item? <br />
            This action is irreversible {card._id}
          </p>
          <button
            className="delete__modal-button_confirm"
            type="button"
            onClick={() => {
              handleDeleteButton(card._id);
            }}
          >
            Yes, delete item
          </button>
          <button
            className="delete__modal-button_cancel"
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </section>
  );
};

export default DeleteModal;
