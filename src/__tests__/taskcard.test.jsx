import { render, screen } from "@testing-library/react";
import React from "react";
import TaskCard from "../components/Reusable components/TaskCard";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { reduxStore } from "../redux/store/store";
import { editTaskValidate } from "../components/Reusable components/TaskCard";
import { act } from "react-dom/test-utils";
import {
  handleForward,
  handleBack,
  deleteTask,
  handleDrag,
} from "../components/Reusable components/TaskCard";
import apiService from "../Services/Api Services/ApiServices";
import { saveTasks } from "../redux/features/tasksSlice";

jest.mock("../Services/Api Services/ApiServices", () => ({
  put: jest.fn(),
  delete: jest.fn(),
}));

const dispatch = jest.fn();

describe("task card renders correctly", () => {
  test("task title renders correctly", async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(
        <Provider store={reduxStore}>
          <MemoryRouter>
            <TaskCard task={{ taskName: "task1" }} />
          </MemoryRouter>
        </Provider>
      );
    });
    const taskTitleElement = screen.getByText("task1");
    expect(taskTitleElement).toBeInTheDocument();
  });

  test("showing errors for empty taskName, priority, and deadline", () => {
    const values = {
      taskName: "",
      priority: "",
      deadline: "",
    };

    let errors;
    act(() => {
      errors = editTaskValidate(values);
    });

    expect(errors).toEqual({
      taskName: "Task Name is Mandatory",
      priority: "Priority is Mandatory",
      deadline: "Deadline is Mandatory",
    });
  });

  let updateReduxTasksMock;

  beforeEach(() => {
    updateReduxTasksMock = jest.fn();
    apiService.put.mockResolvedValue();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should move task to next stage and update Redux tasks", async () => {
    const task = { id: 1, taskName: "Task 1", stage: 1 };
    const tasks = [
      { id: 1, taskName: "Task 1", stage: 1 },
      { id: 2, taskName: "Task 2", stage: 1 },
      { id: 3, taskName: "Task 3", stage: 2 },
    ];

    await handleForward(task, tasks, updateReduxTasksMock);

    expect(apiService.put).toHaveBeenCalledWith(`/tasks/${task.id}`, {
      ...task,
      stage: task.stage + 1,
    });
    expect(updateReduxTasksMock).toHaveBeenCalledWith(
      tasks.map((item) =>
        item.taskName === task.taskName
          ? { ...item, stage: item.stage + 1 }
          : item
      )
    );
  });

  test("should move task to previous stage and update Redux tasks", async () => {
    const task = { id: 1, taskName: "Task 1", stage: 1 };
    const tasks = [
      { id: 1, taskName: "Task 1", stage: 1 },
      { id: 2, taskName: "Task 2", stage: 1 },
      { id: 3, taskName: "Task 3", stage: 2 },
    ];

    await handleBack(task, tasks, updateReduxTasksMock);

    expect(apiService.put).toHaveBeenCalledWith(`/tasks/${task.id}`, {
      ...task,
      stage: task.stage - 1,
    });
    expect(updateReduxTasksMock).toHaveBeenCalledWith(
      tasks.map((item) =>
        item.taskName === task.taskName
          ? { ...item, stage: item.stage - 1 }
          : item
      )
    );
  });

  test("should delete the specified task and update tasks array", () => {
    const task = { id: 1, taskName: "Task 1" };
    const tasks = [
      { id: 1, taskName: "Task 1" },
      { id: 2, taskName: "Task 2" },
      { id: 3, taskName: "Task 3" },
    ];
    deleteTask(task, tasks, updateReduxTasksMock);

    expect(updateReduxTasksMock).toHaveBeenCalledWith([
      { id: 2, taskName: "Task 2" },
      { id: 3, taskName: "Task 3" },
    ]);
    expect(apiService.delete).toHaveBeenCalledWith(`/tasks/${task.id}`);
  });

  test("updates the stage of the dragged item to todo and saves the tasks to Redux", async () => {
    const item = {
      id: 1,
      taskName: "Task 1",
      stage: 0,
    };
    const draggedBlock = "todo";

    if (draggedBlock === "todo") {
      item.stage = 1;
    }

    const tasks = [
      { id: 1, taskName: "Task 1", stage: 0 },
      { id: 2, taskName: "Task 2", stage: 1 },
      { id: 3, taskName: "Task 3", stage: 2 },
    ];

    handleDrag(item, draggedBlock, tasks, dispatch);

    await expect(apiService.put).toHaveBeenCalledWith(
      `/tasks/${item.id}`,
      item
    );

    expect(dispatch).toHaveBeenCalledWith(
      saveTasks([
        { id: 1, taskName: "Task 1", stage: 1 },
        { id: 2, taskName: "Task 2", stage: 1 },
        { id: 3, taskName: "Task 3", stage: 2 },
      ])
    );

    expect(item.stage).toBe(1);
  });

  test("updates the stage of the dragged item to backlog and saves the tasks to Redux", async () => {
    const item = {
      id: 1,
      taskName: "Task 1",
      stage: 1,
    };
    const draggedBlock = "backlog";

    if (draggedBlock === "backlog") {
      item.stage = 0;
    }

    const tasks = [
      { id: 1, taskName: "Task 1", stage: 1 },
      { id: 2, taskName: "Task 2", stage: 1 },
      { id: 3, taskName: "Task 3", stage: 2 },
    ];

    handleDrag(item, draggedBlock, tasks, dispatch);

    await expect(apiService.put).toHaveBeenCalledWith(
      `/tasks/${item.id}`,
      item
    );

    expect(dispatch).toHaveBeenCalledWith(
      saveTasks([
        { id: 1, taskName: "Task 1", stage: 0 },
        { id: 2, taskName: "Task 2", stage: 1 },
        { id: 3, taskName: "Task 3", stage: 2 },
      ])
    );

    expect(item.stage).toBe(0);
  });

  test("updates the stage of the dragged item to onGoing and saves the tasks to Redux", async () => {
    const item = {
      id: 1,
      taskName: "Task 1",
      stage: 1,
    };
    const draggedBlock = "onGoing";

    if (draggedBlock === "onGoing") {
      item.stage = 2;
    }

    const tasks = [
      { id: 1, taskName: "Task 1", stage: 1 },
      { id: 2, taskName: "Task 2", stage: 1 },
      { id: 3, taskName: "Task 3", stage: 2 },
    ];

    handleDrag(item, draggedBlock, tasks, dispatch);

    await expect(apiService.put).toHaveBeenCalledWith(
      `/tasks/${item.id}`,
      item
    );

    expect(dispatch).toHaveBeenCalledWith(
      saveTasks([
        { id: 1, taskName: "Task 1", stage: 2 },
        { id: 2, taskName: "Task 2", stage: 1 },
        { id: 3, taskName: "Task 3", stage: 2 },
      ])
    );

    expect(item.stage).toBe(2);
  });

  test("updates the stage of the dragged item to done and saves the tasks to Redux", async () => {
    const item = {
      id: 1,
      taskName: "Task 1",
      stage: 1,
    };
    const draggedBlock = "done";

    if (draggedBlock === "done") {
      item.stage = 3;
    }

    const tasks = [
      { id: 1, taskName: "Task 1", stage: 1 },
      { id: 2, taskName: "Task 2", stage: 1 },
      { id: 3, taskName: "Task 3", stage: 2 },
    ];

    handleDrag(item, draggedBlock, tasks, dispatch);

    await expect(apiService.put).toHaveBeenCalledWith(
      `/tasks/${item.id}`,
      item
    );

    expect(dispatch).toHaveBeenCalledWith(
      saveTasks([
        { id: 1, taskName: "Task 1", stage: 3 },
        { id: 2, taskName: "Task 2", stage: 1 },
        { id: 3, taskName: "Task 3", stage: 2 },
      ])
    );

    expect(item.stage).toBe(3);
  });
});
