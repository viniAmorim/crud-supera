import {
  Box,
  CircularProgress,
  Container,
  Flex,
  SystemStyleObject
} from '@chakra-ui/react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { UserForm } from '../../components/layout/Form/UserForm/UserForm'
import { DEFAULT_AGE } from '../../config/constants'
import { getUserById, IProfile, User } from '../../services/http/user'

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
  
  const { id } = useParams()

  const { data: user, isLoading } = useQuery<User | null>(['user', id], () => getUserById(Number(id)), {
    enabled: !!id,
  })

  return (
    <>
      {!isLoading ? (
        <Container sx={styles?.container}>
          <Flex sx={styles?.wrapper}>
            <Flex sx={styles?.title}>View <Flex sx={styles?.titleSpan}>User</Flex></Flex>
            <UserForm 
              defaultValues={{
                name: user?.name || '',
                email: user?.email || '',
                profile: user?.profile as IProfile,
                age: user?.age || DEFAULT_AGE,
                phone: user?.phone || '',
              }} 
              isDisabled
            /> 
          </Flex>
        </Container>
      ): (
        <Box><CircularProgress /></Box>
      )}
    </>
  )
}
