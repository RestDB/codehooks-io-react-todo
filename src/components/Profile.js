import React from "react";
import {Typography, Box, Grid} from '@mui/material';
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <Box>
        <img src={user.picture} alt={user.name}/><br/>
        Name: {user.name}<br/>
        Email: {user.email}          
      </Box>  
    )
  );
};

export default Profile;