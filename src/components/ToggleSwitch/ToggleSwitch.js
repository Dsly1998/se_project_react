import React, { useContext} from "react";
import "./ToggleSwitch.css";
import { currentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.js";

const ToggleSwitch = () => {
  const { CurrentTemperatureUnit, handleToggleSwitchChange } = useContext(
    currentTemperatureUnitContext
  );

  return (
    <label className="switch">
      <input
        type="checkbox"
        className="switch__box"
        onChange={handleToggleSwitchChange}
      />
      <span
        className={
          CurrentTemperatureUnit === "F"
            ? "switch__slider switch__slider-C"
            : "switch__slider switch__slider-F"
        }
      ></span>
      <p
        className={`switch__temp-F ${
          CurrentTemperatureUnit === "C" && "switch__active"
        }`}
      >
        C
      </p>
      <p
        className={`switch__temp-C ${
          CurrentTemperatureUnit === "F" && "switch__active"
        }`}
      >
        F
      </p>
    </label>
  );
};

export default ToggleSwitch;
