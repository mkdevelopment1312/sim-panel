
interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  is_admin?: boolean;
}

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('token');
};

export const isAdmin = (): boolean => {
  const user = getUser();
  return user?.is_admin === true;
};

export const getUser = (): User | null => {
  const userData = localStorage.getItem('user');
  return userData ? JSON.parse(userData) : null;
};

export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

export const logout = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/auth';
};

export const setAuth = (token: string, user: User): void => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
};
