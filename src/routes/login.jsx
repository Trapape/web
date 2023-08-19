import { Alert, Box, Button, Container, Link, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInUser } from "../utils/firebase";
import { startSession } from "../utils/session";

export default function Login() {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    // validate the inputs
    if (!email || !password) {
      setError("Ingrese su email o contraseña");
      return;
    }

    // clear the errors
    setError("");

    // TODO: send the login request
    console.log("Logging in...");

    try {
      let loginResponse = await signInUser(email, password);
      startSession(loginResponse.user);
      navigate("/cargas");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="flex justify-center w-screen h-screen mx-auto bg-white">
      <div className="flex flex-row self-center shadow-lg rounded-md">
        <div className="w-56 h-auto bg-gradient-to-r from-teal-500 to-blue-500 rounded-l-md">
        </div>
        <div className="bg-white rounded-r-md">
          <form className="mx-auto p-6" onSubmit={onSubmit}>
            <h1 className="text-4xl text-slate-900 mb-4">TRAPAPE</h1>
            <p className="text-slate-500">¡Bienvenido de nuevo!</p>
            {error &&
              <div className="w-full mx-auto mt-4" role="alert">
                <div className="flex p-5 rounded-md border border-gray-300">
                  <div>
                    <svg className ="w-6 h-6 fill-current text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z" /></svg>
                  </div>
                  <div className="ml-3">
                    <h2 className ="font-semibold text-slate-900">Error</h2>
                    <p className ="mt-2 text-sm text-slate-500 leading-relaxed">{ error }</p>
                  </div>
                </div>
              </div>
            }
            <div className="mt-8">
              <div className="w-80">
                <label className="block text-sm font-medium leading-6 text-slate-500">Email : </label>
                <div className="mt-2">
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6" />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="w-80">
                <label className="block text-sm font-medium leading-6 text-slate-500">Contraseña : </label>
                <div className="mt-2">
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6" />
                </div>
              </div>
            </div>
            <button
              type="submit" className="mt-8 rounded-md bg-slate-500 px-3 py-2 text-md font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500">
              Iniciar Sesi&oacute;n
            </button>
          </form>
          <div className="mx-auto p-6">
            <p className="text-slate-500">¿A&uacute;n no tiene una cuenta? Registrese <a href="/register" className="hover:uppercase hover:underline hover:decoration-sky-500 hover:text-slate-900">aqu&iacute;</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}