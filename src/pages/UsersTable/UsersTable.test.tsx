import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UsersTable } from './UsersTable';
import { getUsers, deleteUser } from '../../services/http/user';

const queryClient = new QueryClient();

jest.mock('../../services/http/user', () => ({
  getUsers: jest.fn(),
  deleteUser: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

test('renderiza a tabela de usuários corretamente', async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <UsersTable />
    </QueryClientProvider>
  )

  await waitFor(() => {
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
  });
});

test('renderiza os filtros de pesquisa corretamente', async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <UsersTable />
    </QueryClientProvider>
  );

  await waitFor(() => {
    const searchByName = screen.getByPlaceholderText('Search by name');
    const searchByEmail = screen.getByPlaceholderText('Search by email');
    const searchButton = screen.getByRole('button', { name: 'Search' });

    expect(searchByName).toBeInTheDocument();
    // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
    expect(searchByEmail).toBeInTheDocument();
    // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
    expect(searchButton).toBeInTheDocument();
  });
});

test('executa a pesquisa ao clicar no botão de pesquisa', async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <UsersTable />
    </QueryClientProvider>
  );

  const searchByName = screen.getByPlaceholderText('Search by name');
  const searchByEmail = screen.getByPlaceholderText('Search by email');

  fireEvent.change(searchByName, { target: { value: 'John' } });
  fireEvent.change(searchByEmail, { target: { value: 'john@example.com' } });

  const searchButton = screen.getByRole('button', { name: 'Search' });
  fireEvent.click(searchButton);

  await waitFor(() => {
    expect(getUsers).toHaveBeenCalledWith(1, 5, 'John', 'john@example.com');
  });
});

test('executa a paginação corretamente', async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <UsersTable />
    </QueryClientProvider>
  );

  const nextPageButton = screen.getByRole('button', { name: 'Next' });
  fireEvent.click(nextPageButton);

  await waitFor(() => {
    expect(getUsers).toHaveBeenCalledWith(2, 5, '', '');
  });

  const previousPageButton = screen.getByRole('button', { name: 'Previous' });
  fireEvent.click(previousPageButton);

  await waitFor(() => {
    expect(getUsers).toHaveBeenCalledWith(1, 5, '', '');
  });
});

test('executa a exclusão de usuário corretamente', async () => {
  const user = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    profile: 'User',
  };

  render(
    <QueryClientProvider client={queryClient}>
      <UsersTable />
    </QueryClientProvider>
  );

  const deleteButton = screen.getByRole('button', { name: 'Delete' });
  fireEvent.click(deleteButton);

  await waitFor(() => {
    expect(deleteUser).toHaveBeenCalledWith(user.id);
  });
});
