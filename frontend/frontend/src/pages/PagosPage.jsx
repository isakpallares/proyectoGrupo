import Sidebar from "../components/Sidebar";
import HeaderFinanzas from "../components/HeaderFinanzas.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import "../App.css";

function PagosPage() {
  return (
    <div className="flex m-0">
      <Sidebar />
      <HeaderFinanzas />
      <Routes></Routes>
    </div>
  );
}

export default PagosPage;
