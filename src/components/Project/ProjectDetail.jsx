import {
  Card,
  CardContent,
  Grid,
  makeStyles,
  Typography,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { deleteProject, updateProject } from "../../actions/projectAction";
import { getProductsbyProjectId } from "../../actions/productAction";
import { MapContainer as Map, TileLayer, Marker, Popup } from "react-leaflet";

const useStyles = makeStyles((theme) => ({
  card: {
    width: "250px",
    marginBottom: theme.spacing(2),
    cursor: "pointer",
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

const ProjectDetail = () => {
  const classes = useStyles();
  const { projectId } = useParams();
  const [project, setProject] = useState({});
  const projects = useSelector((state) => state.project.projects);
  const products = useSelector((state) => state.product.project_products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [activeFilter, setActiveFilter] = useState(true);

  const filteredProducts = products.filter((product) =>
    product.active === activeFilter ? product : null
  );

  const handleFilterChange = (event) => {
    setActiveFilter(event.target.value);
  };

  const findProjectById = (projectId) => {
    return projects.find((project) => project.id === Number(projectId));
  };

  const getProjectProducts = async (projectId) => {
    await dispatch(getProductsbyProjectId(projectId));
  };

  useEffect(() => {
    setProject(findProjectById(projectId));
    getProjectProducts(projectId);
  }, [projects]);

  const renderMap = (product) => (
    <Map
      center={[product?.latitude, product?.longitude]}
      zoom={10}
      style={{ height: "200px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {product && (
        <Marker position={[product.latitude, product.longitude]}>
          <Popup>
            Latitude: {product.latitude}, Longitude: {product.longitude}
          </Popup>
        </Marker>
      )}
    </Map>
  );

  const handleDeleteProject = async () => {
    await dispatch(deleteProject(projectId));
    navigate("/projects");
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setProject({
      ...project,
      [e.target.name]: value,
    });
  };

  const handleUpdateProject = async () => {
    setEditMode(false);
    await dispatch(updateProject(projectId, project));
    navigate(`/project/${projectId}`);
  };

  const Products = (product) => (
    <Grid item xs={12} sm={6} md={3} key={product.id}>
      <Card
        onClick={() => navigate(`/project/${projectId}/product/${product.id}`)}
        className={classes.card}
      >
        <CardContent className={classes.cardContent}>
          <Typography variant="h6">{product?.product?.name}</Typography>
          {renderMap(product)}
          <Typography variant="body2" color="textSecondary"></Typography>
          <Typography variant="body2" color="textSecondary">
            Power peak: {product?.product?.power} Wp
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Orientation(N/E/S/W): {product.orientation}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Inclination/tilt: {product.tilt}°
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Area (m²): {product.area}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );

  return (
    <div>
      <h1>Project Details</h1>
      <TextField
        label="Project ID"
        value={projectId}
        disabled
        fullWidth
        margin="normal"
      />
      <TextField
        label="Name"
        value={project?.name || ""}
        fullWidth
        disabled={!editMode}
        name="name"
        onChange={handleChange}
        margin="normal"
      />
      <FormControl fullWidth className={classes.formControl}>
        <InputLabel>Status</InputLabel>
        <Select
          disabled={!editMode}
          value={project?.status}
          onChange={handleChange}
          name="status"
        >
          <MenuItem value={true}>Active</MenuItem>
          <MenuItem value={false}>Inactive</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Description"
        value={project?.description || ""}
        onChange={handleChange}
        fullWidth
        name="description"
        disabled={!editMode}
        margin="normal"
      />
      <TextField
        label="Created At"
        value={project?.createdAt || ""}
        disabled
        fullWidth
        margin="normal"
      />
      <div>
        {editMode ? (
          <>
            <Button
              type="button"
              variant="contained"
              color="primary"
              fullWidth
              className={classes.submitButton}
              onClick={handleUpdateProject}
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
        <Button
          type="button"
          variant="contained"
          color="secondary"
          fullWidth
          className={classes.deleteButton}
          onClick={handleDeleteProject}
        >
          Delete
        </Button>
      </div>
      <div>
        <h1>Project Products</h1>
        <FormControl
          style={{ width: "300px", marginBottom: "30px" }}
          className={classes.formControl}
        >
          <InputLabel>Filter Products</InputLabel>
          <Select value={activeFilter} onChange={handleFilterChange}>
            <MenuItem value={true}>Active</MenuItem>
            <MenuItem value={false}>Inactive</MenuItem>
          </Select>
        </FormControl>
        {filteredProducts.length > 0 ? (
          <Grid container spacing={2}>
            {filteredProducts.map((product) => (
              <Products key={product.id} {...product} />
            ))}
          </Grid>
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;
