import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMyRoomie } from "../api/roomieService";

const RoomiePage = () => {
    const [myRoomie, setMyRoomie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [profileNotFound, setProfileNotFound] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchMyRoomie = async () => {
            try {
                const roomie = await getMyRoomie();
                setMyRoomie(roomie);
            } catch (error) {
                if (error.message === "No tienes un perfil de Roomie") {
                    setProfileNotFound(true);
                } else {
                    setError(error.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchMyRoomie();
    }, []);
    return (
        <main className="min-h-screen pt-16 pb-20 px-4">
            <section className="max-w-6xl mx-auto">

                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h1 className="text-4xl font-bold mb-4">
                        Encuentra tu próximo Roomie
                    </h1>

                    <p className="text-gray-600 text-lg">
                        Encuentra personas compatibles para compartir
                        vivienda, organizar tu presupuesto y comenzar
                        una nueva etapa.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">

                    <article className="border rounded-2xl p-8 shadow-sm">
                        <h2 className="text-2xl font-semibold mb-4">
                            Mi perfil Roomie
                        </h2>

                        {loading && (
                            <p className="text-gray-500">
                                Consultando tu perfil...
                            </p>
                        )}

                        {!loading && profileNotFound && (
                            <>
                                <p className="text-gray-600 mb-6">
                                    Todavía no tienes un perfil. Créalo para indicar
                                    dónde quieres vivir, cuál es tu presupuesto y
                                    qué preferencias tienes.
                                </p>

                                <Link
                                    to="/roomie/create"
                                    className="inline-block bg-[#517399] text-white rounded-lg px-6 py-3 hover:bg-[#35516d]"
                                >
                                    Crear mi perfil
                                </Link>
                            </>
                        )}

                        {!loading && myRoomie && (
                            <>
                                <p className="text-green-700 font-medium mb-4">
                                    Ya tienes un perfil de Roomie.
                                </p>

                                <div className="space-y-3 text-gray-600">
                                    <p>
                                        <strong>Ciudad:</strong> {myRoomie.city}
                                    </p>

                                    <p>
                                        <strong>Localidad:</strong> {myRoomie.locality}
                                    </p>

                                    <p>
                                        <strong>Presupuesto máximo:</strong>{" "}
                                        ${Number(myRoomie.maxBudget).toLocaleString("es-CO")} COP
                                    </p>

                                    <p>
                                        <strong>Fecha para mudarte:</strong>{" "}
                                        {String(myRoomie.moveInDate).split("T")[0]}
                                    </p>


                                    <p className="min-w-0 max-w-full whitespace-pre-wrap break-words">
                                        <strong>Descripción:</strong>{" "}
                                        {myRoomie.description}
                                    </p>



                                    <div>
                                        <strong>Preferencias:</strong>

                                        {myRoomie.preferences?.length > 0 ? (
                                            <ul className="list-disc list-inside mt-2">
                                                {myRoomie.preferences.map((preference) => (
                                                    <li key={preference}>{preference}</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="mt-1">
                                                No has registrado preferencias.
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <Link
                                        to="/roomie/edit"
                                        className="inline-block bg-[#517399] text-white rounded-lg px-6 py-3 hover:bg-[#35516d]"
                                    >
                                        Editar mi perfil
                                    </Link>
                                </div>


                            </>
                        )}

                        {!loading && error && (
                            <p className="text-red-600 mb-4">
                                {error === "No autorizado" || error === "Token no válido"
                                    ? "Inicia sesión para consultar tu perfil de Roomie."
                                    : error}
                            </p>
                        )}
                    </article>

                    <article className="border rounded-2xl p-8 shadow-sm">
                        <h2 className="text-2xl font-semibold mb-4">
                            Descubrir Roomies
                        </h2>

                        <p className="text-gray-600 mb-4">
                            Explora perfiles de personas que también buscan
                            compartir vivienda.
                        </p>

                        <Link
                            to="/roomie/discover"
                            className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            Ver perfiles
                        </Link>
                    </article>

                </div>
            </section>
        </main>
    );
};

export default RoomiePage;