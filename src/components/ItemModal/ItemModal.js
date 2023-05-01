import "./ItemModal.css";

const ItemModal = ({ selectedCard, onClose }) => {
  return (
    <div className={`modal`}>
      <div className="modal__content-preview">
        <button
          className="modal__preview-close"
          type="button"
          onClick={onClose}
        >
          <img src="/images/closex.svg" />
        </button>
        <img
          classname="modal__image-preview"
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
