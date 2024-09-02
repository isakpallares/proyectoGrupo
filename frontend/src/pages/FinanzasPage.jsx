import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "../App.css";

function FinanzasPage() {

  
  return (
    <div className="flex m-0">
      <Sidebar />
      <Header />
      <Routes></Routes>
    </div>
  );
}

export default FinanzasPage;
