import { Routes, Route } from "react-router-dom";

import Home from "./sections/Home";
import About from "./sections/About";
import PopularAreas from "./sections/PopularAreas";
import Services from "./sections/Services";
import Clients from "./sections/Clients";
import Contact from "./sections/Contact";

import Login from "./components/Login";

import PropertiesPage from "./pages/PropertiesPage";
import CreateProperty from "./pages/CreateProperty";
import PropertyDetail from "./pages/PropertyDetail";
import EditProperty from "./pages/EditProperty";
import Inbox from "./pages/Inbox";
import MyPropertiesPage from "./pages/MyPropertiesPage";
import CreateRoomie from "./pages/CreateRoomie";

import MainLayout from "./layouts/MainLayout";

const App = () => {
  return (
    <Routes>

      {/* RUTAS CON HEADER Y FOOTER */}
      <Route element={<MainLayout />}>

        {/* LANDING */}
        <Route
          path="/"
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

        {/* MY PROPERTIES */}
        <Route
          path="my-properties"
          element={<MyPropertiesPage />}
        />

        {/* PROPERTIES */}
        <Route
          path="/properties"
          element={<PropertiesPage />}
        />

        {/* CREATE PROPERTY */}

        <Route
          path="/properties/create"
          element={<CreateProperty />}
        />

        {/* CREATE ROOMIE */}

        <Route
          path="/roomie/create"
          element={<CreateRoomie />}
        />

        <Route
          path="/properties/:id"
          element={<PropertyDetail />}
        />

        <Route
          path="/properties/:id/edit"
          element={<EditProperty />}
        />

        {/* INBOX */}
        <Route
          path="/inbox"
          element={<Inbox />}
        />

      </Route>

      {/* LOGIN */}
      <Route
        path="/login"
        element={<Login />}
      />

    </Routes>
  );
};

export default App;