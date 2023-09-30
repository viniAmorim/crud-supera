import { useState } from 'react'
import { useQuery } from 'react-query'

import Linearprogress from '@material-ui/core/LinearProgress'

import { Wrapper } from './App.styles'

export type UserItemType = {
  id: number;
  name: string;
  email: string;
  profile: string;
  phone: string;
  age: number;
}

const getUsers = async (): Promise<UserItemType[]> =>
  await(await fetch('http://localhost:5000/users')).json()

const App = () => {
  const { data, isLoading, error } = useQuery<UserItemType[]>(
    'users', 
    getUsers
  )

  const getTotalUsers = () => null

  const handleAddUser = () => null

  if(isLoading) return <Linearprogress />
  if(error) return <div>Something went wrong ...</div>

  console.log(data)
  return (
    <div>
      CRUD SUPERA
    </div>
  );
}

export default App;
