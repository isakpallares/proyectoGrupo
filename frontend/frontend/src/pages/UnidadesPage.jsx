import React, { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import HeaderAdmin from "../components/HeaderAdmin.jsx";
import "../App.css";

function UnidadesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [propiedades, setPropiedades] = useState([
    {
      id: 1,
      nombre: "Propiedad 1",
      direccion: "123 Calle Principal",
      pisos: 3,
      cuota: "$2000",
      unidades: 10,
    },
    {
      id: 2,
      nombre: "Propiedad 2",
      direccion: "456 Avenida Secundaria",
      pisos: 5,
      cuota: "$3000",
      unidades: 20,
    },
    {
      id: 3,
      nombre: "Propiedad 2",
      direccion: "456 Avenida Secundaria",
      pisos: 5,
      cuota: "$3000",
      unidades: 20,
    },
    // Más propiedades aquí...
  ]);

  const [unidades, setUnidades] = useState([
    {
      idPropiedad: 1,
      numeroUnidad: "1",
      nombreInquilino: "",
      cedulaInquilino: "",
      telefonoInquilino: "",
      estado: "DISPONIBLE",
      coeficiente: 1123,
    },
    {
      idPropiedad: 2,
      numeroUnidad: "2",
      nombreInquilino: "Isak",
      cedulaInquilino: 2,
      telefonoInquilino: "2",
      estado: "OCUPADA",
      coeficiente: 2123,
    },
    {
      idPropiedad: 1,
      numeroUnidad: "3",
      nombreInquilino: "",
      cedulaInquilino: "",
      telefonoInquilino: "",
      estado: "DISPONIBLE",
      coeficiente: 10000,
    },
    {
      idPropiedad: 2,
      numeroUnidad: "4",
      nombreInquilino: "Dairo",
      cedulaInquilino: 4,
      telefonoInquilino: "4",
      estado: "OCUPADA",
      coeficiente: 23123,
    },
    {
      idPropiedad: 3,
      numeroUnidad: "4",
      nombreInquilino: "Dairo",
      cedulaInquilino: 4,
      telefonoInquilino: "4",
      estado: "OCUPADA",
      coeficiente: 23123,
    },
    // Más unidades aquí...
  ]);

  const [selectedPropiedad, setSelectedPropiedad] = useState(null);
  const [selectedPropiedadId, setSelectedPropiedadId] = useState(null);

  const handleSearch = () => {
    const propiedad = propiedades.find(
      (prop) => prop.id === parseInt(searchTerm)
    );
    setSelectedPropiedadId(searchTerm);
    setSelectedPropiedad(propiedad);
  };

  const handleChangeState = (numeroUnidad) => {
    setUnidades((prevUnidades) =>
      prevUnidades.map((unidad) =>
        unidad.numeroUnidad === numeroUnidad
          ? {
              ...unidad,
              estado: "OCUPADA",
            }
          : unidad
      )
    );
  };

  const unidadesDisponibles = unidades.filter(
    (unidad) =>
      unidad.idPropiedad === parseInt(selectedPropiedadId) &&
      unidad.estado === "DISPONIBLE"
  );
  const unidadesOcupadas = unidades.filter(
    (unidad) =>
      unidad.idPropiedad === parseInt(selectedPropiedadId) &&
      unidad.estado === "OCUPADA"
  );
   const isUnidadValid = (unidad) => {
     return (
       unidad.nombreInquilino.trim() !== "" &&
       unidad.cedulaInquilino.trim() !== "" &&
       unidad.telefonoInquilino.trim() !== ""
     );
   };
const handleSetAvailable = (numeroUnidad) => {
  setUnidades((prevUnidades) =>
    prevUnidades.map((unidad) =>
      unidad.numeroUnidad === numeroUnidad
        ? {
            ...unidad,
            estado: "DISPONIBLE",
            nombreInquilino: "",
            cedulaInquilino: "",
            telefonoInquilino: "",
          }
        : unidad
    )
  );
};
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
                </button><br></br>
                {/* Mostrar detalles de la propiedad */}
                {selectedPropiedad && (
                  <div className="mt-8 p-4 bg-white shadow-md w-5/12 rounded-lg mx-auto">
                    <h3 className="text-xl font-bold  mb-2">
                      Detalles de Propiedad
                    </h3>
                    <p>
                      <strong>Nombre:</strong> {selectedPropiedad.nombre}
                    </p>
                    <p>
                      <strong>Dirección:</strong> {selectedPropiedad.direccion}
                    </p>
                    <p>
                      <strong>Pisos:</strong> {selectedPropiedad.pisos}
                    </p>
                    <p>
                      <strong>Cuota:</strong> {selectedPropiedad.cuota}
                    </p>
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
                        <th className="px-4 py-2 text-center">
                          Número de Unidad
                        </th>
                        <th className="px-4 py-2 text-center">
                          Nombre Inquilino
                        </th>
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
                            <td className="px-4 py-2 text-center">
                              {unidad.idPropiedad}
                            </td>
                            <td className="px-4 py-2 text-center">
                              {unidad.numeroUnidad}
                            </td>
                            <td className="px-4 py-2 text-center">
                              <input
                                type="text"
                                value={unidad.nombreInquilino}
                                onChange={(e) =>
                                  setUnidades((prevUnidades) =>
                                    prevUnidades.map((u) =>
                                      u.numeroUnidad === unidad.numeroUnidad
                                        ? {
                                            ...u,
                                            nombreInquilino: e.target.value,
                                          }
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
                                  setUnidades((prevUnidades) =>
                                    prevUnidades.map((u) =>
                                      u.numeroUnidad === unidad.numeroUnidad
                                        ? {
                                            ...u,
                                            cedulaInquilino: e.target.value,
                                          }
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
                                  setUnidades((prevUnidades) =>
                                    prevUnidades.map((u) =>
                                      u.numeroUnidad === unidad.numeroUnidad
                                        ? {
                                            ...u,
                                            telefonoInquilino: e.target.value,
                                          }
                                        : u
                                    )
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
                                  handleChangeState(unidad.numeroUnidad)
                                }
                                disabled={!isUnidadValid(unidad)}
                                className="text-green-500"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-6 w-6"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="7"
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

            {/* Tabla de Unidades Ocupadas */}
            <div className="ml-8 mt-6 flex flex-col items-center space-y-6 w-11/12">
              <h2 className="text-2xl font-bold">Unidades Ocupadas</h2>
              <div className="w-3/4 mt-8">
                <div className="max-h-[500px] overflow-y-auto">
                  <table className="table-auto w-full bg-white shadow-md rounded">
                    <thead>
                      <tr className="bg-gray-200 text-gray-700">
                        <th className="px-4 py-2 text-center">ID Propiedad</th>
                        <th className="px-4 py-2 text-center">
                          Número de Unidad
                        </th>
                        <th className="px-4 py-2 text-center">
                          Nombre Inquilino
                        </th>
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
                            <td className="px-4 py-2 text-center">
                              {unidad.idPropiedad}
                            </td>
                            <td className="px-4 py-2 text-center">
                              {unidad.numeroUnidad}
                            </td>
                            <td className="px-4 py-2 text-center">
                              {unidad.nombreInquilino}
                            </td>
                            <td className="px-4 py-2 text-center">
                              {unidad.cedulaInquilino}
                            </td>
                            <td className="px-4 py-2 text-center">
                              {unidad.telefonoInquilino}
                            </td>
                            <td className="px-4 py-2 text-center">
                              {unidad.coeficiente}
                            </td>
                            <td>
                              <button
                                onClick={() =>
                                  handleSetAvailable(unidad.numeroUnidad)
                                }
                                className="text-red-500"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-6 w-6"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="6"
                            className="px-4 py-2 text-center text-gray-500"
                          >
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
}

export default UnidadesPage;
