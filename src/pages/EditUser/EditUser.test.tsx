/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import '@testing-library/jest-dom/extend-expect';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as userApi from '../../services/http/user';
import { EditUser } from './EditUser';

jest.mock('react-toastify');

const renderComponent = (queryClient: QueryClient) => {
  return  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={['/user/2']}>
        <Routes>
          <Route path="/user/:id" element={<EditUser />} /> 
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
};

const queryClient = new QueryClient();

describe('EditUser Component', () => {
  it('should render correctly', async () => {
    const queryClient = new QueryClient();

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      renderComponent(queryClient);
    });
  });

  it('should display user data when loaded successfully', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john@example.com',
      profile: 'user',
      age: 67,
      id: 2,
    };

    queryClient.setQueryData(['user', '2'], userData);

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/user/2']}>
          <Routes>
            <Route path="/user/:id" element={<EditUser />} /> 
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue(userData.name)).toHaveValue('John Doe')
      expect(screen.getByDisplayValue(userData.email)).toHaveValue('john@example.com')
    });
  });

  it('calls onSubmit and edits a user successfully', async () => {
    const editUserMock = jest.spyOn(userApi, 'editUser').mockImplementation(() => Promise.resolve());

    const user = {
      id: 2,
      name: 'John Doe',
      email: 'john@example.com',
      profile: 'user',
      phone: '(55) 6 2995-3460',
      age: 67
    };

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      renderComponent(queryClient);
    });

    queryClient.setQueryData(['user', user.id], user);
    
    const nameInput = screen.getByPlaceholderText('Name');
    const emailInput = screen.getByPlaceholderText('Email');
    const profileInput = screen.getByTestId('profile');
    const submitButton = screen.getByTestId('submit-button');
    
    fireEvent.change(nameInput, { target: { value: 'Updated Name' } });
    fireEvent.change(emailInput, { target: { value: 'updated@example.com' } });
    fireEvent.change(profileInput, { target: { value: 'user' } });
    fireEvent.click(submitButton);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.submit(screen.getByTestId('submit-button'));
    });

    expect(editUserMock).toHaveBeenCalledWith({
      id: user.id,
      name: 'Updated Name',
      email: 'updated@example.com',
      profile: 'user',
      phone: '',
      age: 67,
    });

    expect(toast.success).toHaveBeenCalledWith('User edited successfully');
  });
});

