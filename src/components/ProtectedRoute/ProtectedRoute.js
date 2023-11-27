import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, isLoggedIn, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        isLoggedIn ? <Component {...routeProps} /> : <Redirect to="/" />
      }
    />
  );
};

export default ProtectedRoute;
