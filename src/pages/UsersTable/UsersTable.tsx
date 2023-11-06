import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Flex,
  Input,
  Select,
  SystemStyleObject,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react'
import { Controller, useForm } from 'react-hook-form'
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa'
import InputMask from 'react-input-mask'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { DECREMENT, INCREMENT, INITIAL_PAGE, INPUT_PHONE_MASK, PAGE_SIZE, PROFILES } from '../../config/constants'
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
  pageSize: number,
}

export const UsersTable = () => {
  const pageSize = PAGE_SIZE
  const queryClient = useQueryClient()

  const styles: Record<string, SystemStyleObject> = {
    wrapper: {  
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto',
      maxW: '68.75rem'      
    },
    tableContainer: {
      maxWidth: '100%',
    },
    filterWrapper: {
      display: 'flex',
      flexDirection: 'row',
    },
    inputTable: {
      margin: '0.3125rem',
      width: "25rem"
    },
    wrapperSelectUser: {
      margin: '0.3125rem',
      width: "30%"
    },
    editButton: {
      '&:hover': {
        backgroundColor:'#fe7e00',
        color: '#fff'
      },
    },
    deleteButton: {
      '&:hover': {
        backgroundColor:'#fe7e00',
        color: '#fff'
      },
    },
    viewButton: {
      '&:hover': {
        backgroundColor:'#fe7e00',
        color: '#fff'
      },
    },
    page: {
      padding: '0.625rem 0.625rem'
    }
  }

  const {
    control,
    getValues,
    setValue,
    reset,
    watch,
  } = useForm<IUserConfig>({
    defaultValues: {
      currentPage: INITIAL_PAGE,
      pageSize: PAGE_SIZE,
    }
  })

  const { data, isLoading, isError, refetch: refetchUser } = useQuery<User[], Error>(
    ['users'],
    () => getUsers(getValues()),
  )

  const {mutate: deleteUserMutate} = useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
      toast.success('User deleted')
    },
    onError: error => {
      toast.error('Error on delete user')
    }
  })

  const navigate = useNavigate()

  const handleDeleteUser = (id: number) => {
    deleteUserMutate(id)
  };

  const handleEdit = (id: string) => {
    navigate(ROUTES.editUser(id));
  }

  const handleViewUser = (id: string) => {
    navigate(ROUTES.viewUser(id));
  }

  if (isError) {
    return <Box>Error fetching data</Box>;
  }

  const changePage = (index: number) => {
    const {currentPage, ...formValues} = getValues()
    const newPage = Number(currentPage) + index
    reset({...formValues, currentPage: String(newPage)})
    refetchUser()
  }

  const searchUser = () => {
    setValue('currentPage', INITIAL_PAGE)

    const formValues = getValues()
    reset({...formValues, currentPage: INITIAL_PAGE, pageSize: PAGE_SIZE})
    refetchUser()
  }

  return (
    <>
    {!isLoading ? (
      <Flex sx={styles?.wrapper}>
        <Welcome />
          <TableContainer sx={styles?.tableContainer}>
            <Flex sx={styles?.filterWrapper}>
              <Controller 
                name="name" 
                control={control} 
                render={({field: {onChange, value}}) => (
                  <Input
                    placeholder="Search by name"
                    onChange={event => {
                      onChange(event)
                      searchUser()
                      
                    }}
                    value={value || ''}
                    sx={styles?.inputTable}
                  />
                )}
              />
               <Controller 
                name="email" 
                control={control} 
                render={({field: {onChange, value}}) => (
                  <Input
                    placeholder="Search by email"
                    onChange={event => {
                      onChange(event)
                      searchUser()
                    }}
                    value={value || ''}
                    sx={styles?.inputTable}
                  />
                )}
              />
              <Box sx={styles?.wrapperSelectUser}>
                <Controller 
                  name="profile" 
                  control={control} 
                  render={({field: {onChange, value}}) => (
                    <Select
                      placeholder="Select Profile"
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
              </Box>
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
              onClick={() => changePage(DECREMENT)}
              isDisabled={Number(watch('currentPage')) === 1}
            >
              Previous
            </Button>
            <Text sx={styles?.page} as='span'>Page {watch('currentPage')}</Text>
            <Button
              onClick={() => changePage(INCREMENT)}
              isDisabled={data && data?.length < pageSize}
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
  )
}


