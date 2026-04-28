type ConfirmModalProps = {
  msg: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmDialog({ msg, onConfirm, onCancel }: ConfirmModalProps) {
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
