
const API_URL = "http://localhost:5000/api/message";

// Ver la bandeja de entrada del usuario.
export const getInbox = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Debes iniciar sesión para ver tus mensajes.");
    }

    const response = await fetch(`${API_URL}/inbox`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "No se pudo cargar la bandeja de entrada."
        );
    }

    return data;
};

// Obtener el historial de una conversación
export const getConversation = async (propertyId, otherUserId) => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error(
            "Debes iniciar sesión para consultar tus mensajes."
        );
    }

    const response = await fetch(
        `${API_URL}/conversation/${propertyId}/${otherUserId}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "No se pudo cargar la conversación."
        );
    }

    return data.conversation;
};

// Enviar un mensaje a una conversación
export const sendMessage = async (
    propertyId,
    message,
    otherUserId
) => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error(
            "Debes iniciar sesión para enviar mensajes."
        );
    }

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            propertyId,
            message: message.trim(),
            ...(otherUserId ? { otherUserId } : {}),
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "No se pudo enviar el mensaje."
        );
    }

    return data;
};

// Marcar como leídos los mensajes recibidos
export const markMessagesAsRead = async (
    propertyId,
    otherUserId
) => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error(
            "Debes iniciar sesión para actualizar tus mensajes."
        );
    }

    const response = await fetch(
        `${API_URL}/conversation/${propertyId}/${otherUserId}/read`,
        {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "No se pudo actualizar el estado de lectura."
        );
    }

    return data;
};
