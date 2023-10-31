import { Container, Flex, SystemStyleObject } from '@chakra-ui/react'
import { SubmitHandler } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { UserForm } from '../../components/layout/Form/UserForm'
import { editUser, FormValues, getUserById, User } from '../../services/http/user'

export const EditUser = () =>  {
  const styles: Record<string, SystemStyleObject> = {
    wrapper: {  
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '50px',
      padding: '20px',
      border: '1px solid #c4c4c4',
      borderRadius: '5px',
    },
    title: {
      textAlign: 'center',
      fontSize: '30px',
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
    defaultFormValues.name = user.name || defaultFormValues.name;
    defaultFormValues.email = user.email || defaultFormValues.email;
    defaultFormValues.profile = user.profile as 'Admin' | 'User' || defaultFormValues.profile;
    defaultFormValues.age = user.age || defaultFormValues.age;
    defaultFormValues.phone = user.phone || defaultFormValues.phone;
  }

  const mutation = useMutation(editUser, {
    onSuccess: () => {
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
      mutation?.mutate(updatedData);
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    toast.error('Something is wrong... id not provided')
    navigate('/')
    return <div>Something is wrong... id not provided</div>
  }

  return (
    <>
      <Container maxWidth="sm">
        <Flex sx={styles?.wrapper}>
          <Flex sx={styles?.title}>Edit <Flex sx={styles?.titleSpan}>User</Flex></Flex>
            <UserForm defaultValues={defaultFormValues} onSubmit={onSubmit} /> 
        </Flex>
      </Container>
    </>
  );
}
