import React, { useState } from "react";
import { Button, TextField, Typography, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, resetUserError } from "../../actions/userActions";
import { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../Shared/Spinner";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    width: "300px",
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

const Login = () => {
  const classes = useStyles();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(loginUser(username, password));
  };

  useEffect(() => {
    if (isAuthenticated) {
      setPasswordError("");
      navigate("/");
    } else if (error) {
      toast.error(error);
      dispatch(resetUserError());
    } else if (isAuthenticated !== null && isAuthenticated === false) {
      setPasswordError("Incorrect username or password");
    }
    // eslint-disable-next-line
  }, [isAuthenticated, error]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className={classes.root}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Typography variant="h5" className={classes.title}>
          Login
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={passwordError ? true : false}
          margin="normal"
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          error={passwordError ? true : false}
          helperText={passwordError}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          className={classes.submitButton}
        >
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default Login;
