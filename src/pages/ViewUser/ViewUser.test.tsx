/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { MemoryRouter, Route, Routes } from 'react-router-dom'; 
import { ViewUser } from './ViewUser';

jest.mock('react-query', () => ({
  useQuery: jest.fn(),
}));

const renderComponent = (queryClient: QueryClient) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={['/user/1']}>
        <Routes> 
          <Route path="/user/:id" element={<ViewUser />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  );
};

const userData = {
  name: 'John Doe',
  email: 'john@example.com',
  profile: 'User',
  age: 30,
  phone: '1234567890',
  id: 1,
};

describe('ViewUser Component', () => {
  it('should render correctly', async () => {
    const queryClient = new QueryClient();
    queryClient.setQueryData(['user', '1'], userData);

    await act(async () => {
      renderComponent(queryClient);
    });
  });

  it('should display user data when loaded successfully', async () => {
    const queryClient = new QueryClient();
    queryClient.setQueryData(['user', '1'], userData);

    await act(async () => {
      renderComponent(queryClient);
    });

    await waitFor(() => {
      expect(screen.getByText(userData.name)).toBeInTheDocument();
      expect(screen.getByText(userData.email)).toBeInTheDocument();
      expect(screen.getByText(String(userData.age))).toBeInTheDocument();
    });
  });
});
