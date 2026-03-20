import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import C from '../colors';

const NAV_ITEMS = [
  { path: '/', label: 'Inicio' },
  { path: '/services', label: 'Servicios' },
  { path: '/excursions', label: 'Excursiones' },
  { path: '/events', label: 'Eventos' },
  { path: '/about', label: 'Nosotros' },
];

export default function NavBar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: 64,
        backgroundColor: '#fff',
        borderBottom: `1px solid ${C.borderLight}`,
        zIndex: 100,
        boxShadow: '0 2px 12px rgba(27,79,138,0.08)',
      }}>
        <div style={{
          maxWidth: 1100, margin: '0 auto', height: '100%',
          display: 'flex', alignItems: 'center', padding: '0 24px',
        }}>
          <Link to="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 700, color: C.primary, letterSpacing: 0.5 }}>
              Aldaba
            </div>
            <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 10, color: C.secondary, letterSpacing: 0.8, marginTop: 1 }}>
              Trinidad · Cuba
            </div>
          </Link>

          <div style={{ flex: 1 }} />

          <div className="desktop-nav" style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            {NAV_ITEMS.map(item => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="nav-link"
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: 14,
                    fontWeight: active ? 600 : 500,
                    color: active ? C.primary : C.textSecondary,
                    padding: '6px 14px',
                    borderRadius: 8,
                    borderBottom: active ? `2.5px solid ${C.primary}` : '2.5px solid transparent',
                    transition: 'all 0.18s',
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <button
            className="mobile-nav"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ padding: 8, color: C.primary }}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div style={{
          position: 'fixed', top: 64, left: 0, right: 0,
          backgroundColor: '#fff', zIndex: 99,
          boxShadow: '0 4px 20px rgba(27,79,138,0.12)',
          borderBottom: `1px solid ${C.borderLight}`,
        }}>
          {NAV_ITEMS.map(item => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'block',
                  padding: '14px 24px',
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: 15,
                  fontWeight: active ? 600 : 500,
                  color: active ? C.primary : C.text,
                  borderLeft: active ? `3px solid ${C.primary}` : '3px solid transparent',
                  backgroundColor: active ? 'rgba(27,79,138,0.05)' : 'transparent',
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
