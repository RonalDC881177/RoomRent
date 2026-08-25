const API_URL = 'http://localhost:5000/api/properties';

export const getProperties = async (filters = {}) => {
  try {
    // construir query params
    const query = new URLSearchParams(filters).toString();

    const response = await fetch(`${API_URL}?${query}`);

    const data = await response.json();

    return {
      properties: data.data.properties,
      pagination: data.pagination,
    };
  } catch (error) {
    console.error('Error obteniendo propiedades', error);

    return {
      properties: [],
      pagination: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
        hasNext: false,
        hasPrev: false,
      },
    };
  }
};

export const getPropertyById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);

  const data = await response.json();

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