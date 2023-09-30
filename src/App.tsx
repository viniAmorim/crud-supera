import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react'
import { useQuery } from 'react-query'

import Linearprogress from '@material-ui/core/LinearProgress'

import { Wrapper } from './App.styles'
import UsersTable from './UsersTable/UsersTable'

import PageWithPagination from './TableWithPagination/TableWithPagination'
import AddUser from './AddUser/AddUser';
import EditUser from './EditUser/EditUser';
import Navbar from './components/layout/Navbar/Navbar';
import Footer from './components/layout/Footer/Footer';

export type UserItemType = {
  id: number;
  name: string;
  email: string;
  profile: string;
  phone: string;
  age: number;
}

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<PageWithPagination />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/edit-user" element={<EditUser />} />
      </Routes>
    </Router>
  )
}

export default App;
