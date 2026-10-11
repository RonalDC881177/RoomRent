import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
    getConversation,
    sendMessage,
    markMessagesAsRead,
} from "../api/messageService";

const Conversation = () => {
    const { propertyId, otherUserId } = useParams();

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [currentUserId, setCurrentUserId] = useState("");
    const [reply, setReply] = useState("");
    const [sending, setSending] = useState(false);
    const [sendError, setSendError] = useState("");

    useEffect(() => {
        let cancelled = false;

        const loadConversation = async () => {
            try {
                setLoading(true);
                setError("");

                const storedUser = localStorage.getItem("user");
                const currentUser = storedUser
                    ? JSON.parse(storedUser)
                    : null;

                const userId = currentUser?.id || currentUser?._id;

                if (!userId) {
                    throw new Error(
                        "No se pudo identificar al usuario. Inicia sesión nuevamente."
                    );
                }

                setCurrentUserId(String(userId));

                const conversation = await getConversation(
                    propertyId,
                    otherUserId
                );

                // Marcar como leídos los mensajes recibidos.
                await markMessagesAsRead(propertyId, otherUserId);

                // Consultar nuevamente para obtener el estado actualizado.
                const updatedConversation = await getConversation(
                    propertyId,
                    otherUserId
                );

                if (!cancelled) {
                    setMessages(updatedConversation.messages || []);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(
                        err.message ||
                        "No se pudo cargar el historial."
                    );
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        loadConversation();

        return () => {
            cancelled = true;
        };
    }, [propertyId, otherUserId]);

    const formatDate = (date) => {
        if (!date) return "";

        return new Intl.DateTimeFormat("es-CO", {
            dateStyle: "medium",
            timeStyle: "short",
        }).format(new Date(date));
    };

    const handleSendReply = async (event) => {
        event.preventDefault();

        if (!reply.trim() || sending) return;

        try {
            setSending(true);
            setSendError("");

            await sendMessage(propertyId, reply, otherUserId);

            // Limpiar el formulario después del envío exitoso.
            setReply("");

            // Actualizar el historial con los datos del servidor.
            const conversation = await getConversation(
                propertyId,
                otherUserId
            );

            setMessages(conversation.messages || []);
        } catch (err) {
            setSendError(
                err.message || "No se pudo enviar la respuesta."
            );
        } finally {
            setSending(false);
        }
    };

    const otherMessage = messages.find(
        (message) =>
            String(message.sender?._id) !== currentUserId
    );

    const otherUserName =
        otherMessage?.sender?.name ||
        otherMessage?.sender?.username ||
        "Usuario";

    return (
        <main className="min-h-screen bg-[#0b2236] px-4 py-10 text-white md:px-8">
            <div className="mx-auto max-w-4xl">
                <Link
                    to="/inbox"
                    className="mb-6 inline-flex text-[#71bfd1] hover:text-white"
                >
                    ← Volver a mis mensajes
                </Link>

                <header className="mb-8">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#71bfd1]">
                        RoomRent
                    </p>

                    <h1 className="text-3xl font-bold">
                        Conversación
                    </h1>

                    <p className="mt-2 text-gray-300">
                        Con {otherUserName}
                    </p>
                </header>

                {loading && (
                    <div className="rounded-2xl bg-[#163041] p-8 text-center">
                        Cargando historial...
                    </div>
                )}

                {!loading && error && (
                    <div
                        role="alert"
                        className="rounded-2xl border border-red-400/30 bg-red-950/30 p-6"
                    >
                        <p className="font-semibold text-red-300">
                            No se pudo cargar la conversación
                        </p>

                        <p className="mt-2 text-gray-300">
                            {error}
                        </p>
                    </div>
                )}

                {!loading && !error && messages.length === 0 && (
                    <div className="rounded-2xl bg-[#163041] p-8 text-center text-gray-300">
                        Todavía no hay mensajes en esta conversación.
                    </div>
                )}

                {!loading && !error && messages.length > 0 && (
                    <section
                        aria-label="Historial de mensajes"
                        className="space-y-4 rounded-2xl bg-[#163041] p-4 md:p-6"
                    >
                        {messages.map((message) => {
                            const isMine =
                                String(message.sender?._id) ===
                                currentUserId;

                            return (
                                <article
                                    key={message._id}
                                    className={`flex ${isMine
                                        ? "justify-end"
                                        : "justify-start"
                                        }`}
                                >
                                    <div
                                        className={`max-w-[85%] rounded-2xl p-4 md:max-w-[75%] ${isMine
                                            ? "bg-[#71bfd1] text-[#0b2236]"
                                            : "bg-[#0b2236] text-white"
                                            }`}
                                    >
                                        <p className="mb-2 text-xs font-semibold opacity-75">
                                            {isMine
                                                ? "Tú"
                                                : message.sender?.name ||
                                                message.sender?.username ||
                                                otherUserName}
                                        </p>

                                        <p className="whitespace-pre-wrap break-words">
                                            {message.message}
                                        </p>

                                        <time className="mt-3 block text-right text-xs opacity-70">
                                            {formatDate(
                                                message.createdAt
                                            )}
                                        </time>
                                    </div>
                                </article>
                            );
                        })}
                    </section>
                )}

                {!loading && !error && (
                    <form
                        onSubmit={handleSendReply}
                        className="mt-6 rounded-2xl bg-[#163041] p-4 md:p-6"
                    >
                        <label
                            htmlFor="reply"
                            className="mb-3 block font-semibold"
                        >
                            Escribe tu respuesta
                        </label>

                        <textarea
                            id="reply"
                            value={reply}
                            onChange={(event) => setReply(event.target.value)}
                            placeholder="Escribe tu mensaje..."
                            maxLength={1000}
                            rows={4}
                            required
                            className="w-full resize-y rounded-xl border border-white/10 bg-[#0b2236] p-4 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#71bfd1]"
                        />

                        <div className="mt-2 flex justify-end text-xs text-gray-400">
                            {reply.length}/1000 caracteres
                        </div>

                        {sendError && (
                            <p
                                role="alert"
                                className="mt-3 rounded-lg bg-red-950/40 p-3 text-sm text-red-300"
                            >
                                {sendError}
                            </p>
                        )}

                        <div className="mt-4 flex justify-end">
                            <button
                                type="submit"
                                disabled={!reply.trim() || sending}
                                className="rounded-xl bg-[#71bfd1] px-6 py-3 font-semibold text-[#0b2236] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {sending ? "Enviando..." : "Enviar respuesta"}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </main>
    );
};

export default Conversation;