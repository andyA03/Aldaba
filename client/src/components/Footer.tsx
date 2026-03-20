import C from '../colors';

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: C.primary,
      color: '#fff',
      padding: '40px 24px 24px',
      marginTop: 40,
    }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, marginBottom: 32 }}>
          <div style={{ flex: '1 1 220px' }}>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, fontWeight: 700, letterSpacing: 0.5, marginBottom: 6 }}>
              Aldaba
            </div>
            <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: C.secondaryLight, letterSpacing: 0.6, marginBottom: 12 }}>
              Trinidad · Cuba
            </div>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, maxWidth: 240 }}>
              Experiencias culturales y turísticas auténticas en el corazón del Patrimonio de la Humanidad.
            </p>
          </div>

          <div style={{ flex: '1 1 160px' }}>
            <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: 1, color: C.secondaryLight, textTransform: 'uppercase', marginBottom: 14 }}>
              Servicios
            </div>
            {['Alojamiento', 'Gastronomía', 'Excursiones', 'Eventos', 'Servicios Culturales'].map(item => (
              <div key={item} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>
                {item}
              </div>
            ))}
          </div>

          <div style={{ flex: '1 1 200px' }}>
            <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: 1, color: C.secondaryLight, textTransform: 'uppercase', marginBottom: 14 }}>
              Contacto
            </div>
            <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.8 }}>
              <div>📍 Trinidad, Sancti Spíritus</div>
              <div>🇨🇺 Cuba</div>
              <div style={{ marginTop: 6 }}>📞 +53 41 99-XXXX</div>
              <div>✉️ info@aldaba-trinidad.cu</div>
            </div>
          </div>
        </div>

        <div style={{
          borderTop: 'rgba(255,255,255,0.15) 1px solid',
          paddingTop: 18,
          display: 'flex', flexWrap: 'wrap', gap: 8,
          alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
            © {new Date().getFullYear()} Aldaba. Todos los derechos reservados.
          </div>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span>Desarrollado por</span>
            <span style={{ color: C.secondaryLight, fontWeight: 600 }}>Universidad de las Ciencias Informáticas</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
