import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import UnidadList from './components/UnidadList'
import PropiedadList from './components/PropiedadList'
import PropietarioList from './components/PropietarioList'
import InquilinoList from './components/InquilinoList'
import CuotaMantenimiento from './components/CuotaMantenimiento'
import GastosComunes from './components/GastosComunes'
import Pagos from './components/PagoList'
import ContratoServicios from './components/ContratoServicios'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Router>
            <Routes>
                <Route path="/propiedades" element={<PropiedadList />} />
                <Route path="/unidades" element={<UnidadList />} />
                <Route path="/propietarios" element={<PropietarioList />} />
                <Route path="/inquilinos" element={<InquilinoList />} />
                <Route path="/cuotas-mantenimiento" element={<CuotaMantenimiento />} />
                <Route path="/gastos-comunes" element={<GastosComunes />} />
                <Route path="/pagos" element={<Pagos />} />
                <Route path="/contratos-servicios" element={<ContratoServicios />} />
            </Routes>
        </Router>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}

export default App
