import { useEffect, useState } from "react";
import {
    getRoomies,
    getMyRoomie,
} from "../api/roomieService";

const DiscoverRoomies = () => {
    const [roomies, setRoomies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [myRoomie, setMyRoomie] = useState(null);
    const [localityFilter, setLocalityFilter] = useState("");
    const [maxBudgetFilter, setMaxBudgetFilter] = useState("");
    const [moveInDateFilter, setMoveInDateFilter] = useState("");
    const [sortBy, setSortBy] = useState("budgetAsc");

    useEffect(() => {
        const fetchRoomies = async () => {
            try {
                const data = await getRoomies();

                let myRoomieData = null;

                try {
                    myRoomieData = await getMyRoomie();
                    setMyRoomie(myRoomieData);
                } catch {
                    // El usuario no tiene un perfil propio disponible.
                }

                const otherRoomies = data.filter(
                    (roomie) => roomie._id !== myRoomieData?._id
                );

                setRoomies(otherRoomies);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRoomies();
    }, []);

    const filteredRoomies = roomies.filter((roomie) => {
        const matchesLocality =
            !localityFilter ||
            roomie.locality === localityFilter;

        const matchesBudget =
            maxBudgetFilter === "" ||
            Number(roomie.maxBudget) <= Number(maxBudgetFilter);

        const roomieMoveInDate = String(roomie.moveInDate).split("T")[0];

        const matchesMoveInDate =
            !moveInDateFilter ||
            roomieMoveInDate === moveInDateFilter;

        return (
            matchesLocality &&
            matchesBudget &&
            matchesMoveInDate
        );
    });

    const sortedRoomies = [...filteredRoomies].sort((a, b) => {
        switch (sortBy) {
            case "budgetAsc":
                return Number(a.maxBudget) - Number(b.maxBudget);

            case "budgetDesc":
                return Number(b.maxBudget) - Number(a.maxBudget);

            case "moveInDate":
                return (
                    new Date(a.moveInDate).getTime() -
                    new Date(b.moveInDate).getTime()
                );

            case "locality":
                return (a.locality ?? "").localeCompare(
                    b.locality ?? "",
                    "es"
                );

            default:
                return 0;
        }
    });

    const getCompatibility = (roomie) => {
        const criteria = [];

        if (localityFilter) {
            criteria.push(roomie.locality === localityFilter);
        }

        if (maxBudgetFilter !== "") {
            criteria.push(
                Number(roomie.maxBudget) <= Number(maxBudgetFilter)
            );
        }

        if (moveInDateFilter) {
            const roomieMoveInDate =
                String(roomie.moveInDate).split("T")[0];

            criteria.push(
                roomieMoveInDate === moveInDateFilter
            );
        }

        return {
            matched: criteria.filter(Boolean).length,
            total: criteria.length,
        };
    };

    const getSharedPreferences = (roomie) => {
        const myPreferences = myRoomie?.preferences ?? [];
        const theirPreferences = roomie.preferences ?? [];

        return theirPreferences.filter((preference) =>
            myPreferences.includes(preference)
        );
    };

    return (
        <main className="min-h-screen px-4 py-12">
            <section className="max-w-6xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                        Descubre tu próximo Roomie
                    </h1>

                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Conoce personas que también buscan compartir
                        vivienda y encuentra perfiles compatibles
                        con tus preferencias.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="localityFilter"
                            className="font-medium"
                        >
                            Localidad
                        </label>

                        <select
                            id="localityFilter"
                            value={localityFilter}
                            onChange={(event) => setLocalityFilter(event.target.value)}
                            className="w-full border rounded-lg p-3"
                        >
                            <option value="">Todas las localidades</option>
                            <option value="Usaquén">Usaquén</option>
                            <option value="Chapinero">Chapinero</option>
                            <option value="Santa Fe">Santa Fe</option>
                            <option value="San Cristóbal">San Cristóbal</option>
                            <option value="Usme">Usme</option>
                            <option value="Tunjuelito">Tunjuelito</option>
                            <option value="Bosa">Bosa</option>
                            <option value="Kennedy">Kennedy</option>
                            <option value="Fontibón">Fontibón</option>
                            <option value="Engativá">Engativá</option>
                            <option value="Suba">Suba</option>
                            <option value="Barrios Unidos">Barrios Unidos</option>
                            <option value="Teusaquillo">Teusaquillo</option>
                            <option value="Los Mártires">Los Mártires</option>
                            <option value="Antonio Nariño">Antonio Nariño</option>
                            <option value="Puente Aranda">Puente Aranda</option>
                            <option value="La Candelaria">La Candelaria</option>
                            <option value="Rafael Uribe Uribe">Rafael Uribe Uribe</option>
                            <option value="Ciudad Bolívar">Ciudad Bolívar</option>
                            <option value="Sumapaz">Sumapaz</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="maxBudgetFilter"
                            className="font-medium"
                        >
                            Presupuesto máximo mensual (COP)
                        </label>

                        <input
                            id="maxBudgetFilter"
                            type="number"
                            min="0"
                            value={maxBudgetFilter}
                            onChange={(event) => setMaxBudgetFilter(event.target.value)}
                            placeholder="Ej. 800000"
                            className="w-full border rounded-lg p-3"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="moveInDateFilter"
                            className="font-medium"
                        >
                            Fecha de mudanza
                        </label>

                        <input
                            id="moveInDateFilter"
                            type="date"
                            value={moveInDateFilter}
                            onChange={(event) =>
                                setMoveInDateFilter(event.target.value)
                            }
                            className="w-full border rounded-lg p-3"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="sortBy"
                            className="block text-sm font-medium mb-1"
                        >
                            Ordenar resultados por
                        </label>

                        <select
                            id="sortBy"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 p-2"
                        >
                            <option value="budgetAsc">
                                Menor presupuesto primero
                            </option>
                            <option value="budgetDesc">
                                Mayor presupuesto primero
                            </option>
                            <option value="moveInDate">
                                Fecha de mudanza más próxima
                            </option>
                            <option value="locality">
                                Localidad (A-Z)
                            </option>
                        </select>
                    </div>
                </div>
                <div className="flex justify-end mb-8">
                    <button
                        type="button"
                        onClick={() => {
                            setLocalityFilter("");
                            setMaxBudgetFilter("");
                            setMoveInDateFilter("");
                        }}
                        className="border rounded-lg px-5 py-2 hover:bg-gray-100 transition"
                    >
                        Limpiar filtros
                    </button>
                </div>

                {loading && (
                    <p className="text-center text-gray-500">
                        Cargando perfiles...
                    </p>
                )}

                {!loading && error && (
                    <p className="text-center text-red-600" role="alert">
                        {error}
                    </p>
                )}

                {!loading && !error && filteredRoomies.length === 0 && (
                    <p className="text-center text-gray-500">
                        No se encontraron perfiles con los filtros seleccionados.
                    </p>
                )}

                {!loading && !error && filteredRoomies.length > 0 && (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sortedRoomies.map((roomie) => (
                            <article
                                key={roomie._id}
                                className="border rounded-2xl p-6 shadow-sm min-w-0 overflow-hidden"
                            >
                                <h2 className="text-xl font-semibold mb-2">
                                    {roomie.owner?.name || "Perfil Roomie"}
                                </h2>

                                {(() => {
                                    const compatibility = getCompatibility(roomie);

                                    if (compatibility.total === 0) {
                                        return (
                                            <p className="text-sm text-gray-500 mb-4">
                                                Sin filtros aplicados
                                            </p>
                                        );
                                    }

                                    return (
                                        <span className="inline-block bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full mb-4">
                                            {compatibility.matched} de {compatibility.total} criterios coinciden
                                        </span>
                                    );
                                })()}

                                <div className="space-y-3 text-gray-600">
                                    <p>
                                        <strong>Ciudad:</strong>{" "}
                                        {roomie.city}
                                    </p>

                                    <p>
                                        <strong>Localidad:</strong>{" "}
                                        {roomie.locality}
                                    </p>

                                    <p>
                                        <strong>Presupuesto máximo:</strong>{" "}
                                        ${Number(
                                            roomie.maxBudget
                                        ).toLocaleString("es-CO")} COP
                                    </p>

                                    <p>
                                        <strong>Fecha de mudanza:</strong>{" "}
                                        {String(
                                            roomie.moveInDate
                                        ).split("T")[0]}
                                    </p>

                                    <p className="min-w-0 whitespace-pre-wrap break-words">
                                        <strong>Sobre esta persona:</strong>{" "}
                                        {roomie.description}
                                    </p>
                                </div>

                                {roomie.preferences?.length > 0 && (
                                    <div className="mt-4">
                                        <h3 className="font-medium mb-2">
                                            Preferencias
                                        </h3>


                                        <div className="flex flex-wrap gap-2">
                                            {(roomie.preferences ?? []).map((preference) => (
                                                <span
                                                    key={preference}
                                                    className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                                                >
                                                    {preference}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="mt-4">
                                            <h3 className="font-semibold text-sm mb-2">
                                                Preferencias compartidas contigo
                                            </h3>

                                            {!myRoomie ? (
                                                <p className="text-sm text-gray-500">
                                                    Crea tu perfil para comparar preferencias.
                                                </p>
                                            ) : (myRoomie.preferences ?? []).length === 0 ? (
                                                <p className="text-sm text-gray-500">
                                                    Agrega preferencias a tu perfil para compararlas.
                                                </p>
                                            ) : getSharedPreferences(roomie).length === 0 ? (
                                                <p className="text-sm text-gray-500">
                                                    No tienen preferencias seleccionadas en común.
                                                </p>
                                            ) : (
                                                <div className="flex flex-wrap gap-2">
                                                    {getSharedPreferences(roomie).map((preference) => (
                                                        <span
                                                            key={preference}
                                                            className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full"
                                                        >
                                                            {preference}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>


                                    </div>
                                )}
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
};

export default DiscoverRoomies;

