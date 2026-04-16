import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, MapPin, Bed, UtensilsCrossed, Compass, Calendar, ArrowRight, Phone } from 'lucide-react';
import C from '../colors';
import Footer from '../components/Footer';
import LUGARES from '../data/lugaresData';

const SLIDES = [
  {
    uri: 'https://picsum.photos/seed/trinidad-plaza-main/1600/900',
    label: 'TRINIDAD · PATRIMONIO UNESCO',
    title: 'Bienvenidos a Trinidad',
    subtitle: 'La ciudad más bella del Caribe, detenida en el tiempo',
  },
  {
    uri: 'https://picsum.photos/seed/valle-ingenios-hero/1600/900',
    label: 'VALLE DE LOS INGENIOS',
    title: 'Historia entre cañaverales',
    subtitle: 'Paisaje cultural único declarado Patrimonio de la Humanidad',
  },
  {
    uri: 'https://picsum.photos/seed/playa-ancon-hero/1600/900',
    label: 'PLAYA ANCÓN',
    title: 'El Caribe a tus pies',
    subtitle: 'Aguas cristalinas a 12 km del centro histórico',
  },
  {
    uri: 'https://picsum.photos/seed/gastronomia-cuba-hero/1600/900',
    label: 'GASTRONOMÍA CUBANA',
    title: 'Sabores que cuentan historia',
    subtitle: 'Cocina criolla auténtica en espacios coloniales únicos',
  },
  {
    uri: 'https://picsum.photos/seed/trinidad-noche-hero/1600/900',
    label: 'CULTURA Y TRADICIÓN',
    title: 'Trinidad de noche',
    subtitle: 'Música, arte y tradición bajo las estrellas del Caribe',
  },
];

const QUICK_ACCESS = [
  { path: '/services', icon: <Bed size={26} />, label: 'Alojamiento', sub: 'Hostales coloniales' },
  { path: '/services', icon: <UtensilsCrossed size={26} />, label: 'Gastronomía', sub: 'Cocina cubana' },
  { path: '/excursions', icon: <Compass size={26} />, label: 'Excursiones', sub: 'Patrimonio y naturaleza' },
  { path: '/events', icon: <Calendar size={26} />, label: 'Eventos', sub: 'Cultura y celebraciones' },
];

const HIGHLIGHTS = [
  { icon: '🏛️', title: 'Patrimonio UNESCO', desc: 'Ciudad declarada Patrimonio de la Humanidad desde 1988, junto al Valle de los Ingenios' },
  { icon: '🌿', title: 'Naturaleza única', desc: 'Entre cascadas, montañas y playas de arena blanca, un entorno natural privilegiado' },
  { icon: '🎭', title: 'Cultura viva', desc: 'Música, danza y tradiciones que se mantienen vivas en cada rincón de la ciudad' },
  { icon: '🍹', title: 'Gastronomía criolla', desc: 'Sabores auténticos de la cocina tradicional cubana en espacios coloniales irrepetibles' },
];

