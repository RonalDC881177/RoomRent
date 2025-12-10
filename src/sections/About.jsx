import React, { useEffect } from 'react'
import aboutimg from "../assets/images/sala.jpg";
import useDarkMode from "../components/useDarkMode";
import AOS from "aos";
import "aos/dist/aos.css";

const About = () => {

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
    <section id='about' className={`${darkMode ? "dark bg-black" : "light bg-transparent"} w-full m-auto lg:px-40 px-10 py-20 grid lg:grid-cols-2 grid-cols-1 justify-center items-center gap-10`}>
      <div>
        <img data-aos="zoom-in" src={aboutimg} alt="About image" className='rounded-xl lg:w-[400px] lg:h-[600px]' />
      </div>
      <div className='flex flex-col justify-center items-start gap-8 font-semibold'>
        <h1 data-aos='zoom-in' className='text-[#2d2c55] dark:text-white'>QUIENES SOMOS</h1>
        <h1 data-aos='zoom-in' data-aos-delay="200" className='text-black text-[40px] font-semibold leading-10 dark:text-white'>Tu Aliado para Encontrar o Publicar Propiedades de Forma Segura.</h1>
        <p data-aos='zoom-in' data-aos-delay="400" className='texl-xl text-gray-600 dark:text-white text-justify'>Somos una plataforma creada para conectar personas con espacios ideales, ofreciendo procesos de arriendo claros, seguros y sin complicaciones. Creemos en la transparencia, la confianza y la tecnología como herramientas para transformar la forma en que propietarios y arrendatarios se encuentran. Nuestro objetivo es ofrecer experiencias cómodas, eficientes y confiables, donde cada usuario pueda sentirse respaldado en cada paso.</p>
        <button className='bg-[#71BFD1] dark:bg-[#71BFD1] hover:bg-[#0B2236] dark:hover:bg-white dark:hover:text-black text-lg p-4 text-white font-semibold rounded-xl cursor-pointer transform hover:scale-110 transition-transform duration-300'>Ver más</button>
      </div>

    </section>
  )
}

export default About