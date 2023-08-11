import React from "react";

const currentTemperatureUnitContext = React.createContext({
  currentTemperatureUnit: "",
  handleToggleSwitchChange: () => {},
  handleToggleSwitchChange() => {
    console.log()
  }

  currentTemperatureUnit() => {
    console.log()
  }
});

export { currentTemperatureUnitContext };
