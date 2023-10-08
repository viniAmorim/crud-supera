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
  Button
} from '@chakra-ui/react'
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa'
import { deleteUser, getUsers } from '../../services/http/user'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../routes/routes'
import { SyledContainer } from './UsersTable.styles'
import { Welcome } from '../Welcome/Welcome'
type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  profile: string;
}

const TableComponent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 5
  const queryClient = useQueryClient()

  const { data = [], isLoading, isError } = useQuery<User[], Error>(
    ['users', currentPage],
    () => getUsers(currentPage, pageSize),
    {
      retry: 1,
    }
  )

  const handleDeleteUser = (id: number) => { 
    deleteUserMutation.mutate(id)
  }

  const deleteUserMutation = useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
      toast.success('User deleted')
    },
  })

  const navigate = useNavigate()
  const handleEdit = (id: number) => {
    const userToEdit = data?.find((user) => user.id === id)
    if (userToEdit) {
      navigate(`${routes.EDIT}/${id}`, { state: { user: userToEdit } })
    }
  }

  const handleViewUser = (id: number) => {
    const userToView = data?.find((user) => user.id === id);
    if (userToView) {
      navigate(`${routes.VIEW}/${id}`, { state: { user: userToView } });
    }
  }

  if (isLoading) {
    return <div><CircularProgress /></div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  const totalPages = Math.ceil(data.length / pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  }

  return (
    <SyledContainer maxW='1100px'>
      <Welcome />
      <TableContainer maxWidth={'100%'}>
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
          {data.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((user) => (
            <Tr key={user.id}>
              <Td>{user.id}</Td>
              <Td>{user.name}</Td>
              <Td>{user.email}</Td>
              <Td>{user.phone}</Td>
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
  )
}

export default TableComponent;
