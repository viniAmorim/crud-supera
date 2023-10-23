/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { EditUser } from './EditUser';
import { toast } from 'react-toastify';
import '@testing-library/jest-dom/extend-expect';
import { editUser } from '../../services/http/user';

jest.mock('react-query');
jest.mock('react-toastify');

const queryClient = new QueryClient();

describe('EditUser Component', () => {
  it('should display user data when loaded successfully', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john@example.com',
      profile: 'User',
      age: 30,
      phone: '1234567890',
      id: 1,
    };

    queryClient.setQueryData(['user', '1'], userData);

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/user/1']}>
          <Routes>
            <Route path="/user/:id" element={<EditUser />} /> 
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue(userData.name)).toHaveValue('John Doe')
      expect(screen.getByDisplayValue(userData.email)).toHaveValue('john@example.com')
      expect(screen.getByDisplayValue(userData.age)).toHaveValue(30)
    });
  });

  it('calls onSubmit and edits a user successfully', async () => {
    const user = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      profile: 'User',
      age: 30,
      phone: '123-456-7890',
    };

    const navigate = jest.fn();

    // Mocking the user data retrieval
    queryClient.setQueryData(['user', user.id], user);

    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <EditUser />
        </QueryClientProvider>
      </MemoryRouter>
    );

    const nameInput = screen.getByTestId('name-input');
    const emailInput = screen.getByTestId('email-input');
    const submitButton = screen.getByTestId('submit-button');

    // Simulate changes in input fields
    fireEvent.change(nameInput, { target: { value: 'Updated Name' } });
    fireEvent.change(emailInput, { target: { value: 'updated@example.com' } });

    // Mock the editUser function
    //editUser.mockResolvedValue(user);

    // Simulate form submission
    await act(async () => {
      fireEvent.click(submitButton);
    });

    // Check if editUser was called with the updated data
    expect(editUser).toHaveBeenCalledWith({
      id: user.id,
      name: 'Updated Name',
      email: 'updated@example.com',
      profile: 'User',
      age: 30,
      phone: '123-456-7890',
    });

    // Check if the navigation and query invalidation were called
    expect(navigate).toHaveBeenCalledWith('/');
    expect(queryClient.invalidateQueries).toHaveBeenCalledWith('users');
  });
});

