import React, { useEffect } from "react";
import { useDarkMode } from "../components/DarkModeContext";
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
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa,
            iusto fugiat! Doloremque earum, eum, obcaecati nisi sunt ducimus
            explicabo cupiditate eos quidem officiis est molestiae enim! Officia
            cumque dolore totam.
          </p>
        </section>
      </div>
    </>
  );
};

export default Home;
