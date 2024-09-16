import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar.jsx";
import HeaderAdmin from "../components/HeaderAdmin.jsx";
import "../App.css";


const PropiedadesPage = () => {
  const [propiedades, setPropiedades] = useState([]);
  const [nuevaPropiedad, setNuevaPropiedad] = useState({
    nombre_propiedad: '',
    direccion_propiedad: '',
    numero_unidades: '',
    cuota: '',
    Presupuesto: ''
  });
  const [editFormData, setEditFormData] = useState({});
  const [editPropiedadId, setEditPropiedadId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Obtener todas las propiedades (GET)
  useEffect(() => {
    fetchPropiedades();
  }, []);

  const fetchPropiedades = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/propiedades/');
      setPropiedades(response.data);
    } catch (error) {
      console.error('Error al obtener propiedades:', error);
    }
  };

  // Añadir nueva propiedad (POST)
  const handleAddProperty = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/propiedades/', nuevaPropiedad);
      setPropiedades([...propiedades, response.data]);
      setNuevaPropiedad({ nombre_propiedad: '', direccion_propiedad: '', numero_unidades: '', cuota: '', Presupuesto: '' });
    } catch (error) {
      console.error('Error al añadir propiedad:', error);
    }
  };

  // Editar propiedad (PUT)
  const handleSaveClick = async (id) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/propiedades/${id}/`, editFormData);
      const updatedProperties = propiedades.map((propiedad) =>
        propiedad.id === id ? response.data : propiedad
      );
      setPropiedades(updatedProperties);
      setEditPropiedadId(null);
    } catch (error) {
      console.error('Error al guardar propiedad:', error);
    }
  };

  // Borrar propiedad (DELETE)
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/propiedades/${id}/`);
      const remainingProperties = propiedades.filter((propiedad) => propiedad.id !== id);
      setPropiedades(remainingProperties);
    } catch (error) {
      console.error('Error al eliminar propiedad:', error);
    }
  };

  const handleInputChangeAñadir = (e) => {
    const { name, value } = e.target;
    setNuevaPropiedad({ ...nuevaPropiedad, [name]: value });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleEditClick = (propiedad) => {
    setEditPropiedadId(propiedad.id);
    setEditFormData(propiedad);
  };

  const filteredPropiedades = propiedades.filter((propiedad) =>
    propiedad.nombre_propiedad.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1">
          <HeaderAdmin />
          <main className="ml-44 bg-gray-100 pt-8 pb-40">
            <h1 className="text-3xl font-bold mb-4 mt-3 ml-8">Manejo de Propiedades</h1>
            <p className="ml-8 text-xl">Aquí puedes crear, actualizar, eliminar y ver tus propiedades.</p>

            {/* Formulario para añadir nueva propiedad */}
            <div className="ml-8 mt-6 flex flex-col items-center space-y-6 w-11/12">
              <hr className="my-8 border-t-2 border-gray-300 w-3/4" />
              <h2 className="text-2xl font-bold mt-4">Añadir Nueva Propiedad</h2>
              <div className="flex flex-col space-y-4 w-full max-w-2xl  h-96">
                <input
                  type="text"
                  name="nombre_propiedad"
                  placeholder="Nombre de la Propiedad"
                  value={nuevaPropiedad.nombre_propiedad}
                  onChange={handleInputChangeAñadir}
                  className="px-4 py-2 border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-oscuro focus:border-oscuro"
                />
                <input
                  type="text"
                  name="direccion_propiedad"
                  placeholder="Dirección"
                  value={nuevaPropiedad.direccion_propiedad}
                  onChange={handleInputChangeAñadir}
                  className="px-4 py-2 border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-oscuro focus:border-oscuro"
                />
                <input
                  type="number"
                  name="numero_unidades"
                  placeholder="Número de Unidades"
                  value={nuevaPropiedad.numero_unidades}
                  onChange={handleInputChangeAñadir}
                  className="px-4 py-2 border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-oscuro focus:border-oscuro"
                />
                <input
                  type="number"
                  name="cuota"
                  placeholder="Cuota"
                  value={nuevaPropiedad.cuota}
                  onChange={handleInputChangeAñadir}
                  className="px-4 py-2 border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-oscuro focus:border-oscuro"
                />
                <input
                  type="number"
                  name="Presupuesto"
                  placeholder="Presupuesto"
                  value={nuevaPropiedad.Presupuesto}
                  onChange={handleInputChangeAñadir}
                  className="px-4 py-2 border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-oscuro focus:border-oscuro"
                />
                <button
                  className="mt-6 bg-oscuro hover:bg-medio text-white font-bold py-2 px-4 rounded self-center"
                  onClick={handleAddProperty}
                >
                  Añadir Propiedad
                </button>
              </div>
              <hr className="my-8 border-t-2 border-gray-300 w-3/4" />
            </div>

            {/* Barra de búsqueda */}
            <div className="ml-8 mt-6 flex flex-col items-center space-y-6 w-11/12">
              <input
                type="text"
                placeholder="Buscar propiedades..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border rounded w-full max-w-2xl"
              />
              {/* Tabla con las propiedades */}
              <div className="w-3/4 mt-8">
                <div className="max-h-[500px] overflow-y-auto">
                  <table className="table-auto w-11/12 bg-white shadow-md rounded">
                    <thead>
                      <tr className="bg-gray-200 text-gray-700">
                        <th className="px-4 py-2 text-center">ID</th>
                        <th className="px-4 py-2 text-center">Nombre</th>
                        <th className="px-4 py-2 text-center">Dirección</th>
                        <th className="px-4 py-2 text-center">Número de Unidades</th>
                        <th className="px-4 py-2 text-center">Cuota</th>
                        <th className="px-4 py-2 text-center">Presupuesto</th>
                        <th className="px-4 py-2 text-center" colSpan={2}>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPropiedades.map((propiedad, index) => (
                        <tr key={index} className="border-t border-gray-300">
                          <td className="px-4 py-2 text-center">{propiedad.id}</td>
                          <td className="px-4 py-2 text-center">
                            {editPropiedadId === propiedad.id ? (
                              <input
                                type="text"
                                name="nombre"
                                value={editFormData.nombre_propiedad}
                                onChange={handleInputChange}
                                className="border px-2"
                              />
                            ) : (
                              propiedad.nombre_propiedad
                            )}
                          </td>
                          <td className="px-4 py-2 text-center">
                            {editPropiedadId === propiedad.id ? (
                              <input
                                type="text"
                                name="direccion"
                                value={editFormData.direccion_propiedad}
                                onChange={handleInputChange}
                                className="border px-2"
                              />
                            ) : (
                              propiedad.direccion_propiedad
                            )}
                          </td>
                          <td className="px-4 py-2 text-center">
                            {editPropiedadId === propiedad.id ? (
                              <input
                                type="number"
                                name="numero_unidades"
                                value={editFormData.numero_unidades}
                                onChange={handleInputChange}
                                className="border px-2"
                              />
                            ) : (
                              propiedad.numero_unidades
                            )}
                          </td>
                          <td className="px-4 py-2 text-center">
                            {editPropiedadId === propiedad.id ? (
                              <input
                                type="number"
                                name="cuota"
                                value={editFormData.cuota}
                                onChange={handleInputChange}
                                className="border px-2"
                              />
                            ) : (
                              propiedad.cuota
                            )}
                          </td>
                          <td className="px-4 py-2 text-center">
                            {editPropiedadId === propiedad.id ? (
                              <input
                                type="number"
                                name="Presupuesto"
                                value={editFormData.Presupuesto}
                                onChange={handleInputChange}
                                className="border px-2"
                              />
                            ) : (
                              propiedad.Presupuesto
                            )}
                          </td>
                          <td className="px-4 py-2 text-center">
                            {editPropiedadId === propiedad.id ? (
                              <button
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => handleSaveClick(propiedad.id)}
                              >
                                Guardar
                              </button>
                            ) : (
                              <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                                onClick={() => handleEditClick(propiedad)}
                              >
                                Editar
                              </button>
                            )}
                          </td>
                          <td className="px-4 py-2">
                            <button
                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                              onClick={() => handleDelete(propiedad.id)}
                            >
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      ))}
                      {filteredPropiedades.length === 0 && (
                        <tr>
                          <td colSpan="7" className="px-4 py-2 text-center text-gray-500">
                            No se encontraron propiedades
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default PropiedadesPage;