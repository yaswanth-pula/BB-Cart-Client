import React from "react";
import ReactDOM from "react-dom";
import App from "./components/pages/App";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-3m1i3vdf.us.auth0.com"
      clientId="IIxSllpgRpJYbeoodN0kjyGAariHwFsv"
      audience="https://bbcart-JhbGciOiJIUzI1Ni.ys"
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
