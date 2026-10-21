import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyProperties } from "../api/properties";
import { getInbox } from "../api/messageService";

const LandlordDashboard = () => {
    const [properties, setProperties] = useState([]);
    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;

        const loadDashboard = async () => {
            try {
                const [myProperties, inbox] = await Promise.all([
                    getMyProperties(),
                    getInbox(),
                ]);

                if (active) {
                    setProperties(myProperties);
                    setConversations(inbox);
                }
            } catch (err) {
                if (active) {
                    setError(err.message || "No se pudo cargar el panel.");
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        };

        loadDashboard();

        return () => {
            active = false;
        };
    }, []);

    const availableProperties = properties.filter(
        (property) => property.status === "disponible"
    ).length;

    const unreadMessages = conversations.reduce(
        (total, conversation) =>
            total + Number(conversation.unreadCount || 0),
        0
    );

    if (loading) {
        return (
            <main className="min-h-screen p-8 text-center">
                Cargando tu panel...
            </main>
        );
    }

    if (error) {
        return (
            <main className="min-h-screen p-8 text-center text-red-600">
                {error}
            </main>
        );
    }

    const cards = [
        { label: "Mis propiedades", value: properties.length },
        { label: "Disponibles", value: availableProperties },
        { label: "Mensajes sin leer", value: unreadMessages },
    ];

    return (
        <main className="min-h-screen bg-[#0b2236] px-4 py-10 text-white md:px-8">
            <div className="mx-auto max-w-5xl">
                <h1 className="text-3xl font-bold">Panel del arrendador</h1>
                <p className="mt-2 text-gray-300">
                    Consulta el estado de tus propiedades y mensajes.
                </p>

                <section
                    aria-label="Resumen de actividad"
                    className="mt-8 grid gap-4 sm:grid-cols-3"
                >
                    {cards.map((card) => (
                        <article
                            key={card.label}
                            className="rounded-2xl bg-[#163041] p-6"
                        >
                            <p className="text-sm text-gray-300">{card.label}</p>
                            <p className="mt-2 text-3xl font-bold">{card.value}</p>
                        </article>
                    ))}
                </section>

                <nav aria-label="Acciones del arrendador" className="mt-8 flex flex-wrap gap-3">
                    <Link
                        to="/properties/create"
                        className="rounded-lg bg-[#71bfd1] px-5 py-3 font-semibold text-[#0b2236]"
                    >
                        Publicar propiedad
                    </Link>

                    <Link
                        to="/my-properties"
                        className="rounded-lg bg-[#163041] px-5 py-3 font-semibold"
                    >
                        Administrar propiedades
                    </Link>

                    <Link
                        to="/inbox"
                        className="rounded-lg bg-[#163041] px-5 py-3 font-semibold"
                    >
                        Abrir mensajes
                    </Link>
                </nav>
            </div>
        </main>
    );
};

export default LandlordDashboard;