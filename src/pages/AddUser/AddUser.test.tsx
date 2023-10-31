import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as userApi from '../../services/http/user';
import { AddUser } from './AddUser';

jest.mock('react-toastify');

const renderComponent = (queryClient: QueryClient) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <AddUser />
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
    const createUserMock = jest.spyOn(userApi, 'createUser').mockImplementation(() => Promise.resolve());

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      renderComponent(queryClient);
    });

    const nameInput = screen.getByPlaceholderText('Name'); 
    const emailInput = screen.getByPlaceholderText('Email');
    const profileInput = screen.getByTestId('profile');
    const submitButton = screen.getByTestId('submit-button');

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(profileInput, { target: { value: 'admin' } });
    fireEvent.click(submitButton);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.submit(screen.getByTestId('submit-button'));
    });

    await waitFor(() => {
      expect(createUserMock).toHaveBeenCalledWith({
        "age": null,
        "email": "john@example.com",
        "name": "John Doe",
        "phone": "",
        "profile": "admin",
      });
    })

    expect(toast.success).toHaveBeenCalledWith('User added successfully');
  });
});
