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
import {
  deleteUser,
  getUser,
  resetUserError,
  updateUser,
} from "../../actions/userActions";
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
  const error = useSelector((state) => state.user.error);
  const loading = useSelector((state) => state.user.loading);
  const [toastMessage, setToastMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
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
  };

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetUserError());
    } else if (error === null && formSubmitted) {
      toast.success(toastMessage);
      setFormSubmitted(false);
    }
    // eslint-disable-next-line
  }, [error, formSubmitted]);

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
    setFormSubmitted(true);
    setToastMessage("User information updated successfully");
  };

  const handleDeleteClick = async (e) => {
    e.preventDefault();
    await dispatch(deleteUser(user.id));
    setToastMessage("User deleted successfully");
    setFormSubmitted(true);
    navigate("/login");
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setUser({
      ...user,
      [e.target.name]: value,
    });
  };

  if (loading) {
    return <Spinner />;
  }

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
