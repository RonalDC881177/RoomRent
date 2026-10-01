import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyProperties, deleteProperty } from "../api/properties";

const MyPropertiesPage = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchMyProperties = async () => {
            try {
                setLoading(true);

                const data = await getMyProperties();

                setProperties(data);
            } catch (error) {
                console.error(
                    "Error obteniendo mis propiedades:",
                    error
                );

                setError(
                    error.message ||
                    "No se pudieron obtener tus propiedades"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchMyProperties();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "¿Estás seguro de que deseas eliminar esta propiedad?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            await deleteProperty(id);

            setProperties((currentProperties) =>
                currentProperties.filter(
                    (property) => property._id !== id
                )
            );
        } catch (error) {
            console.error("Error eliminando propiedad:", error);

            alert(
                error.message ||
                "No se pudo eliminar la propiedad"
            );
        }
    };

    if (loading) {
        return (
            <main className="min-h-screen pt-24 flex items-center justify-center">
                <p>Cargando tus propiedades...</p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="min-h-screen pt-24 px-6">
                <p className="text-red-500">{error}</p>
            </main>
        );
    }

    return (
        <main className="min-h-screen pt-24 px-6">
            <div className="max-w-6xl mx-auto">

                <h1 className="text-3xl font-bold mb-8">
                    Mis propiedades
                </h1>

                {properties.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="mb-6">
                            No tienes propiedades publicadas.
                        </p>

                        <Link
                            to="/properties/create"
                            className="inline-block bg-[#517399] text-white px-6 py-3 rounded-lg"
                        >
                            Publicar una propiedad
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {properties.map((property) => (
                            <div
                                key={property._id}
                                className="bg-white rounded-xl shadow-md p-5"
                            >
                                <h2 className="text-xl font-semibold mb-2">
                                    {property.title}
                                </h2>

                                <p className="text-gray-600 mb-2">
                                    {property.city}
                                </p>

                                <p className="font-semibold mb-4">
                                    $
                                    {property.price?.amount?.toLocaleString(
                                        "es-CO"
                                    )}
                                </p>

                                <div className="flex items-center gap-4">
                                    <Link
                                        to={`/properties/${property._id}`}
                                        className="text-[#517399] font-semibold"
                                    >
                                        Ver propiedad
                                    </Link>

                                    <Link
                                        to={`/properties/${property._id}/edit`}
                                        className="text-blue-600 font-semibold"
                                    >
                                        Editar
                                    </Link>

                                    <button
                                        onClick={() => handleDelete(property._id)}
                                        className="text-red-600 font-semibold hover:text-red-800"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </main>
    );
};

export default MyPropertiesPage;