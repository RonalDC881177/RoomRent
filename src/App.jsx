import { Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Home from './sections/Home';
import About from './sections/About';
import PopularAreas from './sections/PopularAreas';
import Properties from './sections/Properties';
import Services from './sections/Services';
import Clients from './sections/Clients';
import Contact from './sections/Contact';
import Footer from './components/Footer';

import Login from "./components/Login";
import Register from "./components/Register";

const App = () => {
  return (
    <>
      <Routes>

        {/* --- RUTA PRINCIPAL (LANDING PAGE) --- */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
              <About />
              <PopularAreas />
              <Properties />
              <Services />
              <Clients />
              <Contact />
              <Footer />
            </>
          }
        />

        {/* RUTA LOGIN */}
        <Route path="/login" element={<Login />}  />

        {/* RUTA REGISTRO */}
        <Route path="/register" element={<Register />} />

      </Routes>
    </>
  );
};

export default App;