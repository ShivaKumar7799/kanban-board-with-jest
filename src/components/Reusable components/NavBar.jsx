import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { signInUser } from "../../redux/features/userSlice";
import Modal from "./Modal";
import useLocalStorage from "../../Hooks/UseLocalStorage";

function NavBar() {
  const [user] = useLocalStorage("user");
  const [showModel, setShowModel] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    dispatch(
      signInUser({
        email: "",
        password: "",
      })
    );
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="bg-dark d-flex py-3 justify-content-between align-items-center">
      <div className="d-flex flex-row">
        <div className="mx-3">
          <Link to="/dashBoard" className="text-decoration-none ">
            <span
              className={`${
                location.pathname === "/dashBoard"
                  ? "text-primary"
                  : "text-white"
              } `}
            >
              DashBoard
            </span>
          </Link>
        </div>
        <div>
          <Link to="/taskManagement" className="text-decoration-none ">
            <span
              className={`${
                location.pathname === "/taskManagement"
                  ? "text-primary"
                  : "text-white"
              } `}
            >
              Task Management
            </span>
          </Link>
        </div>
      </div>
      <div>
        <button
          onClick={() => setShowModel(true)}
          className="btn btn-primary mx-3"
        >
          Logout
        </button>
      </div>
      <Modal
        handleConfirm={logout}
        show={showModel}
        handleClose={setShowModel}
        title={` ${user?.name} Do you want to logout?`}
      />
    </div>
  );
}

export default NavBar;
