import { Link } from 'react-router-dom';
import Aurora from './Aurora/Aurora';

export default function Footer() {
  return (
    <footer
      id="footer"
      style={{
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 100,
        paddingBottom: 40,
      }}
    >
      {/* Aurora Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          opacity: 0.4,
        }}
      >
        <Aurora
          colorStops={['#FE4A22', '#7B2FBE', '#25B953']}
          amplitude={1.2}
          blend={0.6}
          speed={0.5}
        />
      </div>

      {/* Dark gradient overlay for readability */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background: 'linear-gradient(180deg, var(--bg) 0%, rgba(5,5,10,0.85) 30%, rgba(5,5,10,0.7) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Top gradient accent line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: 'linear-gradient(90deg, transparent 0%, var(--orange) 30%, transparent 50%, #7B2FBE 70%, transparent 100%)',
          opacity: 0.6,
          zIndex: 2,
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Main Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 60,
          }}
        >
          {/* Brand Column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
              <img src="/logo.jpg" alt="Hunk Wardrobe" style={{ height: 40, width: 40, borderRadius: 8, objectFit: 'cover' }} />
              <div>
                <h3
                  style={{
                    fontFamily: "'Anton', sans-serif",
                    fontSize: 22,
                    color: 'var(--text)',
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                    lineHeight: 1,
                  }}
                >
                  HUNK WARDROBE
                </h3>
                <span
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    fontSize: 10,
                    letterSpacing: 3,
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                  }}
                >
                  ATHLETIC & CASUAL WEAR
                </span>
              </div>
            </div>
            <p
              style={{
                color: 'var(--text-dim)',
                fontSize: 14,
                lineHeight: 1.8,
                maxWidth: 320,
              }}
            >
              Premium athletic and casual wear curated for the culture. Every piece is
              drop-quality, and ordering is as easy as a WhatsApp message.
              Rep your team. Rep your style.
            </p>
          </div>

          {/* Shop Links */}
          <div>
            <h4
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: 4,
                textTransform: 'uppercase',
                color: 'var(--orange)',
                marginBottom: 24,
              }}
            >
              SHOP
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { label: 'All Products', to: '/shop' },
                { label: 'NBA Jerseys', to: '/shop?category=jersey' },
                { label: 'Polos', to: '/shop?category=polo' },
                { label: 'T-Shirts', to: '/shop?category=tshirt' },
              ].map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  style={{
                    color: 'var(--text-dim)',
                    fontSize: 14,
                    transition: 'color 0.3s ease, transform 0.3s ease',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = 'var(--text)';
                    e.target.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = 'var(--text-dim)';
                    e.target.style.transform = 'translateX(0)';
                  }}
                >
                  <span style={{ fontSize: 10, opacity: 0.4 }}>→</span>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: 4,
                textTransform: 'uppercase',
                color: 'var(--orange)',
                marginBottom: 24,
              }}
            >
              CONNECT
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <a
                href="https://instagram.com/hunk_wardrobe"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  color: 'var(--text-dim)',
                  fontSize: 14,
                  transition: 'color 0.3s ease',
                  padding: '10px 16px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 12,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#E1306C';
                  e.currentTarget.style.borderColor = '#E1306C30';
                  e.currentTarget.style.background = '#E1306C08';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-dim)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
                @hunk_wardrobe
              </a>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); import('../utils/whatsapp').then(m => m.openWhatsAppGeneral()); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  color: 'var(--text-dim)',
                  fontSize: 14,
                  transition: 'color 0.3s ease',
                  padding: '10px 16px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 12,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--wa-green)';
                  e.currentTarget.style.borderColor = 'rgba(37,185,83,0.3)';
                  e.currentTarget.style.background = 'rgba(37,185,83,0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-dim)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            marginTop: 60,
            paddingTop: 24,
            borderTop: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <p style={{ color: 'var(--text-muted)', fontSize: 12 }}>
            © {new Date().getFullYear()} Hunk Wardrobe. All rights reserved.
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: 12 }}>
            Not affiliated with the NBA. Fan merchandise only.
          </p>
        </div>
      </div>
    </footer>
  );
}
