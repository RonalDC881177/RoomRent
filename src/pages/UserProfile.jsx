import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPublicUserProfile } from "../api/userService";

const UserProfile = () => {
    const { id } = useParams();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                setLoading(true);
                setError("");

                const userData = await getPublicUserProfile(id);
                setUser(userData);
            } catch (error) {
                console.error("Error obteniendo perfil público:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchUserProfile();
        }
    }, [id]);

    if (loading) {
        return (
            <main className="min-h-screen bg-[#0b2236] text-white flex items-center justify-center px-4">
                <p className="text-lg">Cargando perfil...</p>
            </main>
        );
    }

    if (error || !user) {
        return (
            <main className="min-h-screen bg-[#0b2236] text-white flex items-center justify-center px-4">
                <section className="bg-[#163041] rounded-2xl p-8 text-center max-w-lg w-full">
                    <h1 className="text-2xl font-bold mb-4">
                        Perfil no encontrado
                    </h1>

                    <p className="text-gray-300 mb-6">
                        {error || "No fue posible encontrar este usuario."}
                    </p>

                    <Link
                        to="/properties"
                        className="inline-block bg-[#71bfd1] text-[#0b2236] px-6 py-3 rounded-xl font-semibold hover:bg-white transition"
                    >
                        Volver a propiedades
                    </Link>
                </section>
            </main>
        );
    }

    const roleLabels = {
        admin: "Administrador",
        arrendador: "Propietario",
        arrendatario: "Arrendatario",
    };

    const registrationDate = user.createdAt
        ? new Date(user.createdAt).toLocaleDateString("es-CO", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
        : "No disponible";

    return (
        <main className="min-h-screen bg-[#0b2236] text-white px-4 py-12">
            <section className="max-w-3xl mx-auto">
                <Link
                    to="/properties"
                    className="inline-block text-gray-300 hover:text-[#71bfd1] mb-8 transition"
                >
                    ← Volver a propiedades
                </Link>

                <article className="bg-[#163041] rounded-2xl p-8 md:p-10 shadow-xl">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-24 h-24 rounded-full bg-[#0b2236] border-2 border-[#71bfd1] flex items-center justify-center mb-5">
                            <span className="text-4xl font-bold text-[#71bfd1]">
                                {user.name?.charAt(0).toUpperCase() || "U"}
                            </span>
                        </div>

                        <h1 className="text-3xl font-bold mb-2">
                            {user.name || "Usuario de RoomRent"}
                        </h1>

                        <p className="text-[#71bfd1] font-semibold">
                            {roleLabels[user.role] || "Usuario"}
                        </p>
                    </div>

                    <div className="border-t border-gray-600 mt-8 pt-6">
                        <h2 className="text-xl font-semibold mb-5">
                            Información del perfil
                        </h2>

                        <div className="space-y-4 text-gray-300">
                            <p>
                                <span className="font-semibold text-white">
                                    Miembro desde:
                                </span>{" "}
                                {registrationDate}
                            </p>

                            <p>
                                <span className="font-semibold text-white">
                                    Reputación:
                                </span>{" "}
                                Aún no disponible
                            </p>
                        </div>
                    </div>
                </article>
            </section>
        </main>
    );
};

export default UserProfile;