import React from "react";
import { useDarkMode } from "./DarkModeContext";
import {
  FaFacebookF,
  FaThreads,
  FaInstagram,
  FaYoutube,
  FaXTwitter,
  FaFireFlameCurved,
  FaArrowUp,
  FaMoon,
  FaSun,
  FaF,
} from "react-icons/fa6";
import { Link } from "react-scroll";
import { IoMdMail } from "react-icons/io";
import { FaX } from "react-icons/fa6";
import sena from '../assets/images/Sena.png';


const Footer = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <>
      <footer
        className={`${darkMode ? "dark bg-black" : "light bg-gray-800"
          } w-full m-auto lg:px-20 px-10 py-20 grid lg:grid-cols-3 grid-cols-1 justify-center items-start lg:gap-20 gap-10`}
      >
        <div className="flex flex-col justify-center items-start gap-5">
          <h1 className="text-white text-2xl font-semibold">
            ¡Conéctate con nosotros!
          </h1>
          <p className="text-slate-200 text-justify">
            Síguenos en nuestras redes sociales y descubre tips, novedades y
            oportunidades de arriendo que te encantarán. Únete a nuestra
            comunidad y mantente al día con lo mejor del mundo inmobiliario.
          </p>
          <div id="social-icons" className="flex justify-start items-center gap-4 mt-4">
            <div className="p-3 rounded-xl bg-white hover:bg-red-600 hover:text-white cursor-pointer transform hover:scale-110 transition-transform duration-300">
              <FaFacebookF className="size-5" />
            </div>
            <div className="p-3 rounded-xl bg-white hover:bg-red-600 hover:text-white cursor-pointer transform hover:scale-110 transition-transform duration-300">
              <FaInstagram className="size-5" />
            </div>
            <div className="p-3 rounded-xl bg-white hover:bg-red-600 hover:text-white cursor-pointer transform hover:scale-110 transition-transform duration-300">
              <FaXTwitter className="size-5" />
            </div>
            <div className="p-3 rounded-xl bg-white hover:bg-red-600 hover:text-white cursor-pointer transform hover:scale-110 transition-transform duration-300">
              <FaYoutube className="size-5" />
            </div>
            <div className="p-3 rounded-xl bg-white hover:bg-red-600 hover:text-white cursor-pointer transform hover:scale-110 transition-transform duration-300">
              <FaThreads className="size-5" />
            </div>
          </div>
          <h1 className="text-white mt-8">Copyright © 2025 RoomRent. All rights reserved.</h1>
        </div>
        <div className="flex flex-col justify-center items-start gap-5">
          <h1 className="text-white text-2xl font-semibold">Roomrent fue creado por:</h1>
          <div className=" flex justify-center items-center gap-3">
            <FaFireFlameCurved className="size-5 text-white" />
            <p className="text-slate-200 ">Ronal Cucariano</p>
          </div>
          <div className=" flex justify-center items-center gap-3">
            <FaFireFlameCurved className="size-5 text-white" />
            <p className="text-slate-200">Briant Grippa</p>
          </div>
          <div className=" flex justify-center items-center gap-3">
            <FaFireFlameCurved className="size-5 text-white" />
            <p className="text-slate-200">Jose Bohorquez</p>
          </div>
          <div className=" flex justify-center items-center gap-3">
            <FaFireFlameCurved className="size-5 text-white" />
            <p className="text-slate-200">Santiago Basto</p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-5">
          <div>
            <img src={sena} alt="Sena Logo" className="w-[150px] rounded-lg transform hover:scale-110 cursor-pointer transition-transform duration-300" />

          </div>
          <h1 className="text-white text-2xl font-semibold">Servicio Nacional de Aprendizaje (SENA)</h1>
          <p className="text-white text- font-semibold">Ficha:3311941 <br />Tecnologo en analisis y desarrollo de software</p>
        </div>
      </footer>
      {/* top button */}
      <div id="icon-box" className="bg-red-600 p-4 rounded-full hover:bg-black cursor-pointer fixed lg:bottom-12 bottom-6 right-6">
        <Link to="Home" spy={true} offset={-100} smooth={true}>
          <FaArrowUp className="size-6 text-white" />
        </Link>
      </div>
      {/* dark mode button */}
      <div>
<button onClick={toggleDarkMode} className="flex items-center p-4 rounded-full bg-orange-500 fixed lg:top-52 right-6 top-6">
  {darkMode ? <FaMoon size={25} className="text-black"/> : <FaSun size={24} className="text-black" />}
</button>
      </div>
    </>
  );

};

export default Footer;
