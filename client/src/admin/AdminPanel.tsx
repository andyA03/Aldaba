import "./AdminPanel.css";
import React, { useState } from "react";

const SECTIONS = [
  { key: "hostales", label: "Hostales", icon: "🏨" },
  { key: "excursiones", label: "Excursiones", icon: "🧭" },
  { key: "restaurantes", label: "Restaurantes", icon: "🍽️" },
];

/* ── Types ── */
type Habitacion = {
  id: number;
  hostal: string;
  foto: string;
  numero: string;
  tipo: string;
  huespedes: number;
  disponible: boolean;
  precio: number;
  reserva: string;
};

type Excursion = {
  id: number;
  nombre: string;
  foto: string;
  fecha: string;
  hora: string;
  personas: number;
  guia: string;
  precio: number;
  estado: string;
};

type Mesa = {
  id: number;
  restaurante: string;
  foto: string;
  numero: number;
  capacidad: number;
  ocupada: boolean;
  reserva: string;
  pago: number;
  estado: string;
};

/* ── Initial data ── */
const INIT_HABITACIONES: Habitacion[] = [
  { id: 1, hostal: 'Hostal Académico "La Merced"', foto: "https://picsum.photos/seed/hostal-colonial-trinidad/400/220", numero: "101", tipo: "Doble", huespedes: 2, disponible: true, precio: 50, reserva: "—" },
  { id: 2, hostal: 'Hostal Académico "La Merced"', foto: "https://picsum.photos/seed/hostal-colonial-trinidad/400/220", numero: "102", tipo: "Triple", huespedes: 3, disponible: false, precio: 70, reserva: "Juan Pérez" },
  { id: 3, hostal: 'Casa de Eventos "Amargura #85"', foto: "https://picsum.photos/seed/casa-amargura-trinidad/400/220", numero: "103", tipo: "Simple", huespedes: 1, disponible: true, precio: 35, reserva: "—" },
  { id: 4, hostal: 'Casa de Eventos "Amargura #85"', foto: "https://picsum.photos/seed/casa-amargura-trinidad/400/220", numero: "201", tipo: "Suite", huespedes: 4, disponible: false, precio: 110, reserva: "María López" },
];

const INIT_EXCURSIONES: Excursion[] = [
  { id: 1, nombre: "Centro Histórico de Trinidad", foto: "https://picsum.photos/seed/centro-historico-trinidad/500/280", fecha: "2026-05-10", hora: "09:00", personas: 8, guia: "Carlos Díaz", precio: 25, estado: "Confirmada" },
  { id: 2, nombre: "Valle de los Ingenios", foto: "https://picsum.photos/seed/valle-ingenios-excursion/500/280", fecha: "2026-05-12", hora: "08:00", personas: 12, guia: "Ana Suárez", precio: 40, estado: "Pendiente" },
  { id: 3, nombre: "Casa Hacienda Guaimaro", foto: "https://picsum.photos/seed/hacienda-guaimaro-cuba/500/280", fecha: "2026-05-15", hora: "10:00", personas: 5, guia: "Pedro Mora", precio: 30, estado: "Confirmada" },
];

const INIT_MESAS: Mesa[] = [
  { id: 1, restaurante: "Centro Cultural Patio Becquer", foto: "https://picsum.photos/seed/patio-becquer-cuba/400/220", numero: 1, capacidad: 4, ocupada: true, reserva: "Familia García", pago: 120, estado: "Ocupada" },
  { id: 2, restaurante: "Centro Cultural Patio Becquer", foto: "https://picsum.photos/seed/patio-becquer-cuba/400/220", numero: 2, capacidad: 2, ocupada: false, reserva: "—", pago: 0, estado: "Libre" },
  { id: 3, restaurante: "Taberna Guanahuac", foto: "https://picsum.photos/seed/taberna-guanahuac/400/220", numero: 3, capacidad: 6, ocupada: false, reserva: "Reservado 20:00", pago: 0, estado: "Reservada" },
  { id: 4, restaurante: "Taberna Guanahuac", foto: "https://picsum.photos/seed/taberna-guanahuac/400/220", numero: 4, capacidad: 4, ocupada: true, reserva: "Sr. Martínez", pago: 85, estado: "Ocupada" },
];

/* ── Hostales predefinidos ── */
const HOSTALES_LIST = [
  { nombre: 'Hostal Académico "La Merced"', foto: "https://picsum.photos/seed/hostal-colonial-trinidad/400/220" },
  { nombre: 'Casa de Eventos "Amargura #85"', foto: "https://picsum.photos/seed/casa-amargura-trinidad/400/220" },
];

