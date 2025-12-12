import React, { useState } from 'react'
import { Link as ScrollLink } from 'react-scroll'
import { Link as RouterLink } from 'react-router-dom'
import { FaXmark, FaBars } from 'react-icons/fa6'
import logo from '../assets/images/roomrent.png'
import useDarkMode from './useDarkMode';
import { FaPhoneAlt, FaUserCircle } from 'react-icons/fa'

const Header = () => {
  const { darkMode } = useDarkMode();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navItems = [
    { link: 'Inicio', path: 'Inicio' },
    { link: 'Acerca de', path: 'about' },
    { link: 'Propiedades', path: 'properties' },
    { link: 'Servicios', path: 'services' },
    { link: 'Testimonios', path: 'testimonials' },
    { link: 'Contacto', path: 'contact' },
  ];

  return (
    <nav className={`${darkMode ? 'dark bg-[#65727c]' : 'light bg-[#cadffb]'} flex justify-between items-center gap-4 lg:px-20 px-4 py-3 sticky top-0 z-30`}>
      <div id='logo'>
        <img src={logo} alt="Room Rent Logo" className="lg:w-[50px] w-[50px] rounded-xl dark:invert" />
      </div>

      {/* Desktop Menu */}
      <ul className="lg:flex justify-center items-center gap-8 hidden">
        {navItems.map(({ link, path }) => (
          <ScrollLink
            key={path}
            className="text-black text-[15px] uppercase cursor-pointer px-3 py-2 dark:text-white rounded-lg hover:bg-[#517399] hover:text-white"
            to={path}
            spy={true}
            offset={-100}
            smooth={true}
          >
            {link}
          </ScrollLink>
        ))}
      </ul>

      {/* Mobile Menu */}
      <div className={`${isMenuOpen ? 'flex' : 'hidden'} w-full h-fit bg-slate-800 p-4 absolute top-20 left-0`} onClick={closeMenu}>
        <ul className="flex flex-col justify-center items-center gap-2 w-full">
          {navItems.map(({ link, path }) => (
            <ScrollLink
              key={path}
              className="text-white uppercase font-semibold cursor-pointer p-3 rounded-lg hover:bg-[#517399] hover:text-black w-full text-center"
              to={path}
              spy={true}
              offset={-100}
              smooth={true}
            >
              {link}
            </ScrollLink>
          ))}

          {/* login route*/}
          <RouterLink
            to="/login"
            className="text-white uppercase font-semibold cursor-pointer p-3 rounded-lg hover:bg-[#35516d] w-full text-center">
            Login
          </RouterLink>
        </ul>
      </div>

      {/* LOGIN BUTTON */}
      <div className="flex items-center lg:gap-8 gap-2">
        <RouterLink
          to="/login"
          className="px-8 py-2 bg-[#517399] text-white rounded-lg hover:bg-[#35516d] transition-colors">Iniciar Sesion</RouterLink>
      </div>
    </nav>
  );
};

export default Header;
