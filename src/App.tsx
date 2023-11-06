import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import  { AddUser } from './pages/AddUser/AddUser'
import { EditUser } from './pages/EditUser/EditUser'
import { Navbar } from './components/layout/Navbar/Navbar'
import { ViewUser } from './pages/ViewUser/ViewUser'
import { UsersTable } from './pages/UsersTable/UsersTable'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ROUTES } from './routes/routes'

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Navbar />
        <Routes>
          <Route path={ROUTES.home} element={<UsersTable />} />
          <Route path={ROUTES.registerUser} element={<AddUser />} />
          <Route path={ROUTES.editUser()} element={<EditUser />} />
          <Route path={ROUTES.viewUser()} element={<ViewUser /> } />
          <Route path="*" element={<UsersTable />} /> 
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

