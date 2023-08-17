import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CardForm from '../Components/CardForm';

test("OnSubmit is called when all fields pass validation", () => {
    render(<CardForm />);
    
    const nameInput = screen.getByPlaceholderText(/Name/i);
    const numberInput = screen.getByPlaceholderText(/Card Number/i);
    const expiryInput = screen.getByPlaceholderText(/MM\/YY expiry/i);
    const cvcInput = screen.getByPlaceholderText(/CVC/i);
    const countryInput = screen.getByPlaceholderText(/Country/i);
    const submitButton = screen.getByRole('button', { name: /Save Card/i });

    userEvent.type(nameInput, 'John Doe');
    userEvent.type(numberInput, '4111111111111111');
    userEvent.type(expiryInput, '12/23');``
    userEvent.type(cvcInput, '123');
    userEvent.type(countryInput, 'USA');
    

    fireEvent.click(submitButton);

    
});
