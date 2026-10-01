const API_URL = "http://localhost:5000/api/roomies";

export const createRoomie = async (roomieData) => {
    const token = localStorage.getItem("token");

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(roomieData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "No se pudo crear el perfil de Roomie"
        );
    }

    return data.data.roomie;
};

export const getMyRoomie = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/my`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "No se pudo obtener el perfil de Roomie"
        );
    }

    return data.data.roomie;
};

export const getRoomies = async () => {
    const response = await fetch(API_URL);

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "No se pudieron obtener los perfiles de Roomie"
        );
    }

    return data.data.roomies;
};

export const getRoomieById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "No se pudo obtener el perfil de Roomie"
        );
    }

    return data.data.roomie;
};

export const updateRoomie = async (id, roomieData) => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(roomieData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "No se pudo actualizar el perfil de Roomie"
        );
    }

    return data.data.roomie;
};

export const deleteRoomie = async (id) => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "No se pudo desactivar el perfil de Roomie"
        );
    }

    return data.data.roomie;
};