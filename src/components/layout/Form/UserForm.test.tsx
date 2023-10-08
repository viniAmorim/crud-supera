import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { useForm } from 'react-hook-form';
import { UserForm } from './UserForm';

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

function renderWithForm(defaultValues: { name?: string; email?: string; profile?: string; age?: number | null; phone?: string; }, isDisabled: boolean) {
  const Wrapper = () => {
    const form = useForm({ defaultValues });
    return <UserForm defaultValues={{
      name: undefined,
      email: undefined,
      profile: undefined,
      age: undefined,
      phone: undefined
    }} isDisabled={isDisabled} {...form} />;
  };

  return render(<Wrapper />);
}

describe('UserForm', () => {
  it('renderiza corretamente', () => {
    renderWithForm({
      name: 'John Doe',
      email: 'john@example.com',
      profile: 'Admin',
      age: 30,
      phone: '(123) 456-7890',
    }, false);

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Profile')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone')).toBeInTheDocument();
    expect(screen.getByLabelText('Age')).toBeInTheDocument();
    expect(screen.getByText('Back')).toBeInTheDocument();
  });

  it('preenche os campos com valores padrão', () => {
    renderWithForm({
      name: 'John Doe',
      email: 'john@example.com',
      profile: 'Admin',
      age: 30,
      phone: '(123) 456-7890',
    }, false);

    expect(screen.getByLabelText('Name')).toHaveValue('John Doe');
    expect(screen.getByLabelText('Email')).toHaveValue('john@example.com');
    expect(screen.getByLabelText('Profile')).toHaveValue('Admin');
    expect(screen.getByLabelText('Phone')).toHaveValue('(123) 456-7890');
    expect(screen.getByLabelText('Age')).toHaveValue('30');
  });

  it('desabilita campos quando isDisabled é verdadeiro', () => {
    renderWithForm({
      name: 'John Doe',
      email: 'john@example.com',
      profile: 'Admin',
      age: 30,
      phone: '(123) 456-7890',
    }, true);

    expect(screen.getByLabelText('Name')).toBeDisabled();
    expect(screen.getByLabelText('Email')).toBeDisabled();
    expect(screen.getByLabelText('Profile')).toBeDisabled();
    expect(screen.getByLabelText('Phone')).toBeDisabled();
    expect(screen.getByLabelText('Age')).toBeDisabled();
  });

  it('navega de volta quando o botão "Back" é clicado', () => {
    const navigate = require('react-router-dom').useNavigate();
    renderWithForm({}, false);

    fireEvent.click(screen.getByText('Back'));

    expect(navigate).toHaveBeenCalledWith('/');
  });
});
