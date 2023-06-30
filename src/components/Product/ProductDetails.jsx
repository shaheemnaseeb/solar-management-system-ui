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
  resetProductError,
  updateProduct,
} from "../../actions/productAction";
import Spinner from "../Shared/Spinner";
import {
  MapContainer as Map,
  TileLayer,
  Marker,
  useMapEvents,
} from "react-leaflet";
import {
  createReport,
  getReport,
  resetReportError,
} from "../../actions/reportAction";
import ReportGraph from "../Report/ReportGraph";
import { toast } from "react-toastify";

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

  const porject_products = useSelector(
    (state) => state.product.project_products
  );
  const userid = useSelector((state) => state.user.user.id);
  const report = useSelector((state) => state.report.report);
  const loading = useSelector((state) => state.report.loading);
  const error = useSelector((state) => state.report.error);
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
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const classes = useStyles();

  const findProductById = (productId) => {
    const product = porject_products?.find(
      (prod) => prod.id === Number(productId)
    );
    return product;
  };

  useEffect(() => {
    getProductReportData(productId);
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
      active: product?.active,
    });
    // eslint-disable-next-line
  }, [porject_products, userid, productId]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleMapClick = (event) => {
    const { lat, lng } = event.latlng;
    if (!formData?.active === false) {
      setFormData({
        ...formData,
        latitude: lat,
        longitude: lng,
      });
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetProductError());
      dispatch(resetReportError());
      dispatch(resetProductError());
    } else if (error === null && formSubmitted) {
      toast.success(toastMessage);
      setFormSubmitted(false);
    }
    // eslint-disable-next-line
  }, [error, formSubmitted]);

  function LocationMarker() {
    useMapEvents({
      click: handleMapClick,
    });

    return <Marker position={[formData?.latitude, formData?.longitude]} />;
  }

  const getProjectProducts = async (projectId) => {
    await dispatch(getProductsbyProjectId(projectId));
  };

  const getProductReportData = async (productId) => {
    await dispatch(getReport(Number(productId)));
  };

  const handleUpdateProduct = async () => {
    await dispatch(updateProduct(productId, formData));
    getProjectProducts(projectId);
    setFormSubmitted(true);
    setToastMessage("Product updated successfully");
    navigate(`/project/${projectId}/product/${productId}`);
  };

  const handleDeleteProduct = () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(productId));
      getProjectProducts(projectId);
      toast.success("Product deleted successfully");
      navigate(`/project/${projectId}`);
    }
  };

  const handleGenerateReport = async () => {
    await dispatch(createReport(userid, Number(productId)));
    getProjectProducts(projectId);
    setFormSubmitted(true);
    setToastMessage("Report generated successfully");
    navigate(`/project/${projectId}/product/${productId}`);
  };

  if (loading) return <Spinner />;

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
            disabled={!formData?.active}
          />
          <TextField
            className={classes.input}
            label="Orientation"
            variant="outlined"
            name="orientation"
            value={formData?.orientation}
            onChange={handleInputChange}
            fullWidth
            disabled={!formData?.active}
          />
          <TextField
            className={classes.input}
            label="Tilt"
            variant="outlined"
            name="tilt"
            value={formData?.tilt}
            onChange={handleInputChange}
            fullWidth
            disabled={!formData?.active}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* Render the map here */}
          <div style={{ height: "200px", width: "100%" }}>
            <Map
              center={[formData?.latitude, formData?.longitude]}
              zoom={5}
              style={{ height: "32vh" }}
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

      {!formData?.active ? (
        report?.length === 0 ? (
          <div> No report generated yet </div>
        ) : (
          <div>
            <ReportGraph report={report} />
          </div>
        )
      ) : (
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
            color="default"
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
      )}
    </div>
  );
};

export default ProductDetails;
