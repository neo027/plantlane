import React from 'react';
import {Route, Redirect} from 'react-router-dom';


const ProtectedRoute = ({ isLoggedIn, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLoggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);


export default ProtectedRoute;