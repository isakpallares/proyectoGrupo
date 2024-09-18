import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar.jsx";
import HeaderAdmin from "../components/HeaderAdmin.jsx";
import "../App.css";
import axios from "axios";

const UnidadesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPropiedad, setSelectedPropiedad] = useState(null);
  const [unidadesDisponibles, setUnidadesDisponibles] = useState([]);
  const [nuevaUnidad, setNuevaUnidad] = useState({
    id_propiedad: "",
    numero_unidad: "",
    nombre_inquilino: "",
    cedula_inquilino: "",
    telefono_inquilino: "",
    coeficiente: "",
  });

  // Handle input change for the new unit form
  const handleNuevaUnidadChange = (e) => {
    const { name, value } = e.target;
    setNuevaUnidad((prevUnidad) => ({
      ...prevUnidad,
      [name]: value,
    }));
  };


  // Search for property by ID
  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/propiedades/${searchTerm}`
      );
      setSelectedPropiedad(response.data);
    } catch (error) {
      console.error("Error al buscar la propiedad:", error);
      setSelectedPropiedad(null);
    }
  };

  // Fetch units
  const fetchUnidades = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/unidades");
      console.log("Datos de unidades:", response.data); // Verify here
      setUnidadesDisponibles(response.data); // Adjust according to data format
    } catch (error) {
      console.error("Error al obtener las unidades:", error);
    }
  };

  const handleSaveChanges = async (numeroUnidad, updatedData) => {
    try {
      console.log("Actualizando unidad con datos:", updatedData); 
      console.log("Número de unidad que se intenta actualizar:", numeroUnidad);
      await axios.put(
        `http://localhost:8000/api/unidades/${numeroUnidad}/`,
        updatedData
      );
      fetchUnidades(); 
    } catch (error) {
      console.error(
        "Error al guardar los cambios:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // Handle input changes in the table
  const handleInputChange = (numeroUnidad, field, value) => {
    setUnidadesDisponibles((prevUnidades) =>
      prevUnidades.map((u) =>
        u.numero_unidad === numeroUnidad ? { ...u, [field]: value } : u
      )
    );
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
            <h1 className="text-3xl font-bold mb-4 mt-3 ml-8">
              Manejo de Unidades
            </h1>
            <p className="ml-8 text-xl">
              Aquí puedes administrar las unidades de tus propiedades.
            </p>

            <div className="ml-8 mt-6 flex flex-col items-center space-y-6 w-11/12">
              <hr className="my-8 border-t-2 border-gray-300 w-3/4" />
              <h2 className="text-2xl font-bold mt-4">
                Digite el ID de la propiedad
              </h2>
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
                    <h3 className="text-xl font-bold mb-2">
                      Detalles de Propiedad
                    </h3>
                    <p>
                      <strong>Nombre:</strong>{" "}
                      {selectedPropiedad.nombre_propiedad}
                    </p>
                    <p>
                      <strong>Dirección:</strong>{" "}
                      {selectedPropiedad.direccion_propiedad}
                    </p>
                    <p>
                      <strong>aptos:</strong>{" "}
                      {selectedPropiedad.numero_unidades}
                    </p>
                    <p>
                      <strong>Cuota:</strong> {selectedPropiedad.cuota}%
                    </p>
                  </div>
                )}
              </div>
              <hr className="my-8 border-t-2 border-gray-300 w-3/4" />

              

              {/* Tabla de Unidades Disponibles */}
              <div className="ml-8 mt-6 flex flex-col items-center space-y-6 w-11/12">
                <h2 className="text-2xl font-bold">Unidades Disponibles</h2>
                <div className="w-3/4 mt-8">
                  <div className="max-h-[500px] overflow-y-auto">
                    <table className="table-auto w-full bg-white shadow-md rounded">
                      <thead>
                        <tr className="bg-gray-200 text-gray-700">
                          <th className="px-4 py-2 text-center">
                            ID Propiedad
                          </th>
                          <th className="px-4 py-2 text-center">
                            Número de Unidad
                          </th>
                          <th className="px-4 py-2 text-center">
                            Nombre Inquilino
                          </th>
                          <th className="px-4 py-2 text-center">Cédula</th>
                          <th className="px-4 py-2 text-center">Teléfono</th>
                          <th className="px-4 py-2 text-center">Coeficiente</th>
                          <th className="px-4 py-2 text-center">
                            Acciones
                          </th>{" "}
                          {/* Nueva columna */}
                        </tr>
                      </thead>
                      <tbody>
                        {unidadesDisponibles.length > 0 ? (
                          unidadesDisponibles.map((unidad) => (
                            <tr
                              key={unidad.numero_unidad}
                              className="border-t border-gray-300"
                            >
                              <td className="px-4 py-2 text-center">
                                {unidad.id_propiedad}
                              </td>
                              <td className="px-4 py-2 text-center">
                                {unidad.numero_unidad}
                              </td>
                              <td className="px-4 py-2 text-center">
                                <input
                                  type="text"
                                  value={unidad.nombre_inquilino || ""}
                                  onChange={(e) =>
                                    handleInputChange(
                                      unidad.numero_unidad,
                                      "nombre_inquilino",
                                      e.target.value
                                    )
                                  }
                                  className="px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-oscuro focus:border-oscuro"
                                />
                              </td>
                              <td className="px-4 py-2 text-center">
                                <input
                                  type="text"
                                  value={unidad.cedula_inquilino || ""}
                                  onChange={(e) =>
                                    handleInputChange(
                                      unidad.numero_unidad,
                                      "cedula_inquilino",
                                      e.target.value
                                    )
                                  }
                                  className="px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-oscuro focus:border-oscuro"
                                />
                              </td>
                              <td className="px-4 py-2 text-center">
                                <input
                                  type="text"
                                  value={unidad.telefono_inquilino || ""}
                                  onChange={(e) =>
                                    handleInputChange(
                                      unidad.numero_unidad,
                                      "telefono_inquilino",
                                      e.target.value
                                    )
                                  }
                                  className="px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-oscuro focus:border-oscuro"
                                />
                              </td>
                              <td className="px-4 py-2 text-center">
                                {unidad.coeficiente}
                              </td>
                              <td className="px-4 py-2 text-center">
                                <button
                                  onClick={() =>
                                    handleSaveChanges(unidad.numero_unidad, {
                                      numero_unidad: unidad.numero_unidad,
                                      id_propiedad: unidad.id_propiedad,
                                      nombre_inquilino: unidad.nombre_inquilino,
                                      cedula_inquilino: unidad.cedula_inquilino,
                                      telefono_inquilino:
                                      unidad.telefono_inquilino,
                                    })
                                  }
                                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                                >
                                  Guardar
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan="8"
                              className="px-4 py-2 text-center text-gray-500"
                            >
                              No hay unidades disponibles.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
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
