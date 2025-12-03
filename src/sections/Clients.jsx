import React, { useEffect } from "react";
import { Client } from "../components/Export";
import { useDarkMode } from "../components/DarkModeContext";
import { FaStar } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const Clients = () => {
  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
  }, []);

  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className={darkMode ? "dark bg-black" : "light bg-transparent"}>
      <section
        id="testimonials"
        className="lg:w-[95%] w-full h-fit m-auto bg-cover bg-center rounded-xl flex justify-center flex-col items-start lg:px-20 px-6 py-20 gap-20">
        <div className="flex flex-col justify-center items-start gap-4">
          <h1 data-aos="zoom-in" className="text-red-500 dark:text-white">NUESTROS CLIENTES</h1>
          <h1 className=" text-black dark:text-white text-[40px] font-semibold leading-10">Estas son la opiniones <br /> de nuestros clientes</h1>
        </div>
      </section>
    </div>
  );
};

export default Clients;
