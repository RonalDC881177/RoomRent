
const API_URL = "http://localhost:5000/api/users";

export const getPublicUserProfile = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "No se pudo obtener el perfil del usuario"
        );
    }

    return data.data.user;
};