import { Button } from "@material-ui/core";
import React from "react";
import { useParams } from "react-router-dom";

const ProjectDetail = () => {
  const { projectId } = useParams(); // Retrieve the project ID from the URL

  // Rest of your component code

  return (
    <div>
      <h1>Project Details</h1>
      <p>Project ID: {projectId}</p>
      <Button
        fullWidth
        type="submit"
        variant="contained"
        color="primary"
      >
        Add Product
      </Button>
    </div>
  );
};

export default ProjectDetail;
