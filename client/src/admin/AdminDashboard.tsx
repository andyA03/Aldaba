import { useState } from "react";
import "./styles/admin-dashboard.css";
import AdminLogin from "./components/AdminLogin";
import { SECTIONS } from "./data/admin-seed";
import type { SectionKey } from "./data/admin-types";
import HostalesManager from "./sections/HostalesManager";
import ExcursionesManager from "./sections/ExcursionesManager";
import RestaurantesManager from "./sections/RestaurantesManager";

export default function AdminDashboard() {
  const [authed, setAuthed] = useState(false);
  const [section, setSection] = useState<SectionKey>("hostales");

  if (!authed) return <AdminLogin onLogin={() => setAuthed(true)} />;

  const activeSection = SECTIONS.find(s => s.key === section);

  return (
    <div className="admin-root">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-brand-row">
            <div className="sidebar-brand-dot" />
            <div className="sidebar-brand">Aldaba</div>
          </div>
          <div className="sidebar-subtitle">Panel de Administración</div>
        </div>
        <nav className="sidebar-nav">
          <div className="nav-section-label">Gestión</div>
          {SECTIONS.map((s) => (
            <div key={s.key} className={"nav-item" + (section === s.key ? " active" : "")} onClick={() => setSection(s.key)}>
              <span className="nav-icon">{s.icon}</span>
              {s.label}
            </div>
          ))}
        </nav>
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={() => setAuthed(false)}>
            <span>↩</span> Cerrar sesión
          </button>
          <div className="sidebar-footer-copy">Aldaba Trinidad © 2025</div>
        </div>
      </aside>
      <main className="main">
        <div className="topbar">
          <div className="topbar-left">
            <span className="topbar-icon">{activeSection?.icon}</span>
            <span className="topbar-title">Aldaba</span>
            <span className="topbar-sep">/</span>
            <span className="topbar-section">{activeSection?.label}</span>
          </div>
          <div className="topbar-right">
            <div className="topbar-user">
              <div className="topbar-avatar">AD</div>
              <span className="topbar-user-name">Administrador</span>
            </div>
          </div>
        </div>
        <div className="content">
          {section === "hostales" && <HostalesManager />}
          {section === "excursiones" && <ExcursionesManager />}
          {section === "restaurantes" && <RestaurantesManager />}
        </div>
      </main>
    </div>
  );
}

