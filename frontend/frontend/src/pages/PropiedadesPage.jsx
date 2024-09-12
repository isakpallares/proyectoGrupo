import React, { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import HeaderAdmin from "../components/HeaderAdmin.jsx";
import "../App.css";

function PropiedadesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [propiedades, setPropiedades] = useState([
    {
      id: 1,
      nombre: "Propiedad 1",
      direccion: "123 Calle Principal",
      pisos: 3,
      cuota: "$2000",
      unidades: 10, // Nueva propiedad con unidades
    },
    {
      id: 2,
      nombre: "Propiedad 2",
      direccion: "456 Avenida Secundaria",
      pisos: 5,
      cuota: "$3000",
      unidades: 20, // Nueva propiedad con unidades
    },
    {
      id: 3,
      nombre: "Propiedad 3",
      direccion: "456 Avenida Secundaria",
      pisos: 5,
      cuota: "$3000",
      unidades: 20, // Nueva propiedad con unidades
    },
    {
      id: 4,
      nombre: "Propiedad 4",
      direccion: "456 Avenida Secundaria",
      pisos: 5,
      cuota: "$3000",
      unidades: 20, // Nueva propiedad con unidades
    },
    {
      id: 5,
      nombre: "Propiedad 5",
      direccion: "456 Avenida Secundaria",
      pisos: 5,
      cuota: "$3000",
      unidades: 20, // Nueva propiedad con unidades
    },

    // Más propiedades aquí...
  ]);

  const [newPropiedad, setNewPropiedad] = useState({
    id: "",
    nombre: "",
    direccion: "",
    pisos: "",
    cuota: "",
    unidades: "", // Nuevo campo de unidades
  });

  const filteredPropiedades = propiedades.filter((propiedad) =>
    propiedad.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChangeAñadir = (e) => {
    const { name, value } = e.target;
    setNewPropiedad({ ...newPropiedad, [name]: value });
  };

  const handleAddProperty = () => {
    if (
      newPropiedad.nombre &&
      newPropiedad.direccion &&
      newPropiedad.pisos &&
      newPropiedad.cuota &&
      newPropiedad.unidades // Verifica que el campo de unidades esté completado
    ) {
      const newId = propiedades.length + 1;
      setPropiedades([...propiedades, { ...newPropiedad, id: newId }]);
      setNewPropiedad({
        id: "",
        nombre: "",
        direccion: "",
        pisos: "",
        cuota: "",
        unidades: "", // Reiniciar campo de unidades
      });
    } else {
      alert("Por favor, completa todos los campos.");
    }
  };

  const [editPropiedadId, setEditPropiedadId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    nombre: "",
    direccion: "",
    pisos: "",
    cuota: "",
    unidades: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleEditClick = (propiedad) => {
    setEditPropiedadId(propiedad.id);
    setEditFormData({
      nombre: propiedad.nombre,
      direccion: propiedad.direccion,
      pisos: propiedad.pisos,
      cuota: propiedad.cuota,
      unidades: propiedad.unidades,
    });
  };

  const handleSaveClick = (id) => {
    const updatedPropiedades = propiedades.map((propiedad) =>
      propiedad.id === id ? { ...propiedad, ...editFormData } : propiedad
    );
    setPropiedades(updatedPropiedades);
    setEditPropiedadId(null); // Termina la edición
  };

  const handleDelete = (id) => {
    setPropiedades(propiedades.filter((propiedad) => propiedad.id !== id));
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
