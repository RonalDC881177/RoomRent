import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import Home from "./sections/Home";
import About from "./sections/About";
import PopularAreas from "./sections/PopularAreas";
import Properties from "./sections/Properties";
import Services from "./sections/Services";
import Clients from "./sections/Clients";
import Contact from "./sections/Contact";

import Login from "./components/Login";
import PropertiesPage from "./pages/PropertiesPage";
import PropertyDetail from "./pages/PropertyDetail";

const App = () => {
  return (
    <Routes>

      {/* LANDING */}
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
            <About />
            <PopularAreas />
            <Clients />
            <Services />
            <Contact />
          </MainLayout>
        }
      />

      {/* PROPERTIES LIST */}
      <Route
        path="/properties"
        element={
          <MainLayout>
            <PropertiesPage />
          </MainLayout>
        }
      />

      {/* PROPERTY DETAIL */}
      <Route
        path="/properties/:id"
        element={
          <MainLayout>
            <PropertyDetail />
          </MainLayout>
        }
      />

      {/* LOGIN */}
      <Route path="/login" element={<Login />} />

    </Routes>
  );
};

export default App;
