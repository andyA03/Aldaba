import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, ChevronRight } from 'lucide-react';
import C from '../colors';
import Footer from '../components/Footer';
import LUGARES from '../data/lugaresData';

const CATEGORIA_COLORS: Record<string, string> = {
  "Patrimonio": C.primary,
  "UNESCO": "#15803d",
  "Naturaleza": "#0e7490",
  "Cultura": "#9333ea",
  "Costa": "#0e7490",
};

export default function Lugares() {
  return (
    <div style={{ paddingTop: 64, backgroundColor: C.background, minHeight: '100vh' }}>
      <div style={{
        background: `linear-gradient(135deg, ${C.primary} 0%, #163e72 100%)`,
        padding: '48px 24px 56px',
        textAlign: 'center',
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: 'rgba(255,255,255,0.12)', borderRadius: 999,
          padding: '4px 14px', marginBottom: 16,
        }}>
          <MapPin size={13} color="rgba(255,255,255,0.8)" />
          <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.85)', fontWeight: 600, letterSpacing: 0.6 }}>
            TRINIDAD · CUBA
          </span>
        </div>
        <h1 style={{
          fontFamily: 'Playfair Display, serif', fontSize: 36, fontWeight: 700,
          color: '#fff', marginBottom: 12, letterSpacing: -0.3,
        }}>
          Lugares Turísticos
        </h1>
        <p style={{
          fontFamily: 'DM Sans, sans-serif', fontSize: 15,
          color: 'rgba(255,255,255,0.78)', maxWidth: 520, margin: '0 auto',
          lineHeight: 1.65,
        }}>
          Descubre los rincones más emblemáticos de Trinidad, ciudad Patrimonio de la Humanidad
        </p>
      </div>

      <div style={{ maxWidth: 980, margin: '0 auto', padding: '40px 20px 60px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
          gap: 24,
        }}>
          {LUGARES.map(lugar => (
            <LugarCard key={lugar.id} lugar={lugar} />
          ))}
        </div>
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
        borderRadius: 16,
        overflow: 'hidden',
        border: `1.5px solid ${C.border}`,
        boxShadow: '0 2px 12px rgba(27,79,138,0.08)',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}>
        <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
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
            position: 'absolute', top: 12, left: 12,
            backgroundColor: CATEGORIA_COLORS[lugar.categoria] || C.primary,
            color: '#fff', borderRadius: 999,
            padding: '3px 10px',
            fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 700,
            letterSpacing: 0.4, textTransform: 'uppercase',
          }}>
            {lugar.categoria}
          </div>
        </div>

        <div style={{ padding: '18px 20px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
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
          }}>
            <MapPin size={13} />
            <span style={{ flex: 1, color: C.textTertiary, fontWeight: 500 }}>{lugar.distancia}</span>
            <ArrowRight size={15} />
          </div>
        </div>
      </div>
    </Link>
  );
}
