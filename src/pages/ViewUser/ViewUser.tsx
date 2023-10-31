import { Container } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserForm } from '../../components/layout/Form/UserForm';
import { FormValues, getUserById, User } from '../../services/http/user';
import { Title, Wrapper } from './ViewUser.styles';

export const ViewUser = () => {
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
    defaultFormValues.name = user?.name || defaultFormValues.name;
    defaultFormValues.email = user?.email || defaultFormValues.email;
    defaultFormValues.profile = user?.profile as 'Admin' | 'User' || defaultFormValues.profile;
    defaultFormValues.age = user?.age || defaultFormValues.age;
    defaultFormValues.phone = user?.phone || defaultFormValues.phone;
  }

  const {
    control,
    reset,
  } = useForm<FormValues>({
    defaultValues: defaultFormValues,
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    toast.error('Something is wrong... id not provided')
    navigate('/')
    return <div>Something is wrong... id not provided</div>
  }

  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Wrapper>
          <Title>View <span>User</span></Title>
          <UserForm defaultValues={defaultFormValues} isDisabled={true} /> 
        </Wrapper>
      </Container>
    </React.Fragment>
  );
}
