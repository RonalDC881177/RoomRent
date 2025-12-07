import React from 'react'
import { Link } from 'react-scroll'
import { FaXmark, FaBars } from 'react-icons/fa6'
import logo from '../assets/images/roomrent.png'
import { useDarkMode } from './DarkModeContext'
import { FaPhone, FaUser } from 'react-icons/fa6'

const Header = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }
  const closeMenu = () => {
    setIsMenuOpen(false);
  }
  const navItems = [
    {
      link: 'Home', path: 'home'
    },
    {
      link: 'About', path: 'about'
    },
    {
      link: 'Properties', path: 'properties'
    },
    {
      link: 'Services', path: 'services'
    },
    {
      link: 'Testominials', path: 'testimonials'
    },
    {
      link: 'Contact', path: 'contact'
    },
  ]
  return (
    <nav className={`${darkMode ? 'dark bg-black' : 'light bg-white'} flex justify-between items-center gap-4`}></nav>
  )
}

export default Header