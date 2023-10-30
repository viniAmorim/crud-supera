import {
  Container
} from '@chakra-ui/react'
import React from 'react'
import { SubmitHandler } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { UserForm } from '../../components/layout/Form/UserForm'
import { createUser, FormValues } from '../../services/http/user'
import {
  FormWrapper, Title, Wrapper
} from './AddUser.styles'

export const AddUser = () => {
  const navigate = useNavigate()

  const queryClient = useQueryClient();

  const mutation = useMutation(createUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
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
            <UserForm onSubmit={onSubmit} /> 
          </FormWrapper>
        </Wrapper>
      </Container>
    </React.Fragment>
  );
}
