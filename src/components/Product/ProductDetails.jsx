import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Typography,
  TextField,
  Button,
  Grid,
  makeStyles,
} from "@material-ui/core";
import {
  deleteProduct,
  getProductsbyProjectId,
  updateProduct,
} from "../../actions/productAction";
import Spinner from "../Shared/Spinner";
import {
  MapContainer as Map,
  TileLayer,
  Marker,
  useMapEvents,
} from "react-leaflet";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
  },
  input: {
    marginBottom: theme.spacing(2),
  },
  buttonGroup: {
    marginTop: theme.spacing(2),
  },
}));

const ProductDetails = () => {
  const { productId } = useParams();
  const { projectId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  //   const product = useSelector((state) => state.product.product);
  const porject_products = useSelector(
    (state) => state.product.project_products
  );
  const [formData, setFormData] = useState({
    area: "",
    latitude: 0,
    longitude: 0,
    orientation: "",
    tilt: "",
  });
  const [product, setProduct] = useState({
    name: "",
    power: "",
  });
  const classes = useStyles();

  const findProductById = (productId) => {
    const product = porject_products?.find(
      (prod) => prod.id === Number(productId)
    );
    return product;
  };

  useEffect(() => {
    const product = findProductById(productId);
    setProduct({
      name: product?.product.name,
      power: product?.product.power,
    });
    setFormData({
      area: product?.area,
      latitude: product?.latitude,
      longitude: product?.longitude,
      orientation: product?.orientation,
      tilt: product?.tilt,
    });
  }, [porject_products]);

  const handleInputChange = (event) => {
    console.log(event.target.value);
  };

  const handleMapClick = (event) => {
    const { lat, lng } = event.latlng;
    setFormData({
      ...formData,
      latitude: lat,
      longitude: lng,
    });
  };

  function LocationMarker() {
    useMapEvents({
      click: handleMapClick,
    });

    return <Marker position={[formData?.latitude, formData?.longitude]} />;
  }

  const getProjectProducts = async (projectId) => {
    await dispatch(getProductsbyProjectId(projectId));
  };

  const handleUpdateProduct = () => {
    dispatch(updateProduct(productId, formData));
    getProjectProducts(projectId);
    navigate(`/project/${projectId}/product/${productId}`);
  };

  const handleDeleteProduct = () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(productId));
      getProjectProducts(projectId);
      navigate(`/project/${projectId}`);
    }
  };

  const handleGenerateReport = () => {};

  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Product Details
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Product ID:</strong> {productId}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Name:</strong> {product?.name}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Power:</strong> {product?.power}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            className={classes.input}
            label="Area"
            variant="outlined"
            name="area"
            value={formData?.area}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            className={classes.input}
            label="Orientation"
            variant="outlined"
            name="orientation"
            value={formData?.orientation}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            className={classes.input}
            label="Tilt"
            variant="outlined"
            name="tilt"
            value={formData?.tilt}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* Render the map here */}
          <div style={{ height: "200px", width: "100%" }}>
            <Map
              center={[formData?.latitude, formData?.longitude]}
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
        </Grid>
      </Grid>

      <div className={classes.buttonGroup}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdateProduct}
        >
          Update
        </Button>
        <Button
          variant="contained"
          color="sucqcess"
          onClick={handleGenerateReport}
        >
          Generate Report
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleDeleteProduct}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default ProductDetails;
