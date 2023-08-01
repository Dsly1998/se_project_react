import "./Header.css";
import Logo from "../../images/Logo.svg";
import avatar from "../../images/avatar.svg";
import ToggleSwitch from "../../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

const Header = ({ onCreateModal }) => {
  return (
    <header className="header">
      <div className="header__left">
        <div>
          <Link to="/">
            <img src={Logo} alt="logo" />
          </Link>
        </div>
        <div className="header__date">{currentDate}, Florida</div>
      </div>
      <div className="header__right">
        <ToggleSwitch />
        <div>
          <button
            className="header__button"
            type="text"
            onClick={onCreateModal}
          >
            + Add clothes
          </button>
        </div>
        <Link className="header__name" to="/profile">
          Terrence Tegegne
        </Link>
        <div>
          <img className="header__avatar" src={avatar} alt="avatar" />
        </div>
      </div>
    </header>
  );
};

export default Header;
