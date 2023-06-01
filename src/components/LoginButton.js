import React from "react";
import { Button } from "@material-ui/core";
import { useAuth0 } from "@auth0/auth0-react";
import config from "../config.json";

const LoginButton = () => {
  const { loginWithRedirect, loginWithPopup } = useAuth0();
  const scope = config.scope;

  return <Button variant="contained" onClick={() => loginWithRedirect({"scope": scope})}>Log In</Button>;
};

export default LoginButton;