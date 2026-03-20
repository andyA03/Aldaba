import { MapPin, Phone, Mail, Shield, Leaf, Users, Star, GraduationCap } from 'lucide-react';
import { companyInfo, communityProjects } from '@constants/data';
import C from '../colors';
import Footer from '../components/Footer';

const VALUE_ICONS: Record<string, JSX.Element> = {
  'Preservación del patrimonio': <Shield size={22} color={C.primary} />,
  'Desarrollo comunitario': <Users size={22} color={C.primary} />,
  'Excelencia en el servicio': <Star size={22} color={C.primary} />,
  'Autenticidad cultural': <GraduationCap size={22} color={C.primary} />,
  'Sostenibilidad': <Leaf size={22} color={C.primary} />,
};

const TIMELINE_COLORS = [C.primary, C.secondary, C.accent, C.primaryLight, C.secondary];

export default function About() {
  return (
    <div style={{ paddingTop: 64, backgroundColor: C.background, minHeight: '100vh' }}>
      <div style={{
        background: `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryLight} 60%, ${C.secondary} 100%)`,
        padding: '56px 24px 48px',
        textAlign: 'center',
      }}>
        <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: C.secondaryLight, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 14, fontWeight: 600 }}>
          Conoce Aldaba
        </div>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 36, fontWeight: 700, color: '#fff', marginBottom: 14 }}>
          {companyInfo.name}
        </h1>
        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 15, color: 'rgba(255,255,255,0.85)', maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
          {companyInfo.tagline}
        </p>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 20px' }}>
        <div style={{
          backgroundColor: C.card, borderRadius: 20,
          border: `1.5px solid ${C.border}`,
          padding: '28px 32px', marginBottom: 24,
          boxShadow: '0 4px 20px rgba(27,79,138,0.08)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ width: 4, height: 26, backgroundColor: C.primary, borderRadius: 2 }} />
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, color: C.primary }}>¿Quiénes somos?</h2>
          </div>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 15, color: C.textSecondary, lineHeight: 1.75 }}>
            {companyInfo.description}
          </p>
        </div>

        <div style={{
          backgroundColor: C.card, borderRadius: 20,
          border: `1.5px solid ${C.border}`,
          padding: '28px 32px', marginBottom: 24,
          boxShadow: '0 4px 20px rgba(27,79,138,0.08)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ width: 4, height: 26, backgroundColor: C.secondary, borderRadius: 2 }} />
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, color: C.primary }}>Misión</h2>
          </div>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 15, color: C.textSecondary, lineHeight: 1.75 }}>
            {companyInfo.mission}
          </p>
        </div>

        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <div style={{ width: 4, height: 26, backgroundColor: C.accent, borderRadius: 2 }} />
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, color: C.primary }}>Nuestros valores</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 14 }}>
            {companyInfo.values.map((value, i) => (
              <div key={value} className="hover-card" style={{
                backgroundColor: C.card,
                border: `1.5px solid ${C.border}`,
                borderRadius: 14, padding: '18px 16px',
                textAlign: 'center',
              }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
                  {VALUE_ICONS[value] || <Star size={22} color={C.primary} />}
                </div>
                <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 600, color: C.text, lineHeight: 1.4 }}>
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <div style={{ width: 4, height: 26, backgroundColor: C.primaryLight, borderRadius: 2 }} />
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, color: C.primary }}>Proyectos comunitarios</h2>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: 20, top: 0, bottom: 0, width: 2, backgroundColor: C.borderLight }} />
            {communityProjects.map((project, i) => (
              <div key={project.id} style={{ display: 'flex', gap: 20, marginBottom: 20, paddingLeft: 48, position: 'relative' }}>
                <div style={{
                  position: 'absolute', left: 11, top: 4,
                  width: 18, height: 18, borderRadius: '50%',
                  backgroundColor: TIMELINE_COLORS[i % TIMELINE_COLORS.length],
                  border: '3px solid #fff',
                  boxShadow: '0 0 0 2px rgba(27,79,138,0.15)',
                }} />
                <div style={{
                  backgroundColor: C.card, borderRadius: 14,
                  border: `1.5px solid ${C.border}`,
                  padding: '14px 18px', flex: 1,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 700, color: C.text }}>
                      {project.title}
                    </span>
                    <span style={{
                      fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600,
                      color: TIMELINE_COLORS[i % TIMELINE_COLORS.length],
                      backgroundColor: `${TIMELINE_COLORS[i % TIMELINE_COLORS.length]}18`,
                      padding: '2px 8px', borderRadius: 6,
                    }}>
                      {project.year}
                    </span>
                  </div>
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: C.textSecondary, lineHeight: 1.55 }}>
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 48 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <div style={{ width: 4, height: 26, backgroundColor: C.secondary, borderRadius: 2 }} />
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, color: C.primary }}>Contacto</h2>
          </div>
          <div style={{
            backgroundColor: C.card, borderRadius: 20,
            border: `1.5px solid ${C.border}`,
            padding: '28px 32px',
            display: 'flex', flexWrap: 'wrap', gap: 24,
            boxShadow: '0 4px 20px rgba(27,79,138,0.08)',
          }}>
            {[
              { icon: <MapPin size={20} color={C.primary} />, label: 'Dirección', value: companyInfo.contact.address },
              { icon: <Phone size={20} color={C.primary} />, label: 'Teléfono', value: companyInfo.contact.phone },
              { icon: <Mail size={20} color={C.primary} />, label: 'Correo', value: companyInfo.contact.email },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', flex: '1 1 200px' }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 12,
                  backgroundColor: C.background,
                  border: `1.5px solid ${C.borderLight}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 700, color: C.textTertiary, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>
                    {item.label}
                  </div>
                  <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: C.text }}>
                    {item.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
