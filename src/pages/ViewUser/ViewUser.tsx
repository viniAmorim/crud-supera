import { CircularProgress, Container, Flex, SystemStyleObject } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserForm } from '../../components/layout/Form/UserForm';
import { getUserById, User } from '../../services/http/user';

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
            <UserForm 
              defaultValues={{
                name: user?.name || '',
                email: user?.email || '',
                profile: user?.profile as 'Admin' | 'User',
                age: user?.age || 0,
                phone: user?.phone || '',
              }} 
              isDisabled={true} 
            /> 
          </Flex>
        </Container>
      ): (
        <div><CircularProgress /></div>
      )}
    </>
  );
}
