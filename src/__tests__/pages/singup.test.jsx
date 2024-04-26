import userEvent from "@testing-library/user-event"
import { render, screen } from "../../test-utils"
import { act } from 'react-dom/test-utils';
import SignUp from "../../pages/SignUp"
import React from "react"
import { MemoryRouter } from "react-router-dom"
import { checkAlreadyRegisterd } from "../../pages/SignUp";
const setupSignUpComponent = () => {
  render(
    <MemoryRouter>
      <SignUp />
    </MemoryRouter>
  );
};

describe("signup component is rendered correctly", () => {
  test("Registration text renders correctly", () => {
    act(() => {
      setupSignUpComponent();
    })
    const registrationTextElement = screen.getByRole("heading",{
      level: 1
    })
    expect(registrationTextElement).toBeInTheDocument();
  })

  test("name input field rendered correctly", () => {
    act(() => {
      setupSignUpComponent();
    })
    const nameInputFieldElement = screen.getByPlaceholderText(/Enter name/i)
    expect(nameInputFieldElement).toBeInTheDocument();
  })

  test("name input field focus on clicking on it", async() => {
    act(() => {
      setupSignUpComponent();
    })
    const nameInputFieldElement = screen.getByPlaceholderText(/Enter name/i);
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act( () => {
      userEvent.click(nameInputFieldElement)
    })
    await expect(nameInputFieldElement).toHaveFocus();
  })

  test("name input validation after entering special characters", async() => {
    act(() => {
      setupSignUpComponent();
    })
    const nameInputFieldElement = screen.getByPlaceholderText(/Enter name/i);
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act( () => {
      userEvent.click(nameInputFieldElement)
    })
    await expect(nameInputFieldElement).toHaveFocus();

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => {
      userEvent.type(nameInputFieldElement, 'aaaaa@12312')
    })
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => {
      userEvent.click(document.body)
    })

    const errorElement = screen.getByText("Invalid name");
    await expect(errorElement).toBeInTheDocument();
  })

  test("username input field renders correctly", async() => {
    act(() => {
      setupSignUpComponent();
    })
    const usernameInputElement = screen.getByPlaceholderText("Enter username");
    await userEvent.click(usernameInputElement);
    expect(usernameInputElement).toHaveFocus();
  })

  test("username input field throwing error after focussing and not entered any value and focus out", async() => {
    act(() => {
      setupSignUpComponent();
    })
    const usernameInputElement = screen.getByPlaceholderText("Enter username");
    await userEvent.click(usernameInputElement);
    expect(usernameInputElement).toHaveFocus();
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => {
      userEvent.click(document.body);
    })
    const errorElement = screen.getByText("userName is Required");
    await expect(errorElement).toBeInTheDocument();
  })

  test('returning true value if user exists in users array', () => {
    const users = [
      { id: 1, email: 'shiva@gmail.com' },
      { id: 2, email: 'shivakumar@gmail.com' },
    ];
    const result = checkAlreadyRegisterd('shivakumar@gmail.com', users);
    expect(result).toBe(true);
  });

  test('returning false value if user does not exists in users array', () => {
    const users = [
      { id: 1, email: 'shiva@gmail.com' },
      { id: 2, email: 'shivakumar@gmail.com' },
    ];
    const result = checkAlreadyRegisterd('shivakumar@123.com', users);
    expect(result).toBe(false);
  });

  test("showing invalid name error if user enters numbers", async() => {
    act(() => {
      setupSignUpComponent();
    })
    const nameInputElement = screen.getByPlaceholderText("Enter name")
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => {
      userEvent.type(nameInputElement, "Shiva1223")
    })
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => {
      userEvent.click(document.body)
    })

    const errorElement = screen.getByText(/Invalid name/i)

    expect(errorElement).toBeInTheDocument();
  })

  test("showing invalid if user enter less than 3 characters", async() => {
    act(() => {
      setupSignUpComponent();
    })
    const usernameInputElement = screen.getByPlaceholderText("Enter username")
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => {
      userEvent.type(usernameInputElement, "sh")
    })
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => {
      userEvent.click(document.body)
    })

    const errorElement = screen.getByText("Invalid username")

    expect(errorElement).toBeInTheDocument();
  })

  test("showing invalid email if user enters invalid email id", async() => {
    act(() => {
      setupSignUpComponent();
    })
    const emailInputElement = screen.getByPlaceholderText("Enter email")
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => {
      userEvent.type(emailInputElement, "shiva")
    })
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => {
      userEvent.click(document.body)
    })

    const errorElement = screen.getByText("Invalid email address")

    expect(errorElement).toBeInTheDocument();
  })

  test("showing error for invalid contact number", async () => {
    act(() => {
      setupSignUpComponent();
    })
    const contactInputElement = screen.getByPlaceholderText("Enter contact number")
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => {
      userEvent.type(contactInputElement, "12323")
    })
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => {
      userEvent.click(document.body);
    })
    const errorElement = screen.getByText("Please Provide Valid Mobile Number")
    expect(errorElement).toBeInTheDocument();
  })

})