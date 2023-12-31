import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Modal,
  makeStyles,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createProject,
  getProjects,
  resetProjectError,
} from "../../actions/projectAction";
import Spinner from "../Shared/Spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    marginTop: theme.spacing(2),
    outline: "none",
  },
  card: {
    marginBottom: theme.spacing(2),
    cursor: "pointer",
  },
  cardContent: {
    paddingBottom: theme.spacing(1),
  },
  root: {
    marginTop: theme.spacing(2),
  },
  datePicker: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
}));

const Project = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.project.projects);
  const user = useSelector((state) => state.user.user);
  const error = useSelector((state) => state.project.error);
  const loading = useSelector((state) => state.project.loading);

  const navigate = useNavigate();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    project.createdAt = new Date();
    await dispatch(createProject(project));
    await dispatch(getProjects(user.id));
    setToastMessage("Project Created");
    setFormSubmitted(true);
    handleClose();
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setProject({
      ...project,
      [e.target.name]: value,
    });
  };

  const handleCardClick = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  const [project, setProject] = useState({
    name: "",
    createdAt: "",
    status: true,
    description: "",
    userId: user.id,
  });

  const fetchProjects = async () => {
    await dispatch(getProjects(user.id));
  };

  const [selectedDate, setSelectedDate] = useState("");

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const filteredData = projects?.filter((item) => {
    const itemDate = item.createdAt.split("T")[0];
    return itemDate === selectedDate;
  });

  useEffect(() => {
    fetchProjects();
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetProjectError());
    } else if (error === null && formSubmitted) {
      toast.success(toastMessage);
      setFormSubmitted(false);
    }
    // eslint-disable-next-line
  }, [error, formSubmitted]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <h1>Project Overview</h1>
      <div className={classes.root}>
        <Typography variant="h6" gutterBottom>
          Filter by Date
        </Typography>
        <TextField
          id="datePicker"
          label="Select a date"
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          variant="outlined"
          className={classes.datePicker}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      {filteredData ? (
        <div>
          <Grid container spacing={2}>
            {filteredData.map((project) => (
              <Grid item xs={12} sm={6} md={4} key={project.id}>
                <Card
                  className={classes.card}
                  onClick={() => handleCardClick(project.id)}
                >
                  <CardContent className={classes.cardContent}>
                    <Typography variant="h6">{project.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {project.description}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Date Created: {project.createdAt}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Status: {project.status ? "Active" : "Inactive"}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      ) : (
        <h3 style={{ textAlign: "center", padding: "20px" }}>No Projects</h3>
      )}
      <Button
        fullWidth
        type="submit"
        variant="contained"
        color="primary"
        onClick={handleOpen}
      >
        Add Project
      </Button>
      <Modal open={open} onClose={handleClose} className={classes.modal}>
        <div className={classes.modalContent}>
          <h2>Add Information</h2>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Project Name"
                  name="name"
                  value={project.name}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Project Description"
                  name="description"
                  value={project.description}
                  onChange={handleChange}
                  variant="outlined"
                  multiline
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Project;
