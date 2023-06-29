import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { resetProductData } from "../../actions/productAction";
import { resetProjectData } from "../../actions/projectAction";
import { resetReportData } from "../../actions/reportAction";
import { logoutUser } from "../../actions/userActions";
import { ToastContainer } from "react-toastify";

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
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await dispatch(resetProductData());
    await dispatch(resetProjectData());
    await dispatch(resetReportData());
    await dispatch(logoutUser());
  };

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Solar Management System
        </Typography>
        {isAuthenticated ? (
          <>
            <ToastContainer />
            <Button
              component={Link}
              to="/"
              color="inherit"
              className={classes.button}
            >
              Home
            </Button>
            <Button
              component={Link}
              to="/projects"
              color="inherit"
              className={classes.button}
            >
              Projects
            </Button>
            <Button
              component={Link}
              to="/products"
              color="inherit"
              className={classes.button}
            >
              Products
            </Button>
            <Button
              onClick={handleLogout}
              color="inherit"
              className={classes.button}
              style={{ backgroundColor: "#f44336" }}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button
              component={Link}
              to="/login"
              color="inherit"
              className={classes.button}
            >
              Login
            </Button>
            <Button
              component={Link}
              to="/signup"
              color="inherit"
              className={classes.button}
            >
              SignUp
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
