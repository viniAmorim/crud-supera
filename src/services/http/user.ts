import axios from 'axios'
import { ENDPOINTS } from './endpoints'

export interface FormValues {
  id: number;
  name: string;
  email: string;
  profile: 'Admin' | 'User'; 
  age: number | null; 
  phone: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  profile: string;
  age?: number;
}

interface IRequestGetUsers {
  profile?: string,
  name?: string,
  email?: string,
  currentPage: string,
  pageSize: number,
}

const baseUrl = process.env.REACT_APP_BASE_URL

export const getUserById = async (id: number): Promise<User | null> => {
  const response = await axios.get(`${baseUrl}/users/${id}`);
  return response.data;
};

export const createUser = async (data: FormValues) => {
  const response = await axios.post(`${baseUrl}/${ENDPOINTS.createUser}`, data)
  return response.data;
}

export const getUsers = async ({profile, name, email, currentPage, pageSize}: IRequestGetUsers): Promise<User[]> => {
  const queryParams = new URLSearchParams();
  const start = (Number(currentPage) - 1) * pageSize;

  if (name) {
    queryParams.append('name_like', name);
  }
  if (email) {
    queryParams.append('email_like', email);
  }
  if (profile) {
    queryParams.append('profile', profile);
  }

  queryParams.append('_start', start?.toString());
  queryParams.append('_limit', pageSize?.toString());

  const response = await axios.get(`${baseUrl}/users?${queryParams.toString()}`);
  
  return response.data;
};

export const deleteUser = async (id: number) => {
  const response = await axios.delete(`${baseUrl}/users/${id}`)
  return response.data
}

export const editUser = async (data: FormValues) => {
  const response = await axios.put(`${baseUrl}/users/${data.id}`, data)
  return response.data;
}
