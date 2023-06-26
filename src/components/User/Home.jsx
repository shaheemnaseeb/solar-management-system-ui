import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  makeStyles,
  Grid,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser, getUser, updateUser } from "../../actions/userActions";
import { useEffect } from "react";

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
  deleteButton: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.error.main,
    color: "#fff",
  },
}));

const Home = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.user);
  const [passwordError, setPasswordError] = useState("");
  const [password, setPassword] = useState(userInfo.password);
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState({
    id: userInfo.id,
    username: userInfo.username,
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    email: userInfo.email,
    password: userInfo.password,
  });

  const getUserData = async () => {
    await dispatch(getUser(userInfo.username));
  }

  useEffect(() => {
    getUserData();
  }, []);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();
    // Perform validation
    if (password !== user.password) {
      setPasswordError("Passwords do not match");
      return;
    }
    setEditMode(false);
    setPasswordError("");
    await dispatch(updateUser(user));
    navigate("/");
  };

  const handleDeleteClick = async (e) => {
    e.preventDefault();
    await dispatch(deleteUser(user.id));
    navigate("/login");
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setUser({
      ...user,
      [e.target.name]: value,
    });
  };

  return (
    <div className={classes.root}>
      <form className={classes.form}>
        <Typography variant="h5" className={classes.title}>
          User Information
        </Typography>
        <Button
          type="button"
          variant="contained"
          color="secondary"
          fullWidth
          className={classes.deleteButton}
          onClick={handleDeleteClick}
        >
          Delete Profile
        </Button>
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
              disabled={!editMode}
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
              disabled={!editMode}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={user.email}
              margin="normal"
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              value={user.username}
              margin="normal"
              disabled
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
              disabled={!editMode}
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
              disabled={!editMode}
            />
          </Grid>
        </Grid>
        {editMode ? (
          <>
            <Button
              type="button"
              variant="contained"
              color="primary"
              fullWidth
              className={classes.submitButton}
              onClick={handleSaveClick}
            >
              Save
            </Button>
          </>
        ) : (
          <Button
            type="button"
            variant="contained"
            color="primary"
            fullWidth
            className={classes.submitButton}
            onClick={handleEditClick}
          >
            Edit
          </Button>
        )}
      </form>
    </div>
  );
};

export default Home;
