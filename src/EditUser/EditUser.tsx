import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { FormControl, FormLabel, MenuItem, Select } from '@mui/material'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import * as yup from 'yup' 

import { Wrapper, Title, FormWrapper, StyledLabel, ButtonWrapper, StyledTextField } from './EditUser.styles'
import { useLocation } from 'react-router-dom'

type FormValues = {
  name: string;
  email: string;
  profile: string;
  age: number;
  phone: string;
}

const userSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  profile: yup.string().oneOf(['Admin', 'User'], 'Invalid profile').required('Profile is required'),
  phone: yup.string().required('Phone is required'),
  age: yup.number().positive('Age must be a positive number').required('Age is required'),
})

async function createUser(data: FormValues) {
  try {
    const response = await axios.put('http://localhost:5000/users', data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default function EditUser() {
  const location = useLocation();
  const user = location.state?.user;

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const queryClient = useQueryClient();

  const mutation = useMutation(createUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
      reset();
    },
  })

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    mutation.mutate(data);
  }

  return (
    <React.Fragment>
      <CssBaseline />
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
                  render={({ field }) => <StyledTextField placeholder="name" {...field} />}
                />
                {errors.name && <span>This field is required</span>}

                <StyledLabel>Email</StyledLabel>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => <StyledTextField placeholder="email" {...field} />}
                />
                {errors.email && <span>This field is required</span>}

                <StyledLabel >Profile</StyledLabel>
                <Controller
                  name="profile"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Select {...field} label="profile">
                      <MenuItem value={'Admin'}>Admin</MenuItem>
                      <MenuItem value={'User'}>User</MenuItem>
                    </Select>
                  )}
                />

                <StyledLabel>Phone</StyledLabel>
                <Controller
                  name="phone"
                  control={control}
                  defaultValue=""
                  render={({ field }) => <StyledTextField placeholder="(XX) XX XXXX-XXX" {...field} />}
                />
                {errors.phone && <span>This field is required</span>}

                <StyledLabel>Age</StyledLabel>
                <Controller
                  name="age"
                  control={control}
                  defaultValue={0}
                  render={({ field }) => <TextField style={{width: '100px'}} {...field} />}
                />
                {errors.phone && <span>This field is required</span>}
                
                <ButtonWrapper>
                  <Button>
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
