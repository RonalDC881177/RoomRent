import React, { useEffect } from "react";
import useDarkMode from "../components/useDarkMode";
import AOS from "aos";
import "aos/dist/aos.css";

const Contact = () => {
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
    <div
      className={`${darkMode ? "dark bg-black" : "light bg-transparent"} pb-20`}
    >
      <section
        id="contact"
        className={`${
          darkMode ? "dark bg-[#65727c]" : "light bg-[#cadffb]"
        } lg:w-[95%] w-full h-fit m-auto rounded-xl grid lg:grid-cols-2 grid-cols-1 justify-center items-center lg:px-36 px-6 py-20 gap-10`}
      >
        <div
          data-ao="zoom-in"
          className="bg-white dark:bg-black p-10 flex flex-col justify-center items-start gap-4 rounded-xl"
        >
          <h1 className="text-2xl text-black font-semibold dark:text-white">
            Envianos tu mensaje
          </h1>
          <input type="text" placeholder="Ingresa tu nombre completo" className="w-full px-6 py-3 border-2 border-gray-200 rounded-xl" />
          <input type="email" placeholder="Registra un tu correo electronico" className="w-full px-6 py-3 border-2 border-gray-200 rounded-xl" />
          <input type="number" placeholder="Registra tu numero de contacto" className="w-full px-6 py-3 border-2 border-gray-200 rounded-xl" />
          <textarea name="" id="" cols="30" rows="5" placeholder="Ingresa tu mensaje aqui..." className="w-full px-6 py-3 border-2 border-gray-200 rounded-xl"></textarea>
          <button className="bg-[#71bfd1] w-full text-md px-8 py-3 text-white font-semibold rounded-xl hover:bg-[#0b2236] cursor-pointer">ENVIAR MENSAJE</button>
        </div>
        <div className="flex flex-col justify-center items-start gap-8 lg:p-20 p-6 ">
          <h1 data-aos="zoom-in" data-aos-delay="300" className="text-[#2d2c55] text-[30px] dark:text-white" >¿Tienes dudas o quieres saber más?</h1>
          <h1 data-aos="zoom-in" data-aos-delay="400" className="text-black text-[30px] font-semibold leading-10 dark:text-white">Escríbenos sin miedo, estamos aquí para ayudarte. Nos encanta escuchar nuevas ideas, resolver tus preguntas y acompañarte en cada paso de tu arriendo. ¡Tu mensaje es el inicio de una buena conversación!</h1>

        </div>
      </section>
    </div>
  );
};

export default Contact;
