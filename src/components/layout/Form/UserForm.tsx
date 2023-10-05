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

type UserFormProps = {
  defaultValues: {
    name: string;
    email: string;
    profile: 'Admin' | 'User';
    age: number | null;
    phone: string;
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
          <StyledLabel>Name</StyledLabel>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            disabled={isDisabled}
            render={({ field }) => <StyledInput type="text" placeholder="name" {...field} />}
          />

          <StyledLabel>Email</StyledLabel>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            disabled={isDisabled}
            render={({ field }) => <StyledInput type="text" placeholder="email" {...field} />}
          />

          <StyledLabel>Profile</StyledLabel>
          <Controller
            name="profile"
            control={control}
            disabled={isDisabled}
            render={({ field }) => (
              <Select {...field}>
                <option value={'Admin'}>Admin</option>
                <option value={'User'}>User</option>
              </Select>
            )}
          />
          <StyledLabel>Phone</StyledLabel>
          <Controller
            name="phone"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <div>
                <StyledInputMask mask="(99) 9 9999-9999" disabled maskChar=" " type="tel" {...field}>
                </StyledInputMask>
              </div>
            )}
          />
          <StyledLabel>Age</StyledLabel>
          <Controller
            name="age"
            control={control}
            defaultValue={null}
            disabled={isDisabled}
            render={({ field }) => <Input type="number" {...field} value={field.value !== null ? String(field.value) : ''} />}
          />
        </FormControl>
      </form>
      <ButtonWrapper>
        <Button onClick={() => navigate('/')}>Back</Button>
      </ButtonWrapper>
    </FormWrapper>
  );
};

