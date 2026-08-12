import React, { useEffect } from "react";
import useDarkMode from "../components/useDarkMode";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaBath,
  FaShareAlt,
  FaBed,
  FaUserCircle,
  FaPlus,
  FaMapMarkerAlt,
  FaVideo,
  FaCamera,
  FaHeart,
} from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";
import { getProperties } from "../api/properties";

const Properties = () => {
  const [loading, setLoading] = useState(true);
  const locationHook = useLocation();
  const [properties, setProperties] = useState([]);
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

        const data = await getProperties(filters);

        setProperties(data);

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
    <div
      className={`${darkMode ? "dark bg-[#0b2236]" : "light bg-transparent"}`}
    >
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
          className="px-6 py-4 bg-white dark:bg-[#1a2e40] rounded-xl shadow-md hover:shadow-xl transition"
        >
          {properties.length === 0 ? (
            <div className="text-center text-black col-span-3">
              No se encontraron propiedades que coincidan con tu búsqueda.
            </div>
          ) : (
            properties.map((item) => (
              <Link
                key={item._id}
                to={`/properties/${item._id}`}
                className="block"
              >
                <div
                  id="image-box"
                  className="bg-cover bg-center h-[250px] rounded-xl p-4 flex flex-col justify-between items-end transition-transform duration-300 hover:scale-105"
                  style={{
                    backgroundImage: `url(${item.images?.[0]})`,
                  }}
                >
                  <div
                    id="top"
                    className="flex justify-between items-end w-full"
                  >
                    <div>
                      <button className="px-3 py-1 bg-[#517399] hover:bg-white hover:text-black text-white rounded-full text-[13px]">
                        Ver mas
                      </button>
                    </div>
                    <div className="flex justify-between items-center gap-3">
                      <button className="px-3 py-1 bg-[#517399] hover:bg-white hover:text-black text-white rounded-full text-[13px]">
                        {item.propertyType}
                      </button>
                    </div>
                  </div>
                  <div
                    id="bottom"
                    className=" flex justify-between items-end  w-full"
                  >
                    <div className=" flex justify-start items-center gap-2">
                      <FaMapMarkerAlt className="size-4 text-white" />
                      <h1 className="text-white">{item.address}</h1>
                    </div>
                    <div className="flex justify-center items-center gap-4">
                      <FaVideo className="size-4 text-white" />
                      <FaCamera className="size-4 text-white" />
                    </div>
                  </div>
                </div>
                <div className="px-6 py-3 flex flex-col justify-center items-start gap-2 w-full">
                  <h1 className="text-xl font-bold dark:text-white">
                    {item.title}
                  </h1>
                  <h1 className="text-2xl text- text-[#71bFD1] font-bold dark:text-white">
                    ${item.price?.amount?.toLocaleString()}
                  </h1>
                  <p className="text-gray-500 dark:text-gray-300 text-sm">
                    {item.city}
                  </p>
                  <p className="dark:text-white">{item.description}</p>
                  <div
                    id="icons"
                    className="flex justify-center items-start gap-4"
                  >
                    <div className="flex justify-center items-start gap-2">
                      <FaBath className="size-5 text-[#71bFD1]" />
                      <h1 className="dark:text-white">{item.bathrooms}</h1>
                    </div>
                    <div className="flex justify-center items-start gap-2">
                      <FaBed className="size-5 text-[#71bFD1]" />
                      <h1 className="dark:text-white">{item.bedrooms}</h1>
                    </div>
                    <div className="flex justify-center items-start gap-2">
                      <MdSpaceDashboard className="size-5 text-[#71bFD1]" />
                      <h1 className="dark:text-white">{item.locality}</h1>
                    </div>
                  </div>
                  <div className="w-full mt-8">
                    <div
                      id="owner-info"
                      className="flex justify-between items-center w-full mt-2"
                    >
                      <div className=" flex justify-center items-center gap-2">
                        <FaUserCircle className="size-5 text-[#71bFD1]" />
                        <h1 className="dark:text-white">{item.owner?.name}</h1>
                      </div>
                      <div className=" flex justify-center items-center gap-4">
                        <div className=" p-2 border-2 border-gray-200 hover:bg-black cursor-pointer transform hover: scale-110 transition-transform duration-300">
                          <FaShareAlt className="size-4 text-[#71bFD1]" />
                        </div>
                        <div className=" p-2 border-2 border-gray-200 hover:bg-black cursor-pointer transform hover: scale-110 transition-transform duration-300">
                          <FaHeart className="size-4 text-[#71bFD1]" />
                        </div>
                        <div className=" p-2 border-2 border-gray-200 hover:bg-black cursor-pointer transform hover: scale-110 transition-transform duration-300">
                          <FaPlus className="size-4 text-[#71bFD1]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Properties;