export default function Home() {
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setActive(p => (p + 1) % SLIDES.length), 5000);
  };

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const go = (n: number) => {
    setActive(p => (p + n + SLIDES.length) % SLIDES.length);
    resetTimer();
  };

  return (
    <div style={{ backgroundColor: C.background, minHeight: '100vh' }}>

      {/* ─── HERO PANTALLA COMPLETA ─── */}
      <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
        <div style={{
          display: 'flex',
          transition: 'transform 0.8s cubic-bezier(.4,0,.2,1)',
          transform: `translateX(-${active * 100}%)`,
          height: '100%',
        }}>
          {SLIDES.map((slide, i) => (
            <div key={i} style={{ minWidth: '100%', position: 'relative', height: '100%' }}>
              <img
                src={slide.uri}
                alt={slide.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(10,18,32,0.82) 0%, rgba(10,18,32,0.3) 45%, rgba(10,18,32,0.12) 100%)',
              }} />
              <div style={{
                position: 'absolute', bottom: 120, left: 0, right: 0,
                padding: '0 48px',
                maxWidth: 760,
              }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  background: 'rgba(255,255,255,0.12)',
                  backdropFilter: 'blur(4px)',
                  borderRadius: 999,
                  padding: '4px 14px', marginBottom: 16,
                  border: '1px solid rgba(255,255,255,0.18)',
                }}>
                  <MapPin size={12} color="rgba(255,255,255,0.85)" />
                  <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.88)', fontWeight: 600, letterSpacing: 1 }}>
                    {slide.label}
                  </span>
                </div>
                <h1 style={{
                  fontFamily: 'Playfair Display, serif', fontSize: 'clamp(32px, 5vw, 58px)',
                  fontWeight: 700, color: '#fff', marginBottom: 14,
                  lineHeight: 1.15, letterSpacing: -0.5,
                  textShadow: '0 2px 16px rgba(0,0,0,0.4)',
                }}>
                  {slide.title}
                </h1>
                <p style={{
                  fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(14px, 2vw, 18px)',
                  color: 'rgba(255,255,255,0.82)', lineHeight: 1.5,
                  textShadow: '0 1px 6px rgba(0,0,0,0.3)',
                  maxWidth: 560,
                }}>
                  {slide.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Controles de navegación */}
        <button onClick={() => go(-1)} style={{
          position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)',
          backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(6px)',
          border: '1px solid rgba(255,255,255,0.25)',
          borderRadius: '50%', width: 46, height: 46,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', cursor: 'pointer', transition: 'background 0.2s',
        }}>
          <ChevronLeft size={22} />
        </button>
        <button onClick={() => go(1)} style={{
          position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)',
          backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(6px)',
          border: '1px solid rgba(255,255,255,0.25)',
          borderRadius: '50%', width: 46, height: 46,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', cursor: 'pointer', transition: 'background 0.2s',
        }}>
          <ChevronRight size={22} />
        </button>

        {/* Dots */}
        <div style={{ position: 'absolute', bottom: 72, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8 }}>
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => { setActive(i); resetTimer(); }} style={{
              width: i === active ? 24 : 8, height: 8,
              borderRadius: 4,
              backgroundColor: i === active ? '#fff' : 'rgba(255,255,255,0.4)',
              border: 'none', cursor: 'pointer',
              transition: 'all 0.3s', padding: 0,
            }} />
          ))}
        </div>

        {/* Tarjetas de acceso rápido superpuestas al fondo del hero */}
        <div style={{
          position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
          width: '100%', maxWidth: 900,
          padding: '0 20px',
          display: 'flex', gap: 12,
        }}>
          {QUICK_ACCESS.map(item => (
            <Link key={item.label} to={item.path} style={{ textDecoration: 'none', flex: 1 }}>
              <div style={{
                backgroundColor: 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.22)',
                borderBottom: 'none',
                borderRadius: '14px 14px 0 0',
                padding: '16px 14px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              className="hero-quick-card"
              >
                <div style={{ color: '#fff', display: 'flex', justifyContent: 'center', marginBottom: 8, opacity: 0.9 }}>
                  {item.icon}
                </div>
                <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 2 }}>
                  {item.label}
                </div>
                <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>
                  {item.sub}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ─── CONTENIDO PRINCIPAL ─── */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 20px' }}>

        {/* Quick access sólido debajo del hero */}
        <div style={{
          backgroundColor: C.card,
          borderRadius: '0 0 20px 20px',
          border: `1.5px solid ${C.border}`,
          borderTop: 'none',
          boxShadow: '0 8px 32px rgba(27,79,138,0.12)',
          display: 'flex',
          overflow: 'hidden',
          marginBottom: 48,
        }}>
          {QUICK_ACCESS.map((item, idx) => (
            <Link key={item.label} to={item.path} style={{
              textDecoration: 'none', flex: 1,
              borderRight: idx < QUICK_ACCESS.length - 1 ? `1px solid ${C.borderLight}` : 'none',
            }}>
              <div style={{
                padding: '18px 12px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'background 0.18s',
              }}
              className="quick-solid-card"
              >
                <div style={{ color: C.primary, display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
                  {item.icon}
                </div>
                <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 2 }}>
                  {item.label}
                </div>
                <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, color: C.textTertiary }}>
                  {item.sub}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ─── LO QUE NOS DISTINGUE ─── */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: `rgba(27,79,138,0.08)`, borderRadius: 999,
              padding: '4px 14px', marginBottom: 14,
            }}>
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, color: C.primary, fontWeight: 700, letterSpacing: 0.8 }}>
                ¿POR QUÉ TRINIDAD?
              </span>
            </div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 32, color: C.text, marginBottom: 10, fontWeight: 700 }}>
              Lo que nos distingue
            </h2>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 15, color: C.textSecondary, maxWidth: 480, margin: '0 auto', lineHeight: 1.65 }}>
              Trinidad, joya del Caribe declarada Patrimonio de la Humanidad por la UNESCO
            </p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: 16,
          }}>
            {HIGHLIGHTS.map(h => (
              <div key={h.title} className="hover-card" style={{
                backgroundColor: C.card,
                border: `1.5px solid ${C.border}`,
                borderRadius: 18,
                padding: '24px 20px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: 38, marginBottom: 14 }}>{h.icon}</div>
                <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 8 }}>
                  {h.title}
                </div>
                <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: C.textSecondary, lineHeight: 1.6 }}>
                  {h.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── LUGARES TURÍSTICOS ─── */}
        <div style={{ marginBottom: 52 }}>
          <div style={{
            display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
            marginBottom: 24, flexWrap: 'wrap', gap: 12,
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 8 }}>
                <div style={{ width: 28, height: 3, borderRadius: 2, backgroundColor: C.primary }} />
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, color: C.primary, fontWeight: 700, letterSpacing: 0.8 }}>
                  DESTINOS DESTACADOS
                </span>
              </div>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 30, color: C.text, marginBottom: 6, fontWeight: 700 }}>
                Lugares Turísticos
              </h2>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: C.textSecondary }}>
                Los rincones más emblemáticos de la ciudad Patrimonio de la Humanidad
              </p>
            </div>
            <Link to="/lugares" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              textDecoration: 'none', color: C.primary,
              fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 700,
              padding: '8px 16px', borderRadius: 999,
              border: `1.5px solid ${C.primary}`,
              backgroundColor: 'transparent',
              whiteSpace: 'nowrap',
              transition: 'all 0.18s',
            }}>
              Ver todos <ArrowRight size={14} />
            </Link>
          </div>

          {/* Grid principal: 1 tarjeta grande + 2 pequeñas */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {/* Tarjeta grande */}
            <LugarCardGrande lugar={LUGARES[0]} />

            {/* Columna de 2 pequeñas */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <LugarCardSmall lugar={LUGARES[1]} />
              <LugarCardSmall lugar={LUGARES[2]} />
            </div>
          </div>

          {/* Grid de 3 tarjetas medianas */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 16, marginTop: 16,
          }} className="lugares-grid">
            {LUGARES.slice(3, 6).map(lugar => (
              <LugarCardMedium key={lugar.id} lugar={lugar} />
            ))}
          </div>
        </div>

        {/* ─── CTA BANNER ─── */}
        <div style={{ marginBottom: 48 }}>
          <div style={{
            background: `linear-gradient(135deg, ${C.primary} 0%, #163e72 100%)`,
            borderRadius: 24,
            padding: '40px 36px',
            display: 'flex', flexWrap: 'wrap', gap: 24,
            alignItems: 'center', justifyContent: 'space-between',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', right: -40, top: -40,
              width: 200, height: 200, borderRadius: '50%',
              background: 'rgba(255,255,255,0.05)',
            }} />
            <div style={{
              position: 'absolute', right: 60, bottom: -60,
              width: 140, height: 140, borderRadius: '50%',
              background: 'rgba(255,255,255,0.04)',
            }} />
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                background: 'rgba(255,255,255,0.12)', borderRadius: 999,
                padding: '3px 12px', marginBottom: 14,
              }}>
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.88)', fontWeight: 600, letterSpacing: 0.6 }}>
                  ALDABA · TRINIDAD, CUBA
                </span>
              </div>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, color: '#fff', marginBottom: 10, fontWeight: 700 }}>
                ¿Listo para explorar Trinidad?
              </h3>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.78)', lineHeight: 1.6, maxWidth: 440 }}>
                Diseñamos la experiencia perfecta para ti: alojamiento, gastronomía, excursiones y eventos únicos en la ciudad Patrimonio.
              </p>
            </div>
            <Link to="/about" style={{ textDecoration: 'none', flexShrink: 0 }}>
              <button style={{
                backgroundColor: '#fff',
                color: C.primary,
                padding: '13px 26px',
                borderRadius: 12, border: 'none',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 14, fontWeight: 700,
                display: 'flex', alignItems: 'center', gap: 8,
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
              }}>
                <Phone size={15} />
                Contáctanos
              </button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

