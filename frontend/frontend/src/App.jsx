import DashboardPage from "./pages/DashboardPage";
import PagosPage from "./pages/PagosPage";
import LoginPage from "./pages/LoginPage";
import PropiedadesPage from "./pages/PropiedadesPage";
import UsuariosPage from "./pages/UsuariosPage";
import ContactoPage from "./pages/ContactoPage";
import UnidadesPage from "./pages/UnidadesPage.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin/propiedades" element={<PropiedadesPage />} />
        <Route path="/admin/usuarios" element={<UsuariosPage />} />
        <Route path="/admin/unidades" element={<UnidadesPage />} />
        <Route path="/contacto" element={<ContactoPage />} />
        <Route path="/finanzas/pagos" element={<PagosPage />} />
      </Routes>
    </Router>
  );
}

export default App;
