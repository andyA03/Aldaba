import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, MapPin, Bed, UtensilsCrossed, Compass, Calendar, Info, ArrowRight } from 'lucide-react';
import C from '../colors';
import Footer from '../components/Footer';
import LUGARES from '../data/lugaresData';

const SLIDES = [
  { uri: 'https://picsum.photos/seed/trinidad-plaza/1200/500', title: 'Plaza Mayor de Trinidad', subtitle: 'Corazón del Patrimonio de la Humanidad' },
  { uri: 'https://picsum.photos/seed/valle-ingenios/1200/500', title: 'Valle de los Ingenios', subtitle: 'Paisajes del azúcar y la historia' },
  { uri: 'https://picsum.photos/seed/hostal-colonial/1200/500', title: 'Alojamiento Colonial', subtitle: 'Vive la autenticidad trinitaria' },
  { uri: 'https://picsum.photos/seed/gastronomia-cuba/1200/500', title: 'Gastronomía Cubana', subtitle: 'Sabores que cuentan nuestra historia' },
  { uri: 'https://picsum.photos/seed/trinidad-noche/1200/500', title: 'Trinidad de Noche', subtitle: 'Cultura y tradición bajo las estrellas' },
];

const QUICK_ACCESS = [
  { path: '/services', icon: <Bed size={28} />, label: 'Alojamiento', sub: 'Hostales y casas coloniales' },
  { path: '/services', icon: <UtensilsCrossed size={28} />, label: 'Gastronomía', sub: 'Cocina cubana auténtica' },
  { path: '/excursions', icon: <Compass size={28} />, label: 'Excursiones', sub: 'Patrimonio y naturaleza' },
  { path: '/events', icon: <Calendar size={28} />, label: 'Eventos', sub: 'Celebraciones y cultura' },
];

const HIGHLIGHTS = [
  { icon: '🏛️', title: 'Patrimonio UNESCO', desc: 'Ciudad declarada Patrimonio de la Humanidad desde 1988' },
  { icon: '🌿', title: 'Valle de los Ingenios', desc: 'Paisaje cultural único de la era azucarera cubana' },
  { icon: '🎭', title: 'Cultura Viva', desc: 'Música, danza y tradiciones que se mantienen vivas cada día' },
  { icon: '🍹', title: 'Gastronomía Criolla', desc: 'Sabores auténticos de la cocina tradicional cubana' },
];

