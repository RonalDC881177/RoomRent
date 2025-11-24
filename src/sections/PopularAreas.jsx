import React, { useEffect } from 'react'
import { useDarkMode } from '../components/DarkModeContext'
import area1 from '../assets/images/House.jpg'
import area2 from '../assets/images/Apartment.jpg'
import area3 from '../assets/images/Room.jpeg'
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
  }, [])

  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className={`${darkMode ? "dark bg-black" : "light bg-transparent"}`}>
      <section className={`${darkMode ? "dark bg-gray-800" : "light bg-red-100"} lg:w-[90%] w-full h-fit m-auto bg-cover bg-center rounded-xl flex justify-center flex-col items-center lg:px-20 px-6 py-20 gap-20`}>
        <div id='top' className='w-full grid lg:grid-cols-3 grid-cols-1 justify-center items-center gap-8'>
          <div>
            <h1 data-aos="zoom-in" className='text-red-500 dark:text-white'>TIPOS DE ARRIENDO</h1>
            <h1 data-aos="zoom-in" className='text-black text-[40px] font-semibold leading-10 mt-4 dark:text-white'>Explora todos los <br></br> inmuebles disponibles</h1>
          </div>

          <div className='grid lg:grid-cols-3 col-span-2 grid-cols-1 justify-center items-center gap-6'>
            <div data-aos="zoom-in" data-aos-delay="400" style={{ backgroundImage:`url(${area1})` }} className='h-[400px] bg-cover bg-center rounded-xl'></div>
            <div className='grid lg:grid-cols-3 col-span-2 grid-cols-1 justify-center items-center gap-6'>
            <div data-aos="zoom-in" data-aos-delay="400" style={{ backgroundImage:`url(${area2})` }} className='h-[400px] bg-cover bg-center rounded-xl'></div>
            <div className='grid lg:grid-cols-3 col-span-2 grid-cols-1 justify-center items-center gap-6'>
            <div data-aos="zoom-in" data-aos-delay="400" style={{ backgroundImage:`url(${area3})` }} className='h-[400px] bg-cover bg-center rounded-xl'></div>

          </div>
          </div>
        </div>
        </div>
      </section>
    </div>
  )
}

export default PopularAreas