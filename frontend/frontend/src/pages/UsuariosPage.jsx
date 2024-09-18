import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar.jsx";
import HeaderAdmin from "../components/HeaderAdmin.jsx";
import { useNavigate } from "react-router-dom";
import "../App.css";
import iconUsuario from "../assets/usuarios.png";
import axios from "axios";

const UsuariosPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputPassword, setInputPassword] = useState("");
  const [newUsuario, setNewUsuario] = useState({ email: "", contraseña: "" });
  const [usuarios, setUsuarios] = useState([]);
  const [editUsuarioEmail, setEditUsuarioEmail] = useState(null);
  const [editFormData, setEditFormData] = useState({ contraseña: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsuarios, setFilteredUsuarios] = useState([]);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (inputPassword === "tu_contraseña") {
      setIsAuthenticated(true);
      setShowModal(false);
    } else {
      alert("Contraseña incorrecta");
    }
  };

  const handleBackClick = () => {
    setShowModal(false);
  };

  // Obtener usuarios desde la API
  const fetchUsuarios = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/usuarios");
      setUsuarios(response.data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  // Crear un nuevo usuario
  const handleAddUsuario = async () => {
    try {
      await axios.post("http://localhost:8000/api/usuarios", newUsuario);
      fetchUsuarios(); // Refrescar lista de usuarios
      setNewUsuario({ email: "", password: "" }); // Limpiar el formulario
    } catch (error) {
      console.error("Error al añadir usuario:", error);
    }
  };

  // Eliminar usuario
  const handleDelete = async (email) => {
    try {
      await axios.delete(`http://localhost:8000/api/usuarios/${email}`);
      fetchUsuarios(); // Refrescar lista de usuarios
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  // Editar usuario
  const handleEditClick = (usuario) => {
    setEditUsuarioEmail(usuario.email);
    setEditFormData({ password: usuario.password });
  };

  // Guardar cambios de edición
  const handleSaveClick = async (email) => {
    try {
      await axios.put(
        `http://localhost:8000/api/usuarios/${email}`,
        editFormData
      );
      setEditUsuarioEmail(null); // Salir del modo de edición
      fetchUsuarios(); // Refrescar lista de usuarios
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
    }
  };

  // Manejar cambios en el formulario de añadir y editar
  const handleInputChangeAñadir = (e) => {
    setNewUsuario({ ...newUsuario, [e.target.name]: e.target.value });
  };

  const handleInputChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  // Filtrar usuarios por término de búsqueda
  useEffect(() => {
    setFilteredUsuarios(
      usuarios.filter((usuario) =>
        usuario.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, usuarios]);

  // Cargar usuarios cuando el componente se monta
  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      {/* Modal de autenticación */}
      {showModal && (
        <div className="difuminado containerDifuminado">
          <div className="containerAviso">
            <h2 className="text-2xl font-bold mb-4">Ingrese la contraseña</h2>
            <form onSubmit={handlePasswordSubmit}>
              <input
                type="password"
                placeholder="Contraseña"
                value={inputPassword}
                onChange={(e) => setInputPassword(e.target.value)}
                className="px-4 py-2 border rounded w-full mb-4"
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/4 ml-28 mr-12"
              >
                Entrar
              </button>
              <button
                type="button"
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-1/4"
                onClick={handleBackClick}
              >
                Volver
              </button>
            </form>
          </div>
        </div>
      )}
      {/* Contenido principal */}
      {isAuthenticated && (
        <div className="flex flex-1">
          <Sidebar />
          <div className="flex-1">
            <HeaderAdmin />
            <main className="ml-44 bg-gray-100 pt-8 pb-40">
              <h1 className="text-3xl font-bold mb-4 mt-3 ml-8">
                Manejo de Usuarios
              </h1>
              <p className="ml-8 text-xl">
                Aquí puedes crear, actualizar, eliminar y ver tus usuarios.
              </p>
              <div className="ml-8 mt-6 flex flex-col items-center space-y-6 w-11/12">
                <hr className="my-8 border-t-2 border-gray-300 w-3/4" />
                <h2 className="text-2xl font-bold mt-4">
                  Añadir Nuevo Usuario
                </h2>
                <img
                  src={iconUsuario}
                  alt="usuario"
                  className="w-40 mx-auto"
                ></img>
                <div className="flex flex-col space-y-4 w-full max-w-2xl h-96">
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={newUsuario.email}
                    onChange={handleInputChangeAñadir}
                    className="px-4 py-2 border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-oscuro focus:border-oscuro"
                  />
                  <input
                    type="password"
                    name="contraseña"
                    placeholder="Contraseña"
                    value={newUsuario.contraseña}
                    onChange={handleInputChangeAñadir}
                    className="px-4 py-2 border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-oscuro focus:border-oscuro"
                  />
                  <br />
                  <button
                    className="mt-6 bg-oscuro hover:bg-medio text-white font-bold py-2 px-4 rounded self-center"
                    onClick={handleAddUsuario}
                  >
                    Añadir Usuario
                  </button>
                </div>
                <hr className="my-8 border-t-2 border-gray-300 w-3/4" />
              </div>
              {/* Barra de búsqueda */}
              <div className="ml-8 mt-6 flex flex-col items-center space-y-6 w-11/12">
                <input
                  type="text"
                  placeholder="Buscar usuarios..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-2 border rounded w-full max-w-2xl focus:outline-none focus:ring-2 focus:ring-oscuro focus:border-oscuro"
                />
                {/* Tabla con barra deslizadora */}
                <div className="w-3/4 mt-8">
                  <div className="max-h-[500px] overflow-y-auto">
                    <table className="table-auto w-11/12 bg-white shadow-md rounded">
                      <thead>
                        <tr className="bg-gray-200 text-gray-700">
                          <th className="px-4 py-2 text-center">Email</th>
                          <th className="px-4 py-2 text-center">Contraseña</th>
                          <th className="px-4 py-2 text-center" colSpan={2}>
                            Acciones
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsuarios.map((usuario, index) => (
                          <tr key={index} className="border-t border-gray-300">
                            <td className="px-4 py-2 text-center">
                              {usuario.email}
                            </td>
                            <td className="px-4 py-2 text-center">
                              {editUsuarioEmail === usuario.email ? (
                                <input
                                  type="text"
                                  name="contraseña"
                                  value={editFormData.password}
                                  onChange={handleInputChange}
                                  className="border px-2"
                                />
                              ) : (
                                usuario.password
                              )}
                            </td>
                            <td className="px-4 py-2 text-center">
                              {editUsuarioEmail === usuario.email ? (
                                <button
                                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                  onClick={() => handleSaveClick(usuario.email)}
                                >
                                  Guardar
                                </button>
                              ) : (
                                <button
                                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                  onClick={() => handleEditClick(usuario)}
                                >
                                  Editar
                                </button>
                              )}
                            </td>
                            <td className="px-4 py-2 text-center">
                              <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => handleDelete(usuario.email)}
                              >
                                Eliminar
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsuariosPage;
