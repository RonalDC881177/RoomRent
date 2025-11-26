import React, { useEffect } from "react";
import { useDarkMode } from "../components/DarkModeContext";
import { property } from '../components/Export'
import {
  FaBath,
  FaShareAlt,
  FaBed,
  FaUserCircle,
  FaPlus,
  FaMapMarkerAlt,
  FaVideo,
  FaCamera,
} from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";

const Properties = () => {
  
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
    <div className={`${darkMode ? "dark bg-black" : "light bg-transparent"}`}>
      <section
        id="Properties"
        className="lg:w-[90%] m-auto lg:px-20 px-6 py-20 w-full flex flex-col justify-center items-start gap-10"
      >
        <div className="flex flex-col justify-center items-start gap-4">
          <h1 data-aos="zoom-in" className='text-red-500 dark:text-white'>PROPIEDADES</h1>
          <h1 data-aos="zoom-in" className='text-black text-4xl font-semibold dark:text-white'>Explora los inmuebles disponibles</h1>
        </div>

        {/* Property grid start */}

        <div id='grid-box' className='w-full grid lg:grid-cols-3 grid-cols-1 justify-center items-center gap-8'>
            {
              Property.map((item, index) => (
                <div data-aos="zoom-in" data-aos-delay="200" key={index} className='bg-white dark:bg-gray-800 rounded-xl w-full'>
                  <div id="image-box" className='bg-cover bg-center h-[250px] rounded-xl p-4 flex flex-col justify-between items-end' style={{backgroundImage:
                    `url(${item.images})` }}>
                  </div>
                </div>
              ))
              }
        </div>
      </section>
    </div>
  );
};

export default Properties;
