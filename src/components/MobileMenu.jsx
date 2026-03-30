import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { openWhatsAppGeneral } from '../utils/whatsapp';

const menuLinks = [
  { label: 'Shop All', to: '/shop' },
  { label: 'Jerseys', to: '/shop?category=jersey' },
  { label: 'Polos', to: '/shop?category=polo' },
  { label: 'T-Shirts', to: '/shop?category=tshirt' },
];

const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com/hunk_wardrobe' },
];

export default function MobileMenu({ isOpen, onClose }) {
  const location = useLocation();

  // Close menu when route changes
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Disable background interactions
      const navbar = document.getElementById('navbar');
      if (navbar) {
         // Keep navbar above everything but allow its close button to work
         navbar.style.zIndex = '200';
      }
    } else {
      document.body.style.overflow = '';
      const navbar = document.getElementById('navbar');
      if (navbar) {
         navbar.style.zIndex = '50';
      }
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // Animation variants
  const menuVariants = {
    closed: {
      opacity: 0,
      y: '-10%',
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1], // Custom bouncy ease
      },
    },
    open: {
      opacity: 1,
      y: '0%',
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const containerVariants = {
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
    open: {
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, y: 30, rotateX: -20 },
    open: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="mobile-menu-overlay"
          initial="closed"
          animate="open"
          exit="closed"
          variants={menuVariants}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100, // Below navbar (200), above standard content
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            background: 'var(--bg)', // Deep dark from globals.css
            padding: '100px 24px 40px',
            overflowY: 'auto',
          }}
        >
          {/* Ambient Lighting FX */}
          <div
            style={{
              position: 'absolute',
              top: '10%',
              right: '-20%',
              width: '60vw',
              height: '60vw',
              background: 'radial-gradient(circle, rgba(255,69,0,0.12) 0%, transparent 60%)',
              pointerEvents: 'none',
              filter: 'blur(40px)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '10%',
              left: '-20%',
              width: '50vw',
              height: '50vw',
              background: 'radial-gradient(circle, rgba(40,40,60,0.3) 0%, transparent 60%)',
              pointerEvents: 'none',
              filter: 'blur(30px)',
            }}
          />

          <motion.div
            variants={containerVariants}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center', // Center aligned layout since it's cleaner on mobile
              flex: 1,
              width: '100%',
              maxWidth: 500,
              margin: '0 auto',
              zIndex: 1, // Above ambient FX
            }}
          >
            {/* Primary Navigation Links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, textAlign: 'center', width: '100%', marginBottom: 'auto' }}>
              {menuLinks.map((link, i) => (
                <motion.div key={link.label} variants={itemVariants} style={{ perspective: 1000 }}>
                  <Link
                    to={link.to}
                    onClick={onClose}
                    style={{
                      display: 'inline-block',
                      fontFamily: "'Anton', sans-serif",
                      fontSize: 'clamp(48px, 12vw, 72px)',
                      color: 'var(--text)',
                      textTransform: 'uppercase',
                      textDecoration: 'none',
                      lineHeight: 1,
                      letterSpacing: 2,
                      WebkitTextStroke: '1px transparent', // Optional smooth text setup
                      transition: 'color 0.3s ease, transform 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--orange)';
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--text)';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Footer / CTA Section */}
            <motion.div variants={itemVariants} style={{ width: '100%', marginTop: 40 }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 20,
                  paddingTop: 40,
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                {/* Social Links */}
                <div style={{ display: 'flex', gap: 24 }}>
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 700,
                        fontSize: 14,
                        letterSpacing: 2,
                        textTransform: 'uppercase',
                        color: 'var(--text-dim)',
                        textDecoration: 'none',
                        transition: 'color 0.3s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-dim)')}
                    >
                      {social.label}
                    </a>
                  ))}
                </div>

                {/* WhatsApp Button */}
                <button
                  onClick={() => {
                    openWhatsAppGeneral();
                    onClose();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '16px 32px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 100,
                    color: '#fff',
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 600,
                    fontSize: 16,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    marginTop: 10,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--wa-green)';
                    e.currentTarget.style.borderColor = 'var(--wa-green)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chat with Us
                </button>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
