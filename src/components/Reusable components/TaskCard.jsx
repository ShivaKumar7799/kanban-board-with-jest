import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import TaskForm from "./TaskForm";

import { useDispatch, useSelector } from "react-redux";
import { saveTasks } from "../../redux/features/tasksSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import { LuArrowBigLeft, LuArrowBigRight } from "react-icons/lu";
import { MdDeleteForever } from "react-icons/md";
import apiService from "../../Services/Api Services/ApiServices";

export const editTaskValidate = (values) => {
  const errors = {};
  if (values?.taskName === "") {
    errors.taskName = "Task Name is Mandatory";
  }
  if (values?.priority === "") {
    errors.priority = "Priority is Mandatory";
  }
  if (values?.deadline === "") {
    errors.deadline = "Deadline is Mandatory";
  }
  return errors;
};

export const handleForward = (task, tasks, udpateReduxTasks) => {
  const items = tasks.map((item) =>
    item.taskName === task.taskName
      ? { ...item, stage: item.stage + 1 }
      : item
  );
  toast.success(`${task.taskName} moved to next stage `);
  apiService
    .put(`/tasks/${task.id}`, {
      ...task,
      stage: task.stage + 1,
    })
    .catch((err) => console.log("handle forward api failed", err));
  
    udpateReduxTasks(items)
};

export const handleBack = (task, tasks, udpateReduxTasks) => {
  const items = tasks.map((item) =>
    item.taskName === task.taskName
      ? { ...item, stage: item.stage - 1 }
      : item
  );
  toast.success(`${task.taskName} moved to previous stage `);
  apiService
    .put(`/tasks/${task.id}`, {
      ...task,
      stage: task.stage - 1,
    })
    .catch((err) => console.log("handle back api failed", err));
  udpateReduxTasks(items)
};

export const deleteTask = (task, tasks, updateSaveTasks) => {
  const items = tasks?.filter(
    (todoTask) => todoTask.taskName !== task.taskName
  );
  toast.success(`${task.taskName} deleted `);
  updateSaveTasks(items)
  apiService.delete(`/tasks/${task.id}`);
};

export const handleDrag = (item, draggedBlock, tasks, dispatch) => {
  let draggedItem = item;
  switch (draggedBlock) {
    case "backlog": {
      draggedItem = { ...item, stage: 0 };
      break;
    }
    case "todo": {
      draggedItem = { ...item, stage: 1 };
      break;
    }
    case "onGoing": {
      draggedItem = { ...item, stage: 2 };
      break;
    }
    case "done": {
      draggedItem = { ...item, stage: 3 };
      break;
    }
    default: {
      return item;
    }
  }
  const updateDragged = tasks.map((task) =>
    task.taskName === draggedItem.taskName ? draggedItem : task
  );
  toast.success(`${draggedItem.taskName} dragged to ${draggedBlock} `);
  apiService
    .put(`/tasks/${item.id}`, draggedItem)
    .then((res) => {})
    .catch((err) => alert(err));
  dispatch(saveTasks(updateDragged));
};

function TaskCard({ task, draggedBlock }) {
  const [showModel, setShowModel] = useState(false);
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.totalTasks);
  const [editTask, setEditTask] = useState();

  useEffect(() => {
    setEditTask(task);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editTask]);

  const editTodoFormik = useFormik({
    enableReinitialize: true,
    validateOnMount: true,
    initialValues: editTask,
    validate: editTaskValidate,
    onSubmit: (values) => {
      const updatedTasks = tasks.map((task) =>
        task.id === editTodoFormik.values.id ? editTodoFormik.values : task
      );
      toast.success(`${values.taskName} update `);
      dispatch(saveTasks(updatedTasks));
      apiService
        .put(`/tasks/${editTodoFormik.values.id}`, editTodoFormik.values)
        .then((res) => {
          editTodoFormik.resetForm();
          setShowModel(false)
        })
        .catch((err) => alert(err));
    },
  });

  const udpateReduxTasks = (items) => {
    dispatch(saveTasks(items));
  }

  const updateSaveTasks = (items) => {
    dispatch(saveTasks(items));
  }

  return (
    <div>
      <div
        draggable
        onDragEnd={() => handleDrag(task, draggedBlock, tasks, dispatch)}
        className="border card draggable shadow-sm mb-2"
      >
        <div
          className={`text-white card-body p-2 rounded-2 ${
            task.stage === 0
              ? "bg-dark"
              : task.stage === 1
              ? "bg-info"
              : task.stage === 2
              ? "bg-warning"
              : task.stage === 3
              ? "bg-success"
              : ""
          }`}
        >
          <div className="d-flex justify-content-between">
            <div className="card-title">
              <h4 className="text-white">{task.taskName}</h4>
            </div>
          </div>
          <div className="mb-2 d-flex justify-content-between">
            <h6>Priority : {task.priority} </h6>
            <div>{task.deadline}</div>
          </div>
          <div className="d-flex justify-content-around">
            <button
              className="btn btn-sm border-0"
              onClick={() => handleBack(task, tasks, udpateReduxTasks)}
              disabled={task.stage === 0}
            >
              <LuArrowBigLeft color="white" size={30} />
            </button>
            <button
              className={`btn btn-sm border-0 ${
                task.stage === 3 ? "disabled" : ""
              }`}
              onClick={() => handleForward(task, tasks, udpateReduxTasks)}
            >
              <LuArrowBigRight color="white" size={30} />
            </button>
            <span onClick={() => setEditTask(task)}>
              <TaskForm todoName="Edit Todo" taskFormik={editTodoFormik} />
            </span>
            <button
              onClick={() => setShowModel(true)}
              className="btn btn-danger border-0 btn-sm"
            >
              <MdDeleteForever color="white" size={30} />
            </button>
          </div>
        </div>

        <Modal
          handleConfirm={() => {
            deleteTask(task, tasks, updateSaveTasks);
            setShowModel(false);
          }}
          show={showModel}
          handleClose={setShowModel}
          title={`Do you want to delete the ${task.taskName}? `}
        />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={300}
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

export default TaskCard;
