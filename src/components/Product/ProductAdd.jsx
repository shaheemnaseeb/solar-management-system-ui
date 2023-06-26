import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  FormControl,
  Select,
  MenuItem,
  TextField,
  makeStyles,
} from "@material-ui/core";
import {
  MapContainer as Map,
  TileLayer,
  Marker,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProjects } from "../../actions/projectAction";
import { addProduct, getProducts } from "../../actions/productAction";

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(2),
    flex: 1,
    flexDirection: "column",
  },
  formControl: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
    minWidth: 200,
  },
  mapContainer: {
    height: 10,
    marginBottom: theme.spacing(2),
  },
  addButton: {
    marginTop: theme.spacing(2),
  },
  verticalForm: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
  },
}));

const ProductAdd = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const projects = useSelector((state) => state.project.projects);
  const products = useSelector((state) => state.product.products);
  const [product, setProduct] = useState({
    area: "",
    latitude: 0,
    longitude: 0,
    orientation: "",
    productId: "",
    projectId: "",
    tilt: "",
    userId: "",
    active: true,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        await dispatch(getProjects(user.id));
      } catch (error) {
        console.log("Error fetching projects:", error);
      }
    };
    const fetchProducts = async () => {
      try {
        await dispatch(getProducts());
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };
    fetchProjects();
    fetchProducts();
    // eslint-disable-next-line
  }, [user]);

  const handleAddProduct = async (e) => {
    product.userId = user.id;
    e.preventDefault();
    await dispatch(addProduct(product));
    navigate(`/project/${product.projectId}`);
  };

  const handleMapClick = (event) => {
    const { lat, lng } = event.latlng;
    setProduct((prevProduct) => ({
      ...prevProduct,
      latitude: lat,
      longitude: lng,
    }));
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setProduct({
      ...product,
      [e.target.name]: value,
    });
  };

  function LocationMarker() {
    useMapEvents({
      click: handleMapClick,
    });

    return <Marker position={[product.latitude, product.longitude]} />;
  }

  return (
    <div>
      <div>
        <h1>Product Add</h1>
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body2">
                    Power: {product.power}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
      <form>
        <div className={classes.verticalForm}>
          <FormControl className={classes.formControl}>
            <Select
              value={product.productId}
              onChange={handleChange}
              displayEmpty
              name="productId"
            >
              <MenuItem value="" disabled>
                Select Product
              </MenuItem>
              {products.map((product) => (
                <MenuItem key={product.id} value={product.id}>
                  {product.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <Select
              value={product.projectId}
              onChange={handleChange}
              name="projectId"
              displayEmpty
            >
              <MenuItem value="" disabled>
                Select Project
              </MenuItem>
              {projects.map((project) => (
                <MenuItem key={project.id} value={project.id}>
                  {project.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Area"
            variant="outlined"
            value={product.area}
            name="area"
            onChange={handleChange}
            className={classes.formControl}
          />
          <TextField
            label="Orientation"
            variant="outlined"
            value={product.orientation}
            name="orientation"
            onChange={handleChange}
            className={classes.formControl}
          />
          <TextField
            label="Tilt"
            variant="outlined"
            value={product.tilt}
            name="tilt"
            onChange={handleChange}
            className={classes.formControl}
          />
          <div style={{ height: "50vh" }}>
            <Map
              center={[product.latitude, product.longitude]}
              zoom={5}
              style={{ height: "50vh" }}
              onclick={handleMapClick}
            >
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <LocationMarker />
            </Map>
          </div>
          <Button
            variant="contained"
            color="primary"
            className={classes.addButton}
            onClick={handleAddProduct}
          >
            Add
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductAdd;
