import { useState, type ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Bed, UtensilsCrossed, Star, ChevronRight, Sparkles } from 'lucide-react';
import C from '@shared/theme/colors';
import Footer from '@shared/ui/Footer';
import { SERVICE_GROUPS, type ServiceGroupKey } from '@shared/data/serviceCatalog';

const SECTIONS: Array<{ key: ServiceGroupKey; label: string; icon: ReactElement }> = [
  { key: 'alojamiento', label: 'Alojamiento', icon: <Bed size={16} /> },
  { key: 'gastronomia', label: 'Gastronomía', icon: <UtensilsCrossed size={16} /> },
  { key: 'otros', label: 'Otros', icon: <Sparkles size={16} /> },
];

export default function Services() {
  const [activeSection, setActiveSection] = useState<ServiceGroupKey>('alojamiento');
  const currentGroup = SERVICE_GROUPS[activeSection];

  return (
    <div style={{ paddingTop: 64, backgroundColor: C.background, minHeight: '100vh' }}>
      <div style={{
        position: 'relative', height: 260,
        backgroundImage: 'url(/images/aldaba-hero.svg)',
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

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 20px 28px' }}>
        <div style={{
          display: 'flex', gap: 8, marginTop: 28, marginBottom: 28,
          backgroundColor: C.card, borderRadius: 14,
          padding: 6, border: `1.5px solid ${C.border}`,
          width: 'fit-content', flexWrap: 'wrap',
        }}>
          <div style={{ width: '100%', textAlign: 'center', fontFamily: 'DM Sans, sans-serif', fontSize: 12, fontWeight: 700, color: C.textSecondary, letterSpacing: 0.6, marginBottom: 4 }}>
            Filtros de servicios
          </div>
          {SECTIONS.map(section => (
            <button key={section.key} onClick={() => setActiveSection(section.key)} title={`Filtro: ${section.label}`} aria-label={`Filtrar servicios por ${section.label}`} style={{
              padding: '10px 18px',
              borderRadius: 10,
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 14, fontWeight: 600,
              display: 'flex', alignItems: 'center', gap: 8,
              transition: 'all 0.2s',
              cursor: 'pointer',
              backgroundColor: activeSection === section.key ? C.primary : 'transparent',
              color: activeSection === section.key ? '#fff' : C.textSecondary,
            }}>
              {section.icon}
              {section.label}
            </button>
          ))}
        </div>

        <section id={activeSection} style={{ marginBottom: 38 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <div style={{ width: 4, height: 28, backgroundColor: activeSection === 'alojamiento' ? C.primary : activeSection === 'gastronomia' ? C.secondary : C.accent, borderRadius: 2 }} />
            <div>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, color: C.primary, marginBottom: 4 }}>{currentGroup.title}</h2>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: C.textSecondary }}>{currentGroup.subtitle}</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
            {currentGroup.items.map(item => (
              <div key={item.slug} className="hover-card" style={{
                backgroundColor: C.card,
                borderRadius: 18,
                overflow: 'hidden',
                border: `1.5px solid ${C.border}`,
                boxShadow: '0 4px 16px rgba(27,79,138,0.08)',
              }}>
                <img
                  src={item.gallery[0]}
                  alt={item.name}
                  style={{ width: '100%', height: 182, objectFit: 'cover' }}
                />
                <div style={{ padding: '18px 20px' }}>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 17, color: C.primary, marginBottom: 8, lineHeight: 1.3 }}>
                    {item.name}
                  </h3>
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: C.textSecondary, lineHeight: 1.6, marginBottom: 14 }}>
                    {item.description}
                  </p>
                  <div style={{ marginBottom: 16 }}>
                    {item.highlights.slice(0, 3).map(feature => (
                      <div key={feature} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
                        <Star size={11} color={C.accent} fill={C.accent} />
                        <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: C.text }}>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Link to={`/services/${item.slug}`} style={{ textDecoration: 'none' }}>
                    <div style={{
                      width: '100%', backgroundColor: C.primary, color: '#fff',
                      padding: '11px 0', borderRadius: 10,
                      fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 600,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                    }}>
                      Más información <ChevronRight size={14} />
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
