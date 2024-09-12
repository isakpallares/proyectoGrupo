import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import iconUsuario from "../assets/iconUsuario.png";
import logout from "../assets/logout.png";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    //lógica de logout
    navigate("/");
  };

  const [selectedMenu, setSelectedMenu] = useState("pagos");
  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  return (
    <header className="bg-white shadow-md text-white p-4 header">
      <div className="container mx-auto flex justify-between items-center">
        <nav>
          <ul className="flex space-x-10 mt-4">
            <li
              className={`cursor-pointer ${
                selectedMenu === "pagos" ? "text-black underline" : ""
              }`}
              onClick={() => handleMenuClick("pagos")}
            >
              <Link to="/finanzas/pagos">Pagos</Link>
            </li>
            <li
              className={`cursor-pointer ${
                selectedMenu === "about" ? "text-black underline" : ""
              }`}
              onClick={() => handleMenuClick("about")}
            >
              <Link to="/about">About</Link>
            </li>
            <li
              className={`cursor-pointer ${
                selectedMenu === "services" ? "text-black underline" : ""
              }`}
              onClick={() => handleMenuClick("services")}
            >
              <Link to="/services">Services</Link>
            </li>
            <li
              className={`cursor-pointer ${
                selectedMenu === "contact" ? "text-black underline" : ""
              }`}
              onClick={() => handleMenuClick("contact")}
            >
              <Link to="/contact">Contact</Link>
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
