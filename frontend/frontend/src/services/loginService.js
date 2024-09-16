import axios from 'axios';

const API_URL = 'http://localhost:8000/api/usuarios/';  

export const login = async (email, password) => {
  try {
    const response = await axios.post(API_URL, { email, password });


    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }

    return response.data;
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};
