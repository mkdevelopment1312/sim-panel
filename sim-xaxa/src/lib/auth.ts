
import { jwtDecode } from 'jwt-decode';

interface JWTPayload {
  userId: number;
  exp: number;
}

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const decoded = jwtDecode<JWTPayload>(token);
    return decoded.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

export const isAdmin = (): boolean => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return user.is_admin === true;
};

export const getUser = () => {
  return JSON.parse(localStorage.getItem('user') || '{}');
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/auth';
};
