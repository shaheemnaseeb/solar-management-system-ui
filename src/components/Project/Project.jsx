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
import { createProject, getProjects } from "../../actions/projectAction";
import Spinner from "../Shared/Spinner";

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
}));

const Project = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.project.projects);
  const user = useSelector((state) => state.user.user);
  const loading = useSelector((state) => state.loading);

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
    handleClose();
    navigate.go(0);
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
  }

  const [project, setProject] = useState({
    name: "",
    createdAt: "",
    status: true,
    description: "",
    userId: user.id,
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        await dispatch(getProjects(user.id));
      } catch (error) {
        console.log("Error fetching projects:", error);
      }
    };
    
    fetchProjects();
  // eslint-disable-next-line
  }, [user]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <h1>Project Overview</h1>
      {projects ? (
        <div>
          <Grid container spacing={2}>
            {projects.map((project) => (
              <Grid item xs={12} sm={6} md={4} key={project.id}>
                <Card className={classes.card} onClick={() => handleCardClick(project.id)}>
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
