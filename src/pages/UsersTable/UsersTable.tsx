import { useLocation, useNavigate, useParams } from 'react-router-dom'
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
import {
  Pagination,
  usePagination,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
  PaginationContainer,
  PaginationPageGroup,
} from "@ajna/pagination";
import { Welcome } from '../Welcome/Welcome'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { SyledContainer, StyledTable, TableWrapper, StyledTableCell  } from './UsersTable.styles'
import { getUsers, deleteUser } from '../../services/http/user'
import { routes } from '../../routes/routes'
import { toast } from 'react-toastify'

export type UserItemType = {
  id: number;
  name: string;
  email: string;
  profile: string;
  phone: string;
  age: number;
}

export const UsersTable = () => {
  const { page } = useParams()
  const location = useLocation()
  const queryClient = useQueryClient()
  const usersPerPage = 5
  const parsedPage = typeof page === 'string' ? parseInt(page, 10) : 1

  const { data, isLoading, error } = useQuery<UserItemType[]>(
    ['users', parsedPage],
    () => getUsers(parsedPage, usersPerPage),
    {
      initialData: [],
    }
  );
  
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

   const {
    currentPage,
    setCurrentPage,
    pagesCount,
    pages
  } = usePagination({
    pagesCount: 12,
    initialState: { currentPage: 1 },
  });


  if(isLoading) return <CircularProgress />
  if(error) return <div>Something went wrong ...</div>

  return (
    <SyledContainer maxW='1100px'>
      <Welcome />
      <TableContainer maxWidth={'100%'}>

      <Table size='md' variant='simple'>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Phone</Th>
            <Th>Age</Th>
            <Th>profile</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.map((user) => (
            <Tr key={user.id}>
              <Td>{user.id}</Td>
              <Td>{user.name}</Td>
              <Td>{user.email}</Td>
              <Td>{user.phone}</Td>
              <Td>{user.age !== null ? user.age : 'N/A'}</Td>
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
       <Pagination
        pagesCount={pagesCount}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      >
        <PaginationContainer>
          <PaginationPrevious>Previous</PaginationPrevious>
          <PaginationPageGroup>
            {pages.map((page: number) => (
              <PaginationPage 
                key={`pagination_page_${page}`} 
                page={page} 
              />
            ))}
          </PaginationPageGroup>
          <PaginationNext>Next</PaginationNext>
        </PaginationContainer>
      </Pagination>
    </TableContainer>
    </SyledContainer>
  )
}
