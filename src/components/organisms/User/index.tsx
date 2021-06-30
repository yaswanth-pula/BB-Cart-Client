import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const User: React.FC = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect();
  };
  const handleLogout = () => {
    logout();
  };

  return isAuthenticated ? (
    <>
      <Typography variant="h6">{user?.name}</Typography>
      <Button variant="outlined" color="primary" onClick={handleLogout}>
        Logout
      </Button>
    </>
  ) : (
    <Button variant="contained" color="primary" onClick={handleLogin}>
      Login
    </Button>
  );
};

export default User;
