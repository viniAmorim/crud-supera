/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { MemoryRouter, Route, useParams } from 'react-router-dom'; // Importe useParams
import { ViewUser } from './ViewUser';

jest.mock('react-query', () => ({
  useQuery: jest.fn(),
}));

const userData = {
  name: 'John Doe',
  email: 'john@example.com',
  profile: 'User',
  age: 30,
  phone: '1234567890',
  id: 1,
};

describe('ViewUser Component', () => {
  it('should display user data when loaded successfully', async () => {
    const userId = '1';
    render(
      <MemoryRouter initialEntries={[`/user/${userId}`]}> 
        <QueryClientProvider client={new QueryClient()}>
          <Route path="/user/:id">
            <ViewUser />
          </Route>
        </QueryClientProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(userData.name)).toBeInTheDocument();
      expect(screen.getByText(userData.email)).toBeInTheDocument();
      expect(screen.getByText(String(userData.age))).toBeInTheDocument();
    });
  });
});
