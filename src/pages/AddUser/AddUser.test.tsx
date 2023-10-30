import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import * as userApi from '../../services/http/user';
import { AddUser } from './AddUser';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

jest.mock('react-query');
jest.mock('react-toastify');

const renderComponent = (queryClient: QueryClient) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={['/user/1']}>
        <Routes> 
          <Route path="/user/:id" element={<AddUser />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  );
};

describe('AddUser Component', () => {
  it('should render correctly', async () => {
    const queryClient = new QueryClient();

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      renderComponent(queryClient);
    });
  });

  it('calls onSubmit and adds a user successfully', async () => {

    const queryClient = new QueryClient();

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      renderComponent(queryClient);
    });

    const navigate = jest.fn();

    const createUserMock = jest.spyOn(userApi, 'createUser');

    const nameInput = screen.getByPlaceholderText('Name'); 
    const emailInput = screen.getByPlaceholderText('Email');
    const submitButton = screen.getByTestId('submit-button');

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.submit(submitButton);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.submit(screen.getByTestId('submit-button'));
      console.log('submit')
    });

    expect(createUserMock).toHaveBeenCalled();

    expect(navigate).toHaveBeenCalledWith('/');
    expect(queryClient.invalidateQueries).toHaveBeenCalledWith('users');
    expect(toast.success).toHaveBeenCalledWith('User added successfully');

    createUserMock.mockRestore();
  });
});
