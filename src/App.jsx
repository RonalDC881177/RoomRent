import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import Home from "./sections/Home";
import About from "./sections/About";
import PopularAreas from "./sections/PopularAreas";
import Services from "./sections/Services";
import Clients from "./sections/Clients";
import Contact from "./sections/Contact";

import Login from "./components/Login";
import PropertiesPage from "./pages/PropertiesPage";
import PropertyDetail from "./pages/PropertyDetail";

const App = () => {
  return (
    <Routes>

      <Route element={<MainLayout />}>

      {/* LANDING */}
      <Route
        index
        element={
          <>
            <Home />
            <About />
            <PopularAreas />
            <Clients />
            <Services />
            <Contact />
          </>
        }
      />

      {/* PROPERTIES LIST */}
      <Route path="properties" element={ <PropertiesPage />} />

      {/* PROPERTY DETAIL */}
      <Route path="properties/:id" element={ <PropertyDetail /> }/>
      </Route>

      {/* LOGIN */}
      <Route path="/login" element={<Login />} />

    </Routes>
  );
};

export default App;
