import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { 
  Container,
  Input, 
  Button, 
  FormControl, 
  Select 
} from '@chakra-ui/react'
import { useForm, Controller } from 'react-hook-form'
import { 
  Wrapper,
  Title, 
  FormWrapper, 
  StyledLabel, 
  ButtonWrapper, 
  StyledInputMask,
  StyledInput
} from './ViewUser.styles'

type FormValues = {
  name: string;
  email: string;
  profile: 'Admin' | 'User'; 
  age: number | null; 
  phone: string;
}

export const ViewUser = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const user = location.state?.user

  const {
    control,
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      profile: user?.profile || 'User',
      age: user?.age || null,
      phone: user?.phone || '',
    }
  })

  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Wrapper>
          <Title>Add <span>User</span></Title>

          <FormWrapper>
            <form>
              <FormControl>
                <StyledLabel>Name</StyledLabel>
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  disabled
                  render={({ field }) => <StyledInput type="text" placeholder="name" {...field} />}
                />

                <StyledLabel>Email</StyledLabel>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  disabled
                  render={({ field }) => <StyledInput type="text" placeholder="email" {...field} />}
                />

                <StyledLabel>Profile</StyledLabel>
                <Controller
                  name="profile"
                  control={control}
                  disabled
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
                  render={({ field }) => 
                  <div>
                    <StyledInputMask
                      mask="(99) 9 9999-9999" 
                      disabled
                      maskChar=" "
                      type="tel"
                      {...field}
                    >
                    </StyledInputMask>
                  </div>}
                />
                <StyledLabel>Age</StyledLabel>
                <Controller
                  name="age"
                  control={control}
                  defaultValue={null}
                  disabled
                  render={({ field }) => (
                    <Input type="number" {...field} value={field.value !== null ? String(field.value) : ''} />
                  )}
                />                
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
