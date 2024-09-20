import Sidebar from "../components/Sidebar";

import HeaderFinanzas from "../components/HeaderFinanzas.jsx";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

function PagosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermPago, setSearchTermPago] = useState("");
  const [pagos, setPagos] = useState([]);
  const [unidades, setUnidades] = useState([]);
  const [selectedUnidad, setSelectedUnidad] = useState(null);
  const [newPago, setNewPago] = useState({
    fechaPago: "",
    tipoPago: "",
    montoPago: "",
    idUnidad: "",
  });

  const fetchUnidades = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/unidades");
      setUnidades(response.data);
      console.log("Unidades:", response.data);
    } catch (error) {
      console.error("Error al obtener las unidades:", error);
    }
  };

  const fetchPagos = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/pagos");
      setPagos(response.data);
      console.log("Pagos:", response.data);
    } catch (error) {
      console.error("Error al obtener los pagos:", error);
    }
  };

  const handleSearchUnidad = () => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();
    const unidad = unidades.find(
      (unid) => unid.numero_unidad.toString().toLowerCase() === normalizedSearchTerm
    );
    setSelectedUnidad(unidad);
  };

  const handleAddPago = async () => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await axios.post(
        'http://localhost:8000/api/pagos/',
        {
          ...newPago,
          numero_unidad: selectedUnidad?.numero_unidad,
          id_propiedad: selectedUnidad.id_propiedad,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );
      console.log('Pago agregado con éxito:', response.data);
      fetchPagos(); // Refrescar la lista de pagos después de agregar el nuevo
    } catch (error) {
      console.error('Error al agregar el pago:', error.response?.data || error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPago((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    fetchUnidades();
    fetchPagos();
  }, []);

  const handleChangeState = async (id_pago) => {
    const token = localStorage.getItem('token');
  
    // Encontrar el pago en base a su ID
    const pago = pagos.find((p) => p.id_pago === id_pago);
    
    if (pago) {
      const newEstado = !pago.estado; 
  
      try {
        // Actualiza el estado en el backend
        await axios.patch(
          `http://localhost:8000/api/pagos/${id_pago}/`, 
          { estado: newEstado },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
  
        setPagos((prevPagos) =>
          prevPagos.map((p) =>
            p.id_pago === id_pago ? { ...p, estado: newEstado } : p
          )
        );
  
        console.log('Estado del pago actualizado correctamente');
      } catch (error) {
        console.error('Error al actualizar el estado del pago:', error.response?.data || error.message);
      }
    }
  };
  
  
  


  const pagosDeUnidad = selectedUnidad
    ? pagos.filter((pago) => pago.idUnidad === selectedUnidad.numeroUnidad)
    : [];

  const pagosFiltrados = pagosDeUnidad.filter((pago) =>
    pago.fecha_pago.includes(searchTermPago) ||
    pago.tipo_pago.toLowerCase().includes(searchTermPago.toLowerCase()) ||
    pago.monto_pago.includes(searchTermPago)
  );
  return (
    <div className="flex m-0 h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <HeaderFinanzas />
        <main className="ml-44 bg-gray-100 pt-8 pb-40">
          <h1 className="text-3xl font-bold mb-4 mt-3 ml-8">Manejo de Pagos</h1>
          <p className="ml-8 text-xl">Aquí puedes administrar los pagos de tus propiedades.</p>
  
          {/* Buscar Unidad */}
          <div className="ml-8 mt-6 flex flex-col items-center space-y-6 w-11/12">
            <hr className="my-8 border-t-2 border-gray-300 w-3/4" />
            <h2 className="text-2xl font-bold mt-4">Digite el Número de la Unidad</h2>
            <div className="flex flex-col space-y-4 w-full max-w-3xl h-96">
              <input
                type="text"
                placeholder="Número de la Unidad"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 w-1/4 text-center mx-auto border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-oscuro focus:border-oscuro"
              />
              <button
                className="mt-6 bg-oscuro hover:bg-medio text-white font-bold py-2 px-4 rounded self-center"
                onClick={handleSearchUnidad}
              >
                Buscar Unidad
              </button>
              {/* Mostrar detalles de la unidad */}
              {selectedUnidad && (
                <div className="mt-8 p-4 bg-white shadow-md w-5/12 rounded-lg mx-auto">
                  <h3 className="text-xl font-bold mb-2">Detalles de Unidad</h3>
                  
                  <p><strong>Número de Unidad:</strong> {selectedUnidad.numero_unidad}</p>
                  <p><strong>Nombre Inquilino:</strong> {selectedUnidad.nombre_inquilino}</p>
                  <p><strong>Cédula Inquilino:</strong> {selectedUnidad.cedula_inquilino}</p>
                  <p><strong>Teléfono Inquilino:</strong> {selectedUnidad.telefono_inquilino}</p>
                </div>
              )}
            </div>
            <hr className="my-8 border-t-2 border-gray-300 w-3/4" />
          </div>
  
  
          {/* Tabla de Pagos */}
          <div className="ml-8 mt-6 flex flex-col items-center space-y-6 w-11/12">
            <h2 className="text-2xl font-bold">Pagos</h2>
            <div className="w-3/4 mt-8">
              <div className="max-h-[500px] overflow-y-auto">
                <table className="table-auto w-full bg-white shadow-md rounded">
                  <thead>
                    <tr className="bg-gray-200 text-gray-700">
                      <th className="px-4 py-2 text-center">ID Pago</th>
                      <th className="px-4 py-2 text-center">Fecha Pago</th>
                      <th className="px-4 py-2 text-center">Tipo Pago</th>
                      <th className="px-4 py-2 text-center">Monto Pago</th>
                      <th className="px-4 py-2 text-center">ID Propiedad</th>
                      <th className="px-4 py-2 text-center">ID Unidad</th>
                      <th className="px-4 py-2 text-center">Estado</th>
                      <th className="px-4 py-2 text-center" colSpan={2}>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
  {pagosFiltrados.length > 0 ? (
    pagosFiltrados.map((pago) => (
      <tr key={pago.id_pago} className="border-t border-gray-300">
        <td className="px-4 py-2 text-center">{pago.id_pago}</td>
        <td className="px-4 py-2 text-center">{pago.fecha_pago}</td>
        <td className="px-4 py-2 text-center">{pago.tipo_pago}</td>
        <td className="px-4 py-2 text-center">{pago.monto_pago}</td>
        <td className="px-4 py-2 text-center">{pago.id_propiedad}</td>
        <td className="px-4 py-2 text-center">{selectedUnidad.numero_unidad}</td>
        <td className="px-4 py-2 text-center">
          {pago.estado ? "Pagado" : "No Pagado"}
        </td>
        <td className="px-4 py-2 text-center">
          <input
            type="checkbox"
            checked={pago.estado}
            onChange={() => handleChangeState(pago.id_pago)} // Cambiar estado localmente
            className="form-checkbox"
          />
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="8" className="px-4 py-2 text-center text-gray-500">
        No hay pagos para esta búsqueda.
      </td>
    </tr>
  )}
</tbody>

                </table>
              </div>
            </div>
          </div>
  
          {/* Formulario para agregar nuevo pago */}
          {selectedUnidad && (
            <div className="ml-8 mt-8 flex flex-col items-center space-y-6 w-11/12">
              <h2 className="text-2xl font-bold">Agregar Pago</h2>
              <div className="w-3/4 max-w-3xl">
                <div className="flex flex-col space-y-4">
                <input
                    type="text"
                    placeholder="ID del pago"
                    value={newPago.id_pago}
                    onChange={(e) => setNewPago({ ...newPago, id_pago : e.target.value })}
                    className="px-4 py-2 border rounded"
                  />
                  <input
                    type="date"
                    placeholder="Fecha de Pago"
                    value={newPago.fecha_pago}
                    onChange={(e) => setNewPago({ ...newPago, fecha_pago: e.target.value })}
                    className="px-4 py-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="Tipo de Pago"
                    value={newPago.tipo_pago}
                    onChange={(e) => setNewPago({ ...newPago, tipo_pago: e.target.value })}
                    className="px-4 py-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="Monto de Pago"
                    value={newPago.monto_pago}
                    onChange={(e) => setNewPago({ ...newPago, monto_pago: e.target.value })}
                    className="px-4 py-2 border rounded"
                  />
                  <button
                    className="bg-oscuro hover:bg-medio text-white font-bold py-2 px-4 rounded"
                    onClick={handleAddPago}
                  >
                    Agregar Pago
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default PagosPage;
