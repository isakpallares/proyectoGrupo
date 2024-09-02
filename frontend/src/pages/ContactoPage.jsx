import React from "react";
import Sidebar from "../components/Sidebar";
import HeaderDashboard from "../components/HeaderDashboard";
import ubi from "../assets/ubi.png";
import phone from "../assets/phone.png";
import gmail from "../assets/gmail.png";
import "../App.css"; // Asegúrate de que este archivo tenga configuraciones necesarias para Tailwind CSS

function ContactoPage() {

  
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1">
          <HeaderDashboard />
          <main className="ml-44 bg-gray-100 pt-8 pb-40">
            <h1 className="text-5xl mb-8 text-center mt-2">Contacto</h1>
            <p className=" text-black text-center mb-12 text-lg">
              Por favor, completa el formulario a continuación para enviarnos tu
              petición o reclamo.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8">
              {/* Columna izquierda con la imagen */}
              <div className="flex flex-col items-center justify-start space-y-4 my-auto border-r-2 border-gray-300 w-80 gap-4 ml-8">
                <div className="flex flex-col items-center">
                  <img src={ubi} alt="Ubicación" className="w-12" />
                  <h2 className="font-semibold mt-2">Dirección</h2>
                  <span className="text-sm text-gray-700">Kra41 #27c-33</span>
                  <span className="text-sm text-gray-700">
                    Soledad/Atlantico
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <img src={phone} alt="Teléfono" className="w-12" />
                  <h2 className="font-semibold mt-2">Teléfono</h2>
                  <span className="text-sm text-gray-700">3002025017</span>
                  <span className="text-sm text-gray-700">3015263125</span>
                </div>
                <div className="flex flex-col items-center">
                  <img src={gmail} alt="Email" className="w-12" />
                  <h2 className="font-semibold mt-2">Email</h2>
                  <span className="text-sm text-gray-700">
                    innodesyng@gmail.com
                  </span>
                  <span className="text-sm text-gray-700">
                    gestionaProp@gmail.com
                  </span>
                </div>
              </div>

              {/* Columna derecha con el formulario de contacto */}
              <div>
                <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-md max-w-5xl">
                  <form action="#" method="POST">
                    <div className="mb-4">
                      <label
                        htmlFor="name"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Nombre
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm  focus:outline-none focus:ring-2 focus:ring-oscuro focus:border-oscuro sm:text-sm"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Correo Electrónico
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm  focus:outline-none focus:ring-2 focus:ring-oscuro focus:border-oscuro sm:text-sm"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="subject"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Asunto
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-oscuro focus:border-oscuro sm:text-sm"
                      >
                        <option value="">Selecciona un asunto</option>
                        <option value="peticion">Petición</option>
                        <option value="reclamo">Reclamo</option>
                      </select>
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="message"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Mensaje
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows="4"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-oscuro focus:border-oscuro sm:text-sm"
                      ></textarea>
                    </div>

                    <div className="flex items-center justify-between">
                      <button
                        type="submit"
                        className="bg-oscuro text-white px-4 py-2 rounded-md shadow-sm hover:bg-medio focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mx-auto w-32 mt-4"
                      >
                        Enviar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            {/* Fondo blanco con padding */}
          </main>
        </div>
      </div>
    </div>
  );
}

export default ContactoPage;
