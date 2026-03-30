import { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import JerseySVG from '../components/JerseySVG';
import ProductCard from '../components/ProductCard';
import SizeGuideModal from '../components/SizeGuideModal';
import StickyOrderBar from '../components/StickyOrderBar';
import { products as jerseys, getPlayerEditions, getRelatedProducts as getRelatedJerseys } from '../data/products';
import { buildOrderMessage, buildQuestionMessage, openWhatsApp } from '../utils/whatsapp';

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();

  const jersey = jerseys.find(j => j.id === id);

  const [selectedSize, setSelectedSize] = useState('L');
  const [selectedEdition, setSelectedEdition] = useState(null);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [imageHovered, setImageHovered] = useState(false);

  const playerEditions = useMemo(() => {
    if (!jersey) return [];
    return getPlayerEditions(jersey.player);
  }, [jersey]);

  const relatedJerseys = useMemo(() => {
    if (!jersey) return [];
    return getRelatedJerseys(jersey, 4);
  }, [jersey]);

  const activeJersey = useMemo(() => {
    if (selectedEdition) {
      const ed = playerEditions.find(j => j.edition === selectedEdition);
      return ed || jersey;
    }
    return jersey;
  }, [selectedEdition, playerEditions, jersey]);

  useEffect(() => {
    if (jersey) {
      setSelectedEdition(jersey.edition);
    }
  }, [jersey]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!jersey) {
    return (
      <div className="page-wrapper" style={{ paddingTop: 68, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontFamily: "'Anton', sans-serif", fontSize: 48, color: 'var(--text-muted)', marginBottom: 16 }}>
            PRODUCT NOT FOUND
          </h1>
          <Link to="/shop" className="btn-primary">Back to Shop</Link>
        </div>
      </div>
    );
  }

  const handleOrder = () => {
    const msg = buildOrderMessage({
      player: activeJersey.player || activeJersey.lastName,
      edition: activeJersey.edition || activeJersey.category,
      size: selectedSize,
      price: activeJersey.price,
    });
    openWhatsApp(msg);
  };

  const handleQuestion = () => {
    const msg = buildQuestionMessage({
      player: activeJersey.player || activeJersey.lastName,
    });
    openWhatsApp(msg);
  };

  const handleEditionChange = (edition) => {
    setSelectedEdition(edition);
    const edJersey = playerEditions.find(j => j.edition === edition);
    if (edJersey && edJersey.id !== id) {
      navigate(`/product/${edJersey.id}`, { replace: true });
    }
  };

  return (
    <div className="page-wrapper" style={{ paddingTop: 68 }}>
      {/* ━━━ HERO SPLIT ━━━ */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          minHeight: 'calc(100vh - 68px)',
        }}
        className="product-hero"
      >
        {/* LEFT — Visual */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            padding: 40,
          }}
          onMouseEnter={() => setImageHovered(true)}
          onMouseLeave={() => setImageHovered(false)}
        >
          {/* Team color glow */}
          <div
            id="product-aurora-bg"
            style={{
              position: 'absolute',
              inset: 0,
              background: `
                radial-gradient(ellipse at 50% 50%, ${activeJersey.teamColor || activeJersey.primaryColor}30 0%, transparent 60%),
                radial-gradient(ellipse at 30% 70%, ${activeJersey.secondaryColor || activeJersey.accentColor}15 0%, transparent 50%),
                var(--bg)
              `,
            }}
          />

          {/* Giant ghost text */}
          <span
            style={{
              position: 'absolute',
              fontFamily: "'Anton', sans-serif",
              fontSize: 'min(50vw, 500px)',
              color: 'var(--text)',
              opacity: 0.03,
              lineHeight: 0.8,
              pointerEvents: 'none',
              textTransform: 'uppercase',
              letterSpacing: -10,
            }}
          >
            {activeJersey.lastName?.substring(0, 3)}
          </span>

          {/* Jersey visual */}
          <motion.div
            key={activeJersey.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'relative', zIndex: 2 }}
          >
            {activeJersey.image ? (
              <motion.img
                src={activeJersey.image}
                alt={`${activeJersey.player || activeJersey.lastName} ${activeJersey.edition || ''} ${activeJersey.category}`}
                animate={{ scale: imageHovered ? 1.05 : 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  height: 'min(55vh, 420px)',
                  width: 'auto',
                  objectFit: 'contain',
                  mixBlendMode: 'screen',
                }}
              />
            ) : (
              <motion.div
                animate={{ scale: imageHovered ? 1.05 : 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <JerseySVG
                  primaryColor={activeJersey.primaryColor}
                  accentColor={activeJersey.accentColor}
                  number={activeJersey.number}
                  lastName={activeJersey.lastName}
                  edition={activeJersey.edition}
                  size="xl"
                  hovered={imageHovered}
                />
              </motion.div>
            )}
          </motion.div>

          {/* Edition thumbnails */}
          {playerEditions.length > 1 && (
            <div
              style={{
                position: 'absolute',
                bottom: 40,
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: 12,
                zIndex: 3,
              }}
            >
              {playerEditions.map((ed) => (
                <button
                  key={ed.id}
                  onClick={() => handleEditionChange(ed.edition)}
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 12,
                    border: `2px solid ${ed.edition === activeJersey.edition ? 'var(--orange)' : 'var(--border)'}`,
                    background: 'var(--bg-surface)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'border-color 0.3s ease',
                    overflow: 'hidden',
                    padding: 4,
                  }}
                >
                  {ed.image ? (
                    <img src={ed.image} alt={ed.edition} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  ) : (
                    <JerseySVG
                      primaryColor={ed.primaryColor}
                      accentColor={ed.accentColor}
                      number={ed.number}
                      lastName=""
                      edition=""
                      size="sm"
                    />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT — Info */}
        <div
          style={{
            padding: 'clamp(40px, 5vw, 80px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            maxWidth: 600,
          }}
        >
          {/* Breadcrumb */}
          <nav style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 28, flexWrap: 'wrap' }}>
            {[
              { label: 'Home', to: '/' },
              { label: 'Shop', to: '/shop' },
            ].map((crumb, i) => (
              <span key={crumb.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Link
                  to={crumb.to}
                  style={{ color: 'var(--text-muted)', fontSize: 12, transition: 'color 0.3s' }}
                  onMouseEnter={(e) => (e.target.style.color = 'var(--text-dim)')}
                  onMouseLeave={(e) => (e.target.style.color = 'var(--text-muted)')}
                >
                  {crumb.label}
                </Link>
                <span style={{ color: 'var(--text-muted)', fontSize: 10 }}>/</span>
              </span>
            ))}
            <span style={{ color: 'var(--text-dim)', fontSize: 12 }}>{activeJersey.player}</span>
          </nav>

          {/* Eyebrow edition */}
          <motion.p
            key={activeJersey.edition || activeJersey.category}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="eyebrow"
            style={{ marginBottom: 12 }}
          >
            {(activeJersey.edition || activeJersey.category).toUpperCase()}
          </motion.p>

          {/* Player name */}
          <h1
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 'clamp(40px, 5vw, 64px)',
              lineHeight: 0.9,
              color: 'var(--text)',
              textTransform: 'uppercase',
              marginBottom: 16,
            }}
          >
            {activeJersey.player || activeJersey.lastName}
          </h1>

          {/* Number badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
            {activeJersey.category === 'jersey' && activeJersey.number && (
              <span
                style={{
                  fontFamily: "'Anton', sans-serif",
                  fontSize: 14,
                  color: activeJersey.primaryColor,
                  background: `${activeJersey.primaryColor}15`,
                  padding: '3px 10px',
                  borderRadius: 6,
                }}
              >
                #{activeJersey.number}
              </span>
            )}
          </div>

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <span style={{ color: '#FFC107', fontSize: 14, letterSpacing: 2 }}>⭐⭐⭐⭐⭐</span>
            <span style={{ color: 'var(--text-dim)', fontSize: 13 }}>4.9 · 500+ orders</span>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: 'var(--border)', marginBottom: 24 }} />

          {/* Price */}
          <div style={{ marginBottom: 24 }}>
            <span
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: 48,
                color: 'var(--text)',
              }}
            >
              ₹{activeJersey.price.toLocaleString('en-IN')}
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 12 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-dim)', fontSize: 13 }}>
                <span style={{ color: 'var(--wa-green)' }}>✓</span> Free delivery above ₹2,000
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-dim)', fontSize: 13 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--wa-green)', display: 'inline-block' }} />
                In stock — ships in 24-48h
              </span>
            </div>
          </div>

          {/* Size selector */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <span
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: 11,
                  letterSpacing: 3,
                  textTransform: 'uppercase',
                  color: 'var(--text-dim)',
                }}
              >
                SIZE
              </span>
              <button
                onClick={() => setSizeGuideOpen(true)}
                style={{
                  color: 'var(--text-dim)',
                  fontSize: 12,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  textUnderlineOffset: 3,
                }}
              >
                Size Guide →
              </button>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`size-chip ${selectedSize === size ? 'active' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Edition selector */}
          {playerEditions.length > 1 && (
            <div style={{ marginBottom: 28 }}>
              <span
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: 11,
                  letterSpacing: 3,
                  textTransform: 'uppercase',
                  color: 'var(--text-dim)',
                  display: 'block',
                  marginBottom: 12,
                }}
              >
                EDITION
              </span>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {playerEditions.map((ed) => (
                  <button
                    key={ed.id}
                    className={`edition-chip ${activeJersey.edition === ed.edition ? 'active' : ''}`}
                    onClick={() => handleEditionChange(ed.edition)}
                  >
                    {ed.edition}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* WhatsApp Order block */}
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 24, marginBottom: 12 }}>
            <p style={{ color: 'var(--text-dim)', fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
              We don't do carts. Just WhatsApp us — it's faster.
            </p>
            <button onClick={handleOrder} className="btn-whatsapp" style={{ width: '100%', justifyContent: 'center', marginBottom: 12 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Order This {activeJersey.category === 'jersey' ? 'Jersey' : 'Product'}
            </button>
            <button onClick={handleQuestion} className="btn-ghost" style={{ width: '100%', justifyContent: 'center', fontSize: 11, padding: '10px 20px' }}>
              Ask a Question →
            </button>
            <p style={{ color: 'var(--text-muted)', fontSize: 12, marginTop: 12, textAlign: 'center' }}>
              or DM us <a href="https://instagram.com/hunk_wardrobe" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-dim)', textDecoration: 'underline', textUnderlineOffset: 3 }}>@hunk_wardrobe</a>
            </p>
          </div>

          {/* ━━━ Important Instructions ━━━ */}
          <details
            open
            style={{
              background: 'rgba(254, 74, 34, 0.06)',
              border: '1px solid rgba(254, 74, 34, 0.2)',
              borderRadius: 14,
              padding: 0,
              overflow: 'hidden',
            }}
          >
            <summary
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: 12,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: 'var(--orange)',
                padding: '14px 20px',
                cursor: 'pointer',
                listStyle: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                userSelect: 'none',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              Important Instructions
            </summary>
            <div style={{ padding: '0 20px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { icon: '💳', text: 'Cash on delivery is not available — only online payment is accepted.' },
                { icon: '🚫', text: 'No returns and no refunds on any orders.' },
                { icon: '📹', text: 'In case of a faulty product, please record a video while unboxing to claim support.' },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 10,
                    background: 'rgba(255,255,255,0.03)',
                    padding: '10px 14px',
                    borderRadius: 10,
                    border: '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                  <span style={{ fontSize: 16, flexShrink: 0, lineHeight: 1.5 }}>{item.icon}</span>
                  <span style={{ color: 'var(--text-dim)', fontSize: 13, lineHeight: 1.6 }}>{item.text}</span>
                </div>
              ))}
            </div>
          </details>
        </div>
      </section>

      {/* ━━━ PRODUCT DETAILS ━━━ */}
      <section style={{ padding: 'clamp(40px, 6vw, 80px) 0' }}>
        <div className="container">
          {/* THE JERSEY — features */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              gap: 'clamp(24px, 4vw, 60px)',
              alignItems: 'center',
              marginBottom: 60,
            }}
            className="product-detail-grid"
          >
            <span
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: 'clamp(80px, 12vw, 160px)',
                color: 'var(--text-muted)',
                lineHeight: 0.8,
                opacity: 0.5,
              }}
              className="detail-big-number"
            >
              {activeJersey.number || activeJersey.lastName.substring(0, 2)}
            </span>
            <div>
              <h3
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 900,
                  fontSize: 16,
                  letterSpacing: 3,
                  textTransform: 'uppercase',
                  color: 'var(--text)',
                  marginBottom: 16,
                }}
              >
                THE {activeJersey.category === 'jersey' ? 'JERSEY' : activeJersey.category.toUpperCase()}
              </h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {(activeJersey.category === 'jersey' ? [
                  'Premium sublimation print',
                  'Sweat-wicking polyester blend',
                  `Official NBA player name & number (#${activeJersey.number})`,
                  'Available in all sizes XS–3XL',
                  'Unisex relaxed fit',
                ] : [
                  'Premium high-thread count cotton',
                  'Breathable athletic stretch fabric',
                  'Minimalist high-density branding',
                  'Reinforced stitching for durability',
                  'Pre-shunk tailored fit',
                ]).map((feat) => (
                  <li key={feat} style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--text-dim)', fontSize: 14 }}>
                    <span style={{ color: 'var(--orange)', fontSize: 16, fontWeight: 'bold' }}>—</span>
                    {feat}
                  </li>
                ))}
              </ul>
              <p style={{ color: 'var(--text-dim)', fontSize: 14, marginTop: 16, lineHeight: 1.7, maxWidth: 500 }}>
                {activeJersey.description}
              </p>
            </div>
          </div>

          {/* Player Stats card */}
          {activeJersey.stats && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                borderRadius: 16,
                overflow: 'hidden',
                marginBottom: 60,
              }}
            >
              <div style={{ display: 'flex', height: '100%' }}>
                {/* Team color bar */}
                <div style={{ width: 4, background: activeJersey.teamColor || activeJersey.primaryColor, flexShrink: 0 }} />

                <div style={{ padding: 'clamp(20px, 3vw, 32px)', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
                    <div>
                      <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 18, color: 'var(--text)', marginBottom: 4 }}>
                        {activeJersey.player}
                      </h4>
                      <p style={{ color: 'var(--text-dim)', fontSize: 13 }}>
                        {activeJersey.position}
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                    {[
                      { label: 'PPG', value: activeJersey.stats.ppg },
                      { label: 'APG', value: activeJersey.stats.apg },
                      { label: 'RPG', value: activeJersey.stats.rpg },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        style={{
                          background: 'var(--bg-elevated)',
                          borderRadius: 12,
                          padding: '16px 12px',
                          textAlign: 'center',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Anton', sans-serif",
                            fontSize: 28,
                            color: 'var(--text)',
                          }}
                        >
                          {stat.value}
                        </span>
                        <p
                          style={{
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontWeight: 700,
                            fontSize: 10,
                            letterSpacing: 2,
                            textTransform: 'uppercase',
                            color: 'var(--text-dim)',
                            marginTop: 4,
                          }}
                        >
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  <p style={{ color: 'var(--text-muted)', fontSize: 11, marginTop: 12 }}>
                    Stats for display purposes only
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Related Jerseys */}
          {relatedJerseys.length > 0 && (
            <div>
              <h3
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 900,
                  fontSize: 16,
                  letterSpacing: 3,
                  textTransform: 'uppercase',
                  color: 'var(--text)',
                  marginBottom: 28,
                }}
              >
                YOU MIGHT ALSO LIKE
              </h3>
              <div
                style={{
                  display: 'flex',
                  gap: 20,
                  overflowX: 'auto',
                  paddingBottom: 16,
                }}
                className="hide-scrollbar"
              >
                {relatedJerseys.map((rj, i) => (
                  <div key={rj.id} style={{ minWidth: 280, maxWidth: 300, flexShrink: 0 }}>
                    <ProductCard product={rj} index={i} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Sticky Order Bar */}
      <StickyOrderBar jersey={activeJersey} selectedSize={selectedSize} />

      {/* Size Guide Modal */}
      <SizeGuideModal isOpen={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />

      {/* Responsive styles */}
      <style>{`
        .product-hero {
          grid-template-columns: 1fr 1fr;
        }
        @media (max-width: 1024px) {
          .product-hero {
            grid-template-columns: 1fr !important;
          }
          .product-hero > div:first-child {
            min-height: 50vh;
          }
        }
        @media (max-width: 768px) {
          .product-detail-grid {
            grid-template-columns: 1fr !important;
          }
          .detail-big-number {
            display: none !important;
          }
        }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
