import "./ModalWithForm.css";

const ModalWithForm = ({
  children,
  buttonText = "Add garment",
  title,
  onClose,
  name,
}) => {
  return (
    <div className={`modal modal_type_${name}`}>
      <div className="modal__content">
        <button className="modal__close-button" type="button" onClick={onClose}>
          <img src="/images/close.svg" />
        </button>
        <h3>{title}</h3>
        <form>{children}</form>
        <button className="modal__add-button" type="submit">
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default ModalWithForm;
