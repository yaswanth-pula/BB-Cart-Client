import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  account: {
    display: "flex",
    alignItems: "center",
    alignContent: "flex-end",
    justifyContent: "space-between",
  },
  logout: {
    marginLeft: "1em",
    "& hover": {
      color: "primary",
    },
  },
});

const User: React.FC = () => {
  const styles = useStyles();
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect();
  };
  const handleLogout = () => {
    logout();
  };

  return isAuthenticated ? (
    <div className={styles.account}>
      <Typography variant="h6">{user?.name}</Typography>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleLogout}
        className={styles.logout}
      >
        Logout
      </Button>
    </div>
  ) : (
    <Button variant="contained" color="primary" onClick={handleLogin}>
      Login
    </Button>
  );
};

export default User;
