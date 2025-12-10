import React, { useEffect } from "react";
import { Service } from "../components/Export";
import useDarkMode from "../components/useDarkMode";
import AOS from "aos";
import "aos/dist/aos.css";

const Services = () => {
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
        id="services"
        className={`${
          darkMode ? "dark bg-[#65727c]" : "light bg-[#cadffb]"
        } lg:w-[95%] w-full h-fit m-auto rounded-xl flex flex-col justify-center items-start lg:px-20 px-6 py-20 gap-10`}
      >
        <div className="flex flex-col justify-center items-start gap-4">
          <h1 data-aos="zoom-in" className="text-[#2d2c55] dark:text-white font-semibold">
            NUESTROS SERVICIOS
          </h1>
          <h1
            data-aos="zoom-in"
            className="text-black text-[40px] font-semibold leading-10 dark:text-white"
          >
            Nuestros mejores servicios
          </h1>
        </div>
        <div
          id="service-box"
          className=" grid lg:grid-cols-3 grid-cols-1 justify-center items-center gap-8"
        >
          {Service.map((service, index) => (
            <div
              data-aos="zoom-in"
              data-aos-delay="200"
              key={index}
              className="bg-white dark:bg-black h-[350px] px-8 py-16 flex flex-col justify-center items-start gap-4 rounded-xl border-b-[5px] border-[#517399] hover:bg-[#71BFD1] cursor-pointer"
            >
              <div className="p-6 rounded-full bg-[#bceeff]">
                <service.icon className="text-[#0b2236] size-10 transform hover:scale-110 transition-transform duration-300 cursor-pointer" />
              </div>
              <h1 className=" text-black text-[22px] font-semibold dark:text-white">{service.title}</h1>
              <p className="text-lg text-slate-700 dark:text-white">{service.desc}</p>
              <button className="border-b-2 border-[#2d2c55] text-[#2d2c55] font-semibold dark:text-white">LEER MÁS</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
export default Services;
