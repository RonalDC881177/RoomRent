import React, { useEffect } from "react";
import {useDarkMode} from "../components/DarkModeContext";
import cityimg from "../assets/images/city.png";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
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
    <>
      <div className={`${darkMode ? "dark bg-black" : "light bg-white"}`}>
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
            Cada rincón de Bogotá guarda un nuevo comienzo, una historia esperando ser vivida. Encuentra el tuyo hoy y da el siguiente paso hacia el hogar que te hará sentir en el lugar correcto.
          </p>
        </section>
      </div>


      {/* Form Section */}

      <div className={`${darkMode ? 'dark bg-black' : 'light bg-transparent'} z-10`}>
        <div data-aos="zoom-in" id='form' className={`${darkMode ? 'dark bg-gray-800' : 'light bg-white'} lg:w-[70%] w-full m-auto grid lg:grid-cols-4 grid-cols-1 justify-center items-center gap-6 p-8 rounded-xl -mt-14`}>
          <div className='w-full'>
            <h1 className='text-black font-semibold dark:text-white'>LOCALIDAD</h1>
            <select name="selectOption" id="selectOption" className='bg-white p-2 border-b-[1px] w-full mt-2 border-[#c9c7c1] text-gray-500 text-md'>
              <option value="" disabled selected>Selecciona Localidad</option>
              <option value="Option1">Antonio Nariño</option>
              <option value="Option2">Barrios Unidos</option>
              <option value="Option3">Bosa</option>
              <option value="Option4">Chapinero</option>
              <option value="Option5">Engativá</option>
              <option value="Option6">Fontibón</option>
              <option value="Option7">Kennedy</option>
              <option value="Option8">Usaquén</option>
              <option value="Option9">Santa Fe</option>
              <option value="Option10">San Cristobal</option>
              <option value="Option11">Usme</option>
              <option value="Option12">Tunjuelito</option>
              <option value="Option13">Suba</option>
              <option value="Option14">Teusaquillo</option>
              <option value="Option15">Los Mártires</option>
              <option value="Option16">Puente Aranda</option>
              <option value="Option17">Rafael Uribe Uribe</option>
              <option value="Option18">Ciudad Bolívar</option>
              <option value="Option19">La Candelaria</option>
            </select>
          </div>
          <div className='w-full'>
            <h1 className='text-black font-semibold dark:text-white'>TIPO</h1>
            <select name="selectOption" id="selectOption" className='bg-white p-2 border-b-[1px] w-full mt-2 border-[#c9c7c1] text-gray-500 text-md'>
              <option value="" disabled selected>Selecciona Tipo</option>
              <option value="Option1">Casa</option>
              <option value="Option2">Apartamento</option>
              <option value="Option3">Habitación</option>
              <option value="Option4">Roomie</option>
            </select>
          </div>
          <div className='w-full'>
            <h1 className='text-black font-semibold dark:text-white'>PRECIO</h1>
            <select name="selectOption" id="selectOption" className='bg-white p-2 border-b-[1px] w-full mt-2 border-[#c9c7c1] text-gray-500 text-md'>
              <option value="" disabled selected>Selecciona Precio</option>
              <option value="Option1">Menos de 500.000</option>
              <option value="Option2">De 500.000 a 1.000.000</option>
              <option value="Option3">De 1.000.000 a 1.500.000</option>
              <option value="Option4">Más de 1.500.000</option>
            </select>
          </div>
          <div className='w-full'>
            <button className='bg-red-600 dark:bg-red-700 hover:bg-black dark:hover:bg-white dark:hover:text-black text-lg p-4 w-full text-white font-semibold rounded-xl cursor-pointer transform hover:scale-110 transition-transform duration-300'>Buscar</button>
            
          </div>

        </div>
      </div>
    </>
  )
}

export default Home;
