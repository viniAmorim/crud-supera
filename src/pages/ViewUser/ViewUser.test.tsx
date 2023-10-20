/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ViewUser } from './ViewUser';
// setupTests.js
import '@testing-library/jest-dom/extend-expect';

const queryClient = new QueryClient();

describe('ViewUser Component', () => {
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
            <Route path="/user/:id" element={<ViewUser />} /> 
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue(userData.name)).toHaveValue('John Doe')
      expect(screen.getByDisplayValue(userData.email)).toHaveValue('john@example.com')
      expect(screen.getByDisplayValue(userData.profile)).toHaveValue('User')
      expect(screen.getByDisplayValue(userData.age)).toHaveValue(30)
    });
  });
});
