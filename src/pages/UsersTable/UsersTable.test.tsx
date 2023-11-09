import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { UsersTable } from './UsersTable';
import * as userApi from '../../services/http/user';

jest.mock('../../services/http/user');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

const renderComponent = (queryClient: QueryClient) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <UsersTable />
      </MemoryRouter>
    </QueryClientProvider>,
  );
};

describe('UsersTable', () => {
  it('should render correctly', async () => {
    const queryClient = new QueryClient();

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      renderComponent(queryClient);
    });
  });

  it('renders the table with user data', async () => {
    const queryClient = new QueryClient();
    const mockUsers = [
      { id: 1, name: 'User1', email: 'user1@example.com', phone: '123-456-7890', profile: 'Admin'},
      { id: 2, name: 'User2', email: 'user2@example.com', phone: '987-654-3210', profile: 'User' },
    ];
    const getUserMock = jest.spyOn(userApi, 'getUsers').mockImplementation(() => Promise.resolve(mockUsers));
    
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      renderComponent(queryClient);
    });

    await waitFor(() => expect(getUserMock).toBeCalledWith({
      currentPage: "1",
      pageSize: 5,
    }))    

    await screen.findByText('User1');
    await screen.findByText('User2');
  });

  it('should handle pagination and filters correctly', async () => {
    const queryClient = new QueryClient();
    const mockUsers = [
      { id: 1, name: 'User1', email: 'user1@example.com', phone: '123-456-7890', profile: 'Admin' },
      { id: 2, name: 'User2', email: 'user2@example.com', phone: '987-654-3210', profile: 'User' },
      { id: 3, name: 'User3', email: 'user3@example.com', phone: '123-456-7890', profile: 'Admin' },
      { id: 4, name: 'User4', email: 'user4@example.com', phone: '987-654-3210', profile: 'User' },
      { id: 5, name: 'User5', email: 'user5@example.com', phone: '123-456-7890', profile: 'Admin' },
      { id: 6, name: 'User6', email: 'user6@example.com', phone: '987-654-3210', profile: 'User' },
    ];

    const getUserMock = jest.spyOn(userApi, 'getUsers').mockImplementation(() => Promise.resolve(mockUsers));
    
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      renderComponent(queryClient);
    });

    await screen.findByText('Page 1');

    await screen.findByText('User1');
    await screen.findByText('User2');

    await waitFor(() => expect(getUserMock).toBeCalledWith({
      currentPage: "1",
      pageSize: 5,
    }))  

    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    await waitFor(() => expect(getUserMock).toBeCalledWith(
      {
        currentPage: "2",
        pageSize: 5,
      },
    ))  

    await screen.findByText('Page 2');
    await screen.findByText('User6');
    
    const nameFilterInput = screen.getByPlaceholderText('Search by name') as HTMLInputElement;
    fireEvent.change(nameFilterInput, { target: { value: 'User1' } });

    const emailFilterInput = screen.getByPlaceholderText('Search by email') as HTMLInputElement;
    fireEvent.change(emailFilterInput, { target: { value: 'user1@example.com' } });

    await waitFor(() => expect(getUserMock).toBeCalledWith({
      currentPage: "1",
      pageSize: 5,
      name: 'User1',
      email: 'user1@example.com'
    }))    
  });

  it('should redirect to edit page', async () => {
    const queryClient = new QueryClient();
    const { useNavigate } = require('react-router-dom');
    const mockNavigate = jest.fn();
    useNavigate.mockImplementation(() => mockNavigate);

    const mockUsers = [
      { id: 1, name: 'User1', email: 'user1@example.com', phone: '123-456-7890', profile: 'Admin' },
      { id: 2, name: 'User2', email: 'user2@example.com', phone: '987-654-3210', profile: 'User' },
      { id: 3, name: 'User3', email: 'user3@example.com', phone: '123-456-7890', profile: 'Admin' },
      { id: 4, name: 'User4', email: 'user4@example.com', phone: '987-654-3210', profile: 'User' },
      { id: 5, name: 'User5', email: 'user5@example.com', phone: '123-456-7890', profile: 'Admin' },
      { id: 6, name: 'User6', email: 'user6@example.com', phone: '987-654-3210', profile: 'User' },
    ];

    const getUserMock = jest.spyOn(userApi, 'getUsers').mockImplementation(() => Promise.resolve(mockUsers));

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      renderComponent(queryClient);
    });

    const editButton = screen.getByTestId('edit-button-1');
    fireEvent.click(editButton);

    expect(mockNavigate).toHaveBeenCalledWith('/edit-user/1');
  });

  it('should redirect to view page', async () => {
    const queryClient = new QueryClient();
    const { useNavigate } = require('react-router-dom');
    const mockNavigate = jest.fn();
    useNavigate.mockImplementation(() => mockNavigate);

    const mockUsers = [
      { id: 1, name: 'User1', email: 'user1@example.com', phone: '123-456-7890', profile: 'Admin' },
      { id: 2, name: 'User2', email: 'user2@example.com', phone: '987-654-3210', profile: 'User' },
      { id: 3, name: 'User3', email: 'user3@example.com', phone: '123-456-7890', profile: 'Admin' },
      { id: 4, name: 'User4', email: 'user4@example.com', phone: '987-654-3210', profile: 'User' },
      { id: 5, name: 'User5', email: 'user5@example.com', phone: '123-456-7890', profile: 'Admin' },
      { id: 6, name: 'User6', email: 'user6@example.com', phone: '987-654-3210', profile: 'User' },
    ];

    const getUserMock = jest.spyOn(userApi, 'getUsers').mockImplementation(() => Promise.resolve(mockUsers));

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      renderComponent(queryClient);
    });

    const viewButton = screen.getByTestId('view-button-1');
    fireEvent.click(viewButton);

    expect(mockNavigate).toHaveBeenCalledWith('/view-user/1');
  });

  it('should delete a user', async () => {
    const queryClient = new QueryClient();
    const deleteUserMock = jest.spyOn(userApi, 'deleteUser').mockImplementation(() => Promise.resolve());
    const { useNavigate } = require('react-router-dom');
    const mockNavigate = jest.fn();
    useNavigate.mockImplementation(() => mockNavigate);

    const mockUsers = [
      { id: 1, name: 'User1', email: 'user1@example.com', phone: '123-456-7890', profile: 'Admin' },
      { id: 2, name: 'User2', email: 'user2@example.com', phone: '987-654-3210', profile: 'User' },
      { id: 3, name: 'User3', email: 'user3@example.com', phone: '123-456-7890', profile: 'Admin' },
      { id: 4, name: 'User4', email: 'user4@example.com', phone: '987-654-3210', profile: 'User' },
      { id: 5, name: 'User5', email: 'user5@example.com', phone: '123-456-7890', profile: 'Admin' },
      { id: 6, name: 'User6', email: 'user6@example.com', phone: '987-654-3210', profile: 'User' },
    ];

    const getUserMock = jest.spyOn(userApi, 'getUsers').mockImplementation(() => Promise.resolve(mockUsers));

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      renderComponent(queryClient);
    });

    const deleteButton = screen.getByTestId('delete-button-1');
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(deleteUserMock).toHaveBeenCalledWith(1);
    })
  });
});


