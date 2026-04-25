import { useState } from "react";
import ConfirmDialog from "../components/ConfirmDialog";
import ImageThumbnail from "../components/ImageThumbnail";
import SearchBar from "../components/SearchBar";
import SectionHeader from "../components/SectionHeader";
import StatsCards from "../components/StatsCards";
import { HOSTALES_LIST, INIT_HABITACIONES } from "../data/admin-seed";
import type { Habitacion } from "../data/admin-types";

type HostalesManagerProps = {
  onDirtyChange?: (dirty: boolean) => void;
};

export default function HostalesManager({ onDirtyChange }: HostalesManagerProps) {
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
    onDirtyChange?.(true);
  };

  const disponibles = data.filter(h => h.disponible).length;
  const ocupadas = data.filter(h => !h.disponible).length;
  const reservadas = data.filter(h => h.reserva && h.reserva !== "—").length;
  const stats = [
    { value: data.length, label: "Total habitaciones", color: "#1B4F8A" },
    { value: disponibles, label: "Disponibles", color: "#16a34a" },
    { value: ocupadas, label: "Ocupadas", color: "#dc2626" },
    { value: reservadas, label: "Reservadas", color: "#d97706" },
  ];

  return (
    <section>
      <SectionHeader
        title="Gestión de Hostales"
        description="Habitaciones, disponibilidad, precios y reservas de los hostales registrados."
        actionLabel="+ Agregar Habitación"
        onAction={openAdd}
      />
      <StatsCards items={stats} />
      <SearchBar value={search} placeholder="Buscar por hostal, habitación, tipo..." onChange={setSearch} />
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
                <td><ImageThumbnail src={h.foto} alt={h.hostal} /></td>
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
        <ConfirmDialog msg="¿Seguro que deseas eliminar esta habitación?" onConfirm={() => { setData(d => d.filter(h => h.id !== confirmId)); setConfirmId(null); onDirtyChange?.(true); }} onCancel={() => setConfirmId(null)} />
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
