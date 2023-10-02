import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { FormControl, MenuItem, Select } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup';

import * as yup from 'yup' 

import { Wrapper, Title, FormWrapper, StyledLabel, ButtonWrapper, StyledTextField, StyledInputMask } from './ViewUser.styles'
import { useLocation, useNavigate } from 'react-router-dom'

type FormValues = {
  name: string;
  email: string;
  profile: 'Admin' | 'User'; 
  age: number;
  phone: string;
}

const editSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  profile: yup.string().oneOf(['Admin', 'User'], 'Invalid profile').required('Profile is required'),
  phone: yup.string().required('Phone is required'),
  age: yup.number().positive('Age must be a positive number').required('Age is required'),
})

export default function ViewUser() {
  const location = useLocation();
  const userToView = location.state?.user;

  const getDefaultValues = (userToEdit: FormValues) => {
    return {
      name: userToEdit?.name || '',
      email: userToEdit?.email || '',
      profile: userToEdit?.profile || 'User',
      age: userToEdit?.age || 0,
      phone: userToEdit?.phone || '',
    };
  };

  const navigate = useNavigate()
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(editSchema),
    defaultValues: getDefaultValues(userToView)
  });

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Wrapper>
          <Title>View <span>User</span> {userToView?.name}</Title>

          <FormWrapper>
            <form>
              <FormControl>
                <StyledLabel>Name</StyledLabel>
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  render={({ field }) => <StyledTextField disabled placeholder="name" {...field} />}
                />
                {errors.name && <span style={{color: 'red'}}>This field is required</span>}

                <StyledLabel>Email</StyledLabel>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => <StyledTextField disabled placeholder="email" {...field} />}
                />
                {errors.email && <span style={{color: 'red'}}>This field is required</span>}

                <StyledLabel >Profile</StyledLabel>
                <Controller
                  name="profile"
                  control={control}
                  disabled
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
                  render={({ field }) => 
                  <div>
                    <StyledInputMask
                      mask="(99) 99 9999-9999" 
                      maskChar=" "
                      {...field}
                    >
                    </StyledInputMask>
                  </div>}
                />
                {errors.phone && <span style={{color: 'red'}}>This field is required</span>}
                
                <ButtonWrapper>
                  <Button onClick={() => navigate('/')}>
                    Back
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
