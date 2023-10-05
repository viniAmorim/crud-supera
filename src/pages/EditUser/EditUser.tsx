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
                <StyledLabel>Name</StyledLabel>
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  render={({ field }) => <StyledInput type="text" placeholder="name" {...field} />}
                />
                {errors.name && <span style={{color: 'red'}}>This field is required</span>}

                <StyledLabel>Email</StyledLabel>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => <StyledInput type="text" placeholder="email" {...field} />}
                />
                {errors.email && <span style={{color: 'red'}}>This field is required</span>}

                <StyledLabel>Profile</StyledLabel>
                <Controller
                  name="profile"
                  control={control}
                  render={({ field }) => (
                    <Select {...field}>
                      <option value=''></option>
                      <option value={'Admin'}>Admin</option>
                      <option value={'User'}>User</option>
                    </Select>
                  )}
                />
                {errors.profile && <span style={{color: 'red'}}>This field is required</span>}

                <StyledLabel>Phone</StyledLabel>
                <Controller
                  name="phone"
                  control={control}
                  defaultValue=""
                  render={({ field }) => 
                  <div>
                    <StyledInputMask
                      mask="(99) 9 9999-9999" 
                      maskChar=" "
                      type="tel"
                      {...field}
                    >
                    </StyledInputMask>
                  </div>}
                />
                {errors.phone && <span style={{color: 'red'}}>This field is required</span>}

                <StyledLabel>Age</StyledLabel>
                <Controller
                  name="age"
                  control={control}
                  defaultValue={null}
                  render={({ field }) => (
                    <Input type="number" {...field} value={field.value !== null ? String(field.value) : ''} />
                  )}
                />
                  {errors.age && <span style={{color: 'red'}}>This field has to be a positive number</span>}
                
                <ButtonWrapper>
                  <Button onClick={() => navigate('/')}>
                    Back
                  </Button>

                  <Button type="submit" disabled={mutation.isLoading}>
                    {mutation.isLoading ? 'Sending...' : 'Save'}
                  </Button>
                </ButtonWrapper>
              </FormControl>
            </form>
          </FormWrapper>
        </Wrapper>
      </Container>
    </React.Fragment>
  );
}
