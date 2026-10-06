import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getPropertyById } from "../api/properties";
import {
  FaBath,
  FaBed,
  FaMapMarkerAlt,
  FaUserCircle,
  FaArrowLeft,
  FaCamera,
  FaHeart,
  FaShareAlt,
  FaEdit,
} from "react-icons/fa";

const PropertyDetail = () => {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  // ============================================================
  // OBTENER PROPIEDAD
  // ============================================================

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        setError("");

        const propertyData = await getPropertyById(id);

        if (!propertyData) {
          throw new Error("No se encontró la información de la propiedad");
        }

        setProperty(propertyData);
        
      } catch (error) {
        console.error("Error obteniendo propiedad:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProperty();
    }
  }, [id]);

  // ============================================================
  // OCULTAR MENSAJE DE ÉXITO
  // ============================================================

  useEffect(() => {
    if (!success) return;

    const timer = setTimeout(() => {
      setSuccess(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [success]);

  // ============================================================
  // CONTACTAR PROPIETARIO
  // ============================================================

  const handleContactClick = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Debes iniciar sesión para contactar al propietario");
      return;
    }

    setIsModalOpen(true);
  };

  const handleSendMessage = async () => {
    if (!message.trim()) {
      alert("Por favor escribe un mensaje");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/message",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            propertyId: id,
            message: message.trim(),
          }),
        }
      );

      const data = await response.json();

      console.log("MESSAGE RESPONSE:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "No se pudo enviar el mensaje"
        );
      }

      setIsModalOpen(false);
      setMessage("");
      setSuccess(true);
    } catch (error) {
      console.error("Error enviando mensaje:", error);
      alert(error.message || "Error enviando mensaje");
    }
  };

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b2236] flex items-center justify-center px-6">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#71bfd1] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>

          <p className="text-white text-lg">
            Cargando propiedad...
          </p>
        </div>
      </div>
    );
  }

  // ============================================================
  // ERROR
  // ============================================================

  if (error || !property) {
    return (
      <div className="min-h-screen bg-[#0b2236] flex items-center justify-center px-6">
        <div className="bg-[#163041] rounded-2xl p-8 text-center max-w-lg w-full shadow-xl">
          <h1 className="text-2xl font-bold text-white mb-4">
            Propiedad no encontrada
          </h1>

          <p className="text-gray-300 mb-6">
            {error ||
              "No fue posible encontrar la propiedad solicitada."}
          </p>

          <Link
            to="/properties"
            className="inline-flex items-center gap-2 bg-[#71bfd1] text-[#0b2236] px-6 py-3 rounded-xl font-semibold hover:bg-white transition"
          >
            <FaArrowLeft />
            Volver a propiedades
          </Link>
        </div>
      </div>
    );
  }

  // ============================================================
  // DATOS DE LA PROPIEDAD
  // ============================================================

  const images = Array.isArray(property.images)
    ? property.images
    : [];

  const price = property.price?.amount;

  const currency = property.price?.currency || "COP";

  const period = property.price?.period || "monthly";

  const propertyType = property.propertyType || "Propiedad";

  const ownerName =
    property.owner?.name ||
    property.owner?.username ||
    "Propietario";

  // ============================================================
  // USUARIO ACTUAL
  // ============================================================

  const storedUser = localStorage.getItem("user");

  let currentUser = null;

  try {
    currentUser = storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Error leyendo usuario:", error);
  }

  // ============================================================
  // PERMISOS DE EDICIÓN
  // ============================================================

  const currentUserId = currentUser?.id || currentUser?._id;

  const ownerId =
    typeof property.owner === "object"
      ? property.owner?._id
      : property.owner;

  const canEdit =
    currentUser?.role === "admin" ||
    (currentUserId && ownerId && currentUserId === ownerId);
  // ============================================================
  // UI
  // ============================================================

  return (
    <div className="min-h-screen bg-[#0b2236] text-white px-4 md:px-8 lg:px-16 py-10">

      {/* ======================================================
          CONTENEDOR PRINCIPAL
      ====================================================== */}

      <div className="max-w-7xl mx-auto">

        {/* VOLVER */}
        <Link
          to="/properties"
          className="inline-flex items-center gap-2 text-gray-300 hover:text-[#71bfd1] transition mb-8"
        >
          <FaArrowLeft />
          Volver a propiedades
        </Link>

        {/* ====================================================
            GALERÍA
        ==================================================== */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* IMAGEN PRINCIPAL */}

          <div className="md:col-span-2 h-[320px] md:h-[450px] rounded-2xl overflow-hidden bg-[#163041]">

            {images.length > 0 ? (
              <img
                src={images[0]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                <FaCamera className="text-5xl mb-3" />
                <p>No hay imágenes disponibles</p>
              </div>
            )}

          </div>

          {/* IMÁGENES SECUNDARIAS */}

          {images.slice(1, 4).map((image, index) => (
            <div
              key={index}
              className="h-[180px] rounded-2xl overflow-hidden bg-[#163041]"
            >
              <img
                src={image}
                alt={`${property.title} ${index + 2}`}
                className="w-full h-full object-cover hover:scale-105 transition duration-300"
              />
            </div>
          ))}

        </div>

        {/* ====================================================
            INFORMACIÓN PRINCIPAL
        ==================================================== */}

        <div className="mt-8 grid lg:grid-cols-3 gap-8">

          {/* INFORMACIÓN */}

          <div className="lg:col-span-2 bg-[#163041] rounded-2xl p-6 md:p-8 shadow-xl">

            {/* TÍTULO */}

            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">

              <div>
                <span className="inline-block bg-[#71bfd1] text-[#0b2236] px-4 py-1 rounded-full text-sm font-semibold mb-3">
                  {propertyType}
                </span>

                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  {property.title}
                </h1>
              </div>

              {/* ACCIONES */}

              <div className="flex gap-3">

                {/* EDITAR */}
                {canEdit && (
                  <Link
                    to={`/properties/${property._id}/edit`}
                    className="p-3 rounded-full border border-gray-600 hover:bg-[#0b2236] transition"
                    title="Editar propiedad"
                  >
                    <FaEdit className="text-[#71bfd1]" />
                  </Link>
                )}

                {/* COMPARTIR */}
                <button
                  type="button"
                  className="p-3 rounded-full border border-gray-600 hover:bg-[#0b2236] transition"
                  title="Compartir"
                >
                  <FaShareAlt className="text-[#71bfd1]" />
                </button>

                {/* FAVORITO */}
                <button
                  type="button"
                  className="p-3 rounded-full border border-gray-600 hover:bg-[#0b2236] transition"
                  title="Favorito"
                >
                  <FaHeart className="text-[#71bfd1]" />
                </button>

              </div>

            </div>

            {/* UBICACIÓN */}

            <div className="flex items-start gap-2 mt-5 text-gray-300">

              <FaMapMarkerAlt className="text-[#71bfd1] mt-1" />

              <div>
                <p>
                  {property.address || "Dirección no disponible"}
                </p>

                <p className="text-sm text-gray-400">
                  {property.neighborhood
                    ? `${property.neighborhood}, `
                    : ""}
                  {property.locality
                    ? `${property.locality}, `
                    : ""}
                  {property.city}
                </p>
              </div>

            </div>

            {/* PRECIO */}

            <div className="mt-6">

              <p className="text-sm text-gray-400">
                Precio
              </p>

              <div className="flex items-baseline gap-2">

                <h2 className="text-3xl font-bold text-[#71bfd1]">
                  {price !== undefined
                    ? `${currency} $${price.toLocaleString("es-CO")}`
                    : "Precio no disponible"}
                </h2>

                <span className="text-gray-400">
                  / {period}
                </span>

              </div>

            </div>

            {/* CARACTERÍSTICAS */}

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">

              <div className="bg-[#0b2236] rounded-xl p-4 flex items-center gap-3">
                <FaBed className="text-[#71bfd1] text-2xl" />

                <div>
                  <p className="text-xl font-semibold">
                    {property.bedrooms ?? 0}
                  </p>

                  <p className="text-sm text-gray-400">
                    Habitaciones
                  </p>
                </div>
              </div>

              <div className="bg-[#0b2236] rounded-xl p-4 flex items-center gap-3">
                <FaBath className="text-[#71bfd1] text-2xl" />

                <div>
                  <p className="text-xl font-semibold">
                    {property.bathrooms ?? 0}
                  </p>

                  <p className="text-sm text-gray-400">
                    Baños
                  </p>
                </div>
              </div>

              <div className="bg-[#0b2236] rounded-xl p-4 flex items-center gap-3">

                <FaMapMarkerAlt className="text-[#71bfd1] text-2xl" />

                <div>
                  <p className="text-xl font-semibold">
                    {property.locality || "-"}
                  </p>

                  <p className="text-sm text-gray-400">
                    Localidad
                  </p>
                </div>

              </div>

            </div>

            {/* DESCRIPCIÓN */}

            <div className="mt-8">

              <h2 className="text-2xl font-semibold mb-3">
                Descripción
              </h2>

              <p className="text-gray-300 leading-7">
                {property.description ||
                  "Esta propiedad no tiene una descripción disponible."}
              </p>

            </div>

            {/* AMENIDADES */}

            {property.amenities?.length > 0 && (
              <div className="mt-8">

                <h2 className="text-2xl font-semibold mb-4">
                  Características y amenidades
                </h2>

                <div className="flex flex-wrap gap-3">

                  {property.amenities.map(
                    (amenity, index) => (
                      <span
                        key={index}
                        className="bg-[#0b2236] border border-gray-700 px-4 py-2 rounded-full text-gray-300"
                      >
                        {amenity}
                      </span>
                    )
                  )}

                </div>

              </div>
            )}

          </div>

          {/* ==================================================
              PROPIETARIO / CONTACTO
          ================================================== */}

          <div className="bg-[#163041] rounded-2xl p-6 shadow-xl h-fit">

            <h2 className="text-xl font-semibold mb-6">
              Propietario
            </h2>

            <div className="flex items-center gap-4">

              <FaUserCircle className="text-[#71bfd1] text-5xl" />

              <div>

                <p className="font-semibold text-lg">
                  {ownerName}
                </p>

                <p className="text-sm text-gray-400">
                  Propietario
                </p>

              </div>

            </div>

            <button
              onClick={handleContactClick}
              className="w-full mt-8 bg-[#71bfd1] text-[#0b2236] px-6 py-4 rounded-xl font-bold hover:bg-white transition"
            >
              Contactar propietario
            </button>

          </div>

        </div>

      </div>

      {/* ======================================================
          NOTIFICACIÓN
      ====================================================== */}

      {success && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-6 py-4 rounded-xl shadow-lg z-50">
          Mensaje enviado correctamente
        </div>
      )}

      {/* ======================================================
          MODAL CONTACTO
      ====================================================== */}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center px-4 z-50">

          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">

            <h2 className="text-xl text-black font-bold mb-4">
              Contactar propietario
            </h2>

            <p className="text-gray-500 text-sm mb-4">
              Envía un mensaje al propietario de esta propiedad.
            </p>

            <textarea
              placeholder="Escribe tu mensaje..."
              className="w-full text-black border border-gray-300 p-3 rounded-xl mb-4 min-h-[130px] resize-none focus:outline-none focus:ring-2 focus:ring-[#71bfd1]"
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
            />

            <div className="flex justify-end gap-3">

              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  setMessage("");
                }}
                className="px-5 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={handleSendMessage}
                className="px-5 py-2 bg-[#71bfd1] text-[#0b2236] font-semibold rounded-xl hover:bg-[#5daabd] transition"
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

