import "./ModalWithForm.css";
import closeImage from "../../images/Close.svg";

const ModalWithForm = ({
  children,
  buttonText = "Add garment",
  title,
  onClose,
  name,
  onSubmit
}) => {
  return (
    <div className={`modal modal_type_${name}`}>
      <div className="modal__content">
        <button className="modal__close-button" type="button" onClick={onClose}>
          <img src={closeImage} alt="Close icon" />
        </button>
        <h3>{title}</h3>
        <form onSubmit={onSubmit}>
          {children}
          <button className="modal__add-button" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
