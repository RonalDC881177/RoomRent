import { useState } from "react";
import { Link } from "react-router-dom";
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
}
