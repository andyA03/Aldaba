import { useState } from 'react';
import { X } from 'lucide-react';
import C from '@shared/theme/colors';

interface Props {
  visible: boolean;
  onClose: () => void;
  title: string;
}

export default function Modal({ visible, onClose, title }: Props) {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  if (!visible) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setName(''); setContact(''); setMessage('');
      onClose();
    }, 2000);
  };

  return (
    <div style={{
      position: 'fixed', inset: 0,
      backgroundColor: 'rgba(12,21,36,0.55)',
      zIndex: 200, display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      padding: 20,
    }} onClick={onClose}>
      <div style={{
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 28,
        maxWidth: 440, width: '100%',
        boxShadow: '0 20px 60px rgba(27,79,138,0.2)',
      }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, color: C.primary }}>
            Solicitar: {title}
          </h3>
          <button onClick={onClose} style={{ color: C.textTertiary, padding: 4 }}>
            <X size={20} />
          </button>
        </div>

        {sent ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 15, color: C.primary, fontWeight: 600 }}>
              ¡Solicitud enviada!
            </p>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: C.textSecondary, marginTop: 6 }}>
              Nos pondremos en contacto contigo pronto.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, fontWeight: 600, color: C.textSecondary, display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Nombre completo
              </label>
              <input
                className="form-input"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Ej. María García"
                required
              />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, fontWeight: 600, color: C.textSecondary, display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Teléfono o correo
              </label>
              <input
                className="form-input"
                type="text"
                value={contact}
                onChange={e => setContact(e.target.value)}
                placeholder="Ej. +53 5 XXX-XXXX"
                required
              />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, fontWeight: 600, color: C.textSecondary, display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Mensaje (opcional)
              </label>
              <textarea
                className="form-input"
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Cuéntanos más sobre lo que necesitas..."
                rows={3}
                style={{ resize: 'none' }}
              />
            </div>
            <button
              type="submit"
              className="btn-primary"
              style={{
                width: '100%',
                backgroundColor: C.primary,
                color: '#fff',
                padding: '13px 0',
                borderRadius: 12,
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 15, fontWeight: 600,
              }}
            >
              Enviar solicitud
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
