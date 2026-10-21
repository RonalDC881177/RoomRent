import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    getPrivatePropertyById,
    updateProperty,
} from "../api/properties";
import {
    getCities,
    getLocalities,
    getNeighborhoods,
} from "../data/geographicCatalog";

const EditProperty = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loadError, setLoadError] = useState("");
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
    const cities = getCities();
    const localities = getLocalities(formData.city);
    const neighborhoods = getNeighborhoods(
        formData.city,
        formData.locality
    );

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                setLoading(true);
                setProperty(null);
                setLoadError("");

                const token = localStorage.getItem("token");
                if (!token) {
                    throw new Error("No hay sesión activa");
                }

                const data = await getPrivatePropertyById(id, token);

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
                    bedrooms: data.bedrooms ?? "",
                    bathrooms: data.bathrooms ?? "",
                });
            } catch (error) {
                console.error("Error obteniendo propiedad:", error);
                setLoadError(
                    error.message || "No se pudo cargar la propiedad"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProperty();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setSuccessMessage("");
        setErrorMessage("");

        setFormData((previousData) => {
            if (name === "city") {
                return {
                    ...previousData,
                    city: value,
                    locality: "",
                    neighborhood: "",
                };
            }

            if (name === "locality") {
                return {
                    ...previousData,
                    locality: value,
                    neighborhood: "",
                };
            }

            return {
                ...previousData,
                [name]: value,
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSuccessMessage("");
        setErrorMessage("");
        const priceAmount = Number(formData.price);

        if (!Number.isFinite(priceAmount) || priceAmount <= 0) {
            setErrorMessage("El precio debe ser mayor a 0.");
            return;
        }

        setSaving(true);

        try {
            const token = localStorage.getItem("token");

            if (!token) {
                throw new Error("No hay sesión activa");
            }

            await updateProperty(
                id,
                {
                    title: formData.title,
                    description: formData.description,
                    price: { amount: priceAmount },
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

            setSuccessMessage("Propiedad actualizada correctamente.");
        } catch (error) {
            console.error("Error actualizando propiedad:", error);
            setErrorMessage(error.message || "Error actualizando la propiedad");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <p className="p-10">Cargando propiedad...</p>;
    }

    if (!property) {
        return (
            <p className="p-10 text-red-600">
                {loadError || "Propiedad no encontrada."}
            </p>
        );
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

            {errorMessage && (
                <p className="mb-6 text-red-600 font-semibold">
                    {errorMessage}
                </p>
            )}

            <div className="mb-6">
                <label className="block mb-2 font-semibold">Título</label>

                <input
                    type="text"
                    name="title"
                    required
                    minLength={5}
                    maxLength={100}
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                />
            </div>

            <div className="mb-6">
                <label className="block mb-2 font-semibold">Descripción</label>

                <textarea
                    name="description"
                    required
                    minLength={20}
                    maxLength={2000}
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
                    required
                    min="0"
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
                    required
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

                <select
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                >
                    <option value="">Selecciona una ciudad</option>

                    {cities.map((city) => (
                        <option key={city} value={city}>
                            {city}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-6">
                <label className="block mb-2 font-semibold">
                    Localidad
                </label>

                <select
                    name="locality"
                    required
                    value={formData.locality}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                >
                    <option value="">Selecciona una localidad</option>

                    {localities.map((locality) => (
                        <option key={locality} value={locality}>
                            {locality}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-6">
                <label className="block mb-2 font-semibold">
                    Barrio
                </label>

                <select
                    name="neighborhood"
                    required
                    value={formData.neighborhood}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                >
                    <option value="">Selecciona un barrio</option>

                    {neighborhoods.map((neighborhood) => (
                        <option key={neighborhood} value={neighborhood}>
                            {neighborhood}
                        </option>
                    ))}
                </select>
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
                    min="0"
                    step="1"
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
                    min="0"
                    step="1"
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
