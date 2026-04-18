import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleContactClick = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Debes iniciar sesión para contactar al propietario");
      return;
    }

    setIsModalOpen(true);
  };
  const [message, setMessage] = useState("");
  const handleSendMessage = () => {
    console.log("Mensaje:", message);
  };

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);

        const res = await fetch(`http://localhost:5000/api/properties/${id}`);
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
      <div className="grid grid-cols-2 gap-4">
        <img
          src={property.images?.[0]}
          className="col-span-2 h-[300px] w-full object-cover rounded-xl"
        />

        {property.images?.slice(1, 3).map((img, i) => (
          <img
            key={i}
            src={img}
            className="h-[150px] w-full object-cover rounded-xl"
          />
        ))}
      </div>

      {/* Info */}
      <div className="mt-6 flex flex-col gap-2">
        <h1 className="text-3xl font-bold">{property.title}</h1>

        <p className="text-gray-400">{property.location}</p>

        <span className="bg-[#71bFD1] text-black px-3 py-1 rounded-full w-fit text-sm">
          {property.type}
        </span>

        <h2 className="text-2xl font-semibold text-[#71bFD1]">
          ${property.price?.toLocaleString()}
        </h2>

        <p className="mt-4 text-gray-300">{property.description}</p>
      </div>
      <div className="flex gap-6 mt-4">
        <span> {property.bed} habitaciones</span>
        <span> {property.bath} baños</span>
        <span> {property.area} m²</span>
      </div>
      <p className="mt-2 text-gray-400">
        Publicado por: {property.owner?.name}
      </p>
      <button
        onClick={handleContactClick}
        className="mt-6 bg-[#71bFD1] text-black px-6 py-3 rounded-xl font-semibold"
      >
        Contactar propietario
      </button>
      {
    isModalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-xl w-[400px]">
          <h2 className="text-xl text-black font-bold mb-4">Contactar propietario</h2>

          <textarea
            placeholder="Escribe tu mensaje..."
            className="w-full text-black border border-gray-300 p-2 rounded mb-4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancelar
            </button>

            <button
              onClick={handleSendMessage} className="px-4 py-2 bg-[#71bFD1] text-black rounded"
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    )}
    </div>
  );
};
  

export default PropertyDetail;
