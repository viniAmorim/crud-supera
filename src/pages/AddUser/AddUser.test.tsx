import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { AddUser } from './AddUser';
import { useMutation, useQueryClient } from 'react-query';

// Mock the useMutation and useQueryClient functions
jest.mock('react-query');
const mockUseMutation = useMutation as jest.Mock;
const mockUseQueryClient = useQueryClient as jest.Mock;

describe('AddUser', () => {
  it('renders the form correctly', () => {
    render(
      <MemoryRouter>
        <AddUser />
      </MemoryRouter>
    );

    expect(screen.getByText('Add User')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Profile')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone')).toBeInTheDocument();
    expect(screen.getByLabelText('Age')).toBeInTheDocument();
    expect(screen.getByText('Back')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  it('validates and submits the form', async () => {
    const mockMutate = jest.fn();
    mockUseMutation.mockReturnValue({ mutate: mockMutate });

    render(
      <MemoryRouter>
        <AddUser />
      </MemoryRouter>
    );

    userEvent.type(screen.getByLabelText('Name'), 'John');
    userEvent.type(screen.getByLabelText('Email'), 'john@example.com');
    userEvent.selectOptions(screen.getByLabelText('Profile'), 'Admin');
    userEvent.type(screen.getByLabelText('Phone'), '123-456-7890');
    userEvent.type(screen.getByLabelText('Age'), '30');

    fireEvent.click(screen.getByText('Save'));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith({
        id: expect.any(Number), // You may want to mock this value
        name: 'John',
        email: 'john@example.com',
        profile: 'Admin',
        phone: '123-456-7890',
        age: 30,
      });
    });
  });

  it('handles form validation errors', async () => {
    render(
      <MemoryRouter>
        <AddUser />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Save'));

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(screen.getByText('Profile is required')).toBeInTheDocument();
    });
  });

  it('navigates back when the "Back" button is clicked', () => {
    const mockNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => mockNavigate,
    }));

    render(
      <MemoryRouter>
        <AddUser />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Back'));

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
