
const API_URL = "http://localhost:5000/api/message";

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
