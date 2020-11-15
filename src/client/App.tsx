import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Signin from './features/Signin';
import Signup from './features/Signup';
import Navigation from './features/Navigation';
import Dashboard from './features/Dashboard';
import DiveEntries from './features/DiveEntries';

import PrivateRoute from './helper/PrivateRoute';
import AuthService from './helper/AuthService';

import './styles/app.scss';

export default function App() {
  const authService = new AuthService();
  const [hasAuth, setAuth] = useState(false);
  const [waitForInit, setWaitForInit] = useState(true);

  useEffect(() => {
    async function isAuthorized() {
      try {
        const response = await authService.checkAuth();
        setAuth(Boolean(response?.success));
      } catch (err) {
        console.error(err);
      }
    }
    isAuthorized().then(() => setWaitForInit(false));

    window.addEventListener('EVENT_AUTH_CHANGED', isAuthorized);
    return () => window.removeEventListener('EVENT_AUTH_CHANGED', isAuthorized);
  }, []);

  if (waitForInit) {
    return <React.Fragment />;
  }

  return (
    <Router>
      <div>
        <nav>
          <Navigation />
        </nav>
        <main>
          <Switch>
            <PrivateRoute
              exact
              path="/"
              hasAuth={hasAuth}
              component={Dashboard}
            />
            <PrivateRoute
              exact
              path="/dashboard"
              hasAuth={hasAuth}
              component={Dashboard}
            />
            <PrivateRoute
              exact
              path="/dives"
              hasAuth={hasAuth}
              component={DiveEntries}
            />
            <Route exact path="/login" component={Signin} />
            <Route exact path="/signup" component={Signup} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}
