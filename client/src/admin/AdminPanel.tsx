import "./AdminPanel.css";
import React, { useState } from "react";

const SECTIONS = [
  { key: "hostales", label: "Hostales", icon: "🏨" },
  { key: "excursiones", label: "Excursiones", icon: "🧭" },
  { key: "restaurantes", label: "Restaurantes", icon: "🍽️" },
];

type Habitacion = {
  id: number;
  numero: string;
  tipo: string;
  huespedes: number;
  disponible: boolean;
  precio: number;
  reserva: string;
};

type Excursion = {
  id: number;
  destino: string;
  fecha: string;
  hora: string;
  personas: number;
  guia: string;
  precio: number;
  estado: string;
};

type Mesa = {
  id: number;
  numero: number;
  capacidad: number;
  ocupada: boolean;
  reserva: string;
  pago: number;
  estado: string;
};

const INIT_HABITACIONES: Habitacion[] = [
  { id: 1, numero: "101", tipo: "Doble", huespedes: 2, disponible: true, precio: 50, reserva: "—" },
  { id: 2, numero: "102", tipo: "Triple", huespedes: 3, disponible: false, precio: 70, reserva: "Juan Pérez" },
  { id: 3, numero: "103", tipo: "Simple", huespedes: 1, disponible: true, precio: 35, reserva: "—" },
  { id: 4, numero: "201", tipo: "Suite", huespedes: 4, disponible: false, precio: 110, reserva: "María López" },
];

const INIT_EXCURSIONES: Excursion[] = [
  { id: 1, destino: "Centro Histórico de Trinidad", fecha: "2026-05-10", hora: "09:00", personas: 8, guia: "Carlos Díaz", precio: 25, estado: "Confirmada" },
  { id: 2, destino: "Valle de los Ingenios", fecha: "2026-05-12", hora: "08:00", personas: 12, guia: "Ana Suárez", precio: 40, estado: "Pendiente" },
  { id: 3, destino: "Casa Hacienda Guaimaro", fecha: "2026-05-15", hora: "10:00", personas: 5, guia: "Pedro Mora", precio: 30, estado: "Confirmada" },
];

const INIT_MESAS: Mesa[] = [
  { id: 1, numero: 1, capacidad: 4, ocupada: true, reserva: "Familia García", pago: 120, estado: "Ocupada" },
  { id: 2, numero: 2, capacidad: 2, ocupada: false, reserva: "—", pago: 0, estado: "Libre" },
  { id: 3, numero: 3, capacidad: 6, ocupada: false, reserva: "Reservado - 20:00", pago: 0, estado: "Reservada" },
  { id: 4, numero: 4, capacidad: 4, ocupada: true, reserva: "Sr. Martínez", pago: 85, estado: "Ocupada" },
];

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
        <div className="login-brand">Aldaba</div>
        <div className="login-subtitle">Panel de Administración</div>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-field">
            <label>Usuario</label>
            <input
              type="text"
              value={user}
              onChange={e => setUser(e.target.value)}
              placeholder="admin"
              autoComplete="username"
            />
          </div>
          <div className="login-field">
            <label>Contraseña</label>
            <input
              type="password"
              value={pass}
              onChange={e => setPass(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>
          {error && <div className="login-error">{error}</div>}
          <button type="submit" className="login-btn">Iniciar sesión</button>
        </form>
        <div className="login-hint">Usuario: <b>admin</b> · Contraseña: <b>admin123</b></div>
      </div>
    </div>
  );
}

export default function AdminPanel() {
  const [authed, setAuthed] = useState(false);
  const [section, setSection] = useState("hostales");

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;

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
              <span className="nav-icon">{s.icon}</span>
              {s.label}
            </div>
          ))}
        </nav>
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={() => setAuthed(false)}>
            🔓 Cerrar sesión
          </button>
          <div className="sidebar-footer-copy">Aldaba Trinidad © 2025</div>
        </div>
      </aside>
      <main className="main">
        <div className="topbar">
          <div className="topbar-title">
            {SECTIONS.find(s => s.key === section)?.icon}{" "}
            {SECTIONS.find(s => s.key === section)?.label}
          </div>
          <div className="topbar-user">👤 Administrador</div>
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

