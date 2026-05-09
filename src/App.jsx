import { Routes, Route } from "react-router-dom";

import Home from "./sections/Home";
import About from "./sections/About";
import PopularAreas from "./sections/PopularAreas";
import Services from "./sections/Services";
import Clients from "./sections/Clients";
import Contact from "./sections/Contact";

import Login from "./components/Login";
import PropertiesPage from "./pages/PropertiesPage";
import PropertyDetail from "./pages/PropertyDetail";
import Inbox from "./pages/Inbox";

const App = () => {
  return (
    <Routes>

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

      {/* PROPERTIES */}
      <Route path="/properties" element={<PropertiesPage />} />
      <Route path="/properties/:id" element={<PropertyDetail />} />

      {/* INBOX 👇 */}
      <Route path="/inbox" element={<Inbox />} />

      {/* LOGIN */}
      <Route path="/login" element={<Login />} />

    </Routes>
  );
};

export default App;