import React from "react";

function Loader() {
  return (
    <div className="position-fixed w-100 z-index min-vh-100 d-flex justify-content-center align-items-center">
      <span className="loader"></span>
    </div>
  );
}

export default Loader;
