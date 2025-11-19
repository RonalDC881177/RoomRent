import React, { useEffect } from "react";
import { useDarkMode } from "../components/DarkModeContext";
import homeimg from "../assets/images/roomrent.png";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 800,
      easing: "ease-out-sine",
      delay: 100,
    });
  }, []);

  const { darkMode, toggleDarkMode } = useDarkMode();
  return (
    <>
      <div className={`${darkMode ? 'dark bg-black' : 'light bg-white'}`}>
        
      </div>
    </>
  );
};

export default Home;
