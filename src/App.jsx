import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddUser from "./components/User/AddUser";
import Navbar from "./components/Navbar";
import Login from "./components/User/Login";
import Home from "./components/User/Home";
import Project from "./components/Project/Project";
import ProjectDetail from "./components/Project/ProjectDetail";
import ProductAdd from "./components/Product/ProductAdd";
import ProductDetails from "./components/Product/ProductDetails";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signup" element={<AddUser />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/projects" element={<Project />}></Route>
          <Route path="/products" element={<ProductAdd />} />
          <Route path="/project/:projectId" element={<ProjectDetail />} />
          <Route path="/project/:projectId/product/:productId" element={<ProductDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
