import { render, screen } from "../../test-utils"
import { act } from 'react-dom/test-utils';
import React from "react"
import { MemoryRouter } from "react-router-dom"
import DashBoard from "../../pages/DashBoard";

const setupDashboardComponent = () => {
  render(
    <MemoryRouter>
      <DashBoard />
    </MemoryRouter>
  );
};

describe(("dashboard component renders correctly"), () => {
  test("renders Total Tasks text correctly", () => {
    act(() => {
      setupDashboardComponent()
    })
    const totalTextElement = screen.getByText(/Total Tasks/i);
    expect(totalTextElement).toBeInTheDocument();
  })

  test("rendering pending and completed texts correctly", () => {
    act(() => {
      setupDashboardComponent()
    })

    const pendingTextElement = screen.getByText(/Pending/);
    const completedTextElement = screen.getByText(/Completed/)
    expect(pendingTextElement).toBeInTheDocument();
    expect(completedTextElement).toBeInTheDocument();
  })
})