function LugarCardGrande({ lugar }: { lugar: typeof LUGARES[number] }) {
  return (
    <Link to={`/lugares/${lugar.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
      <div className="hover-card" style={{
        borderRadius: 18, overflow: 'hidden',
        border: `1.5px solid ${C.border}`,
        boxShadow: '0 4px 16px rgba(27,79,138,0.10)',
        height: '100%', minHeight: 340, position: 'relative', cursor: 'pointer',
      }}>
        <img src={lugar.foto} alt={lugar.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(10,18,32,0.82) 0%, rgba(10,18,32,0.15) 55%, transparent 100%)',
        }} />
        <div style={{ position: 'absolute', top: 16, left: 16 }}>
          <span style={{
            backgroundColor: lugar.categoriaColor, color: '#fff',
            borderRadius: 999, padding: '4px 11px',
            fontFamily: 'DM Sans, sans-serif', fontSize: 10, fontWeight: 700,
            letterSpacing: 0.5, textTransform: 'uppercase',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          }}>{lugar.categoria}</span>
        </div>
        <div style={{ position: 'absolute', bottom: 20, left: 20, right: 20 }}>
          <h3 style={{
            fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 700,
            color: '#fff', marginBottom: 6, textShadow: '0 1px 6px rgba(0,0,0,0.4)',
          }}>{lugar.nombre}</h3>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.8)', lineHeight: 1.5, marginBottom: 12 }}>
            {lugar.resumen}
          </p>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)',
            border: '1px solid rgba(255,255,255,0.25)',
            borderRadius: 999, padding: '5px 12px',
          }}>
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, color: '#fff', fontWeight: 600 }}>Descubrir</span>
            <ArrowRight size={12} color="#fff" />
          </div>
        </div>
      </div>
    </Link>
  );
}

function LugarCardSmall({ lugar }: { lugar: typeof LUGARES[number] }) {
  return (
    <Link to={`/lugares/${lugar.slug}`} style={{ textDecoration: 'none', display: 'block', flex: 1 }}>
      <div className="hover-card" style={{
        borderRadius: 16, overflow: 'hidden',
        border: `1.5px solid ${C.border}`,
        boxShadow: '0 2px 10px rgba(27,79,138,0.08)',
        height: '100%', position: 'relative', cursor: 'pointer', minHeight: 160,
      }}>
        <img src={lugar.foto} alt={lugar.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(10,18,32,0.80) 0%, transparent 60%)',
        }} />
        <div style={{ position: 'absolute', top: 12, left: 12 }}>
          <span style={{
            backgroundColor: lugar.categoriaColor, color: '#fff', borderRadius: 999,
            padding: '3px 9px', fontFamily: 'DM Sans, sans-serif', fontSize: 9, fontWeight: 700, letterSpacing: 0.4, textTransform: 'uppercase',
          }}>{lugar.categoria}</span>
        </div>
        <div style={{ position: 'absolute', bottom: 14, left: 14, right: 14 }}>
          <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{lugar.nombre}</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <MapPin size={10} color="rgba(255,255,255,0.7)" />
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.75)' }}>{lugar.distancia}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function LugarCardMedium({ lugar }: { lugar: typeof LUGARES[number] }) {
  return (
    <Link to={`/lugares/${lugar.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
      <div className="hover-card" style={{
        backgroundColor: C.card,
        borderRadius: 16, overflow: 'hidden',
        border: `1.5px solid ${C.border}`,
        boxShadow: '0 2px 10px rgba(27,79,138,0.07)',
        cursor: 'pointer',
      }}>
        <div style={{ position: 'relative', height: 150, overflow: 'hidden' }}>
          <img src={lugar.foto} alt={lugar.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,18,32,0.5) 0%, transparent 55%)' }} />
          <div style={{ position: 'absolute', top: 10, left: 10 }}>
            <span style={{
              backgroundColor: lugar.categoriaColor, color: '#fff', borderRadius: 999,
              padding: '3px 8px', fontFamily: 'DM Sans, sans-serif', fontSize: 9, fontWeight: 700, letterSpacing: 0.4, textTransform: 'uppercase',
            }}>{lugar.categoria}</span>
          </div>
        </div>
        <div style={{ padding: '14px 16px 16px' }}>
          <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 6 }}>
            {lugar.nombre}
          </h3>
          <p style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: C.textSecondary,
            lineHeight: 1.55, marginBottom: 10,
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>
            {lugar.resumen}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: C.primary, fontFamily: 'DM Sans, sans-serif', fontSize: 12, fontWeight: 700 }}>
            <span>Descubrir</span><ArrowRight size={12} />
          </div>
        </div>
      </div>
    </Link>
  );
}
