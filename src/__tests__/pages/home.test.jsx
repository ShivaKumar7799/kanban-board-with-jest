import userEvent from "@testing-library/user-event"
import { render, screen } from "../../test-utils"
import { act } from 'react-dom/test-utils';
import Home from "../../pages/Home"
import React from "react"
import { MemoryRouter } from "react-router-dom"

const setupHomeComponent = () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
};

describe('renders home componenet correctly', () => {

  test('loader component snapshot', () => {
    const { container } = render(<MemoryRouter>
      <Home />
    </MemoryRouter>);
    expect(container).toMatchSnapshot();
  });

  test("display Kanban Board Title correctly", () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      setupHomeComponent()
    })
    const titleElement = screen.getByRole("heading", {
      level: 1
    });
    expect(titleElement).toBeInTheDocument();
  })

  test("render Username/email label correctly", () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      setupHomeComponent()
    })
    const labelElement = screen.getByLabelText(/username\/email/i);
    expect(labelElement).toBeInTheDocument();
  })

  test("render userNameOrEmail input field correctly", () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      setupHomeComponent()
    })
    const userNameOrEmailInputElement = screen.getByRole("textbox", {
      name: "Username/email"
    })
    expect(userNameOrEmailInputElement).toBeInTheDocument();
    expect(userNameOrEmailInputElement).toBeEnabled();
    expect(userNameOrEmailInputElement).toHaveAttribute("type", "text")
  })

  test("render password label correctly", () => {
   // eslint-disable-next-line testing-library/no-unnecessary-act
   act(() => {
    setupHomeComponent()
  })
    const passwordElement = screen.getByText('password*');
    expect(passwordElement).toBeInTheDocument();
  })

  test("renders password input field correctly", () => {
   // eslint-disable-next-line testing-library/no-unnecessary-act
   act(() => {
    setupHomeComponent()
  })
    const passwordInputElement = screen.getByPlaceholderText("Enter your password")
    expect(passwordInputElement).toBeInTheDocument();
    expect(passwordInputElement).toBeEnabled();
    expect(passwordInputElement).toHaveAttribute('type', 'password');
  } )

  test("login button renders correctly", () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      setupHomeComponent()
    })
    const buttonElement = screen.getByRole("button", {
      name: "Login"
    })
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).not.toBeDisabled();
  })

  test("changing username/email and password input field value", async() => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      setupHomeComponent()
    })
    const userNameOrEmailInputElement = screen.getByRole("textbox", {
      name: "Username/email"
    })
    const passwordInputElement = screen.getByPlaceholderText("Enter your password")
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => {
      userEvent.type(userNameOrEmailInputElement, "shiva kumar")
    })
    expect(userNameOrEmailInputElement).toHaveValue("shiva kumar")

     // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => {
      userEvent.type(passwordInputElement, "Shiva@123")
    })
    expect(passwordInputElement).toHaveValue("Shiva@123")
  })

  test("clicking on username/email label should focus input field", async() => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      setupHomeComponent()
    })
    const labelElement = screen.getByLabelText(/username\/email/i);
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => {
      userEvent.click(labelElement)
    })
    const inputElement = screen.getByRole("textbox",{
      name: "Username/email"
    })
    await expect(inputElement).toHaveFocus();
  })

  test("clicking on password label should focus password input field", async() => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      setupHomeComponent()
    })
    const passwordLabelElement = screen.getByText('password*');
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => {
      userEvent.click(passwordLabelElement)
    })
    const passwordInputElement = screen.getByPlaceholderText("Enter your password")
    await expect(passwordInputElement).toHaveFocus();
  })

  test("showinig error when user focus on input field and focussing out without entering the value", async() => {
    act(() => {
      setupHomeComponent();
    })

    const userNameOrEmailInputElement = screen.getByRole("textbox", {
      name: "Username/email"
    })
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => {
      userEvent.click(userNameOrEmailInputElement);
    })
    expect(userNameOrEmailInputElement).toHaveFocus();

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => {
      userEvent.click(document.body)
    })

     expect(userNameOrEmailInputElement).not.toHaveFocus();
     const userNameOrEmailErrorElement = screen.getByText("UserName/email is Mandatory");
     expect(userNameOrEmailErrorElement).toBeInTheDocument();
  })

  test("entering password length less than 8 charcters should show error", async() => {
    act(() => {
      setupHomeComponent();
    })
    const passwordInputElement = screen.getByPlaceholderText("Enter your password");
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => {
      userEvent.type(passwordInputElement,"Shiva")
    })
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => {
      userEvent.click(document.body)
    })
    const passwordErrorElement = screen.getByText("Password should contain minimun 8 characters")
    await expect(passwordErrorElement).toBeInTheDocument();
  })

  test("entering password more than 20 charcters should show error", async() => {
    act(() => {
      setupHomeComponent();
    })
    const passwordInputElement = screen.getByPlaceholderText("Enter your password");
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => {
      userEvent.type( passwordInputElement, "abcdabcdabcdabcdabcda")
    })
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => {
      userEvent.click(document.body)
    });
    const passwordErrorElement = screen.getByText(/contain more than 20 characters/i)
    await expect(passwordErrorElement).toBeInTheDocument();
  })

  test("clicking on showPassword should show hide password text", async() => {
    act(() => {
      setupHomeComponent();
    })
    const showPasswordElement = screen.getByText("show password");
    expect(showPasswordElement).toBeInTheDocument();
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => {
      userEvent.click(showPasswordElement);
    })

    const hidePasswordElement = screen.getByText("hide password")
    expect(hidePasswordElement).toBeInTheDocument();
  })

  test("rendering Don't have account? text correctly", () => {
    act(() => {
      setupHomeComponent();
    } )
    const noAccountExistsElement = screen.getByText("Don't have account?");
    expect(noAccountExistsElement).toBeInTheDocument();
  })

})
