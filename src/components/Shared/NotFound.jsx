import React from "react";
import { Link } from "react-router-dom";
import { Typography, Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    marginTop: theme.spacing(10),
  },
  heading: {
    marginBottom: theme.spacing(2),
  },
  link: {
    marginTop: theme.spacing(2),
  },
}));

const NotFound = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h1" className={classes.heading}>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1">
        The page you are looking for does not exist.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/"
        className={classes.link}
      >
        Go to Home
      </Button>
    </div>
  );
};

export default NotFound;
