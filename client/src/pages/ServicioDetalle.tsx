import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Clock, MapPin, Phone, Sparkles } from 'lucide-react';
import C from '@shared/theme/colors';
import Footer from '@shared/ui/Footer';
import { SERVICE_BY_SLUG } from '@shared/data/serviceCatalog';

export default function ServicioDetalle() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? SERVICE_BY_SLUG[slug] : undefined;

  if (!service) {
    return (
      <div style={{ paddingTop: 96, minHeight: '100vh', backgroundColor: C.background, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 20px' }}>
        <div style={{ textAlign: 'center', maxWidth: 520 }}>
          <div style={{ fontSize: 58, marginBottom: 14 }}>🧭</div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 30, color: C.primary, marginBottom: 10 }}>
            Servicio no encontrado
          </h1>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 15, color: C.textSecondary, lineHeight: 1.7, marginBottom: 18 }}>
            El enlace no coincide con ningún servicio local.
          </p>
          <Link to="/services" style={{ color: C.primary, fontFamily: 'DM Sans, sans-serif', fontWeight: 700, textDecoration: 'none' }}>
            ← Volver a Servicios
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: 64, backgroundColor: C.background, minHeight: '100vh' }}>
      <div style={{ position: 'relative', minHeight: 360, overflow: 'hidden' }}>
        <img src={service.gallery[0]} alt={service.name} style={{ width: '100%', height: 360, objectFit: 'cover', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,18,32,0.86) 0%, rgba(10,18,32,0.35) 58%, rgba(10,18,32,0.12) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: '32px 20px' }}>
          <div style={{ width: '100%', maxWidth: 1120 }}>
            <Link to="/services" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              color: '#fff', textDecoration: 'none', fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 600,
              background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 999, padding: '8px 14px', marginBottom: 18,
            }}>
              <ArrowLeft size={14} /> Volver a servicios
            </Link>
            <div style={{ maxWidth: 760 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 10, background: 'rgba(255,255,255,0.12)', borderRadius: 999, padding: '5px 12px' }}>
                <Sparkles size={12} color="rgba(255,255,255,0.85)" />
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.86)', fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase' }}>
                  {service.group}
                </span>
              </div>
              <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(34px, 5vw, 58px)', color: '#fff', lineHeight: 1.1, marginBottom: 10 }}>
                {service.name}
              </h1>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 16, color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, maxWidth: 640 }}>
                {service.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '28px 20px 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: 24 }} className="service-detail-grid">
          <div>
            <section style={{ backgroundColor: C.card, border: `1.5px solid ${C.border}`, borderRadius: 20, padding: '26px 28px', marginBottom: 22, boxShadow: '0 10px 30px rgba(27,79,138,0.08)' }}>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, color: C.primary, marginBottom: 12 }}>
                Historia y descripción
              </h2>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 15, lineHeight: 1.8, color: C.textSecondary }}>
                {service.historia}
              </p>
            </section>

            <section style={{ backgroundColor: C.card, border: `1.5px solid ${C.border}`, borderRadius: 20, padding: '26px 28px', marginBottom: 22, boxShadow: '0 10px 30px rgba(27,79,138,0.08)' }}>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, color: C.primary, marginBottom: 18 }}>
                Fotos locales
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 14 }}>
                {service.gallery.map((src, index) => (
                  <img
                    key={`${src}-${index}`}
                    src={src}
                    alt={`${service.name} ${index + 1}`}
                    style={{ width: '100%', aspectRatio: '4 / 3', objectFit: 'cover', borderRadius: 16, border: `1px solid ${C.borderLight}` }}
                  />
                ))}
              </div>
            </section>

            <section style={{ backgroundColor: C.card, border: `1.5px solid ${C.border}`, borderRadius: 20, padding: '26px 28px', boxShadow: '0 10px 30px rgba(27,79,138,0.08)' }}>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, color: C.primary, marginBottom: 18 }}>
                Lo que incluye
              </h2>
              <div style={{ display: 'grid', gap: 10 }}>
                {service.highlights.map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: C.accent, marginTop: 6, flexShrink: 0 }} />
                    <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: C.text, lineHeight: 1.6 }}>{item}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ backgroundColor: C.card, border: `1.5px solid ${C.border}`, borderRadius: 20, padding: 18, boxShadow: '0 10px 30px rgba(27,79,138,0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <Clock size={15} color={C.primary} />
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 700, color: C.text }}>Atención</span>
              </div>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: C.textSecondary, lineHeight: 1.7 }}>
                Consulta disponibilidad y horarios antes de reservar.
              </p>
            </div>

            <div style={{ backgroundColor: C.card, border: `1.5px solid ${C.border}`, borderRadius: 20, padding: 18, boxShadow: '0 10px 30px rgba(27,79,138,0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <MapPin size={15} color={C.primary} />
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 700, color: C.text }}>Contacto para reservas</span>
              </div>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: C.textSecondary, lineHeight: 1.7, marginBottom: 14 }}>
                {service.contact}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: C.primary, fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 700 }}>
                <Phone size={15} />
                Reservas directas
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}