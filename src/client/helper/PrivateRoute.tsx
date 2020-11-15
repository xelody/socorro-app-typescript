import React from 'react';
import {Route, Redirect, RouteProps} from 'react-router-dom';

interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<any>;
  hasAuth: boolean;
}

export default function PrivateRoute({
  component: Component,
  hasAuth,
  ...rest
}: PrivateRouteProps) {
  return (
    <Route
      {...rest}
      render={(props) =>
        hasAuth ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {from: props.location},
            }}
          />
        )
      }
    />
  );
}
