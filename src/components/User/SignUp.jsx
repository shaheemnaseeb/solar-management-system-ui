import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  makeStyles,
  Grid,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { createUser, resetUserError } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    width: "600px",
    padding: theme.spacing(2),
    backgroundColor: "#fff",
    borderRadius: theme.spacing(1),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
}));

const AddUser = () => {
  const classes = useStyles();

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const error = useSelector((state) => state.user.error);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPasswordError("");
    // Perform validation
    if (password !== user.password) {
      setPasswordError("Passwords do not match");
      return;
    }
    await dispatch(createUser(user));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetUserError());
    }
  }, [error]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  const handleChange = (e) => {
    const value = e.target.value;
    setUser({
      ...user,
      [e.target.name]: value,
    });
  };

  const [user, setUser] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  return (
    <div className={classes.root}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Typography variant="h5" className={classes.title}>
          SignUp
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              value={user.firstName}
              name="firstName"
              onChange={handleChange}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              value={user.lastName}
              name="lastName"
              onChange={handleChange}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={user.email}
              onChange={handleChange}
              name="email"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              value={user.username}
              onChange={handleChange}
              name="username"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              value={user.password}
              name="password"
              onChange={handleChange}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Confirm Password"
              variant="outlined"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              error={passwordError !== ""}
              helperText={passwordError}
            />
          </Grid>
        </Grid>
        <Button
          className={classes.submitButton}
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
        >
          SignUp
        </Button>
      </form>
    </div>
  );
};

export default AddUser;
