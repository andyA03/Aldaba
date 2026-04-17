import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Search } from 'lucide-react';
import C from '@shared/theme/colors';
import Footer from '@shared/ui/Footer';
import LUGARES from '@entities/lugares/model/lugaresData';

const CATEGORIAS = ['Todos', 'Patrimonio', 'UNESCO', 'Naturaleza', 'Cultura', 'Costa'] as const;

export default function Lugares() {
  const [categoria, setCategoria] = useState<string>('Todos');
  const [busqueda, setBusqueda] = useState('');

  const filtrados = LUGARES.filter(l => {
    const matchCat = categoria === 'Todos' || l.categoria === categoria;
    const matchSearch = !busqueda ||
      l.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      l.resumen.toLowerCase().includes(busqueda.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div style={{ paddingTop: 64, backgroundColor: C.background, minHeight: '100vh' }}>
      <div style={{
        background: `linear-gradient(160deg, ${C.primary} 0%, #163e72 100%)`,
        padding: '52px 24px 80px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.06,
          backgroundImage: 'radial-gradient(circle at 20% 80%, #fff 0%, transparent 50%), radial-gradient(circle at 80% 20%, #fff 0%, transparent 50%)',
        }} />
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: 'rgba(255,255,255,0.12)', borderRadius: 999,
          padding: '4px 14px', marginBottom: 18,
        }}>
          <MapPin size={13} color="rgba(255,255,255,0.8)" />
          <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.85)', fontWeight: 600, letterSpacing: 0.6 }}>
            TRINIDAD · SANCTI SPÍRITUS · CUBA
          </span>
        </div>
        <h1 style={{
          fontFamily: 'Playfair Display, serif', fontSize: 38, fontWeight: 700,
          color: '#fff', marginBottom: 12, letterSpacing: -0.5,
        }}>
          Lugares Turísticos
        </h1>
        <p style={{
          fontFamily: 'DM Sans, sans-serif', fontSize: 15,
          color: 'rgba(255,255,255,0.78)', maxWidth: 520, margin: '0 auto 28px',
          lineHeight: 1.65,
        }}>
          Descubre los rincones más emblemáticos de Trinidad, ciudad Patrimonio de la Humanidad
        </p>

        <div style={{
          maxWidth: 480, margin: '0 auto',
          position: 'relative',
        }}>
          <Search size={16} color="#9ca3af" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
          <input
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            placeholder="Buscar lugares..."
            style={{
              width: '100%',
              padding: '12px 16px 12px 44px',
              borderRadius: 999,
              border: 'none',
              outline: 'none',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 14,
              color: C.text,
              background: '#fff',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            }}
          />
        </div>
      </div>

      <div style={{ maxWidth: 980, margin: '0 auto', padding: '0 20px' }}>
        <div style={{
          display: 'flex',
          gap: 8,
          marginTop: -28,
          marginBottom: 32,
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          {CATEGORIAS.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoria(cat)}
              style={{
                padding: '8px 18px',
                borderRadius: 999,
                border: categoria === cat ? 'none' : `1.5px solid ${C.border}`,
                background: categoria === cat ? C.primary : '#fff',
                color: categoria === cat ? '#fff' : C.textSecondary,
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 13, fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.18s',
                boxShadow: categoria === cat ? `0 4px 12px rgba(27,79,138,0.3)` : '0 2px 6px rgba(0,0,0,0.06)',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtrados.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: C.textTertiary }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🗺️</div>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 15 }}>
              No hay lugares que coincidan con tu búsqueda
            </p>
          </div>
        ) : (
          <>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
              gap: 24,
              marginBottom: 12,
            }}>
              {filtrados.map(lugar => (
                <LugarCard key={lugar.id} lugar={lugar} />
              ))}
            </div>
            <p style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: 13,
              color: C.textTertiary, textAlign: 'right',
              marginBottom: 48,
            }}>
              {filtrados.length} de {LUGARES.length} lugares
            </p>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}

function LugarCard({ lugar }: { lugar: typeof LUGARES[number] }) {
  return (
    <Link to={`/lugares/${lugar.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
      <div className="hover-card" style={{
        backgroundColor: C.card,
        borderRadius: 18,
        overflow: 'hidden',
        border: `1.5px solid ${C.border}`,
        boxShadow: '0 2px 12px rgba(27,79,138,0.08)',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}>
        <div style={{ position: 'relative', height: 210, overflow: 'hidden' }}>
          <img
            src={lugar.foto}
            alt={lugar.nombre}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(12,21,36,0.55) 0%, transparent 55%)',
          }} />
          <div style={{
            position: 'absolute', top: 14, left: 14,
            backgroundColor: lugar.categoriaColor,
            color: '#fff', borderRadius: 999,
            padding: '4px 11px',
            fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 700,
            letterSpacing: 0.4, textTransform: 'uppercase',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          }}>
            {lugar.categoria}
          </div>
          <div style={{
            position: 'absolute', bottom: 14, left: 14,
            display: 'flex', alignItems: 'center', gap: 5,
          }}>
            <MapPin size={12} color="rgba(255,255,255,0.8)" />
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>
              {lugar.distancia}
            </span>
          </div>
        </div>

        <div style={{ padding: '18px 20px 22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <h3 style={{
            fontFamily: 'Playfair Display, serif', fontSize: 18, fontWeight: 700,
            color: C.text, marginBottom: 8, lineHeight: 1.3,
          }}>
            {lugar.nombre}
          </h3>
          <p style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: 13,
            color: C.textSecondary, lineHeight: 1.6,
            flex: 1, marginBottom: 16,
          }}>
            {lugar.resumen}
          </p>

          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            color: C.primary, fontFamily: 'DM Sans, sans-serif',
            fontSize: 13, fontWeight: 700,
            paddingTop: 14,
            borderTop: `1px solid ${C.borderLight}`,
          }}>
            <span style={{ flex: 1 }}>Descubrir</span>
            <ArrowRight size={15} />
          </div>
        </div>
      </div>
    </Link>
  );
}
