import {
  Box,
  CircularProgress,
  Container,
  Flex,
  SystemStyleObject
} from '@chakra-ui/react'
import { AxiosError } from 'axios'
import { SubmitHandler } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { UserForm } from '../../components/layout/Form/UserForm/UserForm'
import { DEFAULT_AGE } from '../../config/constants'
import { IResponseError } from '../../services/http/error'
import { editUser, FormValues, getUserById, IProfile, User } from '../../services/http/user'

export const EditUser = () =>  {
  const navigate = useNavigate()
  
  const { id } = useParams()
  
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
      maxWidth: "sm",
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

  const { data: user, isLoading } = useQuery<User | null>(['user', id], () => getUserById(Number(id)), {
    enabled: !!id,
  })

  const {mutate: editUserMutation} = useMutation<void, AxiosError<IResponseError>, FormValues>(
		data => editUser(data), {
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
      editUserMutation(updatedData);
    }
  }

  return (
    <>
      {!isLoading ? (
      <Container sx={styles?.container}>
        <Flex sx={styles?.wrapper}>
          <Flex sx={styles?.title}>Edit <Flex sx={styles?.titleSpan}>User</Flex></Flex>
            <UserForm 
              defaultValues={{
                name: user?.name || '',
                email: user?.email || '',
                profile: user?.profile as IProfile,
                age: user?.age || DEFAULT_AGE,
                phone: user?.phone || '',
              }} 
              onSubmitForm={onSubmit} 
            /> 
        </Flex>
      </Container>
      ): (
        <Box><CircularProgress /></Box>
      )}
    </>
  )
}
