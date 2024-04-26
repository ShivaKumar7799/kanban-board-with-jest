import React from "react";
import { useNavigate } from "react-router-dom";

function NoPageFound() {
  const navigate = useNavigate();
  return (
    <div className="min-vh-100 bg-dark text-white d-flex justify-content-center align-items-center flex-column">
      <h1>No Page Found</h1>
      <div>
        <button onClick={() => navigate(-1)}>Click here</button> for last
        visited page
      </div>
    </div>
  );
}

export default NoPageFound;
