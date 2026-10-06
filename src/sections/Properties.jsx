import React, { useEffect } from "react";
import useDarkMode from "../components/useDarkMode";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { getProperties } from "../api/properties";
import PropertyCard from "../components/PropertyCard";

const Properties = () => {
  const [loading, setLoading] = useState(true);
  const locationHook = useLocation();
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  });
  const { darkMode } = useDarkMode();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);

        const params = new URLSearchParams(locationHook.search);

        const locality = params.get("locality");
        const propertyType = params.get("propertyType");
        const minPrice = params.get("minPrice");
        const maxPrice = params.get("maxPrice");
        const page = params.get("page");
        const limit = params.get("limit");

        const filters = {};

        if (locality) {
          filters.locality = locality;
        }

        if (propertyType) {
          filters.propertyType = propertyType;
        }

        if (minPrice) {
          filters.minPrice = minPrice;
        }

        if (maxPrice) {
          filters.maxPrice = maxPrice;
        }

        if (page) {
          filters.page = page;
        }

        if (limit) {
          filters.limit = limit;
        }

        const data = await getProperties(filters);

        setProperties(data.properties);
        setPagination(data.pagination);

        console.log("DATA REAL:", data);
      } catch (error) {
        console.error("Error:", error);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [locationHook.search]);

  if (loading) {
    return (
      <div className="grid lg:grid-cols-3 gap-8 p-10">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="rounded-xl overflow-hidden">
            <div className="h-[200px] bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
            <div className="p-4 space-y-2">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 animate-pulse w-3/4"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 animate-pulse w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`${darkMode ? "dark bg-[#0b2236]" : "light bg-transparent"}`}>
      <section
        id="properties"
        className="lg:w-[90%] m-auto lg:px-20 px-6 py-20 w-full flex flex-col justify-center items-start gap-10"
      >
        <div className="flex flex-col justify-center items-start gap-4">
          <h1
            data-aos="zoom-in"
            className="text-[#2d2c55] dark:text-white font-semibold"
          >
            PROPIEDADES
          </h1>
          <h1
            data-aos="zoom-in"
            className="text-black text-4xl font-semibold dark:text-white"
          >
            Explora los inmuebles disponibles
          </h1>
        </div>

        {/* Property grid start */}

        <div
          id="grid-box"
          className="px-6 py-4 bg-white dark:bg-[#1a2e40] rounded-xl shadow-md hover:shadow-xl transition w-full"
        >
          {properties.length === 0 ? (
            <div className="text-center text-black col-span-3">
              No se encontraron propiedades que coincidan con tu búsqueda.
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {properties.map((item) => (
                <PropertyCard key={item._id} property={item} />
              ))}
            </div>
          )}

          {/* Paginación */}

          <div className="flex justify-center items-center gap-4 mt-8 w-full">
            <button
              onClick={() => {
                if (pagination.hasPrev) {
                  const params = new URLSearchParams(locationHook.search);

                  params.set("page", pagination.page - 1);

                  navigate(`/properties?${params.toString()}`);
                }
              }}
              disabled={!pagination.hasPrev}
              className="px-4 py-2 rounded bg-[#517399] text-white disabled:opacity-50"
            >
              Anterior
            </button>

            <span className="dark:text-white">
              Página {pagination.page} de {pagination.totalPages}
            </span>

            <button
              onClick={() => {
                if (pagination.hasNext) {
                  const params = new URLSearchParams(locationHook.search);

                  params.set("page", pagination.page + 1);

                  navigate(`/properties?${params.toString()}`);
                }
              }}
              disabled={!pagination.hasNext}
              className="px-4 py-2 rounded bg-[#517399] text-white disabled:opacity-50"
            >
              Siguiente
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Properties;
