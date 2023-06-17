import React, { useState } from "react";
import { Button, TextField, Typography, makeStyles } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { createUser } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";

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

const AddUser = () => {
  const classes = useStyles();

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform validation
    if (password !== user.password) {
      setPasswordError("Passwords do not match");
      return;
    }
    await dispatch(createUser(user));
    navigate("/");
  };

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
        <TextField
          label="First Name"
          variant="outlined"
          fullWidth
          name="firstName"
          value={user.firstName}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          label="Last Name"
          variant="outlined"
          fullWidth
          name="lastName"
          value={user.lastName}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          name="username"
          value={user.username}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          name="email"
          value={user.email}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          name="password"
          fullWidth
          value={user.password}
          onChange={handleChange}
          margin="normal"
        />
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
