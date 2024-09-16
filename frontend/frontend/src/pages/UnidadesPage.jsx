import React, { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import HeaderAdmin from "../components/HeaderAdmin.jsx";
import "../App.css";


const UnidadesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPropiedad, setSelectedPropiedad] = useState(null);
  const [unidadesDisponibles, setUnidadesDisponibles] = useState([]);
  const [unidadesOcupadas, setUnidadesOcupadas] = useState([]);

  // Función para buscar propiedad por ID
  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/propiedades/${searchTerm}`);
      setSelectedPropiedad(response.data);
    } catch (error) {
      console.error('Error al buscar la propiedad:', error);
      setSelectedPropiedad(null);
    }
  };

  const fetchUnidades = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/unidades');
      const { disponibles, ocupadas } = response.data;
      setUnidadesDisponibles(disponibles);
      setUnidadesOcupadas(ocupadas);
    } catch (error) {
      console.error('Error al obtener las unidades:', error);
    }
  };


  const handleChangeState = async (numeroUnidad) => {
    try {
      await axios.put(`http://localhost:8000/api/unidades/${numeroUnidad}/ocupar`);
      fetchUnidades(); 
    } catch (error) {
      console.error('Error al cambiar el estado de la unidad:', error);
    }
  };


  const handleSetAvailable = async (numeroUnidad) => {
    try {
      await axios.put(`http://localhost:8000/api/unidades/${numeroUnidad}/disponible`);
      fetchUnidades(); 
    } catch (error) {
      console.error('Error al cambiar el estado de la unidad a disponible:', error);
    }
  };

  useEffect(() => {
    fetchUnidades();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1">
          <HeaderAdmin />
          <main className="ml-44 bg-gray-100 pt-8 pb-40">
            <h1 className="text-3xl font-bold mb-4 mt-3 ml-8">Manejo de Unidades</h1>
            <p className="ml-8 text-xl">Aquí puedes administrar las unidades de tus propiedades.</p>

            <div className="ml-8 mt-6 flex flex-col items-center space-y-6 w-11/12">
              <hr className="my-8 border-t-2 border-gray-300 w-3/4" />
              <h2 className="text-2xl font-bold mt-4">Digite el ID de la propiedad</h2>
              <div className="flex flex-col space-y-4 w-full max-w-3xl h-96">
                <input
                  type="text"
                  placeholder="ID de la Propiedad"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-2 w-1/4 text-center mx-auto border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-oscuro focus:border-oscuro"
                />
                <button
                  className="mt-6 bg-oscuro hover:bg-medio text-white font-bold py-2 px-4 rounded self-center"
                  onClick={handleSearch}
                >
                  Buscar propiedad
                </button>
                <br />
                {/* Mostrar detalles de la propiedad */}
                {selectedPropiedad && (
                  <div className="mt-8 p-4 bg-white shadow-md w-5/12 rounded-lg mx-auto">
                    <h3 className="text-xl font-bold  mb-2">Detalles de Propiedad</h3>
                    <p><strong>Nombre:</strong> {selectedPropiedad.nombre}</p>
                    <p><strong>Dirección:</strong> {selectedPropiedad.direccion}</p>
                    <p><strong>Pisos:</strong> {selectedPropiedad.pisos}</p>
                    <p><strong>Cuota:</strong> {selectedPropiedad.cuota}</p>
                  </div>
                )}
              </div>
              <hr className="my-8 border-t-2 border-gray-300 w-3/4" />
            </div>

            {/* Tabla de Unidades Disponibles */}
            <div className="ml-8 mt-6 flex flex-col items-center space-y-6 w-11/12">
              <h2 className="text-2xl font-bold">Unidades Disponibles</h2>
              <div className="w-3/4 mt-8">
                <div className="max-h-[500px] overflow-y-auto">
                  <table className="table-auto w-full bg-white shadow-md rounded">
                    <thead>
                      <tr className="bg-gray-200 text-gray-700">
                        <th className="px-4 py-2 text-center">ID Propiedad</th>
                        <th className="px-4 py-2 text-center">Número de Unidad</th>
                        <th className="px-4 py-2 text-center">Nombre Inquilino</th>
                        <th className="px-4 py-2 text-center">Cédula</th>
                        <th className="px-4 py-2 text-center">Teléfono</th>
                        <th className="px-4 py-2 text-center">Coeficiente</th>
                        <th className="px-4 py-2 text-center">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {unidadesDisponibles.length > 0 ? (
                        unidadesDisponibles.map((unidad, index) => (
                          <tr key={index} className="border-t border-gray-300">
                            <td className="px-4 py-2 text-center">{unidad.idPropiedad}</td>
                            <td className="px-4 py-2 text-center">{unidad.numeroUnidad}</td>
                            <td className="px-4 py-2 text-center">
                              <input
                                type="text"
                                value={unidad.nombreInquilino}
                                onChange={(e) =>
                                  setUnidadesDisponibles((prevUnidades) =>
                                    prevUnidades.map((u) =>
                                      u.numeroUnidad === unidad.numeroUnidad
                                        ? { ...u, nombreInquilino: e.target.value }
                                        : u
                                    )
                                  )
                                }
                                className="px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-oscuro focus:border-oscuro"
                              />
                            </td>
                            <td className="px-4 py-2 text-center">
                              <input
                                type="text"
                                value={unidad.cedulaInquilino}
                                onChange={(e) =>
                                  setUnidadesDisponibles((prevUnidades) =>
                                    prevUnidades.map((u) =>
                                      u.numeroUnidad === unidad.numeroUnidad
                                        ? { ...u, cedulaInquilino: e.target.value }
                                        : u
                                    )
                                  )
                                }
                                className="px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-oscuro focus:border-oscuro"
                              />
                            </td>
                            <td className="px-4 py-2 text-center">
                              <input
                                type="text"
                                value={unidad.telefonoInquilino}
                                onChange={(e) =>
                                  setUnidadesDisponibles((prevUnidades) =>
                                    prevUnidades.map((u) =>
                                      u.numeroUnidad === unidad.numeroUnidad
                                        ? { ...u, telefonoInquilino: e.target.value }
                                        : u
                                    )
                                  )
                                }
                                className="px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-oscuro focus:border-oscuro"
                              />
                            </td>
                            <td className="px-4 py-2 text-center">{unidad.coeficiente}</td>
                            <td className="px-4 py-2 text-center">
                              <button
                                onClick={() => handleChangeState(unidad.numeroUnidad)}
                                className="text-green-500"
                              >
                                Ocupar
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7" className="px-4 py-2 text-center text-gray-500">
                            No hay unidades disponibles.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Tabla de Unidades Ocupadas */}
            <div className="ml-8 mt-6 flex flex-col items-center space-y-6 w-11/12">
              <h2 className="text-2xl font-bold">Unidades Ocupadas</h2>
              <div className="w-3/4 mt-8">
                <div className="max-h-[500px] overflow-y-auto">
                  <table className="table-auto w-full bg-white shadow-md rounded">
                    <thead>
                      <tr className="bg-gray-200 text-gray-700">
                        <th className="px-4 py-2 text-center">ID Propiedad</th>
                        <th className="px-4 py-2 text-center">Número de Unidad</th>
                        <th className="px-4 py-2 text-center">Nombre Inquilino</th>
                        <th className="px-4 py-2 text-center">Cédula</th>
                        <th className="px-4 py-2 text-center">Teléfono</th>
                        <th className="px-4 py-2 text-center">Coeficiente</th>
                        <th className="px-4 py-2 text-center">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {unidadesOcupadas.length > 0 ? (
                        unidadesOcupadas.map((unidad, index) => (
                          <tr key={index} className="border-t border-gray-300">
                            <td className="px-4 py-2 text-center">{unidad.idPropiedad}</td>
                            <td className="px-4 py-2 text-center">{unidad.numeroUnidad}</td>
                            <td className="px-4 py-2 text-center">{unidad.nombreInquilino}</td>
                            <td className="px-4 py-2 text-center">{unidad.cedulaInquilino}</td>
                            <td className="px-4 py-2 text-center">{unidad.telefonoInquilino}</td>
                            <td className="px-4 py-2 text-center">{unidad.coeficiente}</td>
                            <td className="px-4 py-2 text-center">
                              <button
                                onClick={() => handleSetAvailable(unidad.numeroUnidad)}
                                className="text-red-500"
                              >
                                Liberar
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="px-4 py-2 text-center text-gray-500">
                            No hay unidades ocupadas.
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

export default UnidadesPage;