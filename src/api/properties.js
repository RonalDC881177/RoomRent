const API_URL = 'http://localhost:5000/api/properties';

export const getProperties = async (filters = {}) => {
  const query = new URLSearchParams(filters).toString();

  const response = await fetch(`${API_URL}?${query}`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Error al obtener propiedades"
    );
  }

  return {
    properties: data.data.properties,
    pagination: data.pagination,
  };
};

export const getMyProperties = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/my`,
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
      data.message || "No se pudieron obtener tus propiedades"
    );
  }

  return data.data.properties;
};

export const getPropertyById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "No se pudo obtener la propiedad"
    );
  }

  return data.data.property;
};

export const updateProperty = async (id, data, token) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(
      responseData.message || "Error actualizando la propiedad"
    );
  }

  return responseData.data.property;
};

//Delete property

export const deleteProperty = async (id) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  console.log("RESPUESTA DELETE:", data);

  if (!response.ok) {
    throw new Error(
      data.message || "No se pudo eliminar la propiedad"
    );
  }

  return data.data.property;
};

// Create property

export const createProperty = async (propertyData, token) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(propertyData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Error creando la propiedad"
    );
  }

  return data.data.property;
};