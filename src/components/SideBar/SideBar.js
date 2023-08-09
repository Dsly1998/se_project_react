import React from "react";
import avatar from "../images/avatar.svg";
import "./SideBar.css";

const SideBar = () => {
  return (
    <div className="sideBar">
        <img className="sideBar__avatar" src={avatar} alt="avatar" />
      <p className="sideBar__name">Tegegne Terrence</p>
    </div>
  );
};

export default SideBar;
