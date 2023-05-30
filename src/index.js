import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import * as serviceWorker from './serviceWorker';
import { Auth0Provider } from "@auth0/auth0-react";

// hack to make it work with subdirectory for deployment on github pages
const redirectUri = window.location.origin.indexOf("localhost") !== -1 ? window.location.origin : `${window.location.origin}/codehooks-io-react-todo`;

ReactDOM.render(
    <Auth0Provider
      domain="dev-nofd3nl3.us.auth0.com"
      clientId="NvtGSUYq2BFxX3L5kRnHFl6O6xALqt5y"
      authorizationParams={{
        redirect_uri: redirectUri
      }}
    >
      <App />
    </Auth0Provider>,
    document.getElementById("root")
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
