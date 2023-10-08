import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm, FormProvider } from 'react-hook-form';
import { InputField } from './InputField'; // Importe o componente

describe('InputField', () => {
  it('renderiza corretamente', () => {
    const methods = useForm();
    const { container } = render(
      <FormProvider {...methods}>
        <InputField name="name" control={methods.control} placeholder="Name" type="text" />
      </FormProvider>
    );

    expect(container).toMatchSnapshot();

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renderiza uma mensagem de erro quando fornecido', () => {
    const methods = useForm();
    const errorMessage = 'Este campo é obrigatório';

    render(
      <FormProvider {...methods}>
        <InputField name="name" control={methods.control} placeholder="Name" type="text" error={errorMessage} />
      </FormProvider>
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('atualiza o valor do campo de entrada corretamente', () => {
    const methods = useForm();
    const { container } = render(
      <FormProvider {...methods}>
        <InputField name="name" control={methods.control} placeholder="Name" type="text" />
      </FormProvider>
    );

    const input = screen.getByRole('textbox');

    userEvent.type(input, 'John Doe');

    expect(input).toHaveValue('John Doe');
  });
});
