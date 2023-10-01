import React from 'react'
import { useNavigate } from 'react-router-dom'

import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { FormControl, MenuItem, Select } from '@mui/material'

import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'

import axios from 'axios'

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup' 

import { toast } from 'react-toastify'

import { Wrapper, Title, FormWrapper, StyledLabel, ButtonWrapper, StyledTextField } from './AddUser.styles'

type FormValues = {
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
    .string()
    .required('Phone is required'),
  age: yup
    .number()
    .positive('Age must be a positive number')
    .nullable(), 
})

async function createUser(data: FormValues) {
  try {
    const response = await axios.post('http://localhost:5000/users', data)
    return response.data;
  } catch (error) {
    toast.error('Something is wrong')
    throw error
  }
}

export default function AddUser() {
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
  })

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    mutation.mutate(data)
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Wrapper>
          <Title>Add <span>User</span></Title>

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
                {errors.name && <span style={{color: 'red'}}>This field is required</span>}

                <StyledLabel>Email</StyledLabel>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => <StyledTextField placeholder="email" {...field} />}
                />
                {errors.email && <span style={{color: 'red'}}>This field is required</span>}

                <StyledLabel >Profile</StyledLabel>
                <Controller
                  name="profile"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} label="profile">
                      <MenuItem value={'Admin'}>Admin</MenuItem>
                      <MenuItem value={'User'}>User</MenuItem>
                    </Select>
                  )}
                />
                {errors.profile && <span style={{color: 'red'}}>This field is required</span>}

                <StyledLabel>Phone</StyledLabel>
                <Controller
                  name="phone"
                  control={control}
                  defaultValue=""
                  render={({ field }) => <StyledTextField placeholder="(XX) XX XXXX-XXX" {...field} />}
                />
                {errors.phone && <span style={{color: 'red'}}>This field is required</span>}

                <StyledLabel>Age</StyledLabel>
                <Controller
                  name="age"
                  control={control}
                  defaultValue={null}
                  render={({ field }) => <TextField style={{width: '100px'}} {...field} />}
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
