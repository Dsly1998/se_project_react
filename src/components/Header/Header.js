import "./Header.css";
import Logo from "../../images/Logo.svg";
import avatar from "../../images/avatar.svg";
import ToggleSwitch from "../../ToggleSwitch/ToggleSwitch";

const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

const Header = ({ onCreateModal }) => {
  return (
    <header className="header">
      <div className="header__left">
        <div>
          <img src={Logo} alt="logo" />
        </div>
        <div className="header__date">{currentDate}, Florida</div>
      </div>
      <div className="header__right">
        <ToggleSwitch/>
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
          <img src={avatar} alt="avatar" />
        </div>
      </div>
    </header>
  );
};

export default Header;
