import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CardForm from '../Components/CardForm';

test("Form is rendered correctly", () => {
    render(<CardForm />);
    
  expect(screen.getByPlaceholderText(/Name/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Card Number/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/MM\/YY expiry/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/CVC/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Country/i)).toBeInTheDocument();
  expect(screen.getByRole('button',{name: /SAVE CARD/i})).toBeInTheDocument();

});

test("When form is submitted input fields are reset", () =>{
  render(<CardForm />);
  const nameInput = screen.getByPlaceholderText(/Name/i);
  const numberInput = screen.getByPlaceholderText(/Card Number/i);
  const expiryInput = screen.getByPlaceholderText(/MM\/YY expiry/i);
  const cvcInput = screen.getByPlaceholderText(/CVC/i);
  const countryInput = screen.getByPlaceholderText(/Country/i);
  const submitButton = screen.getByRole('button', { name: /SAVE CARD/i });

  userEvent.type(nameInput, 'John Doe');
  userEvent.type(numberInput, '4111111111111111');
  userEvent.type(expiryInput, '12/23');
  userEvent.type(cvcInput, '123');
  userEvent.type(countryInput, 'USA');

  fireEvent.click(submitButton);
  expect(nameInput).toHaveValue('');
  expect(numberInput).toHaveValue('');
  expect(expiryInput).toHaveValue('');
  expect(cvcInput).toHaveValue('');
  expect(countryInput).toHaveValue('');
});

// test("Invalid card number displays error message", () =>{
//   render(<CardForm />);
//   const nameInput = screen.getByPlaceholderText(/Name/i);
//   const numberInput = screen.getByPlaceholderText(/Card Number/i);
//   const expiryInput = screen.getByPlaceholderText(/MM\/YY expiry/i);
//   const cvcInput = screen.getByPlaceholderText(/CVC/i);
//   const countryInput = screen.getByPlaceholderText(/Country/i);
//   const submitButton = screen.getByRole('button', { name: /SAVE CARD/i });

//   userEvent.type(nameInput, 'John Doe');
//   userEvent.type(numberInput, '4111111111111111');
//   userEvent.type(expiryInput, '12/23');
//   userEvent.type(cvcInput, '123');
//   userEvent.type(countryInput, 'USA');

//   fireEvent.click(submitButton);
//   expect(screen.getByText(/Card number must be a 16-digits number/i)).toBeInTheDocument();
// });

// test("Banned country displays alert message", () =>{
//   render(<CardForm />);
//   const nameInput = screen.getByPlaceholderText(/Name/i);
//   const numberInput = screen.getByPlaceholderText(/Card Number/i);
//   const expiryInput = screen.getByPlaceholderText(/MM\/YY expiry/i);
//   const cvcInput = screen.getByPlaceholderText(/CVC/i);
//   const countryInput = screen.getByPlaceholderText(/Country/i);
//   const submitButton = screen.getByRole('button', { name: /SAVE CARD/i });

//   userEvent.type(nameInput, 'John Doe');
//   userEvent.type(numberInput, '4111111111111111');
//   userEvent.type(expiryInput, '12/23');
//   userEvent.type(cvcInput, '123');
//   userEvent.type(countryInput, 'USA');
//   fireEvent.click(submitButton);

//   expect(screen.getByText(/Sorry, you have added a card from a banned country. Therefore, your card cannot be added./i)).toBeInTheDocument();
// });

// test("Invalid expiry date displays error message", () =>{
//   render(<CardForm />);

//   const expiryInput = screen.getByPlaceholderText(/MM\/YY expiry/i);
//   const submitButton = screen.getByRole('button', { name: /SAVE CARD/i });

//   userEvent.type(expiryInput, '01/20');
//   fireEvent.click(submitButton);

//   expect(screen.getByText(/Expiry date is required/i)).toBeInTheDocument();

// });
