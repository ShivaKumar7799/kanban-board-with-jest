import { render, screen } from "@testing-library/react";
import NavBar from "../components/Reusable components/NavBar";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { reduxStore } from "../redux/store/store";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

const setUpNavBarComponent = () => {
  render(
    <Provider store={reduxStore}>
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    </Provider>
  );
};

const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};
global.localStorage = mockLocalStorage;

describe("navbar component renders correctly", () => {
  test("dashboard text renders correctly", () => {
    setUpNavBarComponent();
    const dashBoardElement = screen.getByText("DashBoard");
    expect(dashBoardElement).toBeInTheDocument();
  });
  test("task management text renders correctly", () => {
    setUpNavBarComponent();
    const dashBoardElement = screen.getByText("Task Management");
    expect(dashBoardElement).toBeInTheDocument();
  });
  test("logout button renders correctly", () => {
    setUpNavBarComponent();
    const logoutButtonElement = screen.getByRole("button", {
      name: "Logout",
    });
    expect(logoutButtonElement).toBeInTheDocument();
  });

  test("showing logout modal component on clicking of logout button", async() => {
    setUpNavBarComponent();
    const logoutButtonElement = screen.getByRole("button", {
      name: "Logout",
    });
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => {
      userEvent.click(logoutButtonElement);
    })
    const logoutModal = screen.getByTestId("modal");
    expect(logoutModal).toBeInTheDocument();
  })

  test("clearing user data on clicking on logout button", async () => {
    render(<Provider store={reduxStore} >
      <MemoryRouter>
        <NavBar />  
      </MemoryRouter>
    </Provider>)

    const logoutButton = screen.getByRole("button", {
      name: "Logout"
    })

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => {
      userEvent.click(logoutButton)
    })

    expect(reduxStore.getState().user).toEqual({
      "email": "",
      "password": ""
    });

  })

});
