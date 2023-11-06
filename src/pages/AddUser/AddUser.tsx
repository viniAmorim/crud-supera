import {
  Container, 
  Flex, 
  SystemStyleObject
} from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { UserForm } from '../../components/layout/Form/UserForm'
import { createUser, FormValues } from '../../services/http/user'
import { AxiosError } from 'axios'
import { IResponseError } from '../../services/http/error'

export const AddUser = () => {
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
    container: {
      maxWidth: "sm"
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
  
  const {mutate: registerUserMutate} = useMutation<void, AxiosError<IResponseError>, FormValues>(
		data => createUser(data),
		{
    onSuccess: () => {
      toast.success('User added successfully')
      navigate('/')
    },
    onError: error => {
      toast.error(error?.response?.data?.detail)
    }
  })

  const onSubmit = (values: FormValues) => {
    registerUserMutate(values)
  }

  return (
    <>
      <Container sx={styles?.container}>
        <Flex sx={styles?.wrapper}>
          <Flex sx={styles?.title}>Add <Flex sx={styles?.titleSpan}>User</Flex></Flex>
            <UserForm onSubmitForm={onSubmit} /> 
        </Flex>
      </Container>
    </>
  )
}
