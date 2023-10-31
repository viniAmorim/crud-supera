import {
  Button, ButtonGroup, CircularProgress, Input,
  Select, Table, TableContainer, Tbody, Td, Th, Thead, Tr
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { FaEdit, FaEye, FaSearch, FaTrash } from 'react-icons/fa'
import InputMask from 'react-input-mask'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { PROFILES } from '../../components/layout/Form/ProfileSelectedField'
import { routes } from '../../routes/routes'
import { deleteUser, getUsers } from '../../services/http/user'
import { Welcome } from '../Welcome/Welcome'
import { FilterWraper, SyledContainer } from './UsersTable.styles'

type User = {
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

  const handleSearch = () => {
    queryClient.invalidateQueries(['usersSearch', currentPage, searchName, searchEmail, selectedProfile]);
  }

  const { data: searchData = [], isLoading: isSearchLoading } = useQuery<User[], Error>(
    ['usersSearch', currentPage, searchName, searchEmail, selectedProfile],
    () => getUsers(currentPage, pageSize, searchName, searchEmail, selectedProfile),
    {
      retry: 1,
      enabled: !!searchName || !!searchEmail,
    }
  )

  const handleProfileChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProfile(event.target.value);
  }

  if (isLoading) {
    return <div><CircularProgress /></div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <SyledContainer maxW='1100px'>
      <Welcome />
      <TableContainer maxWidth={'100%'}>
        <FilterWraper>
          <Input
            width="200px"
            placeholder="Search by name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            style={{margin: '5px'}}
          />
          <Input
            width="200px"
            placeholder="Search by email"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            style={{margin: '5px'}}
          />
          <Select
            value={selectedProfile || ''}
            onChange={handleProfileChange}
            placeholder="Select Profile"
            width="200px"
            style={{ margin: '5px' }}
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

          <Button
            onClick={handleSearch}
            leftIcon={<FaSearch />}
            style={{marginLeft: '10px', marginTop: '5px'}}
          >
            Search
          </Button>
        </FilterWraper>
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
                <InputMask mask="(99) 9 9999-9999" maskChar=" " disabled value={user.phone} />
              </Td>
              <Td>{user.profile}</Td>
              <Td>
                <ButtonGroup>
                  <Button onClick={() => handleEdit(String(user.id))}><FaEdit style={{ color: 'blue'}} /></Button>
                  <Button onClick={() => handleDeleteUser(user.id)}><FaTrash style={{ color: 'red'}} /></Button>
                  <Button onClick={() => handleViewUser(String(user.id))}><FaEye style={{ color: 'green'}}/></Button>
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
    </SyledContainer>
  );
};


