import { Container } from '@chakra-ui/react'
import React from 'react'
import { SubmitHandler } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { UserForm } from '../../components/layout/Form/UserForm'
import { editUser, FormValues, getUserById, User } from '../../services/http/user'
import { FormWrapper, Title, Wrapper } from './EditUser.styles'

export const EditUser = () =>  {
  const navigate = useNavigate()
  const { id } = useParams()

  const { data: user, isLoading, isError } = useQuery<User | null>(['user', id], () => getUserById(Number(id)), {
    enabled: !!id,
  })

  const defaultFormValues: FormValues = {
    name: '',
    email: '',
    profile: 'User',
    age: null,
    phone: '',
    id: 0
  }

  if (user && !isLoading) {
    defaultFormValues.name = user.name || defaultFormValues.name;
    defaultFormValues.email = user.email || defaultFormValues.email;
    defaultFormValues.profile = user.profile as 'Admin' | 'User' || defaultFormValues.profile;
    defaultFormValues.age = user.age || defaultFormValues.age;
    defaultFormValues.phone = user.phone || defaultFormValues.phone;
  }

  const queryClient = useQueryClient();

  const mutation = useMutation(editUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
      toast.success('User edited successfully')
      navigate('/')
    },
    onError: error => {
      toast.error('Something is wrong')
    }
  })

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (user?.id) {
      const updatedData = {
        ...data,
      }
      updatedData.id = user.id
      mutation.mutate(updatedData);
    }
  }

  if (id === undefined) {
    return <div>ID não especificado.</div>
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something is wrong... id not provided</div>
  }

  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Wrapper>
          <Title>Edit <span>User</span></Title>

          <FormWrapper>
            <UserForm defaultValues={defaultFormValues} onSubmit={onSubmit} /> 
          </FormWrapper>
        </Wrapper>
      </Container>
    </React.Fragment>
  );
}
