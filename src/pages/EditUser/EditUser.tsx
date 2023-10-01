import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { FormControl, MenuItem, Select } from '@mui/material'

import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from 'react-query'

import axios from 'axios'

import * as yup from 'yup' 
import { toast } from 'react-toastify'

import { Wrapper, Title, FormWrapper, StyledLabel, ButtonWrapper, StyledTextField } from './EditUser.styles'

type FormValues = {
  name: string;
  email: string;
  profile: 'Admin' | 'User'; 
  age: number | null;
  phone: string;
}

const editSchema = yup.object().shape({
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
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value)),
})

export default function EditUser() {
  const navigate = useNavigate()
  const location = useLocation()
  const userToEdit = location.state?.user

  async function editUser(data: FormValues) {
    try {
      const response = await axios.put(`http://localhost:5000/users/${userToEdit.id}`, data)
      return response.data
    } catch (error) {
      toast.error('Something is wrong')
      throw error
    }
  }

  const getDefaultValues = (userToEdit: FormValues) => {
    return {
      name: userToEdit?.name || '',
      email: userToEdit?.email || '',
      profile: userToEdit?.profile || 'User',
      age: userToEdit?.age || 0,
      phone: userToEdit?.phone || '',
    }
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(editSchema) as any,
    defaultValues: getDefaultValues(userToEdit)
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
    mutation.mutate(data)
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
  )
}
