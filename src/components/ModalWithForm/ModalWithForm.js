import "./ModalWithForm.css";
import closeImage from "../../images/Close.svg";

const ModalWithForm = ({
  children,

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
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
