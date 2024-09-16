import axios from "axios";

const BASE_URL = "http://localhost:8000/api"; // Asegúrate de que esta URL sea correcta

export const obtenerPropiedades = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/propiedades`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener las propiedades:", error);
    throw error; // Lanza el error para que pueda ser manejado en el componente
  }
};

export const obtenerPropiedadPorNombre = async (nombrePropiedad) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/propiedades?search=${nombrePropiedad}`
    );
    return response.data.length > 0 ? response.data[0] : null;
  } catch (error) {
    console.error("Error al buscar la propiedad:", error);
    throw error;
  }
};

export const crearPropiedad = async (nuevaPropiedad) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/propiedades`,
      nuevaPropiedad
    );
    return response.data;
  } catch (error) {
    console.error("Error al crear la propiedad:", error);
    throw error;
  }
};

export const actualizarPropiedad = async (id, propiedadActualizada) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/propiedades/${id}/`,
      propiedadActualizada
    );
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la propiedad:", error);
    throw error;
  }
};

export const eliminarPropiedad = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/propiedades/${id}/`);
  } catch (error) {
    console.error("Error al eliminar la propiedad:", error);
    throw error;
  }
};
