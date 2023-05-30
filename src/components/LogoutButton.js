import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@material-ui/core";

const redirectUri = window.location.origin.indexOf("localhost") !== -1 ? window.location.origin : `${window.location.origin}/codehooks-io-react-todo`;

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button variant="contained" onClick={() => logout({ logoutParams: { returnTo: redirectUri } })}>
      Log Out
    </Button>
  );
};

export default LogoutButton;