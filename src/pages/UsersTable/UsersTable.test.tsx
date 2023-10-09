import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { UsersTable } from './UsersTable';

jest.mock('../../services/http/user', () => ({
  getUsers: jest.fn(),
}));

describe('UsersTable', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
  });

  it('renders the table with user data', async () => {
    const mockUsers = [
      {
        id: 1,
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '123-456-7890',
        profile: 'User',
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'janesmith@example.com',
        phone: '987-654-3210',
        profile: 'Admin',
      },
    ];

    require('../../services/http/user').getUsers.mockResolvedValue(mockUsers);

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <UsersTable />
        </MemoryRouter>
      </QueryClientProvider>
    );

    await screen.findByText('John Doe');

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  afterEach(() => {
    queryClient.clear();
  });
});
