import { useState } from 'react'
import { useQuery } from 'react-query'

import Linearprogress from '@material-ui/core/LinearProgress'

import { Wrapper } from './App.styles'
import UsersTable from './Table/Table'
import PageWithPagination from './TableWithPagination/PageWithPagination'

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
    <>
      <PageWithPagination />
    </>
  );
}

export default App;
