import "./Header.css";

const Header = ({ onCreateModal, temp }) => {

  return (
    <header className="header">
      <div className="header__left">
        <div>
          <img src="/images/logo.svg" alt="logo" />
        </div>
        <div>Date</div>
      </div>
      <div className="header__right">
        <div>
          <button type="text" onClick={onCreateModal}>
            Add New clothes
          </button>
        </div>
        <div>Name</div>
        <div>
          <img src="/images/avatar.svg" alt="logo" />
        </div>
      </div>
    </header>
  );
};

export default Header;
