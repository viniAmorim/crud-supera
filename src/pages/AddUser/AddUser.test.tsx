/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AddUser } from './AddUser';
import { toast } from 'react-toastify';
import '@testing-library/jest-dom/extend-expect';

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const queryClient = new QueryClient();

describe('AddUser Component', () => {
  it('should render correctly', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/user/1']}>
          <Routes>
            <Route path="/user/:id" element={<AddUser />} /> 
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );
  });
});

