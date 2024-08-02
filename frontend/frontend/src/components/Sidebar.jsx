// src/components/Sidebar.jsx

import React from "react";
import { Nav } from "react-bootstrap";
import dashboard from "../assets/dashboard.png";
// Importa componentes de React-Bootstrap

const Sidebar = () => {
  return (
    <div
      className="sidebar bg-dark text-white p-3"
      style={{ height: "100vh", width: "250px" }}
    >
      <h2>Menu</h2>
      <Nav className="flex-column">
        <img
          src={dashboard}
          alt="dashboard"
          className="img-fluid"
          style={{ width: "100px", height: "auto" }}
        />
        <Nav.Link href="#home" className="text-white">
          Home
        </Nav.Link>
        <Nav.Link href="#about" className="text-white">
          About
        </Nav.Link>
        <Nav.Link href="#services" className="text-white">
          Services
        </Nav.Link>
        <Nav.Link href="#contact" className="text-white">
          Contact
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
