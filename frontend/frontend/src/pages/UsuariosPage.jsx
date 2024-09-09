import React, { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import HeaderAdmin from "../components/HeaderAdmin.jsx";
import { useNavigate } from "react-router-dom";
import "../App.css";
import iconUsuario from "../assets/usuarios.png";

function UsuariosPage() {
  const navigate = useNavigate(); 
  const [searchTerm, setSearchTerm] = useState("");
  const [usuarios, setUsuario] = useState([
    { email: "ale@gmail.com", contraseña: "1234" },
    { email: "epa@gmail.com", contraseña: "1234" },
    { email: "opa@gmail.com", contraseña: "1234" },
  ]);

  const [newUsuario, setNewUsuario] = useState({ email: "", contraseña: "" });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputPassword, setInputPassword] = useState("");
  const correctPassword = "admin123";

  const [editUsuarioEmail, setEditUsuarioEmail] = useState(null);
  const [editFormData, setEditFormData] = useState({
    email: "",
    contraseña: "",
  });
  const [showModal, setShowModal] = useState(true); // Mostrar el modal para la autenticación

  const filteredUsuarios = usuarios.filter((usuario) =>
    usuario.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChangeAñadir = (e) => {
    const { name, value } = e.target;
    setNewUsuario({ ...newUsuario, [name]: value });
  };

  const handleAddUsuario = () => {
    if (newUsuario.email && newUsuario.contraseña) {
      setUsuario([...usuarios, { ...newUsuario }]);
      setNewUsuario({ email: "", contraseña: "" });
    } else {
      alert("Por favor, completa todos los campos.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleEditClick = (usuario) => {
    setEditUsuarioEmail(usuario.email);
    setEditFormData({ email: usuario.email, contraseña: usuario.contraseña });
  };

  const handleSaveClick = (email) => {
    const updatedUsuarios = usuarios.map((usuario) =>
      usuario.email === email
        ? { ...usuario, contraseña: editFormData.contraseña }
        : usuario
    );
    setUsuario(updatedUsuarios);
    setEditUsuarioEmail(null); // Termina la edición
  };

  const handleDelete = (email) => {
    setUsuario(usuarios.filter((usuario) => usuario.email !== email));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (inputPassword === correctPassword) {
      setIsAuthenticated(true);
      setShowModal(false); // Oculta el modal después de autenticarse
    } else {
      alert("Contraseña incorrecta");
    }
  };
  const handleBackClick = () => {
   navigate("/admin/propiedades");
  };
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
                <div className="flex flex-col space-y-4 w-full max-w-2xl  h-96">
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={newUsuario.email}
                    onChange={handleInputChangeAñadir}
                    className="px-4 py-2 border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-oscuro focus:border-oscuro"
                  />
                  <input
                    type="text"
                    name="contraseña"
                    placeholder="Contraseña"
                    value={newUsuario.contraseña}
                    onChange={handleInputChangeAñadir}
                    className="px-4 py-2 border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-oscuro focus:border-oscuro"
                  />
                  <br></br>
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
                                  value={editFormData.contraseña}
                                  onChange={handleInputChange}
                                  className="border px-2"
                                />
                              ) : (
                                usuario.contraseña
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
}

export default UsuariosPage;
