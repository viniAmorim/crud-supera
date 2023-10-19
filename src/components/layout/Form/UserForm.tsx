import React from 'react'
import { useForm } from 'react-hook-form'
import { 
  Button, 
  FormControl, 
} from '@chakra-ui/react'
import { 
  FormWrapper, 
  ButtonWrapper, 
} from './UserForm.styles'
import { useNavigate } from 'react-router-dom'
import { InputField } from './InputField'
import { ProfileSelectField } from './ProfileSelectedField'

type UserFormProps = {
  defaultValues: {
    name?: string;
    email?: string;
    profile?: 'Admin' | 'User';
    age?: number | null;
    phone?: string;
  };
  isDisabled: boolean;
}

export const UserForm: React.FC<UserFormProps> = ({ defaultValues, isDisabled }) => {
  const navigate = useNavigate()
  const { control } = useForm({
    defaultValues,
  })

  return (
    <FormWrapper>
      <form>
        <FormControl>
          <InputField name="name" control={control} placeholder="Name" type="text" disabled={isDisabled} />
          <InputField name="email" control={control} placeholder="Email" type="text" disabled={isDisabled} />
          <ProfileSelectField name="profile" control={control} disabled={isDisabled} />
          <InputField name="phone" control={control} placeholder="Phone" type="text" mask={true} disabled={isDisabled} />
          <InputField name="age" control={control} placeholder="Age" type="number" disabled={isDisabled}/>

          <ButtonWrapper>
            <Button onClick={() => navigate('/')}>Back</Button>
          </ButtonWrapper>
        </FormControl>
      </form>
    </FormWrapper>
  )
}

