import React, { useEffect, useState } from "react";
import useDarkMode from "../components/useDarkMode";
import cityimg from "../assets/images/city.png";
import AOS from "aos";
import "aos/dist/aos.css";
import { useLocation, useNavigate } from "react-router-dom";

const Home = () => {
  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
  }, []);

  const { darkMode } = useDarkMode();
  const currentLocation = useLocation();

  useEffect(() => {
    if (currentLocation.state?.scrollTo) {
      const section = document.getElementById(currentLocation.state.scrollTo);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [currentLocation]);
  const navigate = useNavigate();

  const [locationFilter, setLocationFilter] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");

  const handleSearch = () => {
  navigate(
    `/properties?location=${locationFilter}&type=${type}&price=${price}`
  );
};

  return (
    <>
      <div className={`${darkMode ? "dark bg-[#0b2236]" : "light bg-white"}`}>
        <section
          id="home"
          className="w-[95%] h-[600px] m-auto bg-cover bg-center rounded-xl flex justify-center flex-col items-start lg:px-28 px-10 gap-7 z-20"
          style={{ backgroundImage: `url(${cityimg})` }}
        >
          <h1
            data-aos="zoom-in"
            className="text-6xl font-semibold text-white lg:pr-[500px] pr-0 lg:leading-[70px] leading-[60px]"
          >
            Encuentra tu proximo hogar en Bogotá
          </h1>
          <p
            data-aos="zoom-in"
            className="text-white text-xl lg:pr-[500px] pr-0"
          >
            Cada rincón de Bogotá guarda un nuevo comienzo, una historia
            esperando ser vivida. Encuentra el tuyo hoy y da el siguiente paso
            hacia el hogar que te hará sentir en el lugar correcto.
          </p>
        </section>
      </div>

      {/* Form Section */}

      <div
  className={`${
    darkMode ? "dark bg-[#0b2236]" : "light bg-transparent"
  } z-10`}
>
        <div
          data-aos="zoom-in"
          id="form"
          className={`${darkMode ? "dark bg-gray-600" : "light bg-white"} lg:w-[70%] w-full m-auto grid lg:grid-cols-4 grid-cols-1 justify-center items-center gap-6 p-8 rounded-xl -mt-14`}
        >
          <div className="w-full">
            <h1 className="text-black font-semibold dark:text-white">
              LOCALIDAD
            </h1>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="bg-white p-2 border-b w-full mt-2 border-[#c9c7c1] text-gray-500 text-md rounded-xl"
            >
              <option value="" disabled>
                Selecciona Localidad
              </option>
              <option value="Antonio Nariño">Antonio Nariño</option>
              <option value="Barrios Unidos">Barrios Unidos</option>
              <option value="Bosa">Bosa</option>
              <option value="Chapinero">Chapinero</option>
              <option value="Engativá">Engativá</option>
              <option value="Fontibón">Fontibón</option>
              <option value="Kennedy">Kennedy</option>
              <option value="Usaquén">Usaquén</option>
              <option value="Santa Fe">Santa Fe</option>
              <option value="San Cristobal">San Cristobal</option>
              <option value="Usme">Usme</option>
              <option value="Tunjuelito">Tunjuelito</option>
              <option value="Suba">Suba</option>
              <option value="Teusaquillo">Teusaquillo</option>
              <option value="Los Mártires">Los Mártires</option>
              <option value="Puente Aranda">Puente Aranda</option>
              <option value="Rafael Uribe Uribe">Rafael Uribe Uribe</option>
              <option value="Ciudad Bolívar">Ciudad Bolívar</option>
              <option value="La Candelaria">La Candelaria</option>
            </select>
          </div>
          <div className="w-full">
            <h1 className="text-black font-semibold dark:text-white">TIPO</h1>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="bg-white p-2 border-b w-full mt-2 border-[#c9c7c1] text-gray-500 text-md rounded-xl"
            >
              <option value="" disabled>
                Selecciona Tipo
              </option>
              <option value="Casa">Casa</option>
              <option value="Apartamento">Apartamento</option>
              <option value="Habitación">Habitación</option>
              <option value="Roomie">Roomie</option>
            </select>
          </div>
          <div className="w-full">
            <h1 className="text-black font-semibold dark:text-white">PRECIO</h1>
            <select
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="bg-white p-2 border-b w-full mt-2 border-[#c9c7c1] text-gray-500 text-md rounded-xl"
            >
              <option value="" disabled>
                Selecciona Precio
              </option>
              <option value="0-500000">Menos de 500.000</option>
              <option value="500000-1000000">De 500.000 a 1.000.000</option>
              <option value="1000000-1500000">De 1.000.000 a 1.500.000</option>
              <option value="1500000+">Más de 1.500.000</option>
            </select>
          </div>
          <div className="w-full">
            <button
              onClick={handleSearch}
              className="bg-[#71bFD1] dark:bg-[#71bFD1] hover:bg-[#0B2236] dark:hover:bg-white dark:hover:text-black text-lg p-4 w-full text-white font-semibold rounded-xl cursor-pointer transform hover:scale-110 transition-transform duration-300"
            >
              Buscar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
