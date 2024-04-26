import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import NoPageFound from "../../pages/NoPageFound";
import userEvent from "@testing-library/user-event";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("renders NoPageFound component correctly", () => {

  test("displays 'No Page Found' text", () => {
    render(
      <MemoryRouter>
        <NoPageFound />
      </MemoryRouter>
    );
    const noPageFoundElement = screen.getByText("No Page Found")
    expect(noPageFoundElement).toBeInTheDocument();
  });

  test("clicking on click here navigates to previous page", async() => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);
    render(
      <MemoryRouter>
        <NoPageFound />
      </MemoryRouter>
    );
    const clickHereElement = screen.getByText("Click here")
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await userEvent.click(clickHereElement);
    await expect(navigate).toHaveBeenCalled();
  });
});
