import React from 'react';
import '@testing-library/jest-dom/extend-expect'; 
import { render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import {ProfileSelectField} from './ProfileSelectedField'

const TestComponent = () => {
  const { control } = useForm();
  const mockError = 'This is an error message';

  return (
    <ProfileSelectField name="name" control={control} error={mockError} disabled={false} />
  );
};

describe('ProfileSelectField', () => {
  it('renderiza um campo de entrada padrão corretamente', () => {
    render(<TestComponent />);

    const inputElement = screen.getByText('Profile');
    expect(inputElement).toBeInTheDocument();
  })

  it('should display error message when provided', () => {
    render(<TestComponent />);
    expect(screen.getByText('This is an error message')).toBeInTheDocument();
  });

  it('should render options from profiles', () => {
    const mockProfiles = {
      profile1: {
        value: '',
        label: '',
      },
      profile2: {
        value: 'profile1',
        label: 'Profile 1',
      },
      profile3: {
        value: 'profile2',
        label: 'Profile 2',
      }
    }
    render(<TestComponent />);

    const select = screen.getByTestId('profile');
    // eslint-disable-next-line testing-library/no-node-access
    const options = select.getElementsByTagName('option');
    expect(options.length).toBe(Object.keys(mockProfiles).length);
  });
});