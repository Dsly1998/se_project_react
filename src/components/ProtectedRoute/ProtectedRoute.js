import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ children, isLoggedIn, ...rest }) => {
console.log(isLoggedIn)
return (
    <Route
      {...rest}
      render={(routeProps) =>
        isLoggedIn ? children : <Redirect to="/" />
      }
    />
  );
};

export default ProtectedRoute;
