import React from "react"
import ModalWithForm from "../components/ModalWithForm/ModalWithForm";

const AddItemModal =({handleCloseModal, onAddItem, isOpen }) => {

return(

<ModalWithForm title="New Garment" onClose={handleCloseModal} isOpen={isOpen} onSubmit={onAddItem}>
<label className="modal__label">
  Name
  <input
    className="modal__input"
    type="text"
    name="name"
    minLength="1"
    maxLength="30"
    placeholder="Name"
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
    maxLength="30"
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
    />
    <label className="modal__label-radio">Hot</label>
  </div>
  <div className="modal__radios">
    <input
      className="modal__radio-input"
      type="radio"
      id="warm"
      value="warm"
    />
    <label className="modal__label-radio">Warm</label>
  </div>
  <div>
    <input
      className="modal__radio-input"
      type="radio"
      id="cold"
      value="cold"
    />
    <label className="modal__label-radio">Cold</label>
  </div>
</div>
</ModalWithForm>
)
}

export default AddItemModal;