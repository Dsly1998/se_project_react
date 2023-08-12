import "./ItemModal.css";
import closeIcon from "../../images/Closex.svg";

const ItemModal = ({ selectedCard, onClose, handleDeleteButton }) => {
  return (
    <div className={`modal`}>
      <div className="modal__content-preview">
        <button
          className="modal__preview-close"
          type="button"
          onClick={onClose}
        >
          <img src={closeIcon} alt="close Icon" />
        </button>
        <img
          className="modal__image-preview"
          id="image-preview"
          src={selectedCard.imageUrl}
          alt="Clothing item"
        />
        <button
          className="modal__delete-button"
          type="button"
          onClick={() => handleDeleteButton(selectedCard)}
        >
          Delete item
        </button>
        <div className="modal__card-name">{selectedCard.name}</div>
        <div className="modal__card-description">
          {" "}
          Weather type: {selectedCard.weather}
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
