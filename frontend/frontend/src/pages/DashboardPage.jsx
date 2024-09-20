import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import HeaderDashboard from "../components/HeaderDashboard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ArcElement
);

const optionsBarLine = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          let label = context.dataset.label || "";
          if (label) {
            label += ": ";
          }
          if (context.parsed.y !== null) {
            label += context.parsed.y;
          }
          return label;
        },
      },
    },
  },
};

function DashboardPage() {
  const [dataPagos, setDataPagos] = useState([]);
  const [dataPropiedades, setDataPropiedades] = useState([]);
  const [dataUnidades, setDataUnidades] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pagosResponse = await axios.get(
          "http://localhost:8000/api/pagos"
        );
        const propiedadesResponse = await axios.get(
          "http://localhost:8000/api/propiedades"
        );
        const unidadesResponse = await axios.get(
          "http://localhost:8000/api/unidades"
        );

        setDataPagos(pagosResponse.data);
        setDataPropiedades(propiedadesResponse.data);
        setDataUnidades(unidadesResponse.data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);

  const getMonthlyPayments = (data) => {
    const monthlyPayments = Array(12).fill(0);
    data.forEach((pago) => {
      const month = new Date(pago.fecha_pago).getMonth();
      if (month >= 0 && month < 12) {
        monthlyPayments[month]++;
      }
    });
    return monthlyPayments;
  };

  const monthlyData = getMonthlyPayments(dataPagos);
  const labelsBar = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"];
  const labelsLine = [
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const dataBar = {
    labels: labelsBar,
    datasets: [
      {
        label: "Pagos en los primeros 6 meses",
        data: monthlyData.slice(0, 6),
        backgroundColor: ["rgba(153, 102, 255, 0.2)"],
        borderColor: ["rgba(153, 102, 255, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const dataLine = {
    labels: labelsLine,
    datasets: [
      {
        label: "Cantidad de Pagos (últimos 6 meses)",
        data: monthlyData.slice(6),
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderWidth: 2,
      },
    ],
  };

  const dataDoughnut = {
    labels: ["Pagos Pagados", "Pagos No Pagados"],
    datasets: [
      {
        label: "Distribución de Pagos",
        data: [
          dataPagos.filter((pago) => pago.estado === true).length,
          dataPagos.filter((pago) => pago.estado === false).length,
        ],
        backgroundColor: [
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(153, 102, 255, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1">
          <HeaderDashboard />
          <main className="p-4 ml-44 bg-gray-100 ">
            <h1 className="text-5xl font-bold mb-4 mt-3 ml-8">Bienvenido!</h1>
            <p className="ml-8 text-xl">Nos alegra que estés aquí.</p>

            <div className="bg-gray-100 p-4 mt-">
              <div className="max-w-9xl ml-5">
                <h2 className="text-xl font-bold mb-6">Resumen</h2>

                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-8">
                  <div className="bg-white rounded-lg p-6 shadow-md">
                    <h3 className="text-xl font-semibold mb-4">
                      Total de Pagos
                    </h3>
                    <p className="text-4xl font-bold mb-4">
                      $
                      {dataPagos.reduce(
                        (sum, pago) => sum + (pago.monto_pago || 0),
                        0
                      )}
                    </p>
                    <p className="text-sm text-gray-500">
                      Total de pagos registrados.
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-6 shadow-md">
                    <h3 className="text-xl font-semibold mb-4">
                      Propiedades Registradas
                    </h3>
                    <p className="text-4xl font-bold mb-4">
                      {dataPropiedades.length}
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-6 shadow-md">
                    <h3 className="text-xl font-semibold mb-4">
                      Unidades Registradas
                    </h3>
                    <p className="text-4xl font-bold mb-4">
                      {dataUnidades.length}
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-6 shadow-md">
                    <h3 className="text-xl font-semibold mb-4">
                      Cantidad de Pagos Registrados
                    </h3>
                    <p className="text-4xl font-bold mb-4">
                      {dataPagos.length}
                    </p>
                  </div>
                </div>

                <h2 className="text-xl font-bold mb-4 mt-8">Gráficos</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="grid grid-cols-1 gap-8">
                    <div className="p-6 bg-white rounded-lg shadow-md">
                      <h2 className="text-xl font-semibold mb-4">
                        Gráfico de Barras
                      </h2>
                      <div className="w-full">
                        <Bar data={dataBar} options={optionsBarLine} />
                      </div>
                    </div>

                    <div className="p-6 bg-white rounded-lg shadow-md">
                      <h2 className="text-xl font-semibold mb-4">
                        Gráfico de Líneas
                      </h2>
                      <div className="w-full">
                        <Line data={dataLine} options={optionsBarLine} />
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">
                      Gráfico Circular
                    </h2>
                    <div className="w-full">
                      <Doughnut data={dataDoughnut} options={optionsBarLine} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
