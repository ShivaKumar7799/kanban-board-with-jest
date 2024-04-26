import { render, screen, act } from "@testing-library/react";
import React from "react";
import Modal from "../components/Reusable components/Modal";
import userEvent from "@testing-library/user-event";

describe("renders modal component correctly", () => {

  test('renders modal when show is true', async() => {
    render(
      <Modal show={true} title="my Modal" />
    );
    const modal = await screen.findByTestId('modal');
    expect(modal).toBeInTheDocument();
  });

  test('does not render modal when show is false', async() => {
    render(
      <Modal show={false} title="my Modal" />
    );
    const modal = screen.queryByTestId('modal');
    expect(modal).not.toBeInTheDocument();
  });

  test('renders title correctly', async() => {
    render(
      <Modal show={true} title="my Modal" />
    );
    const title = screen.getByText("my Modal")
    expect(title).toBeInTheDocument();
  });

  test('trigger handleClose with false when close button is clicked', async () => {
    const handleClose = jest.fn();
    render(
      <Modal show={true} handleClose={handleClose} />
    );
    const closeButton = screen.getByTestId('closeButton');
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      userEvent.click(closeButton);
    })
    await expect(handleClose).toHaveBeenCalledWith(false);
    const modal = await screen.findByTestId('modal');
    expect(modal).toBeInTheDocument();
  });

  test('trigger handleClose with false when No button is clicked', async () => {
    const handleClose = jest.fn();
    render(
      <Modal show={true} handleClose={handleClose} />
    );
    const closeButton = screen.getByText('No');
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      userEvent.click(closeButton);
    })
    await expect(handleClose).toHaveBeenCalledWith(false);
    const modal = await screen.findByTestId('modal');
    expect(modal).toBeInTheDocument();
  });

  test('trigger handleConfirm and close the modal when clicking on yes button', async () => {
    const handleConfirm = jest.fn();
    render(
      <Modal show={true} handleConfirm={handleConfirm} />
    );
    const yesButton = screen.getByText('Yes');
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      userEvent.click(yesButton);
    })
    await expect(handleConfirm).toHaveBeenCalled();
  });

})