import "./ItemModal.css";
import CloseIcon from "../../images/Closex.svg";

const ItemModal = ({ selectedCard, onClose }) => {
  return (
    <div className={`modal`}>
      <div className="modal__content-preview">
        <button
          className="modal__preview-close"
          type="button"
          onClick={onClose}
        >
          <img src={CloseIcon} />
        </button>
        <img
          className="modal__image-preview"
          id="image-preview"
          src={selectedCard.link}
        />
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
