import { useNavigate } from "react-router-dom";

const PropertyCard = ({ property }) => {
    const navigate = useNavigate();

    return (
        <article
            onClick={() => navigate(`/properties/${property.id}`)}
            className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer"
        >
            <img
                src={property.images}
                alt={property.name}
                className="w-full h-52 object-cover"
            />

            <div className="p-4 space-y-2">
                <p className="text-sm text-gray-500">
                    {property.address}
                </p>

                <h3 className="font-semibold text-lg">
                    {property.name}
                </h3>

                <p className="text-[#517399] font-bold">
                    {property.price}
                </p>

                <p className="text-sm text-gray-600 line-clamp-2">
                    {property.about}
                </p>

                <div className="flex gap-4 text-sm text-gray-600 pt-2">
                    {property.bed}
                    {property.bath}
                    {property.area}
                </div>

                <div className="pt-3 text-sm text-gray-500">
                    {property.owner}
                </div>
            </div>
        </article>
    );
};

export default PropertyCard;
