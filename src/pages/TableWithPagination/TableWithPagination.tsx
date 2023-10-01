import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, LinearProgress } from '@mui/material';
import { Wrapper } from './TableWithPagination.styles';
import Welcome from '../Welcome/Welcome';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Navigate, useNavigate } from 'react-router-dom';

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
    throw error;
  }
};

const deleteUser = async (id: number) => {
  try {
    const response = await axios.delete(`http://localhost:5000/users/${id}`);
    return response.data;
  } catch (error) {
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
    { field: 'phone', headerName: 'Phone', type: 'number', width: 120 },
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
      queryClient.invalidateQueries('users');
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

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong ...</div>;
  console.log(data);

  return (
    <Wrapper>
      <Welcome />
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
    </Wrapper>
  );
}
