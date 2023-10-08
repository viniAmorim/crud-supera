import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
//import { UsersTable } from './pages/UsersTable/UsersTable'
import  { AddUser } from './pages/AddUser/AddUser'
import { EditUser } from './pages/EditUser/EditUser'
import { Navbar } from './components/layout/Navbar/Navbar'
import { ViewUser } from './pages/ViewUser/ViewUser'
import GlobalStyle from "./styles/global"
import TableComponent from './pages/UsersTable/UsersTable'

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
        <Route path="/" element={<TableComponent />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/edit-user/:id" element={<EditUser />} />
        <Route path="/view-user/:id" element={<ViewUser />} />
      </Routes>
      <GlobalStyle />
    </Router>
  )
}

export default App
