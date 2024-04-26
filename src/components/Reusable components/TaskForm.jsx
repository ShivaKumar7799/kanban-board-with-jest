import React, { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";

const TaskForm = ({ todoName, taskFormik }) => {
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <div>
      <button
        className={`btn ${
          todoName === "Create Task" ? "btn-success" : "btn-warning"
        }`}
        onClick={() => setShowEditModal(true)}
      >
        {todoName === "Create Task" ? (
          todoName
        ) : (
          <MdOutlineEdit color="white" size={30} />
        )}
      </button>

      {showEditModal && (
        <div
          className="modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block", background: "rgb(0,0,0,0.5)" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-dark">{todoName}</h5>
                <button
                  type="button"
                  className="close btn btn-secondary"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    setShowEditModal(false);
                    taskFormik.resetForm();
                  } }
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form autoComplete="off" onSubmit={taskFormik.handleSubmit}>
                <div className="modal-body">
                  <div className="d-flex flex-column">
                    <label className="text-dark" htmlFor="taskName">
                      Task Name
                    </label>
                    <input
                      type="text"
                      name="taskName"
                      className="form-control"
                      value={taskFormik.values.taskName}
                      onChange={taskFormik.handleChange}
                      onBlur={taskFormik.handleBlur}
                    />
                    {taskFormik.errors.taskName &&
                      taskFormik.touched.taskName && (
                        <span className="text-danger py-2">
                          {taskFormik.errors.taskName}
                        </span>
                      )}
                  </div>

                  <div className="d-flex flex-column">
                    <label className="text-dark" htmlFor="priority">
                      Priority
                    </label>
                    <select
                      value={taskFormik.values.priority}
                      onChange={taskFormik.handleChange}
                      onBlur={taskFormik.handleBlur}
                      name="priority"
                      className="form-control"
                    >
                      <option value=""> Select</option>
                      <option value="high">High</option>
                      <option value="Medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                    {taskFormik.errors.priority &&
                      taskFormik.touched.priority && (
                        <span className="text-danger py-2">
                          {taskFormik.errors.priority}
                        </span>
                      )}
                  </div>

                  <div className="d-flex flex-column">
                    <label className="text-dark" htmlFor="deadline">
                      Deadline
                    </label>
                    <input
                      type="date"
                      value={taskFormik.values.deadline}
                      onChange={taskFormik.handleChange}
                      onBlur={taskFormik.handleBlur}
                      name="deadline"
                      className="form-control"
                    />
                    {taskFormik.errors.deadline &&
                      taskFormik.touched.deadline && (
                        <span className="text-danger py-2">
                          {taskFormik.errors.deadline}
                        </span>
                      )}
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={() => {
                      setShowEditModal(false)
                      taskFormik.resetForm()
                    } }
                  >
                    Cancel
                  </button>
                  <input
                    type="submit"
                    className="btn btn-primary"
                    value={todoName}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskForm;
