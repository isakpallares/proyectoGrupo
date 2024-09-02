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

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const dataBar = {
  labels: labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [12, 19, 3, 5, 2, 3, 7],
      backgroundColor: ["rgba(153, 102, 255, 0.2)"],
      borderColor: ["rgba(153, 102, 255, 1)"],
      borderWidth: 1,
    },
    {
      label: "Dataset 2",
      data: [7, 11, 5, 8, 3, 7, 9],
      borderColor: "rgba(54, 162, 235, 1)",
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderWidth: 1,
    },
  ],
};

const dataLine = {
  labels: labels,
  datasets: [
    {
      label: "Fully Rounded",
      data: [12, 19, 3, 5, 2, 3, 7],
      borderColor: "rgba(54, 162, 235, 1)",
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderWidth: 2,
      borderRadius: Number.MAX_VALUE,
      borderSkipped: false,
    },
    {
      label: "Small Radius",
      data: [7, 11, 5, 8, 3, 7, 9],
      borderColor: "rgba(153, 102, 255, 1)",
      backgroundColor: " rgba(153, 102, 255, 0.2)",
      borderWidth: 2,
      borderRadius: 5,
      borderSkipped: false,
    },
  ],
};

const dataDoughnut = {
  labels: ["Purple", "Blue"],
  datasets: [
    {
      label: "Doughnut Chart",
      data: [12, 19],
      backgroundColor: ["rgba(153, 102, 255, 0.3)", "rgba(54, 162, 235, 0.3)"],
      borderColor: ["rgba(153, 102, 255, 1)", "rgba(54, 162, 235, 1)"],
      borderWidth: 1,
    },
  ],
};

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
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1">
          <HeaderDashboard />
          <main className="p-4 ml-44 bg-gray-100 ">
            <h1 className="text-5xl font-bold mb-4 mt-3 ml-8">Bienvenido!</h1>
            <p className="ml-8 text-xl">Nos alegra que estés aquí.</p>

            <div className="bg-gray-100 p-4 mt-8">
              <div className="max-w-9xl ml-5">
                <h2 className="text-xl font-bold mb-6">Resumen</h2>

                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-5 gap-8">
                  {/* Tarjeta 1 */}
                  <div className="bg-white rounded-lg p-6 shadow-md">
                    <h3 className="text-xl font-semibold mb-4">
                      Presupuesto
                    </h3>
                    <p className="text-4xl font-bold mb-4">$76.000.000</p>
                    <p className="text-sm text-gray-500">
                      Presupuesto para el año en curso
                    </p>
                  </div>

                  {/* Tarjeta 2 */}
                  <div className="bg-white rounded-lg p-6 shadow-md">
                    <h3 className="text-xl font-semibold mb-4">
                      Apartamentos
                    </h3>
                    <p className="text-4xl font-bold mb-4">336</p>
                    <p className="text-sm text-gray-500">
                      Cantidad que tiene esta Propiedad
                    </p>
                  </div>

                  {/* Tarjeta 3 */}
                  <div className="bg-white rounded-lg p-6 shadow-md">
                    <h3 className="text-xl font-semibold mb-4">
                      Número Importante 3
                    </h3>
                    <p className="text-4xl font-bold mb-4">789</p>
                    <p className="text-sm text-gray-500">
                      Descripción breve del número 3.
                    </p>
                  </div>

                  {/* Tarjeta 4 */}
                  <div className="bg-white rounded-lg p-6 shadow-md">
                    <h3 className="text-xl font-semibold mb-4">
                      Número Importante 4
                    </h3>
                    <p className="text-4xl font-bold mb-4">1011</p>
                    <p className="text-sm text-gray-500">
                      Descripción breve del número 4.
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-6 shadow-md">
                    <h3 className="text-xl font-semibold mb-4">
                      Número Importante 4
                    </h3>
                    <p className="text-4xl font-bold mb-4">1011</p>
                    <p className="text-sm text-gray-500">
                      Descripción breve del número 4.
                    </p>
                  </div>
                </div>

                {/* Espacio para tablas y gráficos */}
                <h2 className="text-xl font-bold mb-4 mt-8">Graficos</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">
                  {/* Columna 1: Gráfico de barras y gráfico de líneas */}
                  <div className="space-y-8">
                    {/* Gráfico de barras */}
                    <div className="p-6 bg-white rounded-lg shadow-md">
                      <h2 className="text-xl font-semibold mb-4">Bar Chart</h2>
                      <div className="w-full">
                        <Bar data={dataBar} options={optionsBarLine} />
                      </div>
                    </div>

                    {/* Gráfico de líneas */}
                    <div className="p-6 bg-white rounded-lg shadow-md">
                      <h2 className="text-xl font-semibold mb-4">Line Chart</h2>
                      <div className="w-full">
                        <Line data={dataLine} options={optionsBarLine} />
                      </div>
                    </div>
                  </div>

                  {/* Columna 2: Gráfico circular */}
                  <div className="p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">
                      Doughnut Chart
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