export default function Home() {
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setActive(p => (p + 1) % SLIDES.length), 4500);
  };

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const go = (n: number) => {
    setActive((active + n + SLIDES.length) % SLIDES.length);
    resetTimer();
  };

  return (
    <div style={{ paddingTop: 64, backgroundColor: C.background, minHeight: '100vh' }}>
      <div style={{ position: 'relative', overflow: 'hidden', width: '100%', height: 400 }}>
        <div style={{
          display: 'flex',
          transition: 'transform 0.65s cubic-bezier(.4,0,.2,1)',
          transform: `translateX(-${active * 100}%)`,
          height: '100%',
        }}>
          {SLIDES.map((slide, i) => (
            <div key={i} style={{ minWidth: '100%', position: 'relative', height: '100%' }}>
              <img
                src={slide.uri}
                alt={slide.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(12,21,36,0.72) 0%, rgba(12,21,36,0.22) 60%, transparent 100%)',
                display: 'flex', alignItems: 'flex-end', padding: '0 32px 32px',
              }}>
                <div>
                  <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 30, fontWeight: 700, color: '#fff', marginBottom: 6, textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>
                    {slide.title}
                  </h2>
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 15, color: 'rgba(255,255,255,0.85)', textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>
                    {slide.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button onClick={() => go(-1)} style={{
          position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
          backgroundColor: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(4px)',
          border: '1px solid rgba(255,255,255,0.3)',
          borderRadius: '50%', width: 40, height: 40,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', cursor: 'pointer',
        }}>
          <ChevronLeft size={20} />
        </button>
        <button onClick={() => go(1)} style={{
          position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
          backgroundColor: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(4px)',
          border: '1px solid rgba(255,255,255,0.3)',
          borderRadius: '50%', width: 40, height: 40,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', cursor: 'pointer',
        }}>
          <ChevronRight size={20} />
        </button>

        <div style={{ position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 7 }}>
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => { setActive(i); resetTimer(); }} style={{
              width: i === active ? 20 : 7,
              height: 7,
              borderRadius: 4,
              backgroundColor: i === active ? '#fff' : 'rgba(255,255,255,0.45)',
              border: 'none', cursor: 'pointer',
              transition: 'all 0.3s',
              padding: 0,
            }} />
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 20px' }}>
        <div style={{
          backgroundColor: C.card,
          borderRadius: 20,
          padding: '24px 28px',
          marginTop: 20,
          border: `1.5px solid ${C.border}`,
          boxShadow: '0 6px 24px rgba(27,79,138,0.10)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <MapPin size={16} color={C.secondary} />
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: C.secondary, fontWeight: 600, letterSpacing: 0.5 }}>
              TRINIDAD · SANCTI SPÍRITUS · CUBA
            </span>
          </div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, fontWeight: 700, color: C.primary, marginBottom: 10 }}>
            Explora los Servicios de Aldaba
          </h1>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 15, color: C.textSecondary, lineHeight: 1.65, marginBottom: 20 }}>
            Somos la empresa de gestión turística y cultural de Trinidad, ciudad Patrimonio de la Humanidad. Descubre nuestras propuestas auténticas.
          </p>
          <div className="grid-4">
            {QUICK_ACCESS.map((item) => (
              <Link key={item.label} to={item.path} style={{ textDecoration: 'none' }}>
                <div className="hover-card" style={{
                  backgroundColor: C.background,
                  border: `1.5px solid ${C.borderLight}`,
                  borderRadius: 14,
                  padding: '16px 12px',
                  textAlign: 'center',
                  cursor: 'pointer',
                }}>
                  <div style={{ color: C.primary, display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
                    {item.icon}
                  </div>
                  <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 2 }}>
                    {item.label}
                  </div>
                  <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, color: C.textTertiary }}>
                    {item.sub}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 36 }}>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, color: C.primary, marginBottom: 8 }}>
              Lo que nos distingue
            </h2>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: C.textSecondary }}>
              Trinidad, joya del Caribe declarada Patrimonio de la Humanidad por la UNESCO
            </p>
          </div>
          <div className="grid-2">
            {HIGHLIGHTS.map((h) => (
              <div key={h.title} className="hover-card" style={{
                backgroundColor: C.card,
                border: `1.5px solid ${C.border}`,
                borderRadius: 16,
                padding: '20px 22px',
                display: 'flex', gap: 16, alignItems: 'flex-start',
              }}>
                <div style={{ fontSize: 32, flexShrink: 0 }}>{h.icon}</div>
                <div>
                  <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 6 }}>
                    {h.title}
                  </div>
                  <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: C.textSecondary, lineHeight: 1.55 }}>
                    {h.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 44 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 22, flexWrap: 'wrap', gap: 10 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 6 }}>
                <MapPin size={14} color={C.secondary} />
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: C.secondary, fontWeight: 600, letterSpacing: 0.5 }}>
                  TRINIDAD · CUBA
                </span>
              </div>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, color: C.primary, marginBottom: 5 }}>
                Lugares Turísticos Destacados
              </h2>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: C.textSecondary }}>
                Los rincones más emblemáticos de la ciudad Patrimonio de la Humanidad
              </p>
            </div>
            <Link to="/lugares" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              textDecoration: 'none', color: C.primary,
              fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 700,
              padding: '7px 14px', borderRadius: 999,
              border: `1.5px solid ${C.border}`,
              backgroundColor: C.card,
              whiteSpace: 'nowrap',
            }}>
              Ver todos <ArrowRight size={14} />
            </Link>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 18,
          }} className="lugares-grid">
            {LUGARES.slice(0, 6).map(lugar => (
              <Link key={lugar.id} to={`/lugares/${lugar.slug}`} style={{ textDecoration: 'none' }}>
                <div className="hover-card" style={{
                  backgroundColor: C.card,
                  borderRadius: 16,
                  overflow: 'hidden',
                  border: `1.5px solid ${C.border}`,
                  boxShadow: '0 2px 10px rgba(27,79,138,0.07)',
                  cursor: 'pointer',
                }}>
                  <div style={{ position: 'relative', height: 170, overflow: 'hidden' }}>
                    <img
                      src={lugar.foto}
                      alt={lugar.nombre}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(to top, rgba(12,21,36,0.55) 0%, transparent 55%)',
                    }} />
                    <div style={{
                      position: 'absolute', top: 10, left: 10,
                      backgroundColor: lugar.categoriaColor,
                      color: '#fff', borderRadius: 999,
                      padding: '2px 9px',
                      fontFamily: 'DM Sans, sans-serif', fontSize: 10, fontWeight: 700,
                      letterSpacing: 0.4, textTransform: 'uppercase',
                    }}>
                      {lugar.categoria}
                    </div>
                  </div>
                  <div style={{ padding: '14px 16px 16px' }}>
                    <h3 style={{
                      fontFamily: 'Playfair Display, serif', fontSize: 15, fontWeight: 700,
                      color: C.text, marginBottom: 6, lineHeight: 1.3,
                    }}>
                      {lugar.nombre}
                    </h3>
                    <p style={{
                      fontFamily: 'DM Sans, sans-serif', fontSize: 12,
                      color: C.textSecondary, lineHeight: 1.55, marginBottom: 10,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}>
                      {lugar.resumen}
                    </p>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 5,
                      fontFamily: 'DM Sans, sans-serif', fontSize: 12,
                      color: C.primary, fontWeight: 700,
                    }}>
                      <span>Descubrir</span>
                      <ArrowRight size={12} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 36, marginBottom: 40 }}>
          <div style={{
            background: `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryLight} 100%)`,
            borderRadius: 20,
            padding: '32px 28px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 20,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, color: '#fff', marginBottom: 8 }}>
                ¿Listo para explorar Trinidad?
              </h3>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.8)', lineHeight: 1.55 }}>
                Contáctanos y diseñamos la experiencia perfecta para ti.
              </p>
            </div>
            <Link to="/about" style={{ textDecoration: 'none' }}>
              <button className="btn-primary" style={{
                backgroundColor: '#fff',
                color: C.primary,
                padding: '12px 24px',
                borderRadius: 12,
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 14, fontWeight: 700,
                display: 'flex', alignItems: 'center', gap: 8,
                whiteSpace: 'nowrap',
              }}>
                <Info size={16} />
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
