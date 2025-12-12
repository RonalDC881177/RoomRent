import React, { useState } from "react";
import { Link } from "react-router-dom";
import ResetPasswordModal from "./ResetPasswordModal";


export default function Login() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  return (
    <div className="w-[430px] bg-white p-8 rounded-2xl shadow-lg">
      {/* Header title */}
      <div className="flex justify-center mb-4">
        <h2 className="text-3xl font-semibold text-center">{isLoginMode ? "Iniciar Sesión" : "Registrarse"}</h2>
      </div>

      {/* Controls */}
      <div className="relative flex h-12 mb-6 border border-gray-300 rounded-full overflow-hidden">
        <button onClick={() => setIsLoginMode(true)} className={`w-1/2 text-lg font-medium transition-all z-10 ${isLoginMode ? "text-white" : "text-black"}`}>Iniciar Sesión</button>
        <button onClick={() => setIsLoginMode(false)} className={`w-1/2 text-lg font-medium transition-all z-10 ${!isLoginMode ? "text-white" : "text-black"}`}>Registrarse</button>
        <div className={`absolute top-0 h-full w-1/2 rounded-full bg-gradient-to-r from-blue-700 via-cyan-600 to-cyan-200 ${isLoginMode ? "left-0" : "left-1/2"}`}></div>
      </div>

        {/* Form */}
        <form>
            {!isLoginMode && (
                <input type="text" placeholder="Nombre" required />
                )}

                <input type="email" placeholder="Correo" required />
                <input type="password" placeholder="Contraseña" required />

                {!isLoginMode && (
                    <input type="password" placeholder="Confirmar Contraseña" required />
                )}
                <button type="submit">{isLoginMode ? "Entrar" : "Registrarse"}</button>

                {/* Forgot password link */}
                {isLoginMode && (
                    <div>
                        <p>Olvide mi contraseña</p>
                    </div>
                )}

                {/* Shared button */}
                <button>
                    {isLoginMode ? ("Ingresar") : ("Crear Cuenta")}
                </button>

                {/* switch mode link */}
                <p>{isLoginMode ? "¿No tienes una cuenta? Registrarse" : "¿Ya tienes una cuenta? Iniciar sesión"}
                    <a href="#">
                        {isLoginMode ? " Registrarse" : " Iniciar Sesión"}
                    </a>
                </p>
        </form>
    </div>
  );
};
/*import { Link } from "react-router-dom";
import ResetPasswordModal from "./ResetPasswordModal";

export default function Login() {
    const [openModal, setOpenModal] = useState(false);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Iniciar sesión</h2>

                <input
                    className="w-full p-2 border rounded mb-4"
                    type="email"
                    placeholder="Correo"
                />

                <input
                    className="w-full p-2 border rounded mb-4"
                    type="password"
                    placeholder="Contraseña"
                />

                <button className="w-full bg-green-600 text-white py-2 rounded mb-4 hover:bg-green-700">
                    Entrar
                </button>

                <div className="text-center space-y-2">
                    <button
                        onClick={() => setOpenModal(true)}
                        className="text-blue-500 hover:underline"
                    >
                        Olvidé mi contraseña
                    </button>

                    <p>
                        ¿No tienes una cuenta?{" "}
                        <Link to="/register" className="text-green-600 hover:underline">
                            Registrarse
                        </Link>
                    </p>
                </div>
            </div>

            {openModal && <ResetPasswordModal onClose={() => setOpenModal(false)} />}
        </div>
    );
}*/
