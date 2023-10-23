/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { toast } from 'react-toastify';
import '@testing-library/jest-dom/extend-expect';
import { createUser } from '../../services/http/user';
import { debug } from 'console';
import { AddUser } from './AddUser';

jest.mock('react-query');
jest.mock('react-toastify');

const queryClient = new QueryClient();

describe('AddUser Component', () => {
  it('should render correctly', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Routes>
            <Route element={<AddUser />} /> 
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    screen.debug()
  });

  it('calls onSubmit and adds a user successfully', async () => {
    const queryClient = new QueryClient();
    const navigate = jest.fn();

    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <AddUser />
        </QueryClientProvider>
      </MemoryRouter>
    );

    const nameInput = screen.getByTestId('name-input');
    const emailInput = screen.getByTestId('email-input');
    const submitButton = screen.getByTestId('submit-button');

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.click(submitButton);

    await act(() => Promise.resolve());

    expect(createUser).toHaveBeenCalledWith({ name: 'John Doe', email: 'john@example.com' });

    expect(navigate).toHaveBeenCalledWith('/'); 
    expect(queryClient.invalidateQueries).toHaveBeenCalledWith('users');
    expect(toast.success).toHaveBeenCalledWith('User added successfully');
  });
});

