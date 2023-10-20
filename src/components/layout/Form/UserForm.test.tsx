import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { UserForm } from './UserForm';
import '@testing-library/jest-dom/extend-expect';

describe('UserForm Component', () => {
  it('should populate the form with defaultValues', async () => {
    const defaultValues = {
      name: 'John Doe',
      email: 'john@example.com',
      profile: 'User' as 'User',
      age: 30,
      phone: '(12) 3 4567-890',
    };
    
    render(
      <BrowserRouter>
        <UserForm defaultValues={defaultValues} isDisabled={false} onSubmit={jest.fn()} />
      </BrowserRouter>
    );

    const nameInput = await screen.findByPlaceholderText('Name');
    const emailInput = await screen.findByPlaceholderText('Email');

    const phoneInput = await screen.findByPlaceholderText('Phone');
    const ageInput = await screen.findByPlaceholderText('Age');

    expect(nameInput).toHaveValue('John Doe');
    expect(emailInput).toHaveValue('john@example.com');
    const expectedPhone = '(12) 3 4567-890';
    const actualPhone = phoneInput.getAttribute('value')?.replace(/\D/g, ''); // Remove todos os não dígitos
    expect(actualPhone).toEqual(expectedPhone.replace(/\D/g, ''));
    expect(ageInput).toHaveValue(30);
  });

  it('should disable form fields when isDisabled is true', async () => {
    const defaultValues = {
      name: 'John Doe',
      email: 'john@example.com',
      profile: 'User' as 'User', 
      age: 30,
      phone: '(12) 3 4567-890',
    };
    
    render(
      <BrowserRouter>
        <UserForm defaultValues={defaultValues} isDisabled={true} onSubmit={jest.fn()} />
      </BrowserRouter>
    );

    const nameInput = await screen.findByPlaceholderText('Name');
    const emailInput = await screen.findByPlaceholderText('Email');
    const phoneInput = await screen.findByPlaceholderText('Phone');
    const ageInput = await screen.findByPlaceholderText('Age');
    const submitButton = screen.queryByText('Submit');

    expect(nameInput).toBeDisabled();
    expect(emailInput).toBeDisabled();
    expect(phoneInput).toBeDisabled();
    expect(ageInput).toBeDisabled();
    expect(submitButton).not.toBeInTheDocument();
  });
});
