import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import UsersTable from './pages/UsersTable/UsersTable'
import PageWithPagination from './pages/TableWithPagination/TableWithPagination'
import AddUser from './pages/AddUser/AddUser'
import EditUser from './pages/EditUser/EditUser'
import Navbar from './components/layout/Navbar/Navbar'
import Footer from './components/layout/Footer/Footer'
import ViewUser from './pages/ViewUser/ViewUser'
import GlobalStyle from "./styles/global"

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
        <Route path="/view-user" element={<ViewUser />} />
      </Routes>
      <GlobalStyle />
    </Router>
  )
}

export default App
