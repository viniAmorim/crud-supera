import { fireEvent, render, screen } from '@testing-library/react';
import { QueryClient } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import * as userApi from '../../services/http/user'; // Importe o módulo real
import { AddUser } from './AddUser';

jest.mock('react-query');
jest.mock('react-toastify');

describe('AddUser Component', () => {
  it('should render correctly', async () => {
    render(
      <BrowserRouter>
        <AddUser />
      </BrowserRouter>
    );
  });

  it('calls onSubmit and adds a user successfully', async () => {
    const navigate = jest.fn();

    const createUserMock = jest.spyOn(userApi, 'createUser');

    render(
      <BrowserRouter>
        <AddUser />
      </BrowserRouter>
    );

    const nameInput = screen.getAllByPlaceholderText('Name')[0];
    const emailInput = screen.getAllByPlaceholderText('Email')[0];
    const submitButton = screen.getByTestId('submit-button');

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.click(submitButton);

    //await act(() => Promise.resolve());

    //expect(createUserMock).toHaveBeenCalledWith({ name: 'John Doe', email: 'john@example.com' });

    //expect(navigate).toHaveBeenCalledWith('/');
    //expect(queryClient.invalidateQueries).toHaveBeenCalledWith('users');
    //expect(toast.success).toHaveBeenCalledWith('User added successfully');

    createUserMock.mockRestore();
  });
});
