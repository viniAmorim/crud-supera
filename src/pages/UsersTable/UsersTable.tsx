import React, { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  CircularProgress,
  ButtonGroup,
  Button,
  Input,
} from '@chakra-ui/react'
import { FaEdit, FaTrash, FaEye, FaSearch } from 'react-icons/fa'
import { deleteUser, getUsers } from '../../services/http/user'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../routes/routes'
import { SyledContainer } from './UsersTable.styles'
import { Welcome } from '../Welcome/Welcome'
import InputMask from 'react-input-mask'

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

  const { data = [], isLoading, isError } = useQuery<User[], Error>(
    ['users', currentPage],
    () => getUsers(currentPage, pageSize, searchName, searchEmail),
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
  });

  const navigate = useNavigate()

  const handleEdit = (id: number) => {
    const userToEdit = data?.find((user) => user.id === id);
    if (userToEdit) {
      navigate(`${routes.EDIT}/${id}`, { state: { user: userToEdit } });
    }
  };

  const handleViewUser = (id: number) => {
    const userToView = data?.find((user) => user.id === id);
    if (userToView) {
      navigate(`${routes.VIEW}/${id}`, { state: { user: userToView } });
    }
  };

  const totalPages = Math.ceil(data.length / pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = () => {
    queryClient.invalidateQueries(['usersSearch', currentPage, searchName, searchEmail]);
  };

  const { data: searchData = [], isLoading: isSearchLoading } = useQuery<User[], Error>(
    ['usersSearch', currentPage, searchName, searchEmail],
    () => getUsers(currentPage, pageSize, searchName, searchEmail),
    {
      retry: 1,
      enabled: !!searchName || !!searchEmail,
    }
  );

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
        <div>
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
          />
          <Button
            onClick={handleSearch}
            leftIcon={<FaSearch />}
            style={{margin: '5px'}}
          >
            Search
          </Button>
        </div>
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
            {(searchName || searchEmail ? searchData : data)
              .slice((currentPage - 1) * pageSize, currentPage * pageSize)
              .map((user) => (
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
                      <Button onClick={() => handleEdit(user.id)}><FaEdit /></Button>
                      <Button onClick={() => handleDeleteUser(user.id)}><FaTrash /></Button>
                      <Button onClick={() => handleViewUser(user.id)}><FaEye /></Button>
                    </ButtonGroup>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
        <div>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </TableContainer>
    </SyledContainer>
  );
};


