import { useState } from 'react';
import { MapPin, Clock, ChevronRight, Navigation, Star } from 'lucide-react';
import { excursions } from '@constants/data';
import C from '../colors';
import Modal from '../components/Modal';
import Footer from '../components/Footer';

const EXCURSION_IMAGES: Record<string, string> = {
  '1': 'https://picsum.photos/seed/centro-historico-trinidad/500/280',
  '2': 'https://picsum.photos/seed/valle-ingenios-excursion/500/280',
  '3': 'https://picsum.photos/seed/hacienda-guaimaro-cuba/500/280',
};

const DURATION_MAP: Record<string, string> = {
  '1': '3–4 horas',
  '2': '5–6 horas',
  '3': '2–3 horas',
};

export default function Excursions() {
  const [modalTitle, setModalTitle] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = (title: string) => { setModalTitle(title); setModalOpen(true); };

  return (
    <div style={{ paddingTop: 64, backgroundColor: C.background, minHeight: '100vh' }}>
      <div style={{
        position: 'relative', height: 280,
        backgroundImage: 'url(https://picsum.photos/seed/excursiones-header-cuba/1200/400)',
        backgroundSize: 'cover', backgroundPosition: 'center',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(14,165,233,0.45) 0%, rgba(27,79,138,0.82) 100%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          padding: '0 24px',
        }}>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: C.accentLight, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10, fontWeight: 600 }}>
            Aventura y patrimonio
          </p>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 34, fontWeight: 700, color: '#fff', textAlign: 'center', textShadow: '0 2px 12px rgba(0,0,0,0.3)', marginBottom: 10 }}>
            Excursiones
          </h1>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 15, color: 'rgba(255,255,255,0.88)', textAlign: 'center', maxWidth: 500 }}>
            Descubre los paisajes y la historia de Trinidad y el Valle de los Ingenios
          </p>
        </div>
      </div>

      <div style={{
        backgroundColor: C.primary,
        padding: '16px 24px',
        display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center',
      }}>
        {[
          { icon: <Navigation size={15} />, text: 'Guías especializados' },
          { icon: <Clock size={15} />, text: 'Horarios flexibles' },
          { icon: <MapPin size={15} />, text: 'Transporte disponible' },
          { icon: <Star size={15} />, text: 'Grupos reducidos' },
        ].map(item => (
          <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.85)', fontFamily: 'DM Sans, sans-serif', fontSize: 13 }}>
            <span style={{ color: C.secondaryLight }}>{item.icon}</span>
            {item.text}
          </div>
        ))}
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24, marginBottom: 40 }}>
          {excursions.map(exc => (
            <div key={exc.id} className="hover-card" style={{
              backgroundColor: C.card,
              borderRadius: 20,
              overflow: 'hidden',
              border: `1.5px solid ${C.border}`,
              boxShadow: '0 4px 18px rgba(27,79,138,0.08)',
            }}>
              <div style={{ position: 'relative' }}>
                <img
                  src={EXCURSION_IMAGES[exc.id] || `https://picsum.photos/seed/excursion-${exc.id}/500/280`}
                  alt={exc.name}
                  style={{ width: '100%', height: 200, objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute', bottom: 10, left: 12,
                  backgroundColor: 'rgba(27,79,138,0.85)',
                  borderRadius: 8, padding: '4px 10px',
                  display: 'flex', alignItems: 'center', gap: 5,
                }}>
                  <Clock size={11} color={C.secondaryLight} />
                  <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, color: '#fff', fontWeight: 600 }}>
                    {DURATION_MAP[exc.id]}
                  </span>
                </div>
              </div>
              <div style={{ padding: '18px 20px' }}>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, color: C.primary, marginBottom: 10, lineHeight: 1.3 }}>
                  {exc.name}
                </h3>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: C.textSecondary, lineHeight: 1.65, marginBottom: 14 }}>
                  {exc.description}
                </p>
                <div style={{ marginBottom: 18 }}>
                  {exc.features.slice(0, 4).map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 6 }}>
                      <div style={{
                        width: 6, height: 6, borderRadius: '50%',
                        backgroundColor: C.accent, flexShrink: 0, marginTop: 5,
                      }} />
                      <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: C.text, lineHeight: 1.4 }}>{f}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => openModal(exc.name)} className="btn-primary" style={{
                  width: '100%', backgroundColor: C.primary, color: '#fff',
                  padding: '12px 0', borderRadius: 12,
                  fontFamily: 'DM Sans, sans-serif', fontSize: 14, fontWeight: 600,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                }}>
                  Reservar excursión <ChevronRight size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
      <Modal visible={modalOpen} onClose={() => setModalOpen(false)} title={modalTitle} />
    </div>
  );
}
