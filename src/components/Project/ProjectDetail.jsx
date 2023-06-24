import {
  Card,
  CardContent,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getProductsbyProjectId } from "../../actions/productAction";
import { MapContainer as Map, TileLayer, Marker, Popup } from "react-leaflet";

const useStyles = makeStyles((theme) => ({
  card: {
    width: "250px",
    marginBottom: theme.spacing(2),
    cursor: "pointer",
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
            Power peak : {product?.product?.power} Wp
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Orientation(N/E/S/W) : {product.orientation}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Inclination/tilt : {product.tilt}°
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Area (m²) : {product.area}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );

  return (
    <div>
      <h1>Project Details</h1>
      <p>
        <strong>Project ID:</strong> {projectId}
      </p>
      <p>
        <strong>Name:</strong> {project?.name}
      </p>
      <p>
        <strong>Description:</strong> {project?.description}
      </p>
      <p>
        <strong>Status:</strong> {project?.status ? "Active" : "Inactive"}
      </p>
      <p>
        <strong>Created At:</strong> {project?.createdAt}
      </p>
      {products ? (
        <Grid container spacing={2}>
          {products?.map((product) => (
            <Products key={product.id} {...product} />
          ))}
        </Grid>
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
};

export default ProjectDetail;
