
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getInbox } from "../api/messageService";

const Inbox = () => {
    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelled = false;

        const loadInbox = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getInbox();

                if (!cancelled) {
                    setConversations(
                        Array.isArray(data) ? data : data.conversations || []
                    );
                }
            } catch (err) {
                if (!cancelled) {
                    setError(
                        err.message || "No se pudieron cargar tus mensajes."
                    );
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        loadInbox();

        return () => {
            cancelled = true;
        };
    }, []);

    const formatDate = (date) => {
        if (!date) return "";

        return new Intl.DateTimeFormat("es-CO", {
            dateStyle: "medium",
            timeStyle: "short",
        }).format(new Date(date));
    };

    return (
        <main className="min-h-screen bg-[#0b2236] text-white px-4 py-10 md:px-8">
            <div className="mx-auto max-w-5xl">
                <header className="mb-8">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#71bfd1]">
                        RoomRent
                    </p>

                    <h1 className="text-3xl font-bold md:text-4xl">
                        Mis mensajes
                    </h1>

                    <p className="mt-3 text-gray-300">
                        Consulta las conversaciones relacionadas con tus
                        propiedades.
                    </p>
                </header>

                {loading && (
                    <div className="rounded-2xl bg-[#163041] p-8 text-center">
                        <p className="text-gray-300">
                            Cargando conversaciones...
                        </p>
                    </div>
                )}

                {!loading && error && (
                    <div
                        role="alert"
                        className="rounded-2xl border border-red-400/30 bg-red-950/30 p-6"
                    >
                        <p className="font-semibold text-red-300">
                            No pudimos cargar tus mensajes
                        </p>

                        <p className="mt-2 text-gray-300">{error}</p>

                        <button
                            type="button"
                            onClick={() => window.location.reload()}
                            className="mt-4 rounded-lg bg-[#71bfd1] px-4 py-2 font-semibold text-[#0b2236] hover:bg-white"
                        >
                            Intentar nuevamente
                        </button>
                    </div>
                )}

                {!loading && !error && conversations.length === 0 && (
                    <div className="rounded-2xl bg-[#163041] px-6 py-12 text-center">
                        <h2 className="text-xl font-semibold">
                            Aún no tienes conversaciones
                        </h2>

                        <p className="mt-3 text-gray-300">
                            Cuando contactes a un propietario o recibas un
                            mensaje, aparecerá aquí.
                        </p>

                        <Link
                            to="/properties"
                            className="mt-6 inline-flex rounded-xl bg-[#71bfd1] px-5 py-3 font-semibold text-[#0b2236] transition hover:bg-white"
                        >
                            Explorar propiedades
                        </Link>
                    </div>
                )}

                {!loading && !error && conversations.length > 0 && (
                    <section
                        aria-label="Lista de conversaciones"
                        className="space-y-4"
                    >
                        {conversations.map((conversation) => (
                            <article
                                key={`${conversation.property?._id}-${conversation.user?._id}`}
                                className="rounded-2xl border border-white/10 bg-[#163041] p-5 shadow-lg transition hover:border-[#71bfd1]/60 md:p-6"
                            >
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                    <div className="min-w-0">
                                        <h2 className="break-words text-lg font-semibold">
                                            {conversation.user?.name ||
                                                conversation.user?.username ||
                                                "Usuario"}
                                        </h2>

                                        <p className="mt-1 text-sm text-gray-400">
                                            {conversation.property?.title ||
                                                "Propiedad"}
                                        </p>
                                    </div>

                                    <time className="shrink-0 text-sm text-gray-400">
                                        {formatDate(conversation.date)}
                                    </time>
                                </div>

                                <div className="mt-4 rounded-xl bg-[#0b2236] p-4">
                                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#71bfd1]">
                                        Último mensaje
                                    </p>

                                    <p className="break-words text-gray-200">
                                        {conversation.lastMessage ||
                                            "No hay mensajes disponibles."}
                                    </p>
                                </div>

                                {conversation.property?._id && (
                                    <Link
                                        to={`/properties/${conversation.property._id}`}
                                        className="mt-4 inline-flex text-sm font-semibold text-[#71bfd1] hover:text-white"
                                    >
                                        Ver propiedad
                                    </Link>
                                )}
                            </article>
                        ))}
                    </section>
                )}
            </div>
        </main>
    );
};

export default Inbox;
