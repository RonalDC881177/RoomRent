import React, { useState } from "react";
import ResetPasswordModal from "./ResetPasswordModal";
import bgVideo from "../assets/videos/bogota.mp4";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();

    // estados del form
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            //  REGISTER
            if (!isLoginMode) {

                if (password !== confirmPassword) {
                    return alert("Las contraseñas no coinciden");
                }

                const res = await fetch("http://localhost:5000/api/users/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password,
                        username: email.split("@")[0]
                    })
                });

                const data = await res.json();
                console.log("REGISTER:", data);

                if (!res.ok) {
                    return alert(data.message || "Error en registro");
                }

                alert("Usuario registrado correctamente");

                // limpiar form
                setName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");

                setIsLoginMode(true);
            }

            //  LOGIN
            else {

                const res = await fetch("http://localhost:5000/api/users/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        identifier: email,
                        password
                    })
                });

                const data = await res.json();
                console.log("LOGIN:", data);

                if (!res.ok) {
                    return alert(data.message || "Error en login");
                }

                // guardar sesión
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));

                alert("Login exitoso");

                // redirección al home
                navigate("/");
            }

        } catch (error) {
            console.log("ERROR:", error);
            alert("Error de servidor");
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

            {/* Background */}
            <video
                className="absolute inset-0 w-full h-full object-cover"
                src={bgVideo}
                autoPlay
                loop
                muted
                playsInline
            />
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Card */}
            <div className="relative z-10 bg-white/60 dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">

                <h2 className="text-3xl font-semibold text-center mb-4">
                    {isLoginMode ? "Iniciar Sesión" : "Registrarse"}
                </h2>

                {/* SWITCH */}
                <div className="relative flex h-12 mb-6 border border-gray-300 rounded-full overflow-hidden">

                    <button
                        type="button"
                        onClick={() => setIsLoginMode(true)}
                        className={`w-1/2 font-medium z-10 ${isLoginMode ? "text-white" : "text-black"}`}
                    >
                        Iniciar Sesión
                    </button>

                    <button
                        type="button"
                        onClick={() => setIsLoginMode(false)}
                        className={`w-1/2 font-medium z-10 ${!isLoginMode ? "text-white" : "text-black"}`}
                    >
                        Registrarse
                    </button>

                    <div className={`absolute top-0 h-full w-1/2 bg-blue-600 transition-all ${isLoginMode ? "left-0" : "left-1/2"}`} />
                </div>

                {/* FORM */}
                <form className="space-y-4" onSubmit={handleSubmit}>

                    {/* NAME */}
                    {!isLoginMode && (
                        <input
                            type="text"
                            placeholder="Nombre"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 outline-none border rounded"
                        />
                    )}

                    {/* EMAIL */}
                    <input
                        type="email"
                        placeholder="Correo"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 outline-none border rounded"
                    />

                    {/* PASSWORD */}
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 outline-none border rounded"
                    />

                    {/* CONFIRM PASSWORD */}
                    {!isLoginMode && (
                        <input
                            type="password"
                            placeholder="Confirmar contraseña"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-3 outline-none border rounded"
                        />
                    )}

                    {/* FORGOT PASSWORD */}
                    {isLoginMode && (
                        <button
                            type="button"
                            onClick={() => setOpenModal(true)}
                            className="text-blue-500 hover:underline"
                        >
                            Olvidé mi contraseña
                        </button>
                    )}

                    {/* SUBMIT */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white rounded-full py-2 hover:opacity-90"
                    >
                        {isLoginMode ? "Ingresar" : "Crear Cuenta"}
                    </button>

                    {/* SWITCH TEXT */}
                    <p className="text-center text-gray-700">
                        {isLoginMode ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}
                        <button
                            type="button"
                            onClick={() => setIsLoginMode(!isLoginMode)}
                            className="text-blue-600 ml-2 hover:underline"
                        >
                            {isLoginMode ? "Registrarse" : "Iniciar sesión"}
                        </button>
                    </p>
                </form>
            </div>

            {/* MODAL */}
            {openModal && <ResetPasswordModal onClose={() => setOpenModal(false)} />}
        </div>
    );
}