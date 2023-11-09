/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import '@testing-library/jest-dom/extend-expect';
import { act, render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ViewUser } from './ViewUser';

jest.mock('react-toastify');

const renderComponent = (queryClient: QueryClient) => {
  return  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={['/user/2']}>
        <Routes>
          <Route path="/user/:id" element={<ViewUser />} /> 
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
};

const queryClient = new QueryClient();

describe('ViewUser Component', () => {
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
            <Route path="/user/:id" element={<ViewUser />} /> 
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    const nameInput = await screen.findByPlaceholderText('Name');
    const emailInput = await screen.findByPlaceholderText('Email');
    const phoneInput = await screen.findByPlaceholderText('Phone');
    const ageInput = await screen.findByPlaceholderText('Age');

    expect(nameInput).toBeDisabled();
    expect(emailInput).toBeDisabled();
    expect(phoneInput).toBeDisabled();
    expect(ageInput).toBeDisabled();

    await waitFor(() => {
      expect(screen.getByDisplayValue(userData.name)).toHaveValue('John Doe')
      expect(screen.getByDisplayValue(userData.email)).toHaveValue('john@example.com')
    });
  });
});

