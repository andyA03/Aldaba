import { useEffect, useState } from 'react';
import { Bed, UtensilsCrossed, Wifi, Tv, Coffee, Star, ChevronRight } from 'lucide-react';
import { accommodations, gastronomyVenues } from '@shared/data/siteData';
import C from '@shared/theme/colors';
import Modal from '@shared/ui/Modal';
import Footer from '@shared/ui/Footer';
import { fetchAlojamientos, fetchGastronomia, type AccommodationData, type GastronomyData } from '@shared/api/aldabaApi';

const ACCOMMODATION_IMAGES: Record<string, string> = {
  '1': 'https://picsum.photos/seed/hostal-colonial-trinidad/400/220',
  '2': 'https://picsum.photos/seed/casa-amargura-trinidad/400/220',
};
const GASTRONOMY_IMAGES: Record<string, string> = {
  '1': 'https://picsum.photos/seed/patio-becquer-cuba/400/220',
  '2': 'https://picsum.photos/seed/taberna-guanahuac/400/220',
  '3': 'https://picsum.photos/seed/playa-ancon-cuba/400/220',
  '4': 'https://picsum.photos/seed/san-isidro-valley/400/220',
  '5': 'https://picsum.photos/seed/acuario-trinidad/400/220',
};

export default function Services() {
  const [tab, setTab] = useState<'alojamiento' | 'gastronomia'>('alojamiento');
  const [modalTitle, setModalTitle] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [remoteAlojamientos, setRemoteAlojamientos] = useState<AccommodationData[] | null>(null);
  const [remoteGastronomia, setRemoteGastronomia] = useState<GastronomyData[] | null>(null);
  const alojamientos = remoteAlojamientos ?? accommodations.map(item => ({
    id: item.id,
    name: item.name,
    description: item.description,
    amenities: item.amenities,
    rooms: item.rooms,
    icon: item.icon,
  }));
  const gastronomia = remoteGastronomia ?? gastronomyVenues.map(item => ({
    id: item.id,
    name: item.name,
    description: item.description,
    offerings: item.offerings,
    icon: item.icon,
  }));

  const openModal = (title: string) => { setModalTitle(title); setModalOpen(true); };

  useEffect(() => {
    fetchAlojamientos().then(setRemoteAlojamientos).catch(() => setRemoteAlojamientos(null));
    fetchGastronomia().then(setRemoteGastronomia).catch(() => setRemoteGastronomia(null));
  }, []);

  return (
    <div style={{ paddingTop: 64, backgroundColor: C.background, minHeight: '100vh' }}>
      <div style={{
        position: 'relative', height: 260,
        backgroundImage: 'url(https://picsum.photos/seed/servicios-aldaba-header/1200/400)',
        backgroundSize: 'cover', backgroundPosition: 'center',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(27,79,138,0.55) 0%, rgba(27,79,138,0.80) 100%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          padding: '0 24px',
        }}>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: C.secondaryLight, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10, fontWeight: 600 }}>
            Nuestros servicios
          </p>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 34, fontWeight: 700, color: '#fff', textAlign: 'center', textShadow: '0 2px 12px rgba(0,0,0,0.3)', marginBottom: 10 }}>
            Alojamiento & Gastronomía
          </h1>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 15, color: 'rgba(255,255,255,0.85)', textAlign: 'center', maxWidth: 500 }}>
            Experiencias auténticas en el corazón del Patrimonio de la Humanidad
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 20px' }}>
        <div style={{
          display: 'flex', gap: 8, marginTop: 28, marginBottom: 28,
          backgroundColor: C.card, borderRadius: 14,
          padding: 6, border: `1.5px solid ${C.border}`,
          width: 'fit-content',
        }}>
          {(['alojamiento', 'gastronomia'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: '10px 22px',
              borderRadius: 10,
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 14, fontWeight: 600,
              display: 'flex', alignItems: 'center', gap: 8,
              transition: 'all 0.2s',
              cursor: 'pointer',
              backgroundColor: tab === t ? C.primary : 'transparent',
              color: tab === t ? '#fff' : C.textSecondary,
            }}>
              {t === 'alojamiento' ? <Bed size={16} /> : <UtensilsCrossed size={16} />}
              {t === 'alojamiento' ? 'Alojamiento' : 'Gastronomía'}
            </button>
          ))}
        </div>

        {tab === 'alojamiento' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20, marginBottom: 40 }}>
            {alojamientos.map(item => (
              <div key={item.id} className="hover-card" style={{
                backgroundColor: C.card,
                borderRadius: 18,
                overflow: 'hidden',
                border: `1.5px solid ${C.border}`,
                boxShadow: '0 4px 16px rgba(27,79,138,0.08)',
              }}>
                <img
                  src={ACCOMMODATION_IMAGES[item.id] || `https://picsum.photos/seed/hostal-${item.id}/400/220`}
                  alt={item.name}
                  style={{ width: '100%', height: 180, objectFit: 'cover' }}
                />
                <div style={{ padding: '18px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <Bed size={16} color={C.primary} />
                    <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, color: C.secondary, fontWeight: 700, letterSpacing: 0.5 }}>
                      {item.rooms.toUpperCase()}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 17, color: C.primary, marginBottom: 8, lineHeight: 1.3 }}>
                    {item.name}
                  </h3>
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: C.textSecondary, lineHeight: 1.6, marginBottom: 14 }}>
                    {item.description}
                  </p>
                  <div style={{ marginBottom: 16 }}>
                    {item.amenities.slice(0, 3).map(a => (
                      <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
                        <Star size={11} color={C.accent} fill={C.accent} />
                        <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: C.text }}>{a}</span>
                      </div>
                    ))}
                    {item.amenities.length > 3 && (
                      <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, color: C.textTertiary, marginLeft: 18 }}>
                        +{item.amenities.length - 3} más
                      </span>
                    )}
                  </div>
                  <button onClick={() => openModal(item.name)} className="btn-primary" style={{
                    width: '100%', backgroundColor: C.primary, color: '#fff',
                    padding: '11px 0', borderRadius: 10,
                    fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 600,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  }}>
                    Solicitar reserva <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'gastronomia' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20, marginBottom: 40 }}>
            {gastronomia.map(item => (
              <div key={item.id} className="hover-card" style={{
                backgroundColor: C.card,
                borderRadius: 18,
                overflow: 'hidden',
                border: `1.5px solid ${C.border}`,
                boxShadow: '0 4px 16px rgba(27,79,138,0.08)',
              }}>
                <img
                  src={GASTRONOMY_IMAGES[item.id] || `https://picsum.photos/seed/gastro-${item.id}/400/220`}
                  alt={item.name}
                  style={{ width: '100%', height: 160, objectFit: 'cover' }}
                />
                <div style={{ padding: '16px 18px' }}>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 16, color: C.primary, marginBottom: 8, lineHeight: 1.3 }}>
                    {item.name}
                  </h3>
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: C.textSecondary, lineHeight: 1.6, marginBottom: 12 }}>
                    {item.description}
                  </p>
                  <div style={{ marginBottom: 14 }}>
                    {item.offerings.map(o => (
                      <div key={o} style={{
                        display: 'inline-block',
                        backgroundColor: C.background,
                        border: `1px solid ${C.borderLight}`,
                        borderRadius: 6,
                        padding: '3px 8px',
                        marginRight: 6, marginBottom: 6,
                        fontFamily: 'DM Sans, sans-serif', fontSize: 11, color: C.textSecondary,
                      }}>
                        {o}
                      </div>
                    ))}
                  </div>
                  <button onClick={() => openModal(item.name)} className="btn-primary" style={{
                    width: '100%', backgroundColor: C.primary, color: '#fff',
                    padding: '10px 0', borderRadius: 10,
                    fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 600,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  }}>
                    Más información <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
      <Modal visible={modalOpen} onClose={() => setModalOpen(false)} title={modalTitle} />
    </div>
  );
}
