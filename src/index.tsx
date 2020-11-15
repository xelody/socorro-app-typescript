import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import store from './client/store';
import './client/index.scss';
import reportWebVitals from './client/reportWebVitals';

const renderApp = () => {
  const App = require('./client/App').default;

  ReactDOM.render(
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>,
    document.getElementById('root'),
  );
};

renderApp();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./client/App', renderApp);
}
