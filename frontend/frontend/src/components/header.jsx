// src/components/Header.jsx

import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import logo from "../assets/logo.png";


const Header = () => {
  return (
    <div>
      <h1 className="bg-dark text-white p-3">GestionaProp</h1>
      <img
        src={logo}
        alt="logo"
        style={{ width: "100px", height: "auto" }}
      />
    </div>
  );
};

export default Header;
