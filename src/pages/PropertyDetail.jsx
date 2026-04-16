import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `http://localhost:5000/api/properties/${id}`
        );

        const data = await res.json();

        setProperty(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return <p className="text-white p-10">Cargando propiedad...</p>;
  }

  if (!property) {
    return <p className="text-white p-10">Propiedad no encontrada</p>;
  }

  return (
    <div className="p-10 text-white">
      {/* Imagen principal */}
      <img
        src={property.images?.[0]}
        alt=""
        className="w-full h-[400px] object-cover rounded-xl"
      />

      {/* Info */}
      <div className="mt-6">
        <h1 className="text-3xl font-bold">{property.title}</h1>

        <p className="text-gray-300">{property.location}</p>

        <h2 className="text-2xl mt-2 text-[#71bFD1]">
          ${property.price?.toLocaleString()}
        </h2>

        <p className="mt-4">{property.description}</p>
      </div>
    </div>
  );
};

export default PropertyDetail;