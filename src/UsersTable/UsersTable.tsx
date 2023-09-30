import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { LinearProgress } from '@material-ui/core';
import { useQuery } from 'react-query';
import Welcome from '../Welcome/Welcome';
import axios from 'axios';

export type UserItemType = {
  id: number;
  name: string;
  email: string;
  profile: string;
  phone: string;
  age: number;
}

const getUsers = async (): Promise<UserItemType[]> => {
  try {
    const response = await axios.get('http://localhost:5000/users');
    return response.data;
  } catch (error) {
    throw error;
  }
}

const UsersTable = () => {
  const { data, isLoading, error } = useQuery<UserItemType[]>(
    'users', 
    getUsers
  )

  const getTotalUsers = () => null

  const handleAddUser = () => null

  if(isLoading) return <LinearProgress />
  if(error) return <div>Something went wrong ...</div>

  console.log(data)

  return (
    <TableContainer component={Paper}>

      <Welcome />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Profile</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">Age</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((user) => (
            <TableRow
              key={user.name}
            >
              <TableCell component="th" scope="row">
                {user.id}
              </TableCell>
              <TableCell align="right">{user.name}</TableCell>
              <TableCell align="right">{user.email}</TableCell>
              <TableCell align="right">{user.profile}</TableCell>
              <TableCell align="right">{user.phone}</TableCell>
              <TableCell align="right">{user.age}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UsersTable