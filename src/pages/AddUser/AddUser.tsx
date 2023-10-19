import React from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Container,
  Button, 
  FormControl, 
} from '@chakra-ui/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup' 
import { toast } from 'react-toastify'
import { 
  Wrapper,
  Title, 
  FormWrapper, 
  ButtonWrapper, 
} from './AddUser.styles'
import { createUser, FormValues } from '../../services/http/user'
import { InputField } from '../../components/layout/Form/InputField'
import { ProfileSelectField } from '../../components/layout/Form/ProfileSelectedField'

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
    .typeError('Age must be a number')
    .nullable()
    .transform((value, originalValue) => {
      return originalValue === null || originalValue === '' ? null : value;
    }),
})

export const AddUser = () => {
  const navigate = useNavigate()
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(userSchema) as any, 
  });

  const queryClient = useQueryClient();

  const mutation = useMutation(createUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
      reset()
      toast.success('User added successfully')
      navigate('/')
    },
    onError: error => {
      toast.error('Something is wrong')
    }
  })

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    mutation.mutate(data)
  }

  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Wrapper>
          <Title>Add <span>User</span></Title>

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
