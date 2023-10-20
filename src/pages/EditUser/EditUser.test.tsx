/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { EditUser } from './EditUser';
import { toast } from 'react-toastify';
import '@testing-library/jest-dom/extend-expect';

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

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
});

