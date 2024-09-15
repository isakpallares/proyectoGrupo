import axios from 'axios';

const API_URL = 'http://localhost:8000/api/unidades/';


export const obtenerUnidades = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener las unidades:', error);
    throw error;
  }
};


export const obtenerUnidadPorId = async (id) => {
  try {
    const response = await axios.get(`${API_URL}${id}/`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener la unidad:', error);
    throw error;
  }
};


export const crearUnidad = async (nuevaUnidad) => {
  try {
    const response = await axios.post(API_URL, nuevaUnidad);
    return response.data;
  } catch (error) {
    console.error('Error al crear la unidad:', error);
    throw error;
  }
};


export const actualizarUnidad = async (id, unidadActualizada) => {
  try {
    const response = await axios.put(`${API_URL}${id}/`, unidadActualizada);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar la unidad:', error);
    throw error;
  }
};


export const eliminarUnidad = async (id) => {
  try {
    await axios.delete(`${API_URL}${id}/`);
  } catch (error) {
    console.error('Error al eliminar la unidad:', error);
    throw error;
  }
};