const RESTAURANTES_LIST = [
  { nombre: "Centro Cultural Patio Becquer", foto: "https://picsum.photos/seed/patio-becquer-cuba/400/220" },
  { nombre: "Taberna Guanahuac", foto: "https://picsum.photos/seed/taberna-guanahuac/400/220" },
  { nombre: "Bar Cafetería Playa Ancón", foto: "https://picsum.photos/seed/playa-ancon-cuba/400/220" },
  { nombre: "Bar Cafetería San Isidro", foto: "https://picsum.photos/seed/san-isidro-valley/400/220" },
  { nombre: "Acuario", foto: "https://picsum.photos/seed/acuario-trinidad/400/220" },
];

const EXCURSIONES_LIST = [
  { nombre: "Centro Histórico de Trinidad", foto: "https://picsum.photos/seed/centro-historico-trinidad/500/280" },
  { nombre: "Valle de los Ingenios", foto: "https://picsum.photos/seed/valle-ingenios-excursion/500/280" },
  { nombre: "Casa Hacienda Guaimaro", foto: "https://picsum.photos/seed/hacienda-guaimaro-cuba/500/280" },
];

/* ── Login ── */
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user === "admin" && pass === "admin123") {
      onLogin();
    } else {
      setError("Usuario o contraseña incorrectos.");
    }
  };

  return (
    <div className="login-root">
      <div className="login-card">
        <div className="login-logo">
          <div className="login-dot" />
          <div className="login-brand">Aldaba</div>
        </div>
        <div className="login-subtitle">Panel de Administración</div>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-field">
            <label>Usuario</label>
            <input type="text" value={user} onChange={e => setUser(e.target.value)} placeholder="admin" autoComplete="username" />
          </div>
          <div className="login-field">
            <label>Contraseña</label>
            <input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="••••••••" autoComplete="current-password" />
          </div>
          {error && <div className="login-error">{error}</div>}
          <button type="submit" className="login-btn">Iniciar sesión</button>
        </form>
        <div className="login-hint">Usuario: <b>admin</b> · Contraseña: <b>admin123</b></div>
      </div>
    </div>
  );
}

/* ── Root ── */
export default function AdminPanel() {
  const [authed, setAuthed] = useState(false);
  const [section, setSection] = useState("hostales");

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;

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
          {section === "hostales" && <HostalesSection />}
          {section === "excursiones" && <ExcursionesSection />}
          {section === "restaurantes" && <RestaurantesSection />}
        </div>
      </main>
    </div>
  );
}

