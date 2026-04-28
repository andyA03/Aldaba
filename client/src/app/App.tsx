import { Routes, Route, useLocation } from 'react-router-dom';
import NavBar from '@landing/components/NavBar';
import Home from '@landing/pages/Home';
import Services from '@landing/pages/Services';
import Excursions from '@landing/pages/Excursions';
import Events from '@landing/pages/Events';
import About from '@landing/pages/About';
import Lugares from '@landing/pages/Lugares';
import LugarDetalle from '@landing/pages/LugarDetalle';
import ServicioDetalle from '@landing/pages/ServicioDetalle';
import Admin from '@admin/AdminPanel';

export default function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdmin && <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/excursions" element={<Excursions />} />
        <Route path="/events" element={<Events />} />
        <Route path="/about" element={<About />} />
        <Route path="/lugares" element={<Lugares />} />
        <Route path="/lugares/:slug" element={<LugarDetalle />} />
        <Route path="/services/:slug" element={<ServicioDetalle />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
}
