import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import  { AddUser } from './pages/AddUser/AddUser'
import { EditUser } from './pages/EditUser/EditUser'
import { Navbar } from './components/layout/Navbar/Navbar'
import { ViewUser } from './pages/ViewUser/ViewUser'
import GlobalStyle from "./styles/global"
import { UsersTable } from './pages/UsersTable/UsersTable'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { routes } from './routes/routes'

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<UsersTable />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path={routes.EDIT()} element={<EditUser />} />
          <Route path={routes.VIEW()} element={<ViewUser /> } />
        </Routes>
        <GlobalStyle />
      </Router>
    </QueryClientProvider>
  )
}