/* ── Confirm modal ── */
function ConfirmModal({ msg, onConfirm, onCancel }: { msg: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="modal-overlay">
      <div className="modal-box" style={{ maxWidth: 380 }}>
        <div className="modal-header"><span>Confirmar acción</span></div>
        <div className="modal-body">
          <p style={{ marginBottom: "1.2rem", color: "#374151", fontSize: "0.9rem", lineHeight: 1.6 }}>{msg}</p>
          <div className="modal-actions">
            <button className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
            <button className="btn btn-danger" onClick={onConfirm}>Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Photo thumbnail ── */
function Thumb({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className="table-thumb"
      onError={e => { (e.target as HTMLImageElement).src = "https://picsum.photos/seed/fallback/80/50"; }}
    />
  );
}

/* ── Hostales section ── */
function HostalesSection() {
  const [data, setData] = useState<Habitacion[]>(INIT_HABITACIONES);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<null | "add" | "edit" | "view">(null);
  const [current, setCurrent] = useState<Partial<Habitacion>>({});
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const nextId = Math.max(0, ...data.map(d => d.id)) + 1;

  const filtered = data.filter(h =>
    h.hostal.toLowerCase().includes(search.toLowerCase()) ||
    h.numero.toLowerCase().includes(search.toLowerCase()) ||
    h.tipo.toLowerCase().includes(search.toLowerCase()) ||
    h.reserva.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    const def = HOSTALES_LIST[0];
    setCurrent({ hostal: def.nombre, foto: def.foto, tipo: "Doble", huespedes: 2, disponible: true, precio: 50, reserva: "—", numero: "" });
    setModal("add");
  };
  const openEdit = (h: Habitacion) => { setCurrent({ ...h }); setModal("edit"); };
  const openView = (h: Habitacion) => { setCurrent({ ...h }); setModal("view"); };
  const closeModal = () => { setModal(null); setCurrent({}); };

  const handleHostalChange = (nombre: string) => {
    const found = HOSTALES_LIST.find(h => h.nombre === nombre);
    setCurrent(c => ({ ...c, hostal: nombre, foto: found?.foto || c.foto || "" }));
  };

  const handleSave = () => {
    if (!current.hostal || !current.numero) return;
    if (modal === "add") {
      setData(d => [...d, { ...current, id: nextId } as Habitacion]);
    } else {
      setData(d => d.map(h => h.id === current.id ? { ...current } as Habitacion : h));
    }
    closeModal();
  };

  const disponibles = data.filter(h => h.disponible).length;
  const ocupadas = data.filter(h => !h.disponible).length;
  const reservadas = data.filter(h => h.reserva && h.reserva !== "—").length;

  return (
    <section>
      <div className="section-header-row">
        <div className="section-header-left">
          <div className="section-title-text">Gestión de Hostales</div>
          <div className="section-desc">Habitaciones, disponibilidad, precios y reservas de los hostales registrados.</div>
        </div>
        <button className="btn btn-primary" onClick={openAdd}>+ Agregar Habitación</button>
      </div>
      <div className="stat-cards">
        <div className="stat-card" style={{"--stat-color": "#2563eb"} as React.CSSProperties}>
          <div className="stat-card-value">{data.length}</div>
          <div className="stat-card-label">Total habitaciones</div>
        </div>
        <div className="stat-card" style={{"--stat-color": "#16a34a"} as React.CSSProperties}>
          <div className="stat-card-value">{disponibles}</div>
          <div className="stat-card-label">Disponibles</div>
        </div>
        <div className="stat-card" style={{"--stat-color": "#dc2626"} as React.CSSProperties}>
          <div className="stat-card-value">{ocupadas}</div>
          <div className="stat-card-label">Ocupadas</div>
        </div>
        <div className="stat-card" style={{"--stat-color": "#d97706"} as React.CSSProperties}>
          <div className="stat-card-value">{reservadas}</div>
          <div className="stat-card-label">Reservadas</div>
        </div>
      </div>
      <div className="toolbar">
        <div className="search-wrap">
          <span className="search-icon">🔍</span>
          <input className="search-input" placeholder="Buscar por hostal, habitación, tipo..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Foto</th>
              <th>Hostal</th>
              <th>Hab.</th>
              <th>Tipo</th>
              <th>Huéspedes</th>
              <th>Estado</th>
              <th>Precio/noche</th>
              <th>Reserva</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={9} className="empty-row">Sin resultados</td></tr>
            )}
            {filtered.map(h => (
              <tr key={h.id}>
                <td><Thumb src={h.foto} alt={h.hostal} /></td>
                <td><span className="establishment-name">{h.hostal}</span></td>
                <td><b>{h.numero}</b></td>
                <td>{h.tipo}</td>
                <td>{h.huespedes}</td>
                <td><span className={"badge " + (h.disponible ? "badge-green" : "badge-red")}>{h.disponible ? "Disponible" : "Ocupada"}</span></td>
                <td><b>${h.precio}</b></td>
                <td>{h.reserva}</td>
                <td>
                  <div className="action-btns">
                    <button className="icon-btn view-btn" title="Ver detalles" onClick={() => openView(h)}>Ver</button>
                    <button className="icon-btn edit-btn" title="Editar" onClick={() => openEdit(h)}>Editar</button>
                    <button className="icon-btn del-btn" title="Eliminar" onClick={() => setConfirmId(h.id)}>Borrar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="table-footer">{filtered.length} de {data.length} habitaciones</div>

      {confirmId !== null && (
        <ConfirmModal msg="¿Seguro que deseas eliminar esta habitación?" onConfirm={() => { setData(d => d.filter(h => h.id !== confirmId)); setConfirmId(null); }} onCancel={() => setConfirmId(null)} />
      )}

      {(modal === "add" || modal === "edit") && (
        <div className="modal-overlay">
          <div className="modal-box modal-wide">
            <div className="modal-header">
              <span>{modal === "add" ? "Agregar habitación" : "Editar habitación"}</span>
              <button className="modal-close" onClick={closeModal}>✕</button>
            </div>
            <div className="modal-body">
              {current.foto && (
                <div className="modal-photo-preview">
                  <img src={current.foto} alt="preview" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                </div>
              )}
              <div className="form-row">
                <label>Hostal</label>
                <select value={current.hostal || ""} onChange={e => handleHostalChange(e.target.value)}>
                  {HOSTALES_LIST.map(h => <option key={h.nombre} value={h.nombre}>{h.nombre}</option>)}
                  <option value="__custom">Otro (ingresar manualmente)</option>
                </select>
              </div>
              {(!HOSTALES_LIST.find(h => h.nombre === current.hostal) && current.hostal) && (
                <div className="form-row">
                  <label>Nombre del hostal</label>
                  <input value={current.hostal || ""} onChange={e => setCurrent(c => ({ ...c, hostal: e.target.value }))} />
                </div>
              )}
              <div className="form-row">
                <label>URL de foto del establecimiento</label>
                <input value={current.foto || ""} onChange={e => setCurrent(c => ({ ...c, foto: e.target.value }))} placeholder="https://..." />
              </div>
              <div className="form-2col">
                <div className="form-row">
                  <label>Número de habitación</label>
                  <input value={current.numero || ""} onChange={e => setCurrent(c => ({ ...c, numero: e.target.value }))} />
                </div>
                <div className="form-row">
                  <label>Tipo</label>
                  <select value={current.tipo || "Doble"} onChange={e => setCurrent(c => ({ ...c, tipo: e.target.value }))}>
                    <option>Simple</option><option>Doble</option><option>Triple</option><option>Suite</option>
                  </select>
                </div>
              </div>
              <div className="form-2col">
                <div className="form-row">
                  <label>Capacidad (huéspedes)</label>
                  <input type="number" min={1} value={current.huespedes || ""} onChange={e => setCurrent(c => ({ ...c, huespedes: Number(e.target.value) }))} />
                </div>
                <div className="form-row">
                  <label>Precio por noche ($)</label>
                  <input type="number" min={0} value={current.precio || ""} onChange={e => setCurrent(c => ({ ...c, precio: Number(e.target.value) }))} />
                </div>
              </div>
              <div className="form-2col">
                <div className="form-row">
                  <label>Disponible</label>
                  <select value={current.disponible ? "si" : "no"} onChange={e => setCurrent(c => ({ ...c, disponible: e.target.value === "si" }))}>
                    <option value="si">Sí</option><option value="no">No</option>
                  </select>
                </div>
                <div className="form-row">
                  <label>Nombre de reserva</label>
                  <input value={current.reserva || ""} onChange={e => setCurrent(c => ({ ...c, reserva: e.target.value }))} placeholder="— si no hay reserva" />
                </div>
              </div>
              <div className="modal-actions">
                <button className="btn btn-secondary" onClick={closeModal}>Cancelar</button>
                <button className="btn btn-primary" onClick={handleSave}>Guardar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {modal === "view" && current && (
        <div className="modal-overlay">
          <div className="modal-box modal-wide">
            <div className="modal-header">
              <span>{current.hostal} — Hab. {current.numero}</span>
              <button className="modal-close" onClick={closeModal}>✕</button>
            </div>
            <div className="modal-body">
              {current.foto && <div className="modal-photo-preview"><img src={current.foto} alt={current.hostal} /></div>}
              <div className="detail-grid">
                <div className="detail-item"><span>Hostal</span><b>{current.hostal}</b></div>
                <div className="detail-item"><span>Habitación</span><b>{current.numero}</b></div>
                <div className="detail-item"><span>Tipo</span><b>{current.tipo}</b></div>
                <div className="detail-item"><span>Huéspedes</span><b>{current.huespedes}</b></div>
                <div className="detail-item"><span>Precio/noche</span><b>${current.precio}</b></div>
                <div className="detail-item"><span>Estado</span><b>{current.disponible ? "Disponible" : "Ocupada"}</b></div>
                <div className="detail-item"><span>Reserva</span><b>{current.reserva}</b></div>
              </div>
              <div className="modal-actions">
                <button className="btn btn-secondary" onClick={closeModal}>Cerrar</button>
                <button className="btn btn-primary" onClick={() => setModal("edit")}>Editar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ── Excursiones section ── */
function ExcursionesSection() {
  const [data, setData] = useState<Excursion[]>(INIT_EXCURSIONES);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<null | "add" | "edit" | "view">(null);
  const [current, setCurrent] = useState<Partial<Excursion>>({});
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const nextId = Math.max(0, ...data.map(d => d.id)) + 1;

  const filtered = data.filter(e =>
    e.nombre.toLowerCase().includes(search.toLowerCase()) ||
    e.guia.toLowerCase().includes(search.toLowerCase()) ||
    e.estado.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    const def = EXCURSIONES_LIST[0];
    setCurrent({ nombre: def.nombre, foto: def.foto, fecha: "", hora: "09:00", personas: 1, guia: "", precio: 25, estado: "Pendiente" });
    setModal("add");
  };
  const openEdit = (e: Excursion) => { setCurrent({ ...e }); setModal("edit"); };
  const openView = (e: Excursion) => { setCurrent({ ...e }); setModal("view"); };
  const closeModal = () => { setModal(null); setCurrent({}); };

  const handleNombreChange = (nombre: string) => {
    const found = EXCURSIONES_LIST.find(e => e.nombre === nombre);
    setCurrent(c => ({ ...c, nombre, foto: found?.foto || c.foto || "" }));
  };

  const handleSave = () => {
    if (!current.nombre) return;
    if (modal === "add") {
      setData(d => [...d, { ...current, id: nextId } as Excursion]);
    } else {
      setData(d => d.map(e => e.id === current.id ? { ...current } as Excursion : e));
    }
    closeModal();
  };

  const pendientes = data.filter(e => e.estado === "Pendiente").length;
  const confirmadas = data.filter(e => e.estado === "Confirmada").length;
  const canceladas = data.filter(e => e.estado === "Cancelada").length;

  return (
    <section>
      <div className="section-header-row">
        <div className="section-header-left">
          <div className="section-title-text">Gestión de Excursiones</div>
          <div className="section-desc">Control y registro de excursiones, destinos, guías, horarios y precios.</div>
        </div>
        <button className="btn btn-primary" onClick={openAdd}>+ Agregar Excursión</button>
      </div>
      <div className="stat-cards">
        <div className="stat-card" style={{"--stat-color": "#2563eb"} as React.CSSProperties}>
          <div className="stat-card-value">{data.length}</div>
          <div className="stat-card-label">Total excursiones</div>
        </div>
        <div className="stat-card" style={{"--stat-color": "#d97706"} as React.CSSProperties}>
          <div className="stat-card-value">{pendientes}</div>
          <div className="stat-card-label">Pendientes</div>
        </div>
        <div className="stat-card" style={{"--stat-color": "#16a34a"} as React.CSSProperties}>
          <div className="stat-card-value">{confirmadas}</div>
          <div className="stat-card-label">Confirmadas</div>
        </div>
        <div className="stat-card" style={{"--stat-color": "#dc2626"} as React.CSSProperties}>
          <div className="stat-card-value">{canceladas}</div>
          <div className="stat-card-label">Canceladas</div>
        </div>
      </div>
      <div className="toolbar">
        <div className="search-wrap">
          <span className="search-icon">🔍</span>
          <input className="search-input" placeholder="Buscar por nombre, guía o estado..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Foto</th>
              <th>Excursión</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Personas</th>
              <th>Guía</th>
              <th>Precio/p.</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={9} className="empty-row">Sin resultados</td></tr>
            )}
            {filtered.map(e => (
              <tr key={e.id}>
                <td><Thumb src={e.foto} alt={e.nombre} /></td>
                <td><span className="establishment-name">{e.nombre}</span></td>
                <td>{e.fecha}</td>
                <td>{e.hora}</td>
                <td>{e.personas}</td>
                <td>{e.guia}</td>
                <td><b>${e.precio}</b></td>
                <td><span className={"badge " + (e.estado === "Confirmada" ? "badge-green" : e.estado === "Cancelada" ? "badge-red" : "badge-yellow")}>{e.estado}</span></td>
                <td>
                  <div className="action-btns">
                    <button className="icon-btn view-btn" title="Ver detalles" onClick={() => openView(e)}>Ver</button>
                    <button className="icon-btn edit-btn" title="Editar" onClick={() => openEdit(e)}>Editar</button>
                    <button className="icon-btn del-btn" title="Eliminar" onClick={() => setConfirmId(e.id)}>Borrar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="table-footer">{filtered.length} de {data.length} excursiones</div>

      {confirmId !== null && (
        <ConfirmModal msg="¿Seguro que deseas eliminar esta excursión?" onConfirm={() => { setData(d => d.filter(e => e.id !== confirmId)); setConfirmId(null); }} onCancel={() => setConfirmId(null)} />
      )}

      {(modal === "add" || modal === "edit") && (
        <div className="modal-overlay">
          <div className="modal-box modal-wide">
            <div className="modal-header">
              <span>{modal === "add" ? "Agregar excursión" : "Editar excursión"}</span>
              <button className="modal-close" onClick={closeModal}>✕</button>
            </div>
            <div className="modal-body">
              {current.foto && (
                <div className="modal-photo-preview">
                  <img src={current.foto} alt="preview" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                </div>
              )}
              <div className="form-row">
                <label>Excursión / Destino</label>
                <select value={current.nombre || ""} onChange={e => handleNombreChange(e.target.value)}>
                  {EXCURSIONES_LIST.map(ex => <option key={ex.nombre} value={ex.nombre}>{ex.nombre}</option>)}
                  <option value="__custom">Otro (ingresar manualmente)</option>
                </select>
              </div>
              {(!EXCURSIONES_LIST.find(ex => ex.nombre === current.nombre) && current.nombre && current.nombre !== "__custom") && (
                <div className="form-row">
                  <label>Nombre de la excursión</label>
                  <input value={current.nombre || ""} onChange={e => setCurrent(c => ({ ...c, nombre: e.target.value }))} />
                </div>
              )}
              <div className="form-row">
                <label>URL de foto</label>
                <input value={current.foto || ""} onChange={e => setCurrent(c => ({ ...c, foto: e.target.value }))} placeholder="https://..." />
              </div>
              <div className="form-2col">
                <div className="form-row">
                  <label>Fecha</label>
                  <input type="date" value={current.fecha || ""} onChange={e => setCurrent(c => ({ ...c, fecha: e.target.value }))} />
                </div>
                <div className="form-row">
                  <label>Hora</label>
                  <input type="time" value={current.hora || ""} onChange={e => setCurrent(c => ({ ...c, hora: e.target.value }))} />
                </div>
              </div>
              <div className="form-2col">
                <div className="form-row">
                  <label>Número de personas</label>
                  <input type="number" min={1} value={current.personas || ""} onChange={e => setCurrent(c => ({ ...c, personas: Number(e.target.value) }))} />
                </div>
                <div className="form-row">
                  <label>Precio por persona ($)</label>
                  <input type="number" min={0} value={current.precio || ""} onChange={e => setCurrent(c => ({ ...c, precio: Number(e.target.value) }))} />
                </div>
              </div>
              <div className="form-2col">
                <div className="form-row">
                  <label>Guía asignado</label>
                  <input value={current.guia || ""} onChange={e => setCurrent(c => ({ ...c, guia: e.target.value }))} />
                </div>
                <div className="form-row">
                  <label>Estado</label>
                  <select value={current.estado || "Pendiente"} onChange={e => setCurrent(c => ({ ...c, estado: e.target.value }))}>
                    <option>Pendiente</option><option>Confirmada</option><option>Cancelada</option>
                  </select>
                </div>
              </div>
              <div className="modal-actions">
                <button className="btn btn-secondary" onClick={closeModal}>Cancelar</button>
                <button className="btn btn-primary" onClick={handleSave}>Guardar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {modal === "view" && current && (
        <div className="modal-overlay">
          <div className="modal-box modal-wide">
            <div className="modal-header">
              <span>{current.nombre}</span>
              <button className="modal-close" onClick={closeModal}>✕</button>
            </div>
            <div className="modal-body">
              {current.foto && <div className="modal-photo-preview"><img src={current.foto} alt={current.nombre} /></div>}
              <div className="detail-grid">
                <div className="detail-item"><span>Excursión</span><b>{current.nombre}</b></div>
                <div className="detail-item"><span>Fecha</span><b>{current.fecha}</b></div>
                <div className="detail-item"><span>Hora</span><b>{current.hora}</b></div>
                <div className="detail-item"><span>Personas</span><b>{current.personas}</b></div>
                <div className="detail-item"><span>Guía</span><b>{current.guia}</b></div>
                <div className="detail-item"><span>Precio/p.</span><b>${current.precio}</b></div>
                <div className="detail-item"><span>Total</span><b>${(current.personas || 0) * (current.precio || 0)}</b></div>
                <div className="detail-item"><span>Estado</span><b>{current.estado}</b></div>
              </div>
              <div className="modal-actions">
                <button className="btn btn-secondary" onClick={closeModal}>Cerrar</button>
                <button className="btn btn-primary" onClick={() => setModal("edit")}>Editar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ── Restaurantes section ── */
function RestaurantesSection() {
  const [data, setData] = useState<Mesa[]>(INIT_MESAS);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<null | "add" | "edit" | "view">(null);
  const [current, setCurrent] = useState<Partial<Mesa>>({});
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const nextId = Math.max(0, ...data.map(d => d.id)) + 1;

  const filtered = data.filter(m =>
    m.restaurante.toLowerCase().includes(search.toLowerCase()) ||
    String(m.numero).includes(search) ||
    m.reserva.toLowerCase().includes(search.toLowerCase()) ||
    m.estado.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    const def = RESTAURANTES_LIST[0];
    setCurrent({ restaurante: def.nombre, foto: def.foto, numero: nextId, capacidad: 4, ocupada: false, reserva: "—", pago: 0, estado: "Libre" });
    setModal("add");
  };
  const openEdit = (m: Mesa) => { setCurrent({ ...m }); setModal("edit"); };
  const openView = (m: Mesa) => { setCurrent({ ...m }); setModal("view"); };
  const closeModal = () => { setModal(null); setCurrent({}); };

  const handleRestChange = (nombre: string) => {
    const found = RESTAURANTES_LIST.find(r => r.nombre === nombre);
    setCurrent(c => ({ ...c, restaurante: nombre, foto: found?.foto || c.foto || "" }));
  };

  const handleSave = () => {
    if (!current.restaurante) return;
    if (modal === "add") {
      setData(d => [...d, { ...current, id: nextId } as Mesa]);
    } else {
      setData(d => d.map(m => m.id === current.id ? { ...current } as Mesa : m));
    }
    closeModal();
  };

  const libres = data.filter(m => m.estado === "Libre").length;
  const ocupadasM = data.filter(m => m.ocupada).length;
  const reservadasM = data.filter(m => m.reserva && m.reserva !== "—").length;

  return (
    <section>
      <div className="section-header-row">
        <div className="section-header-left">
          <div className="section-title-text">Gestión de Restaurantes</div>
          <div className="section-desc">Administración de mesas, reservas, pagos y estado de ocupación.</div>
        </div>
        <button className="btn btn-primary" onClick={openAdd}>+ Agregar Mesa</button>
      </div>
      <div className="stat-cards">
        <div className="stat-card" style={{"--stat-color": "#2563eb"} as React.CSSProperties}>
          <div className="stat-card-value">{data.length}</div>
          <div className="stat-card-label">Total mesas</div>
        </div>
        <div className="stat-card" style={{"--stat-color": "#16a34a"} as React.CSSProperties}>
          <div className="stat-card-value">{libres}</div>
          <div className="stat-card-label">Libres</div>
        </div>
        <div className="stat-card" style={{"--stat-color": "#dc2626"} as React.CSSProperties}>
          <div className="stat-card-value">{ocupadasM}</div>
          <div className="stat-card-label">Ocupadas</div>
        </div>
        <div className="stat-card" style={{"--stat-color": "#d97706"} as React.CSSProperties}>
          <div className="stat-card-value">{reservadasM}</div>
          <div className="stat-card-label">Reservadas</div>
        </div>
      </div>
      <div className="toolbar">
        <div className="search-wrap">
          <span className="search-icon">🔍</span>
          <input className="search-input" placeholder="Buscar por restaurante, mesa o estado..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Foto</th>
              <th>Restaurante</th>
              <th>Mesa N°</th>
              <th>Capacidad</th>
              <th>Estado</th>
              <th>Reserva</th>
              <th>Monto pagado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={8} className="empty-row">Sin resultados</td></tr>
            )}
            {filtered.map(m => (
              <tr key={m.id}>
                <td><Thumb src={m.foto} alt={m.restaurante} /></td>
                <td><span className="establishment-name">{m.restaurante}</span></td>
                <td><b>Mesa {m.numero}</b></td>
                <td>{m.capacidad} pers.</td>
                <td><span className={"badge " + (m.estado === "Libre" ? "badge-green" : m.estado === "Ocupada" ? "badge-red" : "badge-yellow")}>{m.estado}</span></td>
                <td>{m.reserva}</td>
                <td><b>{m.pago > 0 ? `$${m.pago}` : "—"}</b></td>
                <td>
                  <div className="action-btns">
                    <button className="icon-btn view-btn" title="Ver detalles" onClick={() => openView(m)}>Ver</button>
                    <button className="icon-btn edit-btn" title="Editar" onClick={() => openEdit(m)}>Editar</button>
                    <button className="icon-btn del-btn" title="Eliminar" onClick={() => setConfirmId(m.id)}>Borrar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="table-footer">{filtered.length} de {data.length} mesas</div>

      {confirmId !== null && (
        <ConfirmModal msg="¿Seguro que deseas eliminar esta mesa?" onConfirm={() => { setData(d => d.filter(m => m.id !== confirmId)); setConfirmId(null); }} onCancel={() => setConfirmId(null)} />
      )}

      {(modal === "add" || modal === "edit") && (
        <div className="modal-overlay">
          <div className="modal-box modal-wide">
            <div className="modal-header">
              <span>{modal === "add" ? "Agregar mesa" : "Editar mesa"}</span>
              <button className="modal-close" onClick={closeModal}>✕</button>
            </div>
            <div className="modal-body">
              {current.foto && (
                <div className="modal-photo-preview">
                  <img src={current.foto} alt="preview" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                </div>
              )}
              <div className="form-row">
                <label>Restaurante</label>
                <select value={current.restaurante || ""} onChange={e => handleRestChange(e.target.value)}>
                  {RESTAURANTES_LIST.map(r => <option key={r.nombre} value={r.nombre}>{r.nombre}</option>)}
                  <option value="__custom">Otro (ingresar manualmente)</option>
                </select>
              </div>
              {(!RESTAURANTES_LIST.find(r => r.nombre === current.restaurante) && current.restaurante && current.restaurante !== "__custom") && (
                <div className="form-row">
                  <label>Nombre del restaurante</label>
                  <input value={current.restaurante || ""} onChange={e => setCurrent(c => ({ ...c, restaurante: e.target.value }))} />
                </div>
              )}
              <div className="form-row">
                <label>URL de foto del establecimiento</label>
                <input value={current.foto || ""} onChange={e => setCurrent(c => ({ ...c, foto: e.target.value }))} placeholder="https://..." />
              </div>
              <div className="form-2col">
                <div className="form-row">
                  <label>Número de mesa</label>
                  <input type="number" min={1} value={current.numero || ""} onChange={e => setCurrent(c => ({ ...c, numero: Number(e.target.value) }))} />
                </div>
                <div className="form-row">
                  <label>Capacidad (personas)</label>
                  <input type="number" min={1} value={current.capacidad || ""} onChange={e => setCurrent(c => ({ ...c, capacidad: Number(e.target.value) }))} />
                </div>
              </div>
              <div className="form-2col">
                <div className="form-row">
                  <label>Estado</label>
                  <select value={current.estado || "Libre"} onChange={e => setCurrent(c => ({ ...c, estado: e.target.value, ocupada: e.target.value === "Ocupada" }))}>
                    <option>Libre</option><option>Ocupada</option><option>Reservada</option>
                  </select>
                </div>
                <div className="form-row">
                  <label>Monto total pagado ($)</label>
                  <input type="number" min={0} value={current.pago || ""} onChange={e => setCurrent(c => ({ ...c, pago: Number(e.target.value) }))} />
                </div>
              </div>
              <div className="form-row">
                <label>Nombre de reserva / cliente</label>
                <input value={current.reserva || ""} onChange={e => setCurrent(c => ({ ...c, reserva: e.target.value }))} placeholder="— si no hay reserva" />
              </div>
              <div className="modal-actions">
                <button className="btn btn-secondary" onClick={closeModal}>Cancelar</button>
                <button className="btn btn-primary" onClick={handleSave}>Guardar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {modal === "view" && current && (
        <div className="modal-overlay">
          <div className="modal-box modal-wide">
            <div className="modal-header">
              <span>{current.restaurante} — Mesa {current.numero}</span>
              <button className="modal-close" onClick={closeModal}>✕</button>
            </div>
            <div className="modal-body">
              {current.foto && <div className="modal-photo-preview"><img src={current.foto} alt={current.restaurante} /></div>}
              <div className="detail-grid">
                <div className="detail-item"><span>Restaurante</span><b>{current.restaurante}</b></div>
                <div className="detail-item"><span>Mesa N°</span><b>{current.numero}</b></div>
                <div className="detail-item"><span>Capacidad</span><b>{current.capacidad} personas</b></div>
                <div className="detail-item"><span>Estado</span><b>{current.estado}</b></div>
                <div className="detail-item"><span>Reserva</span><b>{current.reserva}</b></div>
                <div className="detail-item"><span>Monto pagado</span><b>{current.pago && current.pago > 0 ? `$${current.pago}` : "—"}</b></div>
              </div>
              <div className="modal-actions">
                <button className="btn btn-secondary" onClick={closeModal}>Cerrar</button>
                <button className="btn btn-primary" onClick={() => setModal("edit")}>Editar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
