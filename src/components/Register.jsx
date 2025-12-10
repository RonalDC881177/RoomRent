import { Link } from "react-router-dom";

export default function Register() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Crear cuenta</h2>

                <input className="w-full p-2 border rounded mb-3" type="text" placeholder="Nombre" />
                <input className="w-full p-2 border rounded mb-3" type="email" placeholder="Correo" />
                <input className="w-full p-2 border rounded mb-3" type="password" placeholder="Contraseña" />
                <input className="w-full p-2 border rounded mb-4" type="password" placeholder="Confirmar contraseña" />

                <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
                    Registrarse
                </button>

                <p className="text-center mt-3">
                    ¿Ya tienes cuenta?{" "}
                    <Link to="/login" className="text-green-600 hover:underline">
                        Iniciar sesión
                    </Link>
                </p>
            </div>
        </div>
    );
}
