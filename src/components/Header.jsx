import React, { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { FaXmark, FaBars } from "react-icons/fa6";
import logo from "../assets/images/roomrent.png";
import useDarkMode from "./useDarkMode";

const Header = () => {
  const { darkMode } = useDarkMode();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const location = useLocation();
  const isHome = location.pathname === "/";

  const navItems = [
    { link: "Inicio", path: "home", type: "scroll" },
    { link: "Nosotros", path: "about", type: "scroll" },
    { link: "Propiedades", path: "/properties", type: "route" },
    { link: "Servicios", path: "services", type: "scroll" },
    { link: "Testimonios", path: "testimonials", type: "scroll" },
    { link: "Contacto", path: "contact", type: "scroll" },
  ];

  return (
    <nav
      className={`${
        darkMode ? "dark bg-[#65727c]" : "light bg-[#cadffb]"
      } flex justify-between items-center gap-4 lg:px-20 px-4 py-3 sticky top-0 z-30`}
    >
      {/* LOGO */}
      <div id="logo">
        <img
          src={logo}
          alt="Room Rent Logo"
          className="lg:w-[50px] w-[50px] rounded-xl dark:invert"
        />
      </div>

      {/* DESKTOP MENU */}
      <ul className="lg:flex justify-center items-center gap-8 hidden">
        {navItems.map(({ link, path, type }) => {
          if (!isHome && type === "scroll") {
            return (
              <RouterLink
                key={link}
                to="/"
                state={{ scrollTo: path }}
                className="text-black text-[15px] uppercase px-3 py-2 dark:text-white rounded-lg hover:bg-[#517399] hover:text-white"
              >
                {link}
              </RouterLink>
            );
          }

          if (type === "route") {
            return (
              <RouterLink
                key={link}
                to={path}
                className="text-black text-[15px] uppercase px-3 py-2 dark:text-white rounded-lg hover:bg-[#517399] hover:text-white"
              >
                {link}
              </RouterLink>
            );
          }

          return (
            <ScrollLink
              key={link}
              to={path}
              smooth
              offset={-100}
              className="text-black text-[15px] uppercase px-3 py-2 dark:text-white rounded-lg hover:bg-[#517399] hover:text-white cursor-pointer"
            >
              {link}
            </ScrollLink>
          );
        })}
      </ul>

      {/* MOBILE MENU BUTTON */}
      <button
        onClick={toggleMenu}
        className="lg:hidden text-2xl text-black dark:text-white"
      >
        {isMenuOpen ? <FaXmark /> : <FaBars />}
      </button>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="w-full bg-slate-800 p-4 absolute top-20 left-0">
          <ul className="flex flex-col gap-2">
            {navItems.map(({ link, path, type }) => {
              if (!isHome && type === "scroll") {
                return (
                  <RouterLink
                    key={link}
                    to="/"
                    state={{ scrollTo: path }}
                    onClick={closeMenu}
                    className="text-white uppercase p-3 rounded-lg hover:bg-[#517399]"
                  >
                    {link}
                  </RouterLink>
                );
              }

              if (type === "route") {
                return (
                  <RouterLink
                    key={link}
                    to={path}
                    onClick={closeMenu}
                    className="text-white uppercase p-3 rounded-lg hover:bg-[#517399]"
                  >
                    {link}
                  </RouterLink>
                );
              }

              return (
                <ScrollLink
                  key={link}
                  to={path}
                  smooth
                  offset={-100}
                  onClick={closeMenu}
                  className="text-white uppercase p-3 rounded-lg hover:bg-[#517399] cursor-pointer"
                >
                  {link}
                </ScrollLink>
              );
            })}
          </ul>
        </div>
      )}

      {/* LOGIN */}
      <RouterLink
        to="/login"
        className="px-8 py-2 bg-[#517399] text-white rounded-lg hover:bg-[#35516d]"
      >
        Iniciar Sesión
      </RouterLink>
    </nav>
  );
};

export default Header;
