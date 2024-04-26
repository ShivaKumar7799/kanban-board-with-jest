import React, { useState } from "react";
import { taskTypes } from "../Data/TaskTypes";
import TaskCard from "../components/Reusable components/TaskCard";
import TaskForm from "../components/Reusable components/TaskForm";
import Loader from "../components/Dumb components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { saveTasks } from "../redux/features/tasksSlice";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiService from "../Services/Api Services/ApiServices";

export const checkExisted = (taskName,tasks) => {
  const existed = tasks?.some((task) => task.taskName === taskName);
  return existed;
};

function TaskManagement() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const tasks = useSelector((state) => state.tasks.totalTasks);
  const [draggedBlock, setDraggedBlock] = useState("");
  const [loading, setIsLoading] = useState(false);


  const taskValidate = (values) => {
    const errors = {};
    if (!values.taskName) {
      errors.taskName = "TaskName is Mandatory";
    } else if (checkExisted(values.taskName,tasks)) {
      errors.taskName = "Already Existed";
    }
    if (!values.priority) {
      errors.priority = "Priority is Mandatory";
    }
    if (!values.deadline) {
      errors.deadline = "Deadline is Mandatory";
    }
    return errors;
  };

  const taskFormik = useFormik({
    enableReinitialize: true,
    validateOnMount: true,
    initialValues: {
      taskName: "",
      priority: "",
      deadline: "",
    },
    validate: taskValidate,
    onSubmit: (values) => {
      setIsLoading(true);
      dispatch(saveTasks([...tasks, values]));
      taskFormik.resetForm();
      toast.success(`${values.taskName} created`);
      apiService
        .post(`/tasks`, {
          ...values,
          stage: 0,
          email: user.email,
        })
        .then(() =>
          apiService
            .get(`/tasks`)
            .then((res) => {
              const updatedTasks = res.data.filter(
                (task) => task.email === user.email
              );
              dispatch(saveTasks(updatedTasks));
              setIsLoading(false);
            })
            .catch((err) => {
              console.log(err);
              setIsLoading(false);
            })
        );
    },
  });

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="d-flex justify-content-center align-items-center my-2">
            <TaskForm
              todoName="Create Task"
              todoType="Create Task"
              taskFormik={taskFormik}
            />
          </div>
          <div className="row m-0 ">
            {taskTypes.map((type) => (
              <div
                key={type.stage}
                onDragLeave={() => setDraggedBlock(type.stageName)}
                className=" border col-sm-12 col-md-6 col-lg-3 min-vh-100"
              >
                <h2 className="text-center mt-2 p-1 text-white bg-secondary">
                  {type.stageTitle}
                </h2>
                {tasks.filter((task) => task.stage === type.stage).length ===
                  0 && (
                  <h4 className="text-dark text-center">
                    No {type.stageTitle} tasks
                  </h4>
                )}
                <div>
                  {tasks
                    ?.filter((task) => task.stage === type.stage)
                    .map((task) => (
                      <TaskCard
                        key={task.taskName}
                        draggedBlock={draggedBlock}
                        task={task}
                      />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default TaskManagement;
