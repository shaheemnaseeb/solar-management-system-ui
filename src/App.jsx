import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddUser from "./components/User/AddUser";
import Navbar from "./components/Navbar";
import Login from "./components/User/Login";
import Home from "./components/User/Home";
import Project from "./components/Project/Project";
import ProjectDetail from "./components/Project/ProjectDetail";
import ProductAdd from "./components/Product/ProductAdd";
import ProductDetails from "./components/Product/ProductDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import { Fragment } from "react";

function App() {
  return (
    <>
      <BrowserRouter>
        <Fragment>
          <Navbar />
          <Routes>
            <Route exact path="/signup" element={<AddUser />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/" element={<ProtectedRoute />}>
              <Route exact path="/" element={<Home />} />
            </Route>
            <Route exact path="/projects" element={<ProtectedRoute />}>
              <Route exact path="/projects" element={<Project />} />
            </Route>
            <Route exact path="/products" element={<ProtectedRoute />}>
              <Route exact path="/products" element={<ProductAdd />} />
            </Route>
            <Route
              exact
              path="/project/:projectId"
              element={<ProtectedRoute />}
            >
              <Route
                exact
                path="/project/:projectId"
                element={<ProjectDetail />}
              />
            </Route>
            <Route
              exact
              path="/project/:projectId/product/:productId"
              element={<ProtectedRoute />}
            >
              <Route
                exact
                path="/project/:projectId/product/:productId"
                element={<ProductDetails />}
              />
            </Route>
          </Routes>
        </Fragment>
      </BrowserRouter>
    </>
  );
}

export default App;
