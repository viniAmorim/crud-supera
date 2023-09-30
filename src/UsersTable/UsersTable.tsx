import * as React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { Button, LinearProgress } from '@material-ui/core'
import { useQuery } from 'react-query'
import Welcome from '../Welcome/Welcome'
import axios from 'axios'

import { FaEdit, FaTrash } from 'react-icons/fa';
import { Wrapper, StyledTable, TableWrapper, StyledTableCell  } from './UsersTable.styles'

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
    <Wrapper>
      <Welcome />
      <TableWrapper>
        <TableContainer component={Paper}>
          <StyledTable>
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell align="right">Name</StyledTableCell>
                <StyledTableCell align="right">Email</StyledTableCell>
                <StyledTableCell align="right">Profile</StyledTableCell>
                <StyledTableCell align="right">Phone</StyledTableCell>
                <StyledTableCell align="right">Age</StyledTableCell>
                <StyledTableCell align="right">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((user) => (
                <TableRow key={user.name}>
                  <StyledTableCell component="th" scope="row">
                    {user.id}
                  </StyledTableCell>
                  <StyledTableCell align="right">{user.name}</StyledTableCell>
                  <StyledTableCell align="right">{user.email}</StyledTableCell>
                  <StyledTableCell align="right">{user.profile}</StyledTableCell>
                  <StyledTableCell align="right">{user.phone}</StyledTableCell>
                  <StyledTableCell align="right">{user.age}</StyledTableCell>
                  <StyledTableCell align="right">
                    <Button variant="outlined" color="primary">
                      <FaEdit />
                    </Button>
                    <Button variant="outlined" color="secondary">
                      <FaTrash />
                    </Button>
                  </StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </StyledTable>
        </TableContainer>
      </TableWrapper>
    </Wrapper>
  );
}

export default UsersTable