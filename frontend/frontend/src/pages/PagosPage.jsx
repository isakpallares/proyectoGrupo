import Sidebar from "../components/Sidebar";
import HeaderDashboard from "../components/HeaderDashboard.jsx";
import React, { useState } from "react";
import "../App.css";

function PagosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermPago, setSearchTermPago] = useState(""); // Nuevo estado para búsqueda de pagos
  const [pagos, setPagos] = useState([
    {
      idPago: 1,
      fechaPago: "2024-01-15",
      tipoPago: "Alquiler",
      montoPago: "$2000",
      idPropiedad: 1,
      idUnidad: "1",
      estado: false, 
    },
    {
      idPago: 2,
      fechaPago: "2024-02-15",
      tipoPago: "Alquiler",
      montoPago: "$3000",
      idPropiedad: 2,
      idUnidad: "2",
      estado: true,
    },
  ]);

  const [unidades, setUnidades] = useState([
    { idPropiedad: 1, numeroUnidad: "1", nombreInquilino: "Juan Pérez", cedulaInquilino: 1, telefonoInquilino: 1 },
    { idPropiedad: 2, numeroUnidad: "2", nombreInquilino: "Ana López", cedulaInquilino: 2, telefonoInquilino: 2 },
  ]);

  const [selectedUnidad, setSelectedUnidad] = useState(null);
  const [newPago, setNewPago] = useState({
    fechaPago: "",
    tipoPago: "",
    montoPago: "",
  });

  const handleSearchUnidad = () => {
    const unidad = unidades.find((unid) => unid.numeroUnidad === searchTerm);
    setSelectedUnidad(unidad);
  };

  const handleSearchPago = () => {
    // Puedes agregar lógica aquí si deseas buscar en todos los pagos o filtrar más
  };

  const handleChangeState = (idPago) => {
    setPagos((prevPagos) =>
      prevPagos.map((pago) =>
        pago.idPago === idPago
          ? {
              ...pago,
              estado: !pago.estado,
            }
          : pago
      )
    );
  };

  const handleAddPago = () => {
    if (!selectedUnidad) return;

    const newPagoId = pagos.length ? Math.max(pagos.map(p => p.idPago)) + 1 : 1;

    setPagos([
      ...pagos,
      {
        idPago: newPagoId,
        fechaPago: newPago.fechaPago,
        tipoPago: newPago.tipoPago,
        montoPago: newPago.montoPago,
        idPropiedad: selectedUnidad.idPropiedad,
        idUnidad: selectedUnidad.numeroUnidad,
        estado: false,
      },
    ]);

    setNewPago({
      fechaPago: "",
      tipoPago: "",
      montoPago: "",
    });
  };

  const pagosDeUnidad = selectedUnidad
    ? pagos.filter((pago) => pago.idUnidad === selectedUnidad.numeroUnidad)
    : [];

  const pagosFiltrados = pagosDeUnidad.filter((pago) =>
    pago.idPago.toString().includes(searchTermPago) ||
    pago.fechaPago.includes(searchTermPago) ||
    pago.tipoPago.toLowerCase().includes(searchTermPago.toLowerCase()) ||
    pago.montoPago.includes(searchTermPago)
  );
  const handleDeletePago = (idPago) => {
    setPagos((prevPagos) => prevPagos.filter((pago) => pago.idPago !== idPago));
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1">
          <HeaderDashboard />
          <main className="ml-44 bg-gray-100 pt-8 pb-40">
            <h1 className="text-3xl font-bold mb-4 mt-3 ml-8">
              Manejo de Pagos
            </h1>
            <p className="ml-8 text-xl">
              Aquí puedes administrar los pagos de tus propiedades.
            </p>

            <div className="ml-8 mt-6 flex flex-col items-center space-y-6 w-11/12">
              <hr className="my-8 border-t-2 border-gray-300 w-3/4" />
              <h2 className="text-2xl font-bold mt-4">
                Digite el Número de la Unidad
              </h2>
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
                    <p>
                      <strong>Número de Unidad:</strong> {selectedUnidad.numeroUnidad}
                    </p>
                    <p>
                      <strong>Nombre Inquilino:</strong> {selectedUnidad.nombreInquilino}
                    </p>
                    <p>
                      <strong>Cédula Inquilino:</strong> {selectedUnidad.cedulaInquilino}
                    </p>
                    <p>
                      <strong>Teléfono Inquilino:</strong> {selectedUnidad.telefonoInquilino}
                    </p>
                  </div>
                )}
              </div>
              <hr className="my-8 border-t-2 border-gray-300 w-3/4" />
            </div>

            {/* Buscar pagos */}
            <div className="ml-8 mt-6 flex flex-col items-center space-y-6 w-11/12">
              <h2 className="text-2xl font-bold">Buscar Pagos</h2>
              <div className="flex flex-col space-y-4 w-full max-w-3xl">
                <input
                  type="text"
                  placeholder="Buscar Pagos (ID, Fecha, Tipo, Monto)"
                  value={searchTermPago}
                  onChange={(e) => setSearchTermPago(e.target.value)}
                  className="px-4 py-2 border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-oscuro focus:border-oscuro"
                />
              </div>
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
                          <tr key={pago.idPago} className="border-t border-gray-300">
                            <td className="px-4 py-2 text-center">{pago.idPago}</td>
                            <td className="px-4 py-2 text-center">{pago.fechaPago}</td>
                            <td className="px-4 py-2 text-center">{pago.tipoPago}</td>
                            <td className="px-4 py-2 text-center">{pago.montoPago}</td>
                            <td className="px-4 py-2 text-center">{pago.idPropiedad}</td>
                            <td className="px-4 py-2 text-center">{pago.idUnidad}</td>
                            <td className="px-4 py-2 text-center">
                              {pago.estado ? "Pagado" : "No Pagado"}
                            </td>
                            <td className="px-4 py-2 text-center">
                              <input
                                type="checkbox"
                                checked={pago.estado}
                                onChange={() => handleChangeState(pago.idPago)}
                                className="form-checkbox"
                              />
                              
                            </td>
                            <td>
                            <button
                                onClick={() => handleDeletePago(pago.idPago)}
                                className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                              >
                                Eliminar
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="8"
                            className="px-4 py-2 text-center text-gray-500"
                          >
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
                      type="date"
                      placeholder="Fecha de Pago"
                      value={newPago.fechaPago}
                      onChange={(e) => setNewPago({ ...newPago, fechaPago: e.target.value })}
                      className="px-4 py-2 border rounded"
                    />
                    <input
                      type="text"
                      placeholder="Tipo de Pago"
                      value={newPago.tipoPago}
                      onChange={(e) => setNewPago({ ...newPago, tipoPago: e.target.value })}
                      className="px-4 py-2 border rounded"
                    />
                    <input
                      type="text"
                      placeholder="Monto de Pago"
                      value={newPago.montoPago}
                      onChange={(e) => setNewPago({ ...newPago, montoPago: e.target.value })}
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
    </div>
  );
}

export default PagosPage;
 