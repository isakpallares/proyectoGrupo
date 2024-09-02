import DashboardPage from "./pages/DashboardPage";
import FinanzasPage from "./pages/FinanzasPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import ContactoPage from "./pages/ContactoPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/finanzas" element={<FinanzasPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/contacto" element={<ContactoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
