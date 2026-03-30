import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { openWhatsAppGeneral } from '../utils/whatsapp';
import MobileMenu from './MobileMenu';
import SearchOverlay from './SearchOverlay';

const navLinks = [
  { label: 'Collection', to: '/shop' },
  { label: 'Jerseys', to: '/shop?category=jersey' },
  { label: 'Polos', to: '/shop?category=polo' },
  { label: 'T-Shirts', to: '/shop?category=tshirt' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [location]);

  // Ctrl+K / Cmd+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    // Disable body scroll handled internally by StaggeredMenu if needed,
    // or we can leave as is since we're replacing the overlay.
  }, []);

  return (
    <>
      <nav
        id="navbar"
        style={{
          position: 'fixed',
          top: scrolled ? 16 : 24,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'calc(100% - 32px)',
          maxWidth: 1200,
          height: 64,
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          background: scrolled ? 'rgba(5,5,10,0.85)' : 'rgba(10,10,18,0.4)',
          backdropFilter: 'blur(28px) saturate(180%)',
          WebkitBackdropFilter: 'blur(28px) saturate(180%)',
          border: `1px solid ${scrolled ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.04)'}`,
          borderRadius: 100,
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: scrolled ? '0 10px 40px rgba(0,0,0,0.5)' : 'none'
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', zIndex: 51, display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src="/logo.jpg" alt="Hunk Wardrobe" style={{ height: 28, width: 28, borderRadius: 4, objectFit: 'cover' }} />
          <span style={{ fontFamily: "'Anton', sans-serif", fontSize: 18, color: 'var(--text)', textTransform: 'uppercase', letterSpacing: 1.5, position: 'relative', top: 1 }}>
            Hunk Wardrobe
          </span>
        </Link>

        {/* Desktop links */}
        <div
          style={{
            display: 'flex',
            gap: 36,
            alignItems: 'center',
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="nav-link"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: 12,
                letterSpacing: 3,
                textTransform: 'uppercase',
                color: 'var(--text-dim)',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) => (e.target.style.color = 'var(--text)')}
              onMouseLeave={(e) => (e.target.style.color = 'var(--text-dim)')}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, zIndex: 51 }}>
          {/* Search button */}
          <button
            onClick={() => setSearchOpen(true)}
            aria-label="Search products"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: 8,
              background: 'none',
              border: 'none',
              color: 'var(--text-dim)',
              cursor: 'pointer',
              transition: 'color 0.3s ease',
              borderRadius: 8,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-dim)')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span
              className="desktop-nav"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 600,
                fontSize: 10,
                letterSpacing: 1,
                color: 'var(--text-muted)',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                padding: '2px 8px',
                borderRadius: 4,
              }}
            >
              ⌘K
            </span>
          </button>

          {/* Hamburger (mobile) */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="mobile-nav"
            aria-label="Toggle menu"
            style={{
              flexDirection: 'column',
              gap: 5,
              padding: '8px 4px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              zIndex: 51,
            }}
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              style={{ width: 22, height: 1.5, background: 'var(--text)', display: 'block', transformOrigin: 'center' }}
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              style={{ width: 22, height: 1.5, background: 'var(--text)', display: 'block' }}
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              style={{ width: 22, height: 1.5, background: 'var(--text)', display: 'block', transformOrigin: 'center' }}
            />
          </button>
          {/* Instagram */}
          <a
            href="https://instagram.com/hunk_wardrobe"
            target="_blank"
            rel="noopener noreferrer"
            className="desktop-nav"
            style={{
              color: 'var(--text-dim)',
              transition: 'color 0.3s ease',
              display: 'flex',
              alignItems: 'center',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-dim)')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
          </a>

          {/* WhatsApp CTA */}
          <button
            onClick={openWhatsAppGeneral}
            className="desktop-nav"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 18px',
              background: 'var(--wa-green)',
              color: '#fff',
              borderRadius: 6,
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              transition: 'all 0.3s ease',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chat
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <style>{`
        .mobile-nav { display: none !important; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-nav { display: flex !important; }
        }
      `}</style>
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
