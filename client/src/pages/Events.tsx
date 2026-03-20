import { useState } from 'react';
import { Users, Sparkles, ChevronRight, Car, Map, Palette, UserCheck } from 'lucide-react';
import { eventSpaces, culturalServices, otherServices } from '@constants/data';
import C from '../colors';
import Modal from '../components/Modal';
import Footer from '../components/Footer';

const EVENT_IMAGES: Record<string, string> = {
  '1': 'https://picsum.photos/seed/patio-becquer-event/500/260',
  '2': 'https://picsum.photos/seed/amargura-event-space/500/260',
};
const CULTURAL_IMAGES: Record<string, string> = {
  '1': 'https://picsum.photos/seed/guaimaro-cultural/400/200',
  '2': 'https://picsum.photos/seed/musica-cubana-vivo/400/200',
  '3': 'https://picsum.photos/seed/taberna-colonial/400/200',
  '4': 'https://picsum.photos/seed/acuario-educativo/400/200',
};

const OTHER_ICONS: Record<string, JSX.Element> = {
  'car-outline': <Car size={22} color={C.primary} />,
  'map-outline': <Map size={22} color={C.primary} />,
  'color-palette-outline': <Palette size={22} color={C.primary} />,
  'person-outline': <UserCheck size={22} color={C.primary} />,
};

export default function Events() {
  const [modalTitle, setModalTitle] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = (title: string) => { setModalTitle(title); setModalOpen(true); };

  return (
    <div style={{ paddingTop: 64, backgroundColor: C.background, minHeight: '100vh' }}>
      <div style={{
        position: 'relative', height: 280,
        backgroundImage: 'url(https://picsum.photos/seed/eventos-culturales-cuba/1200/400)',
        backgroundSize: 'cover', backgroundPosition: 'center',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(6,182,212,0.35) 0%, rgba(27,79,138,0.82) 100%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          padding: '0 24px',
        }}>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: C.accentLight, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10, fontWeight: 600 }}>
            Celebra en Trinidad
          </p>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 34, fontWeight: 700, color: '#fff', textAlign: 'center', textShadow: '0 2px 12px rgba(0,0,0,0.3)', marginBottom: 10 }}>
            Eventos & Cultura
          </h1>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 15, color: 'rgba(255,255,255,0.88)', textAlign: 'center', maxWidth: 500 }}>
            Espacios únicos y servicios culturales para celebrar momentos inolvidables
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 20px' }}>
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <div style={{ width: 4, height: 28, backgroundColor: C.primary, borderRadius: 2 }} />
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, color: C.primary }}>
              Espacios para eventos
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
            {eventSpaces.map(space => (
              <div key={space.id} className="hover-card" style={{
                backgroundColor: C.card,
                borderRadius: 20,
                overflow: 'hidden',
                border: `1.5px solid ${C.border}`,
                boxShadow: '0 4px 16px rgba(27,79,138,0.08)',
              }}>
                <img
                  src={EVENT_IMAGES[space.id] || `https://picsum.photos/seed/event-space-${space.id}/500/260`}
                  alt={space.name}
                  style={{ width: '100%', height: 190, objectFit: 'cover' }}
                />
                <div style={{ padding: '18px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                    <Users size={14} color={C.secondary} />
                    <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: C.secondary, fontWeight: 700 }}>
                      Capacidad: {space.capacity}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 17, color: C.primary, marginBottom: 8, lineHeight: 1.3 }}>
                    {space.name}
                  </h3>
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: C.textSecondary, lineHeight: 1.6, marginBottom: 14 }}>
                    {space.description}
                  </p>
                  <div style={{ marginBottom: 16 }}>
                    {space.eventTypes.map(et => (
                      <span key={et} style={{
                        display: 'inline-block',
                        backgroundColor: C.background,
                        border: `1px solid ${C.borderLight}`,
                        borderRadius: 6, padding: '3px 10px',
                        marginRight: 6, marginBottom: 6,
                        fontFamily: 'DM Sans, sans-serif', fontSize: 11, color: C.textSecondary,
                      }}>
                        {et}
                      </span>
                    ))}
                  </div>
                  <button onClick={() => openModal(space.name)} className="btn-primary" style={{
                    width: '100%', backgroundColor: C.primary, color: '#fff',
                    padding: '11px 0', borderRadius: 10,
                    fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 600,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  }}>
                    Reservar espacio <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <div style={{ width: 4, height: 28, backgroundColor: C.accent, borderRadius: 2 }} />
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, color: C.primary }}>
              Servicios culturales
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
            {culturalServices.map(service => (
              <div key={service.id} className="hover-card" style={{
                backgroundColor: C.card,
                borderRadius: 16,
                overflow: 'hidden',
                border: `1.5px solid ${C.border}`,
              }}>
                <img
                  src={CULTURAL_IMAGES[service.id] || `https://picsum.photos/seed/cultural-${service.id}/400/200`}
                  alt={service.name}
                  style={{ width: '100%', height: 140, objectFit: 'cover' }}
                />
                <div style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                    <Sparkles size={13} color={C.accent} />
                    <h4 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 700, color: C.primary }}>
                      {service.name}
                    </h4>
                  </div>
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: C.textSecondary, lineHeight: 1.5 }}>
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 48 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <div style={{ width: 4, height: 28, backgroundColor: C.secondary, borderRadius: 2 }} />
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, color: C.primary }}>
              Otros servicios
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 14 }}>
            {otherServices.map(service => (
              <div key={service.id} className="hover-card" style={{
                backgroundColor: C.card,
                border: `1.5px solid ${C.border}`,
                borderRadius: 14,
                padding: '18px 16px',
                display: 'flex', flexDirection: 'column', gap: 10,
              }}>
                <div>{OTHER_ICONS[service.icon] || <Sparkles size={22} color={C.primary} />}</div>
                <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 700, color: C.text }}>
                  {service.name}
                </div>
                <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: C.textSecondary, lineHeight: 1.5 }}>
                  {service.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
      <Modal visible={modalOpen} onClose={() => setModalOpen(false)} title={modalTitle} />
    </div>
  );
}
