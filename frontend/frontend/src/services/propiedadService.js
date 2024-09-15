import axios from 'axios';

const API_URL = 'http://localhost:8000/api/propiedades/';

export const obtenerPropiedades = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener las propiedades:', error);
    throw error;
  }
};


export const obtenerPropiedadPorNombre = async (nombrePropiedad) => {
  try {
    const response = await axios.get(`${API_URL}?search=${nombrePropiedad}`);
    return response.data.length > 0 ? response.data[0] : null;
  } catch (error) {
    console.error('Error al buscar la propiedad:', error);
    throw error;
  }
};

export const crearPropiedad = async (nuevaPropiedad) => {
  try {
    const response = await axios.post(API_URL, nuevaPropiedad);
    return response.data;
  } catch (error) {
    console.error('Error al crear la propiedad:', error);
    throw error;
  }
};

export const actualizarPropiedad = async (id, propiedadActualizada) => {
  try {
    const response = await axios.put(`${API_URL}${id}/`, propiedadActualizada);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar la propiedad:', error);
    throw error;
  }
};


export const eliminarPropiedad = async (id) => {
  try {
    await axios.delete(`${API_URL}${id}/`);
  } catch (error) {
    console.error('Error al eliminar la propiedad:', error);
    throw error;
  }
};
