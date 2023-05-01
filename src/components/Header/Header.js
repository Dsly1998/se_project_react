import "./Header.css";

const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

const Header = ({ onCreateModal }) => {
  return (
    <header className="header">
      <div className="header__left">
        <div>
          <img src={require("../../images/Logo.svg").default} alt="logo" />
        </div>
        <div className="header__date">{currentDate}, Florida</div>
      </div>
      <div className="header__right">
        <div>
          <button
            className="header__button"
            type="text"
            onClick={onCreateModal}
          >
            + Add clothes
          </button>
        </div>
        <div>Terrence Tegegne</div>
        <div>
          <img src={require("../../images/avatar.svg").default} alt="logo" />
        </div>
      </div>
    </header>
  );
};

export default Header;
