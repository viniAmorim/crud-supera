import axios from 'axios'
import {ENDPOINTS} from './endpoints'
import { toast } from 'react-toastify'

type FormValues = {
  id: number;
  name: string;
  email: string;
  profile: 'Admin' | 'User'; 
  age: number | null; 
  phone: string;
}

export type UserItemType = {
  id: number;
  name: string;
  email: string;
  profile: string;
  phone: string;
  age: number;
}

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  profile: string;
}

const baseUrl = process.env.REACT_APP_BASE_URL

async function createUser(data: FormValues) {
  try {
    const response = await axios.post(`${baseUrl}/${ENDPOINTS.createUser}`, data)
    return response.data;
  } catch (error) {
    toast.error('Something is wrong')
    throw error
  }
}

const getUsers = async (page: number, pageSize: number, name: string, email: string): Promise<User[]> => {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append('page', page.toString());
    queryParams.append('pageSize', pageSize.toString());

    if (name) {
      queryParams.append('name', name);
    }
    if (email) {
      queryParams.append('email', email);
    }

    const response = await axios.get(`${baseUrl}/users?${queryParams.toString()}`);
    return response.data;
  } catch (error) {
    toast.error('Something is wrong');
    throw error;
  }
};


const deleteUser = async (id: number) => {
  try {
    const response = await axios.delete(`${baseUrl}/users/${id}`)
    return response.data
  } catch (error) {
    toast.error('Something is wrong')
    throw error;
  }
}

async function editUser(data: FormValues) {
  console.log(data)
  try {
    const response = await axios.put(`${baseUrl}/users/${data.id}`, data)
    return response.data;
  } catch (error) {
    toast.error('Something is wrong')
    throw error
  }
}

export { 
  createUser, 
  getUsers, 
  deleteUser,
  editUser 
}
