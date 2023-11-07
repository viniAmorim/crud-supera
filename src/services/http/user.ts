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
  _start?: string,
  _limit?: string,
}

interface IRequestGetUsersParams {
  profile?: string;
  name?: string;
  email?: string;
  _start: string;
  _limit: string;
}

export type IProfile = 'Admin' | 'User'

const baseUrl = process.env.REACT_APP_BASE_URL

const apiUser = axios.create({baseURL: baseUrl})

export const getUserById = async (id: number): Promise<User | null> => {
  const response = await apiUser.get(`${ENDPOINTS.users}/${id}`);
  return response.data;
};

export const createUser = async (data: FormValues) => {
  const response = await apiUser.post(`/${ENDPOINTS.createUser}`, data)
  return response.data;
}

// export const getUsers = async ({profile, name, email, currentPage, pageSize}: IRequestGetUsers): Promise<User[]> => {
//   const queryParams = new URLSearchParams();
//   const start = (Number(currentPage) - 1) * pageSize;

//   if (name) {
//     queryParams.append('name_like', name);
//   }
//   if (email) {
//     queryParams.append('email_like', email);
//   }
//   if (profile) {
//     queryParams.append('profile', profile);
//   }

//   queryParams.append('_start', start?.toString());
//   queryParams.append('_limit', pageSize?.toString());

//   const response = await apiUser.get(`${ENDPOINTS.users}?${queryParams.toString()}`);
  
//   return response.data;
// }

export const getUsers = async (params: IRequestGetUsers): Promise<User[]> => {
  Object.keys(params).forEach(key => {
		const filter = params[key as keyof typeof params];
		if (!filter) delete params[key as keyof typeof params];
	})

  const start = (Number(params.currentPage) - 1) * params.pageSize

  params['_start'] = start.toString()
  params['_limit'] = params.pageSize.toString()

  const { currentPage, pageSize, ...filteredParams } = params

  const requestParams: IRequestGetUsersParams = {
    _start: String((Number(currentPage) - 1) * pageSize),
    _limit: String(pageSize),
    ...filteredParams,
  }

  const response = await apiUser.get(`${ENDPOINTS.users}`, {params: requestParams});
  
  return response.data;
}

export const deleteUser = async (id: number) => {
  const response = await apiUser.delete(`${ENDPOINTS.users}/${id}`)
  return response.data
}

export const editUser = async (data: FormValues) => {
  const response = await apiUser.put(`${ENDPOINTS.users}/${data.id}`, data)
  return response.data;
}
