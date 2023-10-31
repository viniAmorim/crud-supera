export const routes = {
  HOME: '/',
  REGISTER: '/add-user',
  VIEW: (id = ':id') => `/view-user/${id}`,
  EDIT: (id = ':id') => `/edit-user/${id}`
}