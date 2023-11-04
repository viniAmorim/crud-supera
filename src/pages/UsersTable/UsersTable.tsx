import {
  Box,
  Button, ButtonGroup, CircularProgress, Flex, Input,
  Select, SystemStyleObject, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr
} from '@chakra-ui/react'
import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa'
import InputMask from 'react-input-mask'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { PROFILES } from '../../config/constants'
import { INPUT_PHONE_MASK } from '../../config/constants';
import { ROUTES } from '../../routes/routes'
import { deleteUser, getUsers } from '../../services/http/user'
import { Welcome } from '../Welcome/Welcome'

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  profile: string;
}

interface IUserConfig {
  profile: string
  name: string
  email: string
  currentPage: string
  pageSize: number
}

export const UsersTable: React.FC = () => {
  const pageSize = 5
  const queryClient = useQueryClient()

  const styles: Record<string, SystemStyleObject> = {
    wrapper: {  
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto'
      
    },
    filterWrapper: {
      display: 'flex',
      flexDirection: 'row',
    },
    inputTable: {
      margin: '0.3125rem'
    },
    editButton: {
      color: '#4444f3',
    },
    deleteButton: {
      color: '#ee4c4c'
    },
    viewButton: {
      color: '#208920'
    },
    page: {
      padding: '0.625rem 0.625rem'
    }
  }

  const {
    control,
    getValues,
    register,
    reset,
    watch,
  } = useForm<IUserConfig>({
    defaultValues: {
      currentPage: '1',
      pageSize: 5,
    }
  })

  const { data = [], isLoading, isError, refetch: refetchUser } = useQuery<User[], Error>(
    ['users'],
    () => getUsers(getValues()),
  );

  const handleDeleteUser = (id: number) => {
    deleteUserMutation.mutate(id)
  };

  const deleteUserMutation = useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
      toast.success('User deleted')
    },
    onError: error => {
      toast.error('Error on delete user')
    }
  });

  const navigate = useNavigate()

  const handleEdit = (id: string) => {
    navigate(ROUTES.editUser(id));
  }

  const handleViewUser = (id: string) => {
    navigate(ROUTES.viewUser(id));
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  const incrementPage = () => {
    const {currentPage, ...formValues} = getValues()
    const newPage = Number(currentPage) + 1
    reset({...formValues, currentPage: String(newPage)})
    refetchUser()
  }

  const decrementPage = () => {
    const {currentPage, ...formValues} = getValues()
    const newPage = Number(currentPage) - 1
    reset({...formValues, currentPage: String(newPage)})
    refetchUser()
  }

  return (
    <>
    {!isLoading ? (
      <Flex sx={styles?.wrapper} maxW='68.75rem'>
        <Welcome />
          <TableContainer maxWidth={'100%'}>
            <Flex sx={styles?.filterWrapper}>
              <Controller 
                name="name" 
                control={control} 
                render={({field: {onChange, value}}) => (
                  <Input
                    width="12.5rem"
                    placeholder="Search by name"
                    {...register('name')}
                    onChange={event => {
                      onChange(event)
                      refetchUser()
                    }}
                    value={value}
                    sx={styles?.inputTable}
                  />
                )}
              />
               <Controller 
                name="email" 
                control={control} 
                render={({field: {onChange, value}}) => (
                  <Input
                    width="12.5rem"
                    placeholder="Search by email"
                    {...register('email')}
                    onChange={event => {
                      onChange(event)
                      refetchUser()
                    }}
                    value={value}
                    sx={styles?.inputTable}
                  />
                )}
              />
              <Controller 
                name="profile" 
                control={control} 
                render={({field: {onChange, value}}) => (
                  <Select
                    placeholder="Select Profile"
                    width="12.5rem"
                    {...register('profile')}
                    sx={styles?.inputTable}
                    onChange={event => {
                      onChange(event)
                      refetchUser()
                    }}
                    value={value}
                  >
                    {Object.keys(PROFILES)?.map((key) => {
                      const option = PROFILES[key];
                  
                      return (
                        <option key={key} value={option?.value}>
                          {option?.label}
                        </option>
                      )
                    })}
                  </Select>
                )}
              />
            </Flex>
            <Table>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Phone</Th>
                  <Th>profile</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
              {data?.map((user) => (
                <Tr key={user?.id}>
                  <Td>{user?.id}</Td>
                  <Td>{user?.name}</Td>
                  <Td>{user?.email}</Td>
                  <Td>
                    <InputMask mask={INPUT_PHONE_MASK} maskChar=" " disabled value={user?.phone} />
                  </Td>
                  <Td>{user?.profile}</Td>
                  <Td>
                    <ButtonGroup>
                      <Button sx={styles?.editButton} onClick={() => handleEdit(String(user?.id))}><FaEdit /></Button>
                      <Button sx={styles?.deleteButton} onClick={() => handleDeleteUser(user?.id)}><FaTrash  /></Button>
                      <Button sx={styles?.viewButton} onClick={() => handleViewUser(String(user?.id))}><FaEye /></Button>
                    </ButtonGroup>
                  </Td>
                </Tr>
              ))}
              </Tbody>
            </Table>
            <Box>
            <Button
              onClick={decrementPage}
              isDisabled={Number(watch('currentPage')) === 1}
            >
              Previous
            </Button>
            <Text sx={styles?.page} as='span'>Page {watch('currentPage')}</Text>
            <Button
              onClick={incrementPage}
              isDisabled={data.length < pageSize}
            >
              Next
            </Button>
            </Box>
          </TableContainer>
        </Flex>
    ): (
      <Box><CircularProgress /></Box>
    )}
    </>
  );
};


