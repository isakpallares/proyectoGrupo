import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import iconUsuario from "../assets/iconUsuario.png";
import logout from "../assets/logout.png";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Hook para obtener la ruta actual
  const [selectedMenu, setSelectedMenu] = useState("");

  // Esto asegura que el menú correcto esté seleccionado cuando la página cargue
  useEffect(() => {
    if (location.pathname.includes("propiedades")) {
      setSelectedMenu("propiedades");
    } else if (location.pathname.includes("unidades")) {
      setSelectedMenu("unidades");
    } else if (location.pathname.includes("usuarios")) {
      setSelectedMenu("usuarios");
    }
  }, [location.pathname]);

  const handleLogout = () => {
    navigate("/");
  };

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  return (
    <header className="bg-white shadow-md text-white p-4 header">
      <div className="container mx-auto flex justify-between items-center">
        <nav>
          <ul className="flex space-x-10 mt-4 ml-6">
            <li
              className={`cursor-pointer ${
                selectedMenu === "propiedades" ? "border-b-2 border-oscuro" : ""
              }`}
              onClick={() => handleMenuClick("propiedades")}
            >
              <Link to="/admin/propiedades">Propiedades</Link>
            </li>
            <li
              className={`cursor-pointer ${
                selectedMenu === "unidades" ? "border-b-2 border-oscuro " : ""
              }`}
              onClick={() => handleMenuClick("usuarios")}
            >
              <Link to="/admin/unidades">Unidades</Link>
            </li>
            <li
              
            >
            </li>
          </ul>
        </nav>
      </div>
      <div className="usuario bg-claro flex space-x-3 mt-4 rounded-lg">
        <img src={iconUsuario} alt="usuario" className="w-11 mx-auto"></img>
        <span className="ml-1 mt-1">Admin</span>
        <button className="" onClick={handleLogout}>
          <img src={logout} alt="Logout" className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
};

export default Header;
