import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App/App";
import * as serviceWorker from "./serviceWorker";
import { Auth0Provider } from "@auth0/auth0-react";
import config from "./config.json";

const domain = config.domain; //"dev-nofd3nl3.us.auth0.com";
const clientId = config.clientId;// "NvtGSUYq2BFxX3L5kRnHFl6O6xALqt5y";

// hack to make it work with subdirectory for deployment on github pages
const redirectUri = window.location.origin.indexOf("localhost") !== -1 ? window.location.origin : `${window.location.origin}${config.redirect}`;

ReactDOM.render(
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience: `https://${domain}/api/v2/`,
        scope: "read:current_user profile email",
        useRefreshTokens: true
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
