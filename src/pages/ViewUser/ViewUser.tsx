import { Box, CircularProgress, Container, Flex, SystemStyleObject } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserForm } from '../../components/layout/Form/UserForm';
import { FormValues, getUserById, User } from '../../services/http/user';

export const ViewUser = () => {
  const styles: Record<string, SystemStyleObject> = {
    wrapper: {  
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '3.125rem',
      padding: '1.25rem',
      border: '1px solid #c4c4c4',
      borderRadius: '0.3125rem',
    },
    title: {
      textAlign: 'center',
      fontSize: '1.875rem',
      fontWeight: 'bold',
    },
    titleSpan: {
      color:  '#fe7e00',
      textDecoration: 'underline',
    }
  }

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

  if (isError) {
    toast.error('Something is wrong... id not provided')
    navigate('/')
    return <div>Something is wrong... id not provided</div>
  }

  return (
    <>
      {!isLoading ? (
        <Container maxWidth="sm">
          <Flex sx={styles?.wrapper}>
            <Flex sx={styles?.title}>View <Flex sx={styles?.titleSpan}>User</Flex></Flex>
            <UserForm defaultValues={defaultFormValues} isDisabled={true} /> 
          </Flex>
        </Container>
      ): (
        <div><CircularProgress /></div>
      )}
    </>
  );
}
