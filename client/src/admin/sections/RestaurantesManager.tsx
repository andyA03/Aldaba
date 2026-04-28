import { useState } from "react";
import ConfirmDialog from "../components/ConfirmDialog";
import ImageThumbnail from "../components/ImageThumbnail";
import SearchBar from "../components/SearchBar";
import SectionHeader from "../components/SectionHeader";
import StatsCards from "../components/StatsCards";
import { INIT_MESAS, RESTAURANTES_LIST } from "../data/admin-seed";
import type { Mesa } from "../data/admin-types";

type RestaurantesManagerProps = {
  onDirtyChange?: (dirty: boolean) => void;
};

export default function RestaurantesManager({ onDirtyChange }: RestaurantesManagerProps) {
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
    onDirtyChange?.(true);
  };

  const libres = data.filter(m => m.estado === "Libre").length;
  const ocupadasM = data.filter(m => m.ocupada).length;
  const reservadasM = data.filter(m => m.reserva && m.reserva !== "—").length;
  const stats = [
    { value: data.length, label: "Total mesas", color: "#1B4F8A" },
    { value: libres, label: "Libres", color: "#16a34a" },
    { value: ocupadasM, label: "Ocupadas", color: "#dc2626" },
    { value: reservadasM, label: "Reservadas", color: "#d97706" },
  ];

  return (
    <section>
      <SectionHeader
        title="Gestión de Restaurantes"
        description="Administración de mesas, reservas, pagos y estado de ocupación."
        actionLabel="+ Agregar Mesa"
        onAction={openAdd}
      />
      <StatsCards items={stats} />
      <SearchBar value={search} placeholder="Buscar por restaurante, mesa o estado..." onChange={setSearch} />
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
                <td><ImageThumbnail src={m.foto} alt={m.restaurante} /></td>
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
        <ConfirmDialog msg="¿Seguro que deseas eliminar esta mesa?" onConfirm={() => { setData(d => d.filter(m => m.id !== confirmId)); setConfirmId(null); onDirtyChange?.(true); }} onCancel={() => setConfirmId(null)} />
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
