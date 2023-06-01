import React from "react";
import Typography from "@material-ui/core/Typography";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <Typography style={{ padding: 10 }} variant="subtitle1">{user.name}</Typography>
        <Typography style={{ padding: 10 }} variant="subtitle2">{user.email}</Typography>
      </div>
    )
  );
};

export default Profile;