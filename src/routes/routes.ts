export const ROUTES = {
  home: '/',
  registerUser: '/add-user',
  viewUser: (id = ':id') => `/view-user/${id}`,
  editUser: (id = ':id') => `/edit-user/${id}`
}