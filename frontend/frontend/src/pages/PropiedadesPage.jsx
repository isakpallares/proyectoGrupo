import React, { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import HeaderAdmin from "../components/HeaderAdmin.jsx";
import "../App.css";
import { obtenerPropiedadPorNombre,obtenerPropiedades, crearPropiedad, actualizarPropiedad, eliminarPropiedad  } from './services/propiedadService';


function PropiedadesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [propiedades, setPropiedades] = useState([]);
  const [nuevaPropiedad, setNuevaPropiedad] = useState({
    nombre_propiedad: '',
    direccion_propiedad: '',
    numero_unidades: 0,
    cuota: 0,
    Presupuesto: 0
  });
  const [propiedadSeleccionada, setPropiedadSeleccionada] = useState(null);
  const [nombrePropiedad, setNombrePropiedad] = useState('');
  const [propiedad, setPropiedad] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarPropiedades = async () => {
      try {
        const propiedadesData = await obtenerPropiedades();
        setPropiedades(propiedadesData);
      } catch (error) {
        console.error('Error al cargar las propiedades:', error);
      }
    };

    cargarPropiedades();
  }, []);

  const agregarPropiedad = async () => {
    try {
      const nuevaProp = await crearPropiedad(nuevaPropiedad);
      setPropiedades([...propiedades, nuevaProp]);
    } catch (error) {
      console.error('Error al agregar la propiedad:', error);
    }
  };

  const buscarPropiedad = async () => {
    try {
      const resultado = await obtenerPropiedadPorNombre(nombrePropiedad); 
      if (resultado) {
        setPropiedad(resultado);
        setError(null);
      } else {
        setPropiedad(null);
        setError('No se encontró ninguna propiedad con ese nombre');
      }
    } catch (err) {
      console.error('Error al buscar la propiedad:', err);
      setError('Hubo un error al buscar la propiedad');
    }
  };

  const editarPropiedad = async (id) => {
    try {
      const propiedadActualizada = await actualizarPropiedad(id, propiedadSeleccionada);
      setPropiedades(propiedades.map(p => (p.id === id ? propiedadActualizada : p)));
    } catch (error) {
      console.error('Error al actualizar la propiedad:', error);
    }
  };

  const borrarPropiedad = async (id) => {
    try {
      await eliminarPropiedad(id);
      setPropiedades(propiedades.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error al eliminar la propiedad:', error);
    }
  };


  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1">
          <HeaderAdmin />
          <main className="ml-44 bg-gray-100 pt-8 pb-40">
            <h1 className="text-3xl font-bold mb-4 mt-3 ml-8">
              Manejo de Propiedades
            </h1>
            <p className="ml-8 text-xl">
              Aquí puedes crear, actualizar, eliminar y ver tus propiedades.
            </p>

            <div className="ml-8 mt-6 flex flex-col items-center space-y-6 w-11/12">
              <hr className="my-8 border-t-2 border-gray-300 w-3/4" />
              <h2 className="text-2xl font-bold mt-4">
                Añadir Nueva Propiedad
              </h2>
              <div className="flex flex-col space-y-4 w-full max-w-2xl  h-96">
                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre de la Propiedad"
                  value={newPropiedad.nombre}
                  onChange={handleInputChangeAñadir}
                  className="px-4 py-2 border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-oscuro focus:border-oscuro"
                />
                <input
                  type="text"
                  name="direccion"
                  placeholder="Dirección"
                  value={newPropiedad.direccion}
                  onChange={handleInputChangeAñadir}
                  className="px-4 py-2 border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-oscuro focus:border-oscuro"
                />
                <input
                  type="number"
                  name="pisos"
                  placeholder="Número de Pisos"
                  value={newPropiedad.pisos}
                  onChange={handleInputChangeAñadir}
                  className="px-4 py-2 border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-oscuro focus:border-oscuro"
                />
                <input
                  type="text"
                  name="cuota"
                  placeholder="Cuota"
                  value={newPropiedad.cuota}
                  onChange={handleInputChangeAñadir}
                  className="px-4 py-2 border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-oscuro focus:border-oscuro"
                />
                {/* Nuevo campo de Unidades */}
                <input
                  type="number"
                  name="unidades"
                  placeholder="Número de Unidades"
                  value={newPropiedad.unidades}
                  onChange={handleInputChangeAñadir}
                  className="px-4 py-2 border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-oscuro focus:border-oscuro"
                />
                <br></br>
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
              {/* Tabla con barra deslizadora */}
              <div className="w-3/4 mt-8">
                <div className="max-h-[500px] overflow-y-auto">
                  <table className="table-auto w-11/12 bg-white shadow-md rounded">
                    <thead>
                      <tr className="bg-gray-200 text-gray-700">
                        <th className="px-4 py-2 text-center">ID</th>
                        <th className="px-4 py-2 text-center">Nombre</th>
                        <th className="px-4 py-2 text-center">Dirección</th>
                        <th className="px-4 py-2 text-center">Pisos</th>
                        <th className="px-4 py-2 text-center">Cuota</th>
                        <th className="px-4 py-2 text-center">Unidades</th>{" "}
                        {/* Nuevo campo */}
                        <th className="px-4 py-2 text-center" colSpan={2}>
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPropiedades.map((propiedad, index) => (
                        <tr key={index} className="border-t border-gray-300">
                          <td className="px-4 py-2 text-center">
                            {propiedad.id}
                          </td>
                          <td className="px-4 py-2 text-center">
                            {editPropiedadId === propiedad.id ? (
                              <input
                                type="text"
                                name="nombre"
                                value={editFormData.nombre}
                                onChange={handleInputChange}
                                className="border px-2"
                              />
                            ) : (
                              propiedad.nombre
                            )}
                          </td>
                          <td className="px-4 py-2 text-center">
                            {editPropiedadId === propiedad.id ? (
                              <input
                                type="text"
                                name="direccion"
                                value={editFormData.direccion}
                                onChange={handleInputChange}
                                className="border px-2"
                              />
                            ) : (
                              propiedad.direccion
                            )}
                          </td>
                          <td className="px-4 py-2 text-center">
                            {editPropiedadId === propiedad.id ? (
                              <input
                                type="number"
                                name="pisos"
                                value={editFormData.pisos}
                                onChange={handleInputChange}
                                className="border px-2"
                              />
                            ) : (
                              propiedad.pisos
                            )}
                          </td>
                          <td className="px-4 py-2 text-center">
                            {editPropiedadId === propiedad.id ? (
                              <input
                                type="text"
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
                                name="unidades"
                                value={editFormData.unidades}
                                onChange={handleInputChange}
                                className="border px-2"
                              />
                            ) : (
                              propiedad.unidades
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
                          <td
                            colSpan="7"
                            className="px-4 py-2 text-center text-gray-500"
                          >
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
}

export default PropiedadesPage;
