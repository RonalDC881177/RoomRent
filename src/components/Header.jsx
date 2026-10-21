import React, { useEffect, useState } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { FaXmark, FaBars } from "react-icons/fa6";
import logo from "../assets/images/roomrent.png";
import useDarkMode from "./useDarkMode";
import { getInbox } from "../api/messageService";

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
    { link: "Roomie", path: "/roomie", type: "route" },
    { link: "Servicios", path: "services", type: "scroll" },
    { link: "Testimonios", path: "testimonials", type: "scroll" },
    { link: "Contacto", path: "contact", type: "scroll" },
  ];
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => Boolean(localStorage.getItem("token"))
  );
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  });
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);

  useEffect(() => {
    setIsAuthenticated(Boolean(localStorage.getItem("token")));

    try {
      setCurrentUser(
        JSON.parse(localStorage.getItem("user") || "null")
      );
    } catch {
      setCurrentUser(null);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (!isAuthenticated) {
      setUnreadMessagesCount(0);
      return;
    }

    let cancelled = false;

    const updateUnreadCount = async () => {
      try {
        const conversations = await getInbox();

        const total = conversations.reduce(
          (count, conversation) =>
            count + Number(conversation.unreadCount || 0),
          0
        );

        if (!cancelled) {
          setUnreadMessagesCount(total);
        }
      } catch {
        if (!cancelled) {
          setUnreadMessagesCount(0);
        }
      }
    };

    updateUnreadCount();

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setCurrentUser(null);
    setIsAccountMenuOpen(false);
    closeMenu();
    navigate("/");
  };

  return (
    <nav
      className={`${darkMode ? "dark bg-[#65727c]" : "light bg-[#cadffb]"
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

      {/* CUENTA */}
      {isAuthenticated ? (
        <div className="relative">
          <button
            type="button"
            aria-expanded={isAccountMenuOpen}
            aria-controls="account-menu"
            onClick={() => setIsAccountMenuOpen((open) => !open)}
            className="flex items-center gap-2 rounded-full bg-[#517399] px-3 py-2 text-white hover:bg-[#35516d]"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white font-bold text-[#35516d]">
              {(currentUser?.name || currentUser?.username || "U")
                .charAt(0)
                .toUpperCase()}
            </span>

            <span className="max-w-32 truncate">
              {currentUser?.name || currentUser?.username || "Mi cuenta"}
            </span>
          </button>

          {isAccountMenuOpen && (
            <div
              id="account-menu"
              className="absolute right-0 top-full z-50 mt-2 w-64 rounded-2xl bg-white p-2 text-slate-800 shadow-xl"
            >
              <div className="border-b px-3 py-2">
                <p className="font-semibold">
                  {currentUser?.name || "Usuario de RoomRent"}
                </p>
                <p className="truncate text-sm text-slate-500">
                  {currentUser?.email}
                </p>
              </div>

              {["arrendador", "admin"].includes(currentUser?.role) && (
                <RouterLink
                  to="/dashboard"
                  onClick={() => setIsAccountMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 hover:bg-slate-100"
                >
                  Panel del arrendador
                </RouterLink>
              )}

              <RouterLink
                to="/inbox"
                onClick={() => setIsAccountMenuOpen(false)}
                className="block rounded-lg px-3 py-2 hover:bg-slate-100"
              >
                <span className="flex items-center justify-between">
                  <span>Mensajes</span>

                  {unreadMessagesCount > 0 && (
                    <span
                      aria-label={`${unreadMessagesCount} mensajes sin leer`}
                      className="ml-3 rounded-full bg-red-600 px-2 py-0.5 text-xs font-bold text-white"
                    >
                      {unreadMessagesCount > 99 ? "99+" : unreadMessagesCount}
                    </span>
                  )}
                </span>
              </RouterLink>

              <RouterLink
                to="/my-properties"
                onClick={() => setIsAccountMenuOpen(false)}
                className="block rounded-lg px-3 py-2 hover:bg-slate-100"
              >
                Mis propiedades
              </RouterLink>

              <RouterLink
                to="/properties/create"
                onClick={() => setIsAccountMenuOpen(false)}
                className="block rounded-lg px-3 py-2 hover:bg-slate-100"
              >
                Publicar propiedad
              </RouterLink>

              {currentUser?.id && (
                <RouterLink
                  to={`/users/${currentUser.id}`}
                  onClick={() => setIsAccountMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 hover:bg-slate-100"
                >
                  Mi perfil
                </RouterLink>
              )}

              <button
                type="button"
                onClick={handleLogout}
                className="mt-2 w-full rounded-lg border-t px-3 py-2 text-left text-red-700 hover:bg-red-50"
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      ) : (
        <RouterLink
          to="/login"
          className="rounded-lg bg-[#517399] px-8 py-2 text-white hover:bg-[#35516d]"
        >
          Iniciar sesión
        </RouterLink>
      )}

    </nav>
  );
};

export default Header;
