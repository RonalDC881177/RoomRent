import { useNavigate } from "react-router-dom";
import { FaCamera, FaBed, FaBath } from "react-icons/fa";

const PropertyCard = ({ property }) => {
    const navigate = useNavigate();

    const image = property.images?.[0];

    const formattedPrice = property.price?.amount
        ? new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: property.price.currency || "COP",
            maximumFractionDigits: 0,
        }).format(property.price.amount)
        : "Precio no disponible";

    return (
        <article
            onClick={() => navigate(`/properties/${property._id}`)}
            className="bg-white dark:bg-[#163041] rounded-xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer"
        >
            <div className="h-[200px] bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                {image ? (
                    <img
                        src={image}
                        alt={property.title || "Propiedad"}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <FaCamera className="text-4xl text-gray-400" />
                )}
            </div>

            <div className="p-4 space-y-2">
                <p className="text-sm text-gray-500 dark:text-gray-300">
                    {property.locality}
                </p>

                <h3 className="font-semibold text-lg dark:text-white">
                    {property.title}
                </h3>

                <p className="text-[#517399] font-bold">
                    {formattedPrice}
                </p>

                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                    {property.description}
                </p>

                <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-300 pt-2">
                    <span className="flex items-center gap-1">
                        <FaBed />
                        {property.bedrooms ?? 0} hab.
                    </span>

                    <span className="flex items-center gap-1">
                        <FaBath />
                        {property.bathrooms ?? 0} baños
                    </span>
                </div>

                <div className="pt-3 text-sm text-gray-500 dark:text-gray-400">
                    {property.owner?.name || "Propietario"}
                </div>
            </div>
        </article>
    );
};

export default PropertyCard;