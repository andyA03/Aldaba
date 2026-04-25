import { useState } from "react";
import ConfirmDialog from "../components/ConfirmDialog";
import ImageThumbnail from "../components/ImageThumbnail";
import SearchBar from "../components/SearchBar";
import SectionHeader from "../components/SectionHeader";
import StatsCards from "../components/StatsCards";
import { EXCURSIONES_LIST, INIT_EXCURSIONES } from "../data/admin-seed";
import type { Excursion } from "../data/admin-types";

type ExcursionesManagerProps = {
  onDirtyChange?: (dirty: boolean) => void;
};

export default function ExcursionesManager({ onDirtyChange }: ExcursionesManagerProps) {
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
    onDirtyChange?.(true);
  };

  const pendientes = data.filter(e => e.estado === "Pendiente").length;
  const confirmadas = data.filter(e => e.estado === "Confirmada").length;
  const canceladas = data.filter(e => e.estado === "Cancelada").length;
  const stats = [
    { value: data.length, label: "Total excursiones", color: "#1B4F8A" },
    { value: pendientes, label: "Pendientes", color: "#d97706" },
    { value: confirmadas, label: "Confirmadas", color: "#16a34a" },
    { value: canceladas, label: "Canceladas", color: "#dc2626" },
  ];

  return (
    <section>
      <SectionHeader
        title="Gestión de Excursiones"
        description="Control y registro de excursiones, destinos, guías, horarios y precios."
        actionLabel="+ Agregar Excursión"
        onAction={openAdd}
      />
      <StatsCards items={stats} />
      <SearchBar value={search} placeholder="Buscar por nombre, guía o estado..." onChange={setSearch} />
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
                <td><ImageThumbnail src={e.foto} alt={e.nombre} /></td>
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
        <ConfirmDialog msg="¿Seguro que deseas eliminar esta excursión?" onConfirm={() => { setData(d => d.filter(e => e.id !== confirmId)); setConfirmId(null); onDirtyChange?.(true); }} onCancel={() => setConfirmId(null)} />
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
