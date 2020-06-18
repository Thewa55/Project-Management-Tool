import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const jwt = localStorage.jwtToken;

const SecureRoutes = ({ component: Component, security, ...otherProps }) => (
    <Route
      {...otherProps}
      render={props =>
        jwt ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );

export default SecureRoutes;