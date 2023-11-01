import {
  Button, ButtonGroup, CircularProgress, Flex, Input,
  Select, SystemStyleObject, Table, TableContainer, Tbody, Td, Th, Thead, Tr
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa'
import InputMask from 'react-input-mask'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { PROFILES } from '../../config/constants'
import { INPUT_PHONE_MASK } from '../../config/constants';
import { routes } from '../../routes/routes'
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
  const styles: Record<string, SystemStyleObject> = {
    wrapper: {  
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: '15rem'
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
    }
  }

  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 5
  const queryClient = useQueryClient()
  const [searchName, setSearchName] = useState('')
  const [searchEmail, setSearchEmail] = useState('')
  const [selectedProfile, setSelectedProfile] = useState<string | undefined>(undefined);

  const [users, setUsers] = useState<User[]>([]); 

  const { data = [], isLoading, isError } = useQuery<User[], Error>(
    ['users', currentPage],
    () => getUsers(currentPage, pageSize, searchName, searchEmail, selectedProfile),
    {
      retry: 1,
    }
  );

  useEffect(() => {
    getUsers(currentPage, pageSize, searchName, searchEmail, selectedProfile).then((data) => {
      setUsers(data);
    });
  }, [currentPage, searchName, searchEmail, selectedProfile]);
  
  
  const handleDeleteUser = (id: number) => {
    deleteUserMutation.mutate(id)
  };

  const deleteUserMutation = useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
      toast.success('User deleted')
    },
  });

  const navigate = useNavigate()

  const handleEdit = (id: string) => {
    navigate(routes.EDIT(id));
  }

  const handleViewUser = (id: string) => {
    navigate(routes.VIEW(id));
  }

  const handleProfileChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProfile(event.target.value);
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

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
              {(users).map((user) => (
                <Tr key={user.id}>
                  <Td>{user.id}</Td>
                  <Td>{user.name}</Td>
                  <Td>{user.email}</Td>
                  <Td>
                    <InputMask mask={INPUT_PHONE_MASK} maskChar=" " disabled value={user.phone} />
                  </Td>
                  <Td>{user.profile}</Td>
                  <Td>
                    <ButtonGroup>
                      <Button sx={styles?.editButton} onClick={() => handleEdit(String(user.id))}><FaEdit /></Button>
                      <Button sx={styles?.deleteButton} onClick={() => handleDeleteUser(user.id)}><FaTrash  /></Button>
                      <Button sx={styles?.viewButton} onClick={() => handleViewUser(String(user.id))}><FaEye /></Button>
                    </ButtonGroup>
                  </Td>
                </Tr>
              ))}
              </Tbody>
            </Table>
            <div>
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>Page {currentPage}</span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={users.length < pageSize}
            >
              Next
            </button>
            </div>
          </TableContainer>
        </Flex>
    ): (
      <div><CircularProgress /></div>
    )}
    </>
  );
};


