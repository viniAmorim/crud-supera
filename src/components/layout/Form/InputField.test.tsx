import React from 'react';
import '@testing-library/jest-dom/extend-expect'; 
import { render, screen } from '@testing-library/react';
import { useForm, Controller } from 'react-hook-form';
import { InputField } from './InputField';


const TestComponent = () => {
  const { control } = useForm();

  return (
    <InputField name="name" control={control} placeholder="Name" type="text" />
  );
};

const TestComponentWithMask = () => {
  const { control } = useForm();

  return (
    <InputField name="name" control={control} placeholder="Name" type="text" mask />
  );
};

const TestComponentWithError = () => {
  const { control } = useForm();

  return (
    <InputField name="name" control={control} placeholder="Name" type="text" error="Campo obrigatório" />
  );
};

describe('InputField', () => {
  it('renderiza um campo de entrada padrão corretamente', () => {
    render(<TestComponent />);

    const inputElement = screen.getByPlaceholderText('Name');
    expect(inputElement).toBeInTheDocument();
  })

  it('renderiza um campo de entrada com máscara corretamente', () => {
    render(<TestComponentWithMask />);

    const inputElement = screen.getByTestId('tel');
    expect(inputElement).toBeInTheDocument();
  });

  it('exibe uma mensagem de erro quando fornecido', () => {
    render(<TestComponentWithError />);

    const errorElement = screen.getByText('Campo obrigatório');
    expect(errorElement).toBeInTheDocument();
  });

});
