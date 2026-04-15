import "./AdminPanel.css";

import React, { useState, useEffect } from "react";

const SECTIONS = [
  { key: "hostales", label: "Hostales", icon: "bed-outline" },
  { key: "excursiones", label: "Excursiones", icon: "walk-outline" },
  { key: "restaurantes", label: "Restaurantes", icon: "restaurant-outline" },
];

export default function AdminPanel() {
  const [section, setSection] = useState("hostales");

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://cdn.jsdelivr.net/npm/ionicons@7.1.0/dist/ionicons/ionicons.esm.js';
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  return (
    <div className="admin-root">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-brand">Aldaba</div>
          <div className="sidebar-subtitle">Panel de Administración</div>
        </div>
        <nav className="sidebar-nav">
          {SECTIONS.map((s) => (
            <div
              key={s.key}
              className={"nav-item" + (section === s.key ? " active" : "")}
              onClick={() => setSection(s.key)}
            >
              <span className="icon-placeholder">
                <ion-icon name={s.icon}></ion-icon>
              </span>
              {s.label}
            </div>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="sidebar-footer-text">Aldaba Trinidad &copy; 2025</div>
        </div>
      </aside>
      <main className="main">
        <div className="topbar">
          <div className="topbar-title">{SECTIONS.find(s => s.key === section)?.label}</div>
        </div>
        <div className="content">
          {section === "hostales" && <HostalesSection />}
          {section === "excursiones" && <ExcursionesSection />}
          {section === "restaurantes" && <RestaurantesSection />}
        </div>
      </main>
    </div>
  );
}


function HostalesSection() {
  return (
    <section>
      <div className="section-header">
        <div className="section-title"><ion-icon name="bed-outline"></ion-icon> Hostales</div>
        <button className="btn btn-primary">Agregar Hostal</button>
      </div>
      <div style={{marginBottom: '1.2rem', color: '#64748b'}}>Gestión de habitaciones, disponibilidad y precios de los hostales registrados.</div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Habitación</th>
              <th>Huéspedes</th>
              <th>Disponible</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>101</td>
              <td>2</td>
              <td><span className="badge badge-primary">Sí</span></td>
              <td>$50</td>
            </tr>
            <tr>
              <td>102</td>
              <td>3</td>
              <td><span className="badge badge-gold">No</span></td>
              <td>$70</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}


function ExcursionesSection() {
  return (
    <section>
      <div className="section-header">
        <div className="section-title"><ion-icon name="walk-outline"></ion-icon> Excursiones</div>
        <button className="btn btn-primary">Agregar Excursión</button>
      </div>
      <div style={{marginBottom: '1.2rem', color: '#64748b'}}>Control y registro de excursiones, fechas, participantes y guías asignados.</div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Número de personas</th>
              <th>Guía</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2026-03-25</td>
              <td>8</td>
              <td>Juan Pérez</td>
            </tr>
            <tr>
              <td>2026-03-28</td>
              <td>5</td>
              <td>María López</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}


function RestaurantesSection() {
  return (
    <section>
      <div className="section-header">
        <div className="section-title"><ion-icon name="restaurant-outline"></ion-icon> Restaurantes</div>
        <button className="btn btn-primary">Agregar Mesa</button>
      </div>
      <div style={{marginBottom: '1.2rem', color: '#64748b'}}>Administración de mesas, reservas y pagos realizados en los restaurantes.</div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Número de mesa</th>
              <th>Cantidad de personas</th>
              <th>Monto total pagado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>4</td>
              <td>$120</td>
            </tr>
            <tr>
              <td>2</td>
              <td>2</td>
              <td>$60</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}