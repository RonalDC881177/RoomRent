import React, { useEffect } from "react";
import useDarkMode from "../components/useDarkMode";
import area1 from "../assets/images/House.jpg";
import area2 from "../assets/images/Apartment.jpg";
import area3 from "../assets/images/Room.jpeg";
import AOS from "aos";
import "aos/dist/aos.css";

const PopularAreas = () => {
  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
  }, []);

  const { darkMode } = useDarkMode();

  return (
    <div className={`${darkMode ? "dark bg-black" : "light bg-transparent"}`}>
      <section
        className={`${
          darkMode ? "dark bg-[#65727c]" : "light bg-[#cadffb]"
        } lg:w-[90%] w-full h-fit m-auto bg-cover bg-center rounded-xl flex justify-center flex-col items-center lg:px-20 px-6 py-20 gap-20`}
      >
        <div
          id="top"
          className="w-full grid lg:grid-cols-3 grid-cols-1 justify-center items-center gap-8"
        >
          <div>
            <h1 data-aos="zoom-in" className="text-[#2d2c55] dark:text-white font-semibold">
              TIPOS DE ARRIENDO
            </h1>
            <h1
              data-aos="zoom-in"
              className="text-black text-[40px] font-semibold leading-10 mt-4 dark:text-white"
            >
              Explora todos los <br></br> inmuebles disponibles
            </h1>
          </div>

          <div className="grid lg:grid-cols-3 col-span-2 grid-cols-1 justify-center items-center gap-6">
            <div
              data-aos="zoom-in"
              data-aos-delay="400"
              style={{ backgroundImage: `url(${area1})` }}
              className="h-[300px] bg-cover bg-center rounded-xl transform transition-transform duration-500 hover:scale-110"
            ></div>
            <div
              data-aos="zoom-in"
              data-aos-delay="500"
              style={{ backgroundImage: `url(${area2})` }}
              className="h-[300px] bg-cover bg-center rounded-xl transform transition-transform duration-500 hover:scale-110"
            ></div>
            <div
              data-aos="zoom-in"
              data-aos-delay="600"
              style={{ backgroundImage: `url(${area3})` }}
              className="h-[300px] bg-cover bg-center rounded-xl transform transition-transform duration-500 hover:scale-110"
            ></div>
          </div>
        </div>
        <div
          id="bottom"
          className="w-full grid lg:grid-cols-3 grid-cols-1 lg:justify-center justify-start items-center gap-6"
        >
          <div
            data-aos="zoom-in"
            data-aos-delay="200"
            className="flex justify-center lg:items-center gap-8 w-full"
          >
            <h1 className="text-black text-7xl font-semibold dark:text-white">
              5K
            </h1>
            <h1>
              PROPIEDADES <br /> DISPONIBLES
            </h1>
          </div>
          <div
            data-aos="zoom-in"
            data-aos-delay="200"
            className="flex justify-center lg:items-center gap-8 w-full"
          >
            <h1 className="text-black text-7xl font-semibold dark:text-white">
              +1K
            </h1>
            <h1>
              ARRENDADORES HAN <br /> CONFIADO EN NOSOTROS
            </h1>
          </div>
          <div
            data-aos="zoom-in"
            data-aos-delay="200"
            className="flex justify-center lg:items-center gap-8 w-full"
          >
            <h1 className="text-black text-7xl font-semibold dark:text-white">
              +800
            </h1>
            <h1>
              ARRENDATARIOS HAN <br /> ENCONTRADO SU HOGAR <br /> CON NOSOTROS
            </h1>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PopularAreas;
