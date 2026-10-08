import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProperty } from "../api/properties";
import { locations } from "../data/locations";
import { bogotaSectors } from "../data/bogotaSectors";
import { transformBogotaLocations } from "../data/transformBogotaLocations";

const CreateProperty = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        propertyType: "",
        city: "",
        locality: "",
        neighborhood: "",
        price: {
            amount: "",
            currency: "COP",
            period: "monthly",
        },
    });

    const cities = Object.keys(locations);

    const bogotaLocations = transformBogotaLocations(bogotaSectors);

    const localities =
        formData.city === "Bogotá"
            ? Object.keys(bogotaLocations)
            : [];

    const neighborhoods =
        formData.city === "Bogotá" && formData.locality
            ? bogotaLocations[formData.locality] || []
            : [];

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    console.log(formData);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (
            !formData.title.trim() ||
            !formData.description.trim() ||
            !formData.propertyType ||
            !formData.city.trim() ||
            !formData.locality ||
            !formData.neighborhood.trim() ||
            !formData.price.amount ||
            Number(formData.price.amount) <= 0
        ) {
            setError("Todos los campos obligatorios deben tener información.");
            return;
        }




        try {
            const token = localStorage.getItem("token");

            if (!token) {
                throw new Error("Debes iniciar sesión para publicar una propiedad");
            }

            const propertyData = {
                ...formData,
                price: {
                    ...formData.price,
                    amount: Number(formData.price.amount),
                },
            };

            const property = await createProperty(
                propertyData,
                token
            );

            console.log("PROPIEDAD CREADA:", property);

            setSuccess("Propiedad creada correctamente");

            setTimeout(() => {
                navigate(`/properties/${property._id}`);
            }, 1000);

        } catch (error) {
            console.error("Error creando propiedad:", error);

            setError(
                error.message || "No se pudo crear la propiedad"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen pt-24 px-6">
            <form
                onSubmit={handleSubmit}
                className="max-w-3xl mx-auto space-y-6"
            >
                <h1 className="text-3xl font-bold mb-8">
                    Publicar propiedad
                </h1>

                {error && (
                    <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="bg-green-100 text-green-700 px-4 py-3 rounded-lg">
                        {success}
                    </div>
                )}

                <div className="space-y-2">
                    <label className="block font-semibold">
                        Título <span className="text-red-500">*</span>
                    </label>

                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                title: e.target.value,
                            })
                        }
                        placeholder="Ej: Apartamento en Kennedy"
                        className="w-full border rounded-lg px-4 py-3"
                    />
                </div>
                <div className="space-y-2">
                    <label className="block font-semibold">
                        Descripción <span className="text-red-500">*</span>
                    </label>

                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                description: e.target.value,
                            })
                        }
                        placeholder="Describe la propiedad..."
                        rows="4"
                        className="w-full border rounded-lg px-4 py-3"
                    />
                </div>
                <div className="space-y-2">
                    <label className="block font-semibold">
                        Tipo de vivienda <span className="text-red-500">*</span>
                    </label>

                    <select
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                propertyType: e.target.value,
                            })
                        }
                        className="w-full border rounded-lg px-4 py-3"
                    >
                        <option value="">Selecciona un tipo</option>
                        <option value="habitacion">Habitación</option>
                        <option value="apartamento">Apartamento</option>
                        <option value="casa">Casa</option>
                        <option value="apartaestudio">Apartaestudio</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="block font-semibold">
                        Ciudad <span className="text-red-500">*</span>
                    </label>

                    <select
                        value={formData.city}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                city: e.target.value,
                                locality: "",
                                neighborhood: "",
                            })
                        }
                        placeholder="Ej: Bogotá"
                        className="w-full border rounded-lg px-4 py-3"
                    >
                        <option value="">Selecciona una ciudad</option>

                        {cities.map((city) => (
                            <option key={city} value={city}>
                                {city}
                            </option>
                        ))}

                    </select>

                </div>
                <div>
                    <label className="block mb-2 font-semibold">
                        Localidad *
                    </label>

                    <select
                        value={formData.locality}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                locality: e.target.value,
                                neighborhood: "",
                            })
                        }
                        className="w-full border rounded-lg px-4 py-3"
                    >
                        <option value="">Selecciona una localidad</option>

                        {localities.map((locality) => (
                            <option key={locality} value={locality}>
                                {locality}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="block font-semibold">
                        Barrio <span className="text-red-500">*</span>
                    </label>

                    <select
                        value={formData.neighborhood}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                neighborhood: e.target.value,
                            })
                        }
                        className="w-full border rounded-lg px-4 py-3"
                    >
                        <option value="">Selecciona un barrio</option>

                        {neighborhoods.map((neighborhood) => (
                            <option key={neighborhood} value={neighborhood}>
                                {neighborhood}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="block font-semibold">
                        Precio <span className="text-red-500">*</span>
                    </label>

                    <input
                        type="text"
                        name="amount"
                        value={
                            formData.price.amount
                                ? `$ ${Number(formData.price.amount).toLocaleString("es-CO")}`
                                : ""
                        }
                        onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "");

                            setFormData({
                                ...formData,
                                price: {
                                    ...formData.price,
                                    amount: value,
                                },
                            });
                        }}
                        placeholder="Ej: 950000"
                        className="w-full border rounded-lg px-4 py-3"
                    />
                </div>
                <div className="space-y-2">
                    <label className="block font-semibold">
                        Periodo
                    </label>

                    <select
                        name="period"
                        value={formData.price.period}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                price: {
                                    ...formData.price,
                                    period: e.target.value,
                                },
                            })
                        }
                        className="w-full border rounded-lg px-4 py-3"
                    >
                        <option value="daily">Diario</option>
                        <option value="weekly">Semanal</option>
                        <option value="monthly">Mensual</option>
                    </select>
                </div>


                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#517399] text-white py-3 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Publicando..." : "Publicar propiedad"}
                </button>
            </form>
        </main>
    );
};

export default CreateProperty;