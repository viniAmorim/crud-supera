/*import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'

import { useMutation, useQuery, useQueryClient } from 'react-query'

import { DataGrid } from '@mui/x-data-grid'

import { Container, Button, CircularProgress } from '@chakra-ui/react'

import { Welcome } from '../Welcome/Welcome'

import { Wrapper } from './TableWithPagination.styles'
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa'

import InputMask from 'react-input-mask'

import { toast } from 'react-toastify'

export type UserItemType = {
  id: number;
  name: string;
  email: string;
  profile: string;
  phone: string;
  age: number;
};

const getUsers = async (): Promise<UserItemType[]> => {
  try {
    const response = await axios.get('http://localhost:5000/users');
    return response.data;
  } catch (error) {
    throw error
  }
};

const deleteUser = async (id: number) => {
  try {
    const response = await axios.delete(`http://localhost:5000/users/${id}`);
    return response.data;
  } catch (error) {
    toast.error('Something is wrong')
    throw error;
  }
};

export default function TableWithPagination() {
  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'age', headerName: 'Age', type: 'number', width: 50 },
    { field: 'profile', headerName: 'Profile', type: 'number', width: 100 },
    {
      field: 'phone',
      headerName: 'Phone',
      type: 'string',
      width: 120,
      renderCell: (params: { row: { id: number; phone: string } }) => (
        <div>
          <InputMask
            mask="(99) 99 9999-9999" 
            maskChar=" "
            value={params.row.phone}
            disabled
          >
          </InputMask>
        </div>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 240,
      renderCell: (params: { row: { id: number } }) => (
        <div>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleEdit(params.row.id)}
            style={{ margin: '5px' }}
          >
            <FaEdit/>
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => handleDeleteUser(params.row.id)}
            style={{ margin: '5px' }}
          >
            <FaTrash style={{ color: 'red' }}/>
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => handleViewUser(params.row.id)}
            style={{ margin: '5px' }}
          >
            <FaEye style={{ color: 'green' }}/>
          </Button>
        </div>
      ),
    },
  ];

  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<UserItemType[]>(
    'users',
    getUsers
  );

  const deleteUserMutation = useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
      toast.success('User deleted')
    },
  })

  const handleViewUser = (id: number) => {
    const userToView = data?.find((user) => user.id === id);
    if (userToView) {
      navigate('/view-user', { state: { user: userToView } });
    }
  }

  const navigate = useNavigate()
  const handleEdit = (id: number) => {
    const userToEdit = data?.find((user) => user.id === id);
    if (userToEdit) {
      navigate('/edit-user', { state: { user: userToEdit } });
    }
  }

  const handleDeleteUser = (id: number) => { 
    deleteUserMutation.mutate(id);
  };

  if (isLoading) return <CircularProgress />;
  if (error) return <div>Something went wrong ...</div>

  return (
    <Wrapper>
      <Welcome />
      <Container maxWidth="md">
        <DataGrid
          rows={data ? data : []}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </Container>
    </Wrapper>
  );
}
*/

export {};