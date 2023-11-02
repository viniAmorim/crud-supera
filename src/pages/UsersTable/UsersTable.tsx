import {
  Box,
  Button, ButtonGroup, CircularProgress, Flex, Input,
  Select, SystemStyleObject, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
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

export const UsersTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 5
  const queryClient = useQueryClient()
  const [searchName, setSearchName] = useState('')
  const [searchEmail, setSearchEmail] = useState('')
  const [selectedProfile, setSelectedProfile] = useState<string | undefined>(undefined);
  const [users, setUsers] = useState<User[]>([]); 

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

  const { data = [], isLoading, isError } = useQuery<User[], Error>(
    ['users', currentPage],
    () => getUsers(currentPage, pageSize, searchName, searchEmail, selectedProfile),
    {
      retry: 1,
    }
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

  const handleProfileChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProfile(event.target.value);
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    getUsers(currentPage, pageSize, searchName, searchEmail, selectedProfile).then((data) => {
      setUsers(data);
    });
  }, [currentPage, searchName, searchEmail, selectedProfile]);

  return (
    <>
    {!isLoading ? (
      <Flex sx={styles?.wrapper} maxW='68.75rem'>
        <Welcome />
          <TableContainer maxWidth={'100%'}>
            <Flex sx={styles?.filterWrapper}>
              <Input
                width="12.5rem"
                placeholder="Search by name"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                sx={styles?.inputTable}
              />
              <Input
                width="12.5rem"
                placeholder="Search by email"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                sx={styles?.inputTable}
              />
              <Select
                value={selectedProfile || ''}
                onChange={handleProfileChange}
                placeholder="Select Profile"
                width="12.5rem"
                sx={styles?.inputTable}
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
              {users?.map((user) => (
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
              onClick={() => setCurrentPage(currentPage - 1)}
              isDisabled={currentPage === 1}
            >
              Previous
            </Button>
            <Text sx={styles?.page} as='span'>Page {currentPage}</Text>
            <Button
              onClick={() => setCurrentPage(currentPage + 1)}
              isDisabled={users.length < pageSize}
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


