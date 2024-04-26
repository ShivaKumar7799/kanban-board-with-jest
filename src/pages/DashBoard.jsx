import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

function DashBoard() {
  const tasks = useSelector((state) => state.tasks.totalTasks);
  const completedTasks = useMemo(
    () => tasks.filter((task) => task.stage === 3),
    [tasks]
  );
  const completedTasksCount = completedTasks.length;
  const totalTasksCount = tasks.length;

  const pieData = {
    labels: ["pending", "completed"],
    datasets: [
      {
        data: [totalTasksCount - completedTasksCount, completedTasksCount],
        backgroundColor: ["orange", "green"],
      },
    ],
  };

  return (
    <div className="d-flex justify-content-center mt-5 align-items-center row">
      {totalTasksCount > 0 && (
        <div
          className="col-md-12 col-lg-6"
          style={{ height: "300px", width: "300px" }}
        >
          <Pie data={pieData} />
        </div>
      )}
      <div className="col-md-12 col-lg-6">
        <h1 className="text-center text-primary">
          Total Tasks : {totalTasksCount}
        </h1>
        <h1 className="text-nowrap text-dark  text-center">
          Pending : 
          <span className="text-warning">
            {totalTasksCount - completedTasksCount}
          </span>
          , Completed :
          <span className="text-success"> {completedTasksCount} </span>
        </h1>
      </div>
    </div>
  );
}

export default DashBoard;
