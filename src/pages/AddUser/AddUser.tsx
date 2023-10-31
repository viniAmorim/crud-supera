import {
  Container, Flex, SystemStyleObject
} from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { UserForm } from '../../components/layout/Form/UserForm'
import { createUser, FormValues } from '../../services/http/user'

export const AddUser = () => {
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

  const mutation = useMutation(createUser, {
    onSuccess: () => {
      toast.success('User added successfully')
      navigate('/')
    },
    onError: error => {
      toast.error('Something is wrong')
    }
  })

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    mutation?.mutate(data)
  }

  return (
    <>
      <Container maxWidth="sm">
        <Flex sx={styles?.wrapper}>
          <Flex sx={styles?.title}>Add <Flex sx={styles?.titleSpan}>User</Flex></Flex>
            <UserForm onSubmit={onSubmit} /> 
        </Flex>
      </Container>
    </>
  );
}
