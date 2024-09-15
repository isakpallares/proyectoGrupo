import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "./services/loginService"; //Importe del servicio loginService.js
import logoNegroN from "../assets/logoNegroN.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Email o contraseña incorrectos");
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-lg w-full h-2/4 bg-white p-6 shadow-lg">
          <h2 className="text-3xl text-center font-bold mb-10">Login</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-4">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:shadow-outline bg-gray-200 shadow-md focus:outline-none focus:ring-2 focus:ring-oscuro focus:border-oscuro"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 mb-4 mt-6">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="*********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:shadow-outline bg-gray-200 shadow-md focus:outline-none focus:ring-2 focus:ring-oscuro focus:border-oscuro"
                required
              />
            </div>
            <button
              type="submit"
              className="w-2/5 block mx-auto mt-12 bg-oscuro text-white py-2 px-4 rounded-lg hover:bg-medio shadow-md"
            >
              Login
            </button>
          </form>
        </div>
      </div>
      <div className="flex-1 relative bg-gradient-to-r from-[#a68dd1] via-[#bca6dd] to-[#e9d7f4] p-8 rounded-l-3xl">
        <div className="max-w-5xl w-full p-8 bg-white bg-opacity-50 rounded-lg shadow-lg text-center relative z-15 mt-80">
          <p className="text-lg font-semibold text-gray-800">
            Bienvenido a nuestra plataforma. Explora nuestras funcionalidades y
            aprovecha todo lo que tenemos para ofrecer.
          </p>
        </div>
        <img
          src={logoNegroN}
          alt="Logo"
          className="absolute top-20 left-1/2 transform -translate-x-1/2 -mt-25 h-44 z-20"
        />
      </div>
    </div>
  );
};

export default Login;

