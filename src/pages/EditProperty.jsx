import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    getPropertyById,
    updateProperty,
} from "../api/properties";

const EditProperty = () => {
    const { id } = useParams();

    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        propertyType: "",
        city: "",
        locality: "",
        neighborhood: "",
        address: "",
        bedrooms: "",
        bathrooms: "",
    });

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                setLoading(true);

                const data = await getPropertyById(id);

                console.log("PROPIEDAD PARA EDITAR:", data);

                setProperty(data);

                setFormData({
                    title: data.title || "",
                    description: data.description || "",
                    price: data.price?.amount || "",
                    propertyType: data.propertyType || "",
                    city: data.city || "",
                    locality: data.locality || "",
                    neighborhood: data.neighborhood || "",
                    address: data.address || "",
                    bedrooms: data.bedrooms || "",
                    bathrooms: data.bathrooms || "",
                });
            } catch (error) {
                console.error("Error obteniendo propiedad:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProperty();
    }, [id]);

    const handleChange = (e) => {
    const { name, value } = e.target;

    console.log("CAMBIO EN FORMULARIO:", name, value);

    setSuccessMessage("");

    setFormData({
        ...formData,
        [name]: value,
    });
};

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);

            const token = localStorage.getItem("token");

            if (!token) {
                throw new Error("No hay sesión activa");
            }

            console.log("DATOS QUE VOY A ENVIAR:", {
    title: formData.title,
    description: formData.description,
    price: {
        amount: Number(formData.price),
    },
    propertyType: formData.propertyType,
    city: formData.city,
    locality: formData.locality,
    neighborhood: formData.neighborhood,
    address: formData.address,
    bedrooms: formData.bedrooms
        ? Number(formData.bedrooms)
        : undefined,
    bathrooms: formData.bathrooms
        ? Number(formData.bathrooms)
        : undefined,
});

            const updatedProperty = await updateProperty(
                id,
                {
                    title: formData.title,
                    description: formData.description,
                    price: {
                        amount: Number(formData.price),
                    },
                    propertyType: formData.propertyType,
                    city: formData.city,
                    locality: formData.locality,
                    neighborhood: formData.neighborhood,
                    address: formData.address,
                    bedrooms: formData.bedrooms
                        ? Number(formData.bedrooms)
                        : undefined,
                    bathrooms: formData.bathrooms
                        ? Number(formData.bathrooms)
                        : undefined,
                },
                token
            );

            console.log(
                "PROPIEDAD ACTUALIZADA:",
                updatedProperty
            );

            setSuccessMessage("Propiedad actualizada correctamente.");

        } catch (error) {
            console.error(
                "Error actualizando propiedad:",
                error
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <p className="p-10">Cargando propiedad...</p>;
    }

    if (!property) {
        return <p className="p-10">Propiedad no encontrada.</p>;
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="p-10 max-w-2xl"
        >
            <h1 className="text-3xl font-bold mb-8">Editar propiedad</h1>

            {successMessage && (
                <p className="mb-6 text-green-600 font-semibold">
                    {successMessage}
                </p>
            )}

            <div className="mb-6">
                <label className="block mb-2 font-semibold">Título</label>

                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                />
            </div>

            <div className="mb-6">
                <label className="block mb-2 font-semibold">Descripción</label>

                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                    rows="5"
                />
            </div>

            <div className="mb-6">
                <label className="block mb-2 font-semibold">Precio</label>

                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                />
            </div>

            <div className="mb-6">
                <label className="block mb-2 font-semibold">
                    Tipo de propiedad
                </label>

                <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                >
                    <option value="">Selecciona un tipo</option>
                    <option value="habitacion">Habitación</option>
                    <option value="apartamento">Apartamento</option>
                    <option value="casa">Casa</option>
                    <option value="apartaestudio">Apartaestudio</option>
                </select>
            </div>

            <div className="mb-6">
                <label className="block mb-2 font-semibold">
                    Ciudad
                </label>

                <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                />
            </div>

            <div className="mb-6">
                <label className="block mb-2 font-semibold">
                    Localidad
                </label>

                <input
                    type="text"
                    name="locality"
                    value={formData.locality}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                />
            </div>

            <div className="mb-6">
                <label className="block mb-2 font-semibold">
                    Barrio
                </label>

                <input
                    type="text"
                    name="neighborhood"
                    value={formData.neighborhood}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                />
            </div>

            <div className="mb-6">
                <label className="block mb-2 font-semibold">
                    Dirección
                </label>

                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                />
            </div>

            <div className="mb-6">
                <label className="block mb-2 font-semibold">
                    Habitaciones
                </label>

                <input
                    type="number"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                />
            </div>

            <div className="mb-6">
                <label className="block mb-2 font-semibold">
                    Baños
                </label>

                <input
                    type="number"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                />
            </div>

            <button
                type="submit"
                disabled={saving}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg"
            >
                {saving ? "Guardando..." : "Guardar cambios"}
            </button>
        </form>
    );
};

export default EditProperty;
