import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { 
  Container,
  Input, 
  Button, 
  FormControl, 
  Select 
} from '@chakra-ui/react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup' 
import { toast } from 'react-toastify'
import { 
  Wrapper,
  Title, 
  FormWrapper, 
  StyledLabel, 
  ButtonWrapper, 
  StyledInputMask,
  StyledInput
} from './EditUser.styles'
import { editUser } from '../../services/http/user'
import { InputField } from '../../components/layout/Form/InputField'
import { ProfileSelectField } from '../../components/layout/Form/ProfileSelectedField'

type FormValues = {
  id: number;
  name: string;
  email: string;
  profile: 'Admin' | 'User'; 
  age: number | null; 
  phone: string;
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
    .oneOf(['Admin', 'User'], 'Invalid profile')
    .required('Profile is required'),
  phone: yup
    .string(),
  age: yup
    .number()
    .positive('Age must be a positive number')
    .nullable(), 
})

export const EditUser = () =>  {
  const navigate = useNavigate()
  const location = useLocation()
  const user = location.state?.user

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(userSchema) as any, 
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      profile: user?.profile || 'User',
      age: user?.age || null,
      phone: user?.phone || '',
    }
  });

  const queryClient = useQueryClient();

  const mutation = useMutation(editUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
      reset()
      toast.success('User edited successfully')
      navigate('/')
    },
  })

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (user?.id) {
      const updatedData = {
        ...data,
      };

      updatedData.id = user.id

      console.log(updatedData)
  
      mutation.mutate(updatedData);
    }
  }

  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Wrapper>
          <Title>Edit <span>User</span></Title>

          <FormWrapper>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl>
                <InputField name="name" control={control} placeholder="Name" type="text" error={errors.name?.message} />
                <InputField name="email" control={control} placeholder="Email" type="text" error={errors.email?.message} />
                <ProfileSelectField name="profile" control={control} error={errors.profile?.message} />
                <InputField name="phone" control={control} placeholder="Phone" type="text" error={errors.phone?.message} mask={true} />
                <InputField name="age" control={control} placeholder="Age" type="number" error={errors.age?.message} />

                <ButtonWrapper>
                  <Button onClick={() => navigate('/')}>Back</Button>

                  <Button type="submit">Save</Button>
                </ButtonWrapper>
              </FormControl>
            </form>
          </FormWrapper>
        </Wrapper>
      </Container>
    </React.Fragment>
  );
}
