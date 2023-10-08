import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { 
  Container,
  Input, 
  Button, 
  FormControl, 
  Select 
} from '@chakra-ui/react'
import { 
  Wrapper,
  Title, 
  FormWrapper, 
  StyledLabel, 
  ButtonWrapper, 
  StyledInputMask,
  StyledInput
} from './UserForm.styles'
import { useNavigate } from 'react-router-dom';
import { InputField } from './InputField';
import { ProfileSelectField } from './ProfileSelectedField';

type UserFormProps = {
  defaultValues: {
    name?: string;
    email?: string;
    profile?: 'Admin' | 'User';
    age?: number | null;
    phone?: string;
  };
  isDisabled: boolean;
};

export const UserForm: React.FC<UserFormProps> = ({ defaultValues, isDisabled }) => {
  const navigate = useNavigate()
  const { control } = useForm({
    defaultValues,
  });

  return (
    <FormWrapper>
      <form>
        <FormControl>
          <InputField name="name" control={control} placeholder="Name" type="text" />
            <InputField name="email" control={control} placeholder="Email" type="text" />
            <ProfileSelectField name="profile" control={control} />
            <InputField name="phone" control={control} placeholder="Phone" type="text" />
            <InputField name="age" control={control} placeholder="Age" type="number" />

            <ButtonWrapper>
              <Button onClick={() => navigate('/')}>Back</Button>
            </ButtonWrapper>
        </FormControl>
      </form>
    </FormWrapper>
  );
};