function ConfirmModal({ msg, onConfirm, onCancel }: { msg: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="modal-overlay">
      <div className="modal-box" style={{ maxWidth: 380 }}>
        <div className="modal-header">
          <span>Confirmar acción</span>
        </div>
        <div style={{ padding: "1.5rem 1.5rem 1rem" }}>
          <p style={{ marginBottom: "1.5rem", color: "#444" }}>{msg}</p>
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
            <button className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
            <button className="btn btn-danger" onClick={onConfirm}>Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function HostalesSection() {
  const [data, setData] = useState<Habitacion[]>(INIT_HABITACIONES);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<null | "add" | "edit" | "view">(null);
  const [current, setCurrent] = useState<Partial<Habitacion>>({});
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const nextId = Math.max(0, ...data.map(d => d.id)) + 1;

  const filtered = data.filter(h =>
    h.numero.toLowerCase().includes(search.toLowerCase()) ||
    h.tipo.toLowerCase().includes(search.toLowerCase()) ||
    h.reserva.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => { setCurrent({ tipo: "Doble", huespedes: 2, disponible: true, precio: 50, reserva: "—" }); setModal("add"); };
  const openEdit = (h: Habitacion) => { setCurrent({ ...h }); setModal("edit"); };
  const openView = (h: Habitacion) => { setCurrent({ ...h }); setModal("view"); };
  const closeModal = () => { setModal(null); setCurrent({}); };

  const handleSave = () => {
    if (!current.numero) return;
    if (modal === "add") {
      setData(d => [...d, { ...current, id: nextId } as Habitacion]);
    } else {
      setData(d => d.map(h => h.id === current.id ? { ...current } as Habitacion : h));
    }
    closeModal();
  };

  const handleDelete = (id: number) => { setConfirmId(id); };
  const confirmDelete = () => { setData(d => d.filter(h => h.id !== confirmId)); setConfirmId(null); };

  return (
    <section>
      <div className="section-desc">Gestión de habitaciones, disponibilidad, precios y reservas de los hostales registrados.</div>
      <div className="toolbar">
        <input className="search-input" placeholder="🔍 Buscar por habitación, tipo o huésped..." value={search} onChange={e => setSearch(e.target.value)} />
        <button className="btn btn-primary" onClick={openAdd}>+ Agregar Habitación</button>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Habitación</th>
              <th>Tipo</th>
              <th>Huéspedes</th>
              <th>Disponible</th>
              <th>Precio/noche</th>
              <th>Reserva</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={7} style={{ textAlign: "center", color: "#aaa", padding: "2rem" }}>Sin resultados</td></tr>
            )}
            {filtered.map(h => (
              <tr key={h.id}>
                <td><b>{h.numero}</b></td>
                <td>{h.tipo}</td>
                <td>{h.huespedes}</td>
                <td>
                  <span className={"badge " + (h.disponible ? "badge-green" : "badge-red")}>
                    {h.disponible ? "Disponible" : "Ocupada"}
                  </span>
                </td>
                <td><b>${h.precio}</b></td>
                <td>{h.reserva}</td>
                <td>
                  <div className="action-btns">
                    <button className="icon-btn view-btn" title="Ver detalles" onClick={() => openView(h)}>👁</button>
                    <button className="icon-btn edit-btn" title="Editar" onClick={() => openEdit(h)}>✏️</button>
                    <button className="icon-btn del-btn" title="Eliminar" onClick={() => handleDelete(h.id)}>🗑</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="table-footer">{filtered.length} de {data.length} habitaciones</div>

      {confirmId !== null && (
        <ConfirmModal
          msg="¿Seguro que deseas eliminar esta habitación? Esta acción no se puede deshacer."
          onConfirm={confirmDelete}
          onCancel={() => setConfirmId(null)}
        />
      )}

      {(modal === "add" || modal === "edit") && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <span>{modal === "add" ? "Agregar habitación" : "Editar habitación"}</span>
              <button className="modal-close" onClick={closeModal}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-row">
                <label>Número de habitación</label>
                <input value={current.numero || ""} onChange={e => setCurrent(c => ({ ...c, numero: e.target.value }))} />
              </div>
              <div className="form-row">
                <label>Tipo</label>
                <select value={current.tipo || "Doble"} onChange={e => setCurrent(c => ({ ...c, tipo: e.target.value }))}>
                  <option>Simple</option>
                  <option>Doble</option>
                  <option>Triple</option>
                  <option>Suite</option>
                </select>
              </div>
              <div className="form-row">
                <label>Capacidad (huéspedes)</label>
                <input type="number" min={1} value={current.huespedes || ""} onChange={e => setCurrent(c => ({ ...c, huespedes: Number(e.target.value) }))} />
              </div>
              <div className="form-row">
                <label>Precio por noche ($)</label>
                <input type="number" min={0} value={current.precio || ""} onChange={e => setCurrent(c => ({ ...c, precio: Number(e.target.value) }))} />
              </div>
              <div className="form-row">
                <label>Disponible</label>
                <select value={current.disponible ? "si" : "no"} onChange={e => setCurrent(c => ({ ...c, disponible: e.target.value === "si" }))}>
                  <option value="si">Sí</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div className="form-row">
                <label>Nombre de reserva</label>
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
          <div className="modal-box">
            <div className="modal-header">
              <span>Detalles — Habitación {current.numero}</span>
              <button className="modal-close" onClick={closeModal}>✕</button>
            </div>
            <div className="modal-body">
              <div className="detail-grid">
                <div className="detail-item"><span>Número</span><b>{current.numero}</b></div>
                <div className="detail-item"><span>Tipo</span><b>{current.tipo}</b></div>
                <div className="detail-item"><span>Huéspedes</span><b>{current.huespedes}</b></div>
                <div className="detail-item"><span>Precio/noche</span><b>${current.precio}</b></div>
                <div className="detail-item"><span>Estado</span><b>{current.disponible ? "Disponible" : "Ocupada"}</b></div>
                <div className="detail-item"><span>Reserva</span><b>{current.reserva}</b></div>
              </div>
              <div className="modal-actions">
                <button className="btn btn-secondary" onClick={closeModal}>Cerrar</button>
                <button className="btn btn-primary" onClick={() => { setModal("edit"); }}>Editar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function ExcursionesSection() {
  const [data, setData] = useState<Excursion[]>(INIT_EXCURSIONES);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<null | "add" | "edit" | "view">(null);
  const [current, setCurrent] = useState<Partial<Excursion>>({});
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const nextId = Math.max(0, ...data.map(d => d.id)) + 1;

  const filtered = data.filter(e =>
    e.destino.toLowerCase().includes(search.toLowerCase()) ||
    e.guia.toLowerCase().includes(search.toLowerCase()) ||
    e.estado.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => { setCurrent({ destino: "", fecha: "", hora: "09:00", personas: 1, guia: "", precio: 25, estado: "Pendiente" }); setModal("add"); };
  const openEdit = (e: Excursion) => { setCurrent({ ...e }); setModal("edit"); };
  const openView = (e: Excursion) => { setCurrent({ ...e }); setModal("view"); };
  const closeModal = () => { setModal(null); setCurrent({}); };

  const handleSave = () => {
    if (!current.destino) return;
    if (modal === "add") {
      setData(d => [...d, { ...current, id: nextId } as Excursion]);
    } else {
      setData(d => d.map(e => e.id === current.id ? { ...current } as Excursion : e));
    }
    closeModal();
  };

  const handleDelete = (id: number) => setConfirmId(id);
  const confirmDelete = () => { setData(d => d.filter(e => e.id !== confirmId)); setConfirmId(null); };

  return (
    <section>
      <div className="section-desc">Control y registro de excursiones, cantidad de personas, destino, hora y precios.</div>
      <div className="toolbar">
        <input className="search-input" placeholder="🔍 Buscar por destino, guía o estado..." value={search} onChange={e => setSearch(e.target.value)} />
        <button className="btn btn-primary" onClick={openAdd}>+ Agregar Excursión</button>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Destino</th>
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
              <tr><td colSpan={8} style={{ textAlign: "center", color: "#aaa", padding: "2rem" }}>Sin resultados</td></tr>
            )}
            {filtered.map(e => (
              <tr key={e.id}>
                <td><b>{e.destino}</b></td>
                <td>{e.fecha}</td>
                <td>{e.hora}</td>
                <td>{e.personas}</td>
                <td>{e.guia}</td>
                <td><b>${e.precio}</b></td>
                <td>
                  <span className={"badge " + (e.estado === "Confirmada" ? "badge-green" : "badge-yellow")}>
                    {e.estado}
                  </span>
                </td>
                <td>
                  <div className="action-btns">
                    <button className="icon-btn view-btn" title="Ver detalles" onClick={() => openView(e)}>👁</button>
                    <button className="icon-btn edit-btn" title="Editar" onClick={() => openEdit(e)}>✏️</button>
                    <button className="icon-btn del-btn" title="Eliminar" onClick={() => handleDelete(e.id)}>🗑</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="table-footer">{filtered.length} de {data.length} excursiones</div>

      {confirmId !== null && (
        <ConfirmModal
          msg="¿Seguro que deseas eliminar esta excursión?"
          onConfirm={confirmDelete}
          onCancel={() => setConfirmId(null)}
        />
      )}

      {(modal === "add" || modal === "edit") && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <span>{modal === "add" ? "Agregar excursión" : "Editar excursión"}</span>
              <button className="modal-close" onClick={closeModal}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-row">
                <label>Destino</label>
                <input value={current.destino || ""} onChange={e => setCurrent(c => ({ ...c, destino: e.target.value }))} />
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
              <div className="form-row">
                <label>Guía asignado</label>
                <input value={current.guia || ""} onChange={e => setCurrent(c => ({ ...c, guia: e.target.value }))} />
              </div>
              <div className="form-row">
                <label>Estado</label>
                <select value={current.estado || "Pendiente"} onChange={e => setCurrent(c => ({ ...c, estado: e.target.value }))}>
                  <option>Pendiente</option>
                  <option>Confirmada</option>
                  <option>Cancelada</option>
                </select>
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
          <div className="modal-box">
            <div className="modal-header">
              <span>Detalles — {current.destino}</span>
              <button className="modal-close" onClick={closeModal}>✕</button>
            </div>
            <div className="modal-body">
              <div className="detail-grid">
                <div className="detail-item"><span>Destino</span><b>{current.destino}</b></div>
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

function RestaurantesSection() {
  const [data, setData] = useState<Mesa[]>(INIT_MESAS);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<null | "add" | "edit" | "view">(null);
  const [current, setCurrent] = useState<Partial<Mesa>>({});
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const nextId = Math.max(0, ...data.map(d => d.id)) + 1;

  const filtered = data.filter(m =>
    String(m.numero).includes(search) ||
    m.reserva.toLowerCase().includes(search.toLowerCase()) ||
    m.estado.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => { setCurrent({ numero: nextId, capacidad: 4, ocupada: false, reserva: "—", pago: 0, estado: "Libre" }); setModal("add"); };
  const openEdit = (m: Mesa) => { setCurrent({ ...m }); setModal("edit"); };
  const openView = (m: Mesa) => { setCurrent({ ...m }); setModal("view"); };
  const closeModal = () => { setModal(null); setCurrent({}); };

  const handleSave = () => {
    if (modal === "add") {
      setData(d => [...d, { ...current, id: nextId } as Mesa]);
    } else {
      setData(d => d.map(m => m.id === current.id ? { ...current } as Mesa : m));
    }
    closeModal();
  };

  const handleDelete = (id: number) => setConfirmId(id);
  const confirmDelete = () => { setData(d => d.filter(m => m.id !== confirmId)); setConfirmId(null); };

  return (
    <section>
      <div className="section-desc">Administración de mesas, reservas, pagos y estado de ocupación de los restaurantes.</div>
      <div className="toolbar">
        <input className="search-input" placeholder="🔍 Buscar por mesa, reserva o estado..." value={search} onChange={e => setSearch(e.target.value)} />
        <button className="btn btn-primary" onClick={openAdd}>+ Agregar Mesa</button>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
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
              <tr><td colSpan={6} style={{ textAlign: "center", color: "#aaa", padding: "2rem" }}>Sin resultados</td></tr>
            )}
            {filtered.map(m => (
              <tr key={m.id}>
                <td><b>Mesa {m.numero}</b></td>
                <td>{m.capacidad} personas</td>
                <td>
                  <span className={"badge " + (m.estado === "Libre" ? "badge-green" : m.estado === "Ocupada" ? "badge-red" : "badge-yellow")}>
                    {m.estado}
                  </span>
                </td>
                <td>{m.reserva}</td>
                <td><b>{m.pago > 0 ? `$${m.pago}` : "—"}</b></td>
                <td>
                  <div className="action-btns">
                    <button className="icon-btn view-btn" title="Ver detalles" onClick={() => openView(m)}>👁</button>
                    <button className="icon-btn edit-btn" title="Editar" onClick={() => openEdit(m)}>✏️</button>
                    <button className="icon-btn del-btn" title="Eliminar" onClick={() => handleDelete(m.id)}>🗑</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="table-footer">{filtered.length} de {data.length} mesas</div>

      {confirmId !== null && (
        <ConfirmModal
          msg="¿Seguro que deseas eliminar esta mesa?"
          onConfirm={confirmDelete}
          onCancel={() => setConfirmId(null)}
        />
      )}

      {(modal === "add" || modal === "edit") && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <span>{modal === "add" ? "Agregar mesa" : "Editar mesa"}</span>
              <button className="modal-close" onClick={closeModal}>✕</button>
            </div>
            <div className="modal-body">
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
              <div className="form-row">
                <label>Estado</label>
                <select value={current.estado || "Libre"} onChange={e => setCurrent(c => ({ ...c, estado: e.target.value, ocupada: e.target.value === "Ocupada" }))}>
                  <option>Libre</option>
                  <option>Ocupada</option>
                  <option>Reservada</option>
                </select>
              </div>
              <div className="form-row">
                <label>Nombre de reserva / cliente</label>
                <input value={current.reserva || ""} onChange={e => setCurrent(c => ({ ...c, reserva: e.target.value }))} placeholder="— si no hay reserva" />
              </div>
              <div className="form-row">
                <label>Monto total pagado ($)</label>
                <input type="number" min={0} value={current.pago || ""} onChange={e => setCurrent(c => ({ ...c, pago: Number(e.target.value) }))} />
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
          <div className="modal-box">
            <div className="modal-header">
              <span>Detalles — Mesa {current.numero}</span>
              <button className="modal-close" onClick={closeModal}>✕</button>
            </div>
            <div className="modal-body">
              <div className="detail-grid">
                <div className="detail-item"><span>Número</span><b>Mesa {current.numero}</b></div>
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
