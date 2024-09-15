import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import iconUsuario from "../assets/iconUsuario.png";
import logout from "../assets/logout.png";

const HeaderDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    //lógica de logout
    navigate("/");
  };

  return (
    <header className="shadow-md bg-white text-white p-4 header">
      <div className="container mx-auto flex justify-between items-center"></div>
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

export default HeaderDashboard;
