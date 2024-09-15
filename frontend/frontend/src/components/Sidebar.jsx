import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import dashboardNegro from "../assets/dashboardNegro.png";
import dashboardBlanco from "../assets/dashboardBlanco.png";
import finanzasNegro from "../assets/finanzasNegro.png";
import finanzasBlanco from "../assets/finanzasBlanco.png";
import adminNegro from "../assets/adminNegro.png";
import adminBlanco from "../assets/adminBlanco.png";
import contactoNegro from "../assets/contactoNegro.png";
import contactoBlanco from "../assets/contactoBlanco.png";
import logoNegroN from "../assets/logoNegroN.png";

const Sidebar = () => {
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState("");

  React.useEffect(() => {
    const pathname = location.pathname;

    if (pathname.includes("finanzas")) {
      setSelectedItem("finanzas");
    } else if (pathname.includes("admin")) {
      setSelectedItem("admin");
    } else if (pathname.includes("dashboard")) {
      setSelectedItem("dashboard");
    } else if (pathname.includes("contacto")) {
      setSelectedItem("contacto");
    }
  }, [location]);

  return (
    <div className="flex bg-white h-screen text-black fixed top-0 left-0 mr-96">
      <div className="w-64 p-4 sidebar">
        <img src={logoNegroN} alt="logo" className="imgLogo" />
        <ul>
          <li
            className={`menuItem cursor-pointer ${
              selectedItem === "dashboard"
                ? "bg-oscuro shadow-2xl text-white"
                : ""
            }`}
          >
            <Link to="/dashboard" className="">
              <img
                src={
                  selectedItem === "dashboard"
                    ? dashboardBlanco
                    : dashboardNegro
                }
                alt="Inicio"
                className="w-14 h-14 imgMenu"
              />
              Dashboard
            </Link>
          </li>

          <li
            className={`menuItem cursor-pointer ${
              selectedItem === "finanzas"
                ? "bg-oscuro shadow-2xl text-white"
                : ""
            }`}
          >
            <Link to="/finanzas/pagos" className="">
              <img
                src={
                  selectedItem === "finanzas" ? finanzasBlanco : finanzasNegro
                }
                alt="Finanzas"
                className="w-14 h-14 imgMenu"
              />
              Finanzas
            </Link>
          </li>

          <li
            className={`menuItem cursor-pointer ${
              selectedItem === "admin" ? "bg-oscuro shadow-2xl text-white" : ""
            }`}
          >
            <Link to="/admin/propiedades" className="">
              <img
                src={selectedItem === "admin" ? adminBlanco : adminNegro}
                alt="Administración"
                className="w-14 h-14 imgMenu"
              />
              Admin
            </Link>
          </li>

          <li
            className={`menuItem cursor-pointer ${
              selectedItem === "contacto"
                ? "bg-oscuro shadow-2xl text-white"
                : ""
            }`}
          >
            <Link to="/contacto" className="">
              <img
                src={
                  selectedItem === "contacto" ? contactoBlanco : contactoNegro
                }
                alt="Contacto"
                className="w-14 h-14 imgMenu"
              />
              Contacto
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
