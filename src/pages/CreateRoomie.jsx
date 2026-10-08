import { useState } from "react";
import { bogotaSectors } from "../data/bogotaSectors";
import { transformBogotaLocations } from "../data/transformBogotaLocations";

const CreateRoomie = () => {
    const [formData, setFormData] = useState({
        city: "",
        locality: "",
        maxBudget: "",
        moveInDate: "",
        description: "",
        preferences: [],
    });

    const bogotaLocations = transformBogotaLocations(bogotaSectors);

    const cities = ["Bogotá"];

    const localities =
        formData.city === "Bogotá"
            ? Object.keys(bogotaLocations)
            : [];

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="max-w-2xl mx-auto p-6">

            <h1 className="text-3xl font-bold mb-2">
                Crear perfil de Roomie
            </h1>

            <p className="mb-6 text-gray-600">
                Completa tu información para encontrar personas
                compatibles para compartir vivienda.
            </p>

            <form className="space-y-5">

                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="city"
                        className="font-medium"
                    >
                        Ciudad
                    </label>

                    <select
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="border rounded-lg p-3"
                    >
                        <option value="">
                            Selecciona una ciudad
                        </option>

                        {cities.map((city) => (
                            <option key={city} value={city}>
                                {city}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="locality"
                        className="font-medium"
                    >
                        Localidad
                    </label>

                    <select
                        id="locality"
                        name="locality"
                        value={formData.locality}
                        onChange={handleChange}
                        className="border rounded-lg p-3"
                    >
                        <option value="">
                            Selecciona una localidad
                        </option>

                        {localities.map((locality) => (
                            <option
                                key={locality}
                                value={locality}
                            >
                                {locality}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="maxBudget"
                        className="font-medium"
                    >
                        Presupuesto máximo
                    </label>

                    <input
                        id="maxBudget"
                        name="maxBudget"
                        type="number"
                        value={formData.maxBudget}
                        onChange={handleChange}
                        className="border rounded-lg p-3"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="moveInDate"
                        className="font-medium"
                    >
                        Fecha de mudanza
                    </label>

                    <input
                        id="moveInDate"
                        name="moveInDate"
                        type="date"
                        value={formData.moveInDate}
                        onChange={handleChange}
                        className="border rounded-lg p-3"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="description"
                        className="font-medium"
                    >
                        Sobre ti
                    </label>

                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="5"
                        placeholder="Cuéntanos qué estás buscando y cómo eres como compañero de vivienda..."
                        className="border rounded-lg p-3"
                    />
                </div>
                <div className="flex flex-col gap-3">
                    <label className="font-medium">
                        Preferencias
                    </label>

                    {[
                        "No fumadores",
                        "Ambiente tranquilo",
                        "Trabajo remoto",
                        "Mascotas",
                        "Estudiantes",
                    ].map((preference) => (
                        <label
                            key={preference}
                            className="flex items-center gap-2"
                        >
                            <input
                                type="checkbox"
                                value={preference}
                                checked={formData.preferences.includes(
                                    preference
                                )}
                                onChange={(event) => {
                                    const { checked, value } =
                                        event.target;

                                    setFormData((prev) => ({
                                        ...prev,
                                        preferences: checked
                                            ? [
                                                ...prev.preferences,
                                                value,
                                            ]
                                            : prev.preferences.filter(
                                                (item) => item !== value
                                            ),
                                    }));
                                }}
                            />

                            <span>{preference}</span>
                        </label>
                    ))}
                </div>
                <button
                    type="submit"
                    className="bg-black text-white rounded-lg px-5 py-3 mt-4"
                >
                    Crear perfil de Roomie
                </button>

            </form>
        </div>
    );
};

export default CreateRoomie;