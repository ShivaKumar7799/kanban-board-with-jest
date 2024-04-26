import React, { useEffect } from "react";
import NavBar from "../Reusable components/NavBar"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInUser } from "../../redux/features/userSlice";
import { saveTasks } from "../../redux/features/tasksSlice";
import apiService from "../../Services/Api Services/ApiServices";

function ProtectedRoutes({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    const getTasks = () => {
      apiService
        .get(`/tasks`)
        .then((res) => {
          const updatedTasks = res.data.filter(
            (task) => task.email === user?.email
          );
          dispatch(saveTasks(updatedTasks));
        })
        .catch((err) => console.log(err));
    };

    if (user === null) {
      navigate("/");
      return;
    } else {
      getTasks();
      dispatch(signInUser(user));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
}

export default ProtectedRoutes;
