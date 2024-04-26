import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TaskManagement from "../../pages/TaskManagement";
import { Provider } from "react-redux";
import { reduxStore } from "../../redux/store/store";
import { act } from "react-dom/test-utils";
import { checkExisted } from "../../pages/TaskManagement";

describe("renders NoPageFound component correctly", () => {

  test("renders task management app correctly", async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => {
      render(
        <Provider store={reduxStore} >
          <MemoryRouter>
          <TaskManagement />
        </MemoryRouter>
        </Provider>
      );
    })
    const createTaskButton = screen.getByText(/create task/i)
    expect(createTaskButton).toBeInTheDocument();
  });

  test('returns true if taskName exists in tasks', () => {
    const tasks = [
      { id: 1, taskName: 'Task 1' },
      { id: 2, taskName: 'Task 2' },
      { id: 3, taskName: 'Task 3' },
    ];
    const taskName = 'Task 2';
    const result = checkExisted(taskName,tasks);

    expect(result).toBe(true);
  });

});