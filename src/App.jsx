import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AddUser from "./components/User/AddUser";
import Navbar from "./components/Navbar";
import Login from "./components/User/Login";
import Home from "./components/User/Home";
import Project from "./components/Project/Project";
import ProjectDetail from "./components/Project/ProjectDetail";

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
        <Route exact path="/project/:projectId" element={<ProjectDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;