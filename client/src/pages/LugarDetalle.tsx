import { useParams, Link } from 'react-router-dom';
import { MapPin, Clock, Ticket, Navigation, ChevronRight, ArrowLeft, Lightbulb } from 'lucide-react';
import C from '../colors';
import Footer from '../components/Footer';
import LUGARES from '../data/lugaresData';

export default function LugarDetalle() {
  const { slug } = useParams<{ slug: string }>();
  const lugar = LUGARES.find(l => l.slug === slug);

  if (!lugar) {
    return (
      <div style={{ paddingTop: 64, minHeight: '100vh', backgroundColor: C.background, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>🗺️</div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, color: C.primary, marginBottom: 12 }}>
            Lugar no encontrado
          </h2>
          <Link to="/lugares" style={{ color: C.primary, fontFamily: 'DM Sans, sans-serif', fontWeight: 600 }}>
            ← Volver a Lugares Turísticos
          </Link>
        </div>
      </div>
    );
  }

  const otros = LUGARES.filter(l => l.slug !== slug).slice(0, 3);

  return (
    <div style={{ paddingTop: 64, backgroundColor: C.background, minHeight: '100vh' }}>
      <div style={{ position: 'relative', height: 420, overflow: 'hidden' }}>
        <img
          src={lugar.fotoHero}
          alt={lugar.nombre}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(12,21,36,0.82) 0%, rgba(12,21,36,0.3) 50%, rgba(12,21,36,0.1) 100%)',
        }} />

        <div style={{
          position: 'absolute', top: 20, left: 0, right: 0, padding: '0 24px',
          maxWidth: 900, margin: '0 auto',
        }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <Link
              to="/lugares"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                color: 'rgba(255,255,255,0.85)', textDecoration: 'none',
                fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 600,
                background: 'rgba(0,0,0,0.25)', backdropFilter: 'blur(4px)',
                padding: '5px 12px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.2)',
                transition: 'background 0.2s',
              }}
            >
              <ArrowLeft size={14} />
              Lugares Turísticos
            </Link>
          </div>
        </div>

        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '0 24px 32px',
        }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div style={{
              display: 'inline-block',
              backgroundColor: lugar.categoriaColor,
              color: '#fff', borderRadius: 999,
              padding: '3px 12px', marginBottom: 12,
              fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 700,
              letterSpacing: 0.5, textTransform: 'uppercase',
            }}>
              {lugar.categoria}
            </div>
            <h1 style={{
              fontFamily: 'Playfair Display, serif', fontSize: 34, fontWeight: 700,
              color: '#fff', marginBottom: 8, letterSpacing: -0.3,
              textShadow: '0 2px 12px rgba(0,0,0,0.4)',
            }}>
              {lugar.nombre}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <MapPin size={14} color="rgba(255,255,255,0.7)" />
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.75)' }}>
                {lugar.distancia}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 20px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1fr) 280px',
          gap: 28,
          paddingTop: 32,
          paddingBottom: 60,
        }} className="lugar-grid">

          <div>
            <div style={{
              backgroundColor: C.card,
              borderRadius: 18,
              padding: '28px 30px',
              border: `1.5px solid ${C.border}`,
              boxShadow: '0 4px 20px rgba(27,79,138,0.08)',
              marginBottom: 24,
            }}>
              <h2 style={{
                fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 700,
                color: C.primary, marginBottom: 18, paddingBottom: 14,
                borderBottom: `1px solid ${C.borderLight}`,
              }}>
                Sobre este lugar
              </h2>
              {lugar.descripcion.split('\n\n').map((para, i) => (
                <p key={i} style={{
                  fontFamily: 'DM Sans, sans-serif', fontSize: 15,
                  color: C.textSecondary, lineHeight: 1.75,
                  marginBottom: i < lugar.descripcion.split('\n\n').length - 1 ? 16 : 0,
                }}>
                  {para}
                </p>
              ))}
            </div>

            {lugar.consejos && (
              <div style={{
                backgroundColor: '#fef9ec',
                borderRadius: 14,
                padding: '20px 22px',
                border: '1.5px solid #fde68a',
                display: 'flex', gap: 14, alignItems: 'flex-start',
              }}>
                <Lightbulb size={20} color="#d97706" style={{ flexShrink: 0, marginTop: 2 }} />
                <div>
                  <div style={{
                    fontFamily: 'DM Sans, sans-serif', fontSize: 12, fontWeight: 700,
                    color: '#d97706', letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 6,
                  }}>
                    Consejos del viajero
                  </div>
                  <p style={{
                    fontFamily: 'DM Sans, sans-serif', fontSize: 14,
                    color: '#92400e', lineHeight: 1.65,
                  }}>
                    {lugar.consejos}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{
              backgroundColor: C.card,
              borderRadius: 16,
              border: `1.5px solid ${C.border}`,
              boxShadow: '0 2px 12px rgba(27,79,138,0.07)',
              overflow: 'hidden',
            }}>
              <div style={{
                backgroundColor: C.primary,
                padding: '14px 18px',
              }}>
                <span style={{
                  fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 700,
                  color: '#fff', letterSpacing: 0.3,
                }}>
                  Información Práctica
                </span>
              </div>
              <div style={{ padding: '6px 0' }}>
                <InfoRow icon={<Clock size={15} />} label="Horario" value={lugar.horario} />
                <InfoRow icon={<Ticket size={15} />} label="Entrada" value={lugar.entrada} />
                <InfoRow icon={<MapPin size={15} />} label="Ubicación" value={lugar.ubicacion} />
                <InfoRow icon={<Navigation size={15} />} label="Distancia" value={lugar.distancia} last />
              </div>
            </div>

            <div style={{
              background: `linear-gradient(135deg, ${C.primary} 0%, #163e72 100%)`,
              borderRadius: 16,
              padding: '20px 18px',
            }}>
              <div style={{
                fontFamily: 'Playfair Display, serif', fontSize: 16, fontWeight: 700,
                color: '#fff', marginBottom: 8,
              }}>
                ¿Quieres visitarlo?
              </div>
              <p style={{
                fontFamily: 'DM Sans, sans-serif', fontSize: 13,
                color: 'rgba(255,255,255,0.78)', lineHeight: 1.55, marginBottom: 16,
              }}>
                Organiza tu excursión con Aldaba y vive Trinidad al máximo.
              </p>
              <Link to="/excursions" style={{ textDecoration: 'none' }}>
                <div style={{
                  backgroundColor: '#fff',
                  color: C.primary,
                  borderRadius: 10,
                  padding: '10px 16px',
                  fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  transition: 'opacity 0.15s',
                }}>
                  Ver excursiones
                  <ChevronRight size={15} />
                </div>
              </Link>
            </div>
          </div>
        </div>

        {otros.length > 0 && (
          <div style={{ paddingBottom: 60 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, color: C.primary }}>
                También te puede interesar
              </h2>
              <Link to="/lugares" style={{
                fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 700,
                color: C.primary, textDecoration: 'none',
                display: 'flex', alignItems: 'center', gap: 4,
              }}>
                Ver todos <ChevronRight size={14} />
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 18 }}>
              {otros.map(l => (
                <Link key={l.id} to={`/lugares/${l.slug}`} style={{ textDecoration: 'none' }}>
                  <div className="hover-card" style={{
                    backgroundColor: C.card, borderRadius: 14,
                    overflow: 'hidden', border: `1.5px solid ${C.border}`,
                  }}>
                    <img src={l.foto} alt={l.nombre}
                      style={{ width: '100%', height: 140, objectFit: 'cover', display: 'block' }}
                    />
                    <div style={{ padding: '14px 16px' }}>
                      <div style={{
                        fontFamily: 'DM Sans, sans-serif', fontSize: 10, fontWeight: 700,
                        color: l.categoriaColor, letterSpacing: 0.5,
                        textTransform: 'uppercase', marginBottom: 5,
                      }}>
                        {l.categoria}
                      </div>
                      <div style={{
                        fontFamily: 'Playfair Display, serif', fontSize: 15, fontWeight: 700,
                        color: C.text, marginBottom: 5,
                      }}>
                        {l.nombre}
                      </div>
                      <div style={{
                        fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: C.textTertiary,
                      }}>
                        {l.distancia}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />

      <style>{`
        @media (max-width: 700px) {
          .lugar-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

function InfoRow({ icon, label, value, last }: { icon: React.ReactNode; label: string; value: string; last?: boolean }) {
  return (
    <div style={{
      display: 'flex', gap: 12, padding: '12px 18px',
      borderBottom: last ? 'none' : `1px solid ${C.borderLight}`,
      alignItems: 'flex-start',
    }}>
      <div style={{ color: C.primary, flexShrink: 0, marginTop: 2 }}>{icon}</div>
      <div>
        <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 700, color: C.textTertiary, textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 3 }}>
          {label}
        </div>
        <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: C.text, lineHeight: 1.5 }}>
          {value}
        </div>
      </div>
    </div>
  );
}
