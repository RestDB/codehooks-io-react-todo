import React from "react";
import { Button } from "@material-ui/core";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect, loginWithPopup } = useAuth0();
  const scope = "read:current_user create:current_user_metadata profile email";

  return <Button variant="contained" onClick={() => loginWithRedirect({"scope": scope})}>Log In</Button>;
};

export default LoginButton;