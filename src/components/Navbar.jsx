import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  appBar: {
    marginBottom: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing(2),
  },
  button: {
    marginLeft: theme.spacing(2),
  },
}));


const Navbar = () => {
  const classes = useStyles();
  const { isAuthenticated } = useSelector((state) => state);

  const handleLogin = () => {
  }
  
  const handleSignUp = () => {
  }
  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Solar Management System
        </Typography>
        {isAuthenticated ? (
          <>
            <Button component={Link} to="/" color="inherit" className={classes.button}>
              Home
            </Button>
            <Button color="inherit" className={classes.button}>
              Project
            </Button>
          </>
        ) : (
          <>
            <Button component={Link} to="/login" onClick={handleLogin} color="inherit" className={classes.button}>
              Login
            </Button>
            <Button component={Link} to="/signup" onClick={handleSignUp} color="inherit" className={classes.button}>
              SignUp
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
