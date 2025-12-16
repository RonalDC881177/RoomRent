import React, { useState } from "react";
import { Link } from "react-router-dom";
import ResetPasswordModal from "./ResetPasswordModal";
import bgVideo from "../assets/videos/bogota.mp4";



export default function Login() {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [openModal, setOpenModal] = useState(false);

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

            {/* Background Video */}
            <video
                className="absolute inset-0 w-full h-full object-cover"
                src={bgVideo}
                autoPlay
                loop
                muted
                playsInline
            />
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="relative z-10 bg-white/60 dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">

                {/* Header title */}
                <div className="flex justify-center mb-4">
                    <h2 className="text-3xl font-semibold text-center">{isLoginMode ? "Iniciar Sesión" : "Registrarse"}</h2>
                </div>

                {/* Controls */}
                <div className="relative flex h-12 mb-6 border border-gray-300 rounded-full overflow-hidden">
                    <button onClick={() => setIsLoginMode(true)} className={`w-1/2 text-lg font-medium transition-all z-10 ${isLoginMode ? "text-white" : "text-black"}`}>Iniciar Sesión</button>
                    <button onClick={() => setIsLoginMode(false)} className={`w-1/2 text-lg font-medium transition-all z-10 ${!isLoginMode ? "text-white" : "text-black"}`}>Registrarse</button>
                    <div className={`absolute top-0 h-full w-1/2 rounded-full bg-linear-to-r from-blue-700 via-cyan-600 to-cyan-200 ${isLoginMode ? "left-0" : "left-1/2"}`}></div>
                </div>

                {/* Form */}
                <form className="space-y-4">
                    {!isLoginMode && (
                        <input type="text" placeholder="Nombre" required className="w-full p-3 border-gray-300 outline-none focus:border-cyan-500 placeholder-gray-800" />
                    )}

                    <input type="email" placeholder="Correo" required className="w-full p-3 border-gray-300 outline-none focus:border-cyan-500 placeholder-gray-800" />
                    <input type="password" placeholder="Contraseña" required className="w-full p-3 border-gray-300 outline-none focus:border-cyan-500 placeholder-gray-800" />
                    {!isLoginMode && (
                        <input type="password" placeholder="Confirmar Contraseña" required className="w-full p-3 border-gray-300 outline-none focus:border-cyan-500 placeholder-gray-800" />
                    )}

                    {/* Forgot password link */}
                    {isLoginMode && (
                        <button
                            onClick={() => setOpenModal(true)}
                            className="text-blue-500 hover:underline"
                        >
                            Olvidé mi contraseña
                        </button>
                    )}

                    {/* Shared button */}
                    <button className="w-full bg-linear-to-r from-blue-700 via-cyan-600 to-cyan-200 text-white rounded-full text-lg font-medium hover:opacity-90 transition">
                        {isLoginMode ? ("Ingresar") : ("Crear Cuenta")}
                    </button>

                    {/* switch mode link */}
                    <p className="text-center text-gray-600">{isLoginMode ? "¿No tienes una cuenta? Registrarse" : "¿Ya tienes una cuenta? Iniciar sesión"}
                        <a href="#" onClick={() => setIsLoginMode(!isLoginMode)} className="text-cyan-800 hover:underline">
                            {isLoginMode ? " Registrarse" : " Iniciar sesión"}
                        </a>
                    </p>
                </form>
            </div>
            {openModal && <ResetPasswordModal onClose={() => setOpenModal(false)} />}
        </div>
    );
};
