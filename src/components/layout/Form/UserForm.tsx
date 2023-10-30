import { Button, FormControl } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { FormValues } from '../../../services/http/user';
import { InputField } from './InputField';
import { ProfileSelectField } from './ProfileSelectedField';
import { ButtonWrapper, FormWrapper } from './UserForm.styles';

type UserFormProps = {
  defaultValues?: {
    name?: string;
    email?: string;
    profile?: 'Admin' | 'User';
    age?: number | null;
    phone?: string;
  };
  isDisabled?: boolean;
  onSubmit?: (data: any) => void;
}

const userSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, 'Name must have at least 3 characters')
    .max(100, 'Name must have a maximum of 100 characters')
    .required('Name is required'),
  email: yup
    .string()
    .email('Invalid email')
    .required('Email is required'),
  profile: yup
    .string()
    .required('Profile is required'),
  phone: yup
    .string(),
  age: yup
    .number()
    .positive('Age must be a positive number')
    .integer('Age must be an integer')
    .typeError('Age must be a number')
    .nullable()
    .transform((value, originalValue) => {
      return originalValue === null || originalValue === '' ? null : value;
    }),
})

export const UserForm: React.FC<UserFormProps> = ({ defaultValues, isDisabled, onSubmit }) => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(userSchema) as any,
  });

  const handleFormSubmit = handleSubmit(async (data) => {
    if (onSubmit) {
      onSubmit(data);
    }
  });

  return (
    <FormWrapper>
      <form onSubmit={handleFormSubmit}>
        <FormControl>
          <InputField name="name" control={control} placeholder="Name" type="text" disabled={isDisabled} error={errors.name?.message} data-testid="name-input" />
          <InputField name="email" control={control} placeholder="Email" type="text" disabled={isDisabled} error={errors.email?.message} data-testid="email-input" />
          <ProfileSelectField name="profile" control={control} disabled={isDisabled} error={errors.profile?.message}  />
          <InputField name="phone" control={control} placeholder="Phone" type="text" mask={true} disabled={isDisabled} />
          <InputField name="age" control={control} placeholder="Age" type="number" disabled={isDisabled} />

          <ButtonWrapper>
            <Button onClick={() => navigate('/')}>Back</Button>
            {!isDisabled && <Button type="submit" data-testid="submit-button">Submit</Button>}
          </ButtonWrapper>
        </FormControl>
      </form>
    </FormWrapper>
  );
};
