export default function ResetPasswordModal({ onClose }) {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-sm">
                <h3 className="text-xl font-semibold mb-3">Recuperar contraseña</h3>

                <input
                    type="email"
                    placeholder="Correo"
                    className="w-full p-2 border rounded mb-4"
                />

                <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mb-3">
                    Enviar enlace
                </button>

                <button
                    className="w-full bg-gray-300 py-2 rounded hover:bg-gray-400"
                    onClick={onClose}
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
}
