import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Ticker from '../components/Ticker';
import ProductCard from '../components/ProductCard';
import PlayerCard from '../components/PlayerCard';
import SoftAurora from '../components/SoftAurora/SoftAurora';
import ParticlesBackground from '../components/ParticlesBackground';
import { products as jerseys, featuredPlayers } from '../data/products';
import { openWhatsAppGeneral } from '../utils/whatsapp';
import Shuffle from '../components/Shuffle/Shuffle';

gsap.registerPlugin(ScrollTrigger);

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.06 } },
};

export default function Home() {
  const [featuredCategory, setFeaturedCategory] = useState('All');

  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const latestDropRef = useRef(null);
  const shopByPlayerRef = useRef(null);

  const scrollSlider = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = ref.current.clientWidth * 0.8;
      ref.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const baseFeatured = featuredCategory === 'All' ? jerseys : jerseys.filter(j => j.category === featuredCategory);
  const featured = baseFeatured.filter(j => j.isNew).slice(0, 5);
  if (featured.length < 5) {
    const more = baseFeatured.filter(j => !featured.includes(j)).slice(0, 5 - featured.length);
    featured.push(...more);
  }

  useEffect(() => {
    // Parallax on hero
    if (heroRef.current) {
      gsap.to(heroRef.current.querySelector('.hero-content'), {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    // Counter animation for stats
    if (statsRef.current) {
      const counters = statsRef.current.querySelectorAll('.stat-number');
      counters.forEach((counter) => {
        const target = parseInt(counter.dataset.target);
        gsap.fromTo(
          counter,
          { textContent: 0 },
          {
            textContent: target,
            duration: 2,
            ease: 'power2.out',
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: counter,
              start: 'top 85%',
              once: true,
            },
          }
        );
      });
    }

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <div className="page-wrapper">
      {/* ━━━ HERO SECTION ━━━ */}
      <section
        ref={heroRef}
        id="hero"
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.8 }}>
          <SoftAurora
            speed={0.5}
            scale={1.2}
            brightness={1}
            color1="#ff4500"
            color2="#7b2fbe"
            noiseFrequency={2.0}
            noiseAmplitude={1.5}
            bandHeight={0.6}
            bandSpread={1.2}
            octaveDecay={0.2}
            layerOffset={0}
            colorSpeed={1}
            enableMouseInteraction
            mouseInfluence={0.3}
          />
        </div>

        {/* Dot grid */}
        <div className="dot-grid" />

        {/* Grain texture */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.04, pointerEvents: 'none', zIndex: 2 }}>
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>

        {/* Hero content */}
        <div
          className="hero-content"
          style={{
            position: 'relative',
            zIndex: 3,
            textAlign: 'center',
            padding: '0 24px',
            maxWidth: 1200,
          }}
        >
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="eyebrow"
            style={{ marginBottom: 24 }}
          >
            PREMIUM ATHLETIC & CASUAL WEAR
          </motion.p>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ color: 'var(--text)', marginBottom: 0, display: 'block' }}
          >
            <Shuffle
              text="HUNK"
              tag="span"
              className="hero-heading"
              shuffleDirection="right"
              duration={0.4}
              animationMode="evenodd"
              shuffleTimes={2}
              ease="power3.out"
              stagger={0.05}
              triggerOnce={true}
              triggerOnHover={true}
            />
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ color: 'var(--orange)', display: 'block' }}
          >
            <Shuffle
              text="WARDROBE."
              tag="span"
              className="hero-heading"
              shuffleDirection="right"
              duration={0.4}
              animationMode="evenodd"
              shuffleTimes={2}
              ease="power3.out"
              stagger={0.05}
              triggerOnce={true}
              triggerOnHover={true}
            />
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              color: 'var(--text-dim)',
              fontSize: 17,
              fontWeight: 300,
              marginTop: 24,
              maxWidth: 440,
              marginInline: 'auto',
              lineHeight: 1.7,
            }}
          >
            Drop-quality apparel. WhatsApp-easy ordering.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 16,
              marginTop: 40,
              flexWrap: 'wrap',
            }}
          >
            <Link to="/shop" className="btn-primary">
              Shop Collection
              <span style={{ fontSize: 16 }}>→</span>
            </Link>
            <a
              href="https://instagram.com/hunk_wardrobe"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              @hunk_wardrobe
            </a>
          </motion.div>
        </div>

        {/* SVGs removed for cleaner aesthetic */}

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          style={{
            position: 'absolute',
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            zIndex: 3,
          }}
        >
          <span
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: 9,
              letterSpacing: 4,
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
            }}
          >
            SCROLL
          </span>
          <div
            style={{
              width: 1,
              animation: 'pulse-line 2s ease-in-out infinite',
              background: 'var(--text-dim)',
            }}
          />
        </motion.div>
      </section>

      {/* ━━━ TICKER STRIP ━━━ */}
      <Ticker />

      {/* ━━━ FEATURED DROP ━━━ */}
      <section style={{ padding: 'clamp(60px, 10vw, 120px) 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, gap: 20, flexWrap: 'wrap' }}>
            <div>
              <motion.p {...fadeUp} className="eyebrow" style={{ marginBottom: 12 }}>
                LATEST DROP
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="section-heading"
                style={{ marginBottom: 12 }}
              >
                FRESH OFF THE SHOP
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ color: 'var(--text-dim)', fontSize: 15, maxWidth: 480, margin: 0 }}
              >
                This week's most hyped pieces. Grab before they're gone.
              </motion.p>
              
              {/* Category Pills */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 24 }}
              >
                {[
                  { id: 'All', label: 'All Drops' },
                  { id: 'jersey', label: 'Jerseys' },
                  { id: 'polo', label: 'Polos' },
                  { id: 'tshirt', label: 'Casual Wear' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setFeaturedCategory(cat.id)}
                    style={{
                      background: featuredCategory === cat.id ? 'var(--orange)' : 'rgba(255,255,255,0.05)',
                      color: featuredCategory === cat.id ? '#fff' : 'var(--text-dim)',
                      border: `1px solid ${featuredCategory === cat.id ? 'var(--orange)' : 'rgba(255,255,255,0.1)'}`,
                      padding: '8px 16px',
                      borderRadius: 24,
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: 13,
                      fontWeight: 700,
                      letterSpacing: 1,
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      backdropFilter: 'blur(10px)',
                    }}
                    onMouseEnter={(e) => {
                      if (featuredCategory !== cat.id) {
                        e.target.style.background = 'rgba(255,255,255,0.1)';
                        e.target.style.color = 'var(--text)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (featuredCategory !== cat.id) {
                        e.target.style.background = 'rgba(255,255,255,0.05)';
                        e.target.style.color = 'var(--text-dim)';
                      }
                    }}
                  >
                    {cat.label}
                  </button>
                ))}
              </motion.div>
            </div>
            {/* Slider Controls */}
            <div style={{ display: 'flex', gap: 12 }}>
              <button 
                onClick={() => scrollSlider(latestDropRef, 'left')} 
                className="btn-ghost" 
                style={{ width: 48, height: 48, padding: 0, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                aria-label="Scroll left"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
              </button>
              <button 
                onClick={() => scrollSlider(latestDropRef, 'right')} 
                className="btn-ghost" 
                style={{ width: 48, height: 48, padding: 0, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                aria-label="Scroll right"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal scroll strip */}
        <div
          ref={latestDropRef}
          style={{
            display: 'flex',
            gap: 20,
            overflowX: 'auto',
            
            padding: '30px',
            
          }}
          className="hide-scrollbar"
        >
          {featured.map((jersey, i) => (
            <div
              key={jersey.id}
              style={{
                // Desktop: 3 cards. Gap is 20px, total 2 gaps = 40px subtraction.
                minWidth: 'clamp(280px, calc((100vw - clamp(48px, 8vw, 120px) - 40px) / 3), 450px)',
                scrollSnapAlign: 'start',
                flexShrink: 0,
                
              }}
            >
              <ProductCard product={jersey} index={i} variant="featured" />
            </div>
          ))}
        </div>

        <style>{`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
      </section>

      {/* ━━━ SHOP BY PLAYER ━━━ */}
      <section style={{ padding: 'clamp(40px, 8vw, 100px) 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, gap: 20, flexWrap: 'wrap' }}>
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="eyebrow"
                style={{ marginBottom: 12 }}
              >
                THE ROSTER
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="section-heading"
                style={{ margin: 0 }}
              >
                PICK YOUR PLAYER
              </motion.h2>
            </div>
            
            {/* Slider Controls */}
            <div style={{ display: 'flex', gap: 12 }}>
              <button 
                onClick={() => scrollSlider(shopByPlayerRef, 'left')} 
                className="btn-ghost" 
                style={{ width: 48, height: 48, padding: 0, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                aria-label="Scroll left"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
              </button>
              <button 
                onClick={() => scrollSlider(shopByPlayerRef, 'right')} 
                className="btn-ghost" 
                style={{ width: 48, height: 48, padding: 0, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                aria-label="Scroll right"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
              </button>
            </div>
          </div>

          <div
            ref={shopByPlayerRef}
            className="hide-scrollbar"
            style={{
              display: 'flex',
              overflowX: 'auto',        
              gap: 16,
              margin: '0 -24px',
              padding: '0 24px 40px',
            }}
          >
            {featuredPlayers.map((player, i) => (
              <div
                key={player.name}
                style={{
                  minWidth: 260,
                  flexShrink: 0,
                  
                  scrollSnapAlign: 'start',
                }}
              >
                <PlayerCard player={player} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ HOW IT WORKS ━━━ */}
      <section
        id="how-it-works"
        style={{
          position: 'relative',
          padding: 'clamp(80px, 12vw, 140px) 0',
          overflow: 'hidden',
        }}
      >
        {/* Particles background */}
        <ParticlesBackground count={60} color="rgba(255, 69, 0, 0.3)" maxSize={6} minSize={1} />

        {/* Subtle gradient overlays */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 20% 50%, rgba(254,74,34,0.06), transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 80% 50%, rgba(37,185,83,0.05), transparent 60%)', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="eyebrow"
            style={{ textAlign: 'center', marginBottom: 12 }}
          >
            HOW IT WORKS
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="section-heading"
            style={{ textAlign: 'center', marginBottom: 20 }}
          >
            THREE STEPS. THAT'S IT.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ color: 'var(--text-dim)', textAlign: 'center', marginBottom: 64, fontSize: 15, maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' }}
          >
            No carts. No checkout. Just WhatsApp us — it's that simple.
          </motion.p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 24,
              maxWidth: 1100,
              margin: '0 auto',
            }}
          >
            {[
              {
                num: '01',
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="1.5" strokeLinecap="round">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M20.188 10.934c.388.472.582.707.582 1.066s-.194.594-.582 1.066C18.768 14.79 15.636 18 12 18c-3.636 0-6.768-3.21-8.188-4.934C3.424 12.594 3.23 12.36 3.23 12s.194-.594.582-1.066C5.232 9.21 8.364 6 12 6c3.636 0 6.768 3.21 8.188 4.934z" />
                  </svg>
                ),
                title: 'Browse',
                desc: 'Explore our curated collection of premium athletic and casual wear.',
                accent: 'var(--orange)',
              },
              {
                num: '02',
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
                  </svg>
                ),
                title: 'Choose',
                desc: 'Pick your style, edition, and size. We carry premium court & street styles.',
                accent: '#A78BFA',
              },
              {
                num: '03',
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="var(--wa-green)">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                ),
                title: 'Order via WhatsApp',
                desc: 'Send us a message. We confirm, ship, and deliver — usually within 24-48 hours.',
                accent: 'var(--wa-green)',
              },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.18, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8, transition: { duration: 0.35 } }}
                style={{
                  position: 'relative',
                  background: 'rgba(255,255,255,0.03)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 20,
                  padding: 'clamp(28px, 4vw, 40px)',
                  overflow: 'hidden',
                  cursor: 'default',
                }}
              >
                {/* Glow accent top */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: `linear-gradient(90deg, transparent, ${step.accent}, transparent)`,
                  opacity: 0.6,
                }} />

                {/* Ghost number */}
                <span style={{
                  position: 'absolute',
                  top: -10,
                  right: 12,
                  fontFamily: "'Anton', sans-serif",
                  fontSize: 120,
                  color: step.accent,
                  opacity: 0.04,
                  lineHeight: 1,
                  pointerEvents: 'none',
                  userSelect: 'none',
                }}>
                  {step.num}
                </span>

                {/* Step number pill */}
                <span
                  style={{
                    display: 'inline-block',
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    fontSize: 11,
                    letterSpacing: 2,
                    color: step.accent,
                    background: `${step.accent}15`,
                    border: `1px solid ${step.accent}30`,
                    padding: '4px 14px',
                    borderRadius: 20,
                    marginBottom: 20,
                  }}
                >
                  STEP {step.num}
                </span>

                {/* Icon */}
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 16,
                    background: `${step.accent}10`,
                    border: `1px solid ${step.accent}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 20,
                  }}
                >
                  {step.icon}
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: "'Anton', sans-serif",
                    fontSize: 24,
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                    color: 'var(--text)',
                    marginBottom: 10,
                  }}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p style={{ color: 'var(--text-dim)', fontSize: 14, lineHeight: 1.8, maxWidth: 300 }}>
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ TEAM UNIVERSE ━━━ 
      <section style={{ padding: 'clamp(40px, 8vw, 100px) 0' }}>
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="section-heading"
            style={{ textAlign: 'center', marginBottom: 8 }}
          >
            EVERY TEAM. EVERY DROP.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ color: 'var(--text-dim)', textAlign: 'center', marginBottom: 48, fontSize: 15 }}
          >
            30 NBA teams. Pick your loyalty.
          </motion.p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
              gap: 20,
              maxWidth: 800,
              margin: '0 auto',
            }}
          >
            {nbaTeams.map((team, i) => (
              <motion.div
                key={team.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.02, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  to={`/shop?team=${team.name}`}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 8,
                    padding: 12,
                    textDecoration: 'none',
                    transition: 'transform 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)';
                    e.currentTarget.querySelector('.team-dot').style.transform = 'scale(1.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.querySelector('.team-dot').style.transform = 'scale(1)';
                  }}
                >
                  {team.logo ? (
                    <img
                      src={team.logo}
                      alt={team.name}
                      className="team-dot"
                      style={{
                        width: 48,
                        height: 48,
                        objectFit: 'contain',
                        transition: 'transform 0.3s ease',
                      }}
                    />
                  ) : (
                    <div
                      className="team-dot"
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        background: team.color,
                        boxShadow: `0 0 20px ${team.color}40`,
                        transition: 'transform 0.3s ease',
                      }}
                    />
                  )}
                  <span
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 700,
                      fontSize: 10,
                      letterSpacing: 1,
                      textTransform: 'uppercase',
                      color: 'var(--text-dim)',
                      textAlign: 'center',
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {team.name}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ━━━ STATS STRIP ━━━ */}
      <section ref={statsRef} style={{ padding: '40px 0' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              border: '1px solid var(--border)',
              borderRadius: 16,
            }}
          >
            {[
              { number: 500, suffix: '+', label: 'Orders' },
              { number: 8, suffix: '+', label: 'Players' },
              { number: 24, suffix: 'h', label: 'Dispatch' },
            ].map((stat, i) => (
              <div
                key={stat.label}
                style={{
                  textAlign: 'center',
                  padding: 'clamp(24px, 3vw, 40px) 16px',
                  borderRight: i < 2 ? '1px solid var(--border)' : 'none',
                }}
              >
                <span
                  className="stat-number"
                  data-target={stat.number}
                  style={{
                    fontFamily: "'Anton', sans-serif",
                    fontSize: 'clamp(32px, 5vw, 56px)',
                    color: 'var(--text)',
                    lineHeight: 1,
                  }}
                >
                  0
                </span>
                <span
                  style={{
                    fontFamily: "'Anton', sans-serif",
                    fontSize: 'clamp(32px, 5vw, 56px)',
                    color: 'var(--orange)',
                    lineHeight: 1,
                  }}
                >
                  {stat.suffix}
                </span>
                <p
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    fontSize: 11,
                    letterSpacing: 3,
                    textTransform: 'uppercase',
                    color: 'var(--text-dim)',
                    marginTop: 8,
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ WHATSAPP CTA BANNER ━━━ */}
      <section
        id="wa-cta"
        style={{
          position: 'relative',
          padding: 'clamp(60px, 10vw, 100px) 0',
          marginTop: 40,
          overflow: 'hidden',
        }}
      >
        {/* Green gradient bg with SoftAurora from React Bits */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, #041a0c 0%, #082a16 80%, #041a0c 100%)',
          }}
        />
        <div style={{ position: 'absolute', inset: 0, opacity: 0.35, mixBlendMode: 'screen', pointerEvents: 'none' }}>
          <SoftAurora />
        </div>

        {/* Noise texture placeholder */}
        <div
          id="noise-bg"
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.08,
          }}
        >
          <svg width="100%" height="100%">
            <filter id="wa-noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#wa-noise)" />
          </svg>
        </div>

        {/* Green radial glow */}
        <div
          style={{
            position: 'absolute',
            right: '10%',
            top: '30%',
            width: 400,
            height: 400,
            background: 'radial-gradient(circle, rgba(37,211,102,0.15) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 40,
            }}
          >
            <div style={{ maxWidth: 500 }}>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: "'Anton', sans-serif",
                  fontSize: 'clamp(40px, 6vw, 72px)',
                  lineHeight: 0.95,
                  color: '#fff',
                  textTransform: 'uppercase',
                }}
              >
                ORDER IN SECONDS.
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16, marginTop: 16, lineHeight: 1.7 }}
              >
                Tell us what you want. We ship it. That's it.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 12 }}
            >
              <button onClick={openWhatsAppGeneral} className="btn-whatsapp" style={{ fontSize: 14 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Start a Chat
              </button>
              <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13 }}>
                Usually replies within 1 hour
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Floating hero jerseys — visible on desktop only */}
      <style>{`
        @media (min-width: 1024px) {
          .hero-jersey-left, .hero-jersey-right { display: block !important; }
        }
      `}</style>
    </div>
  );
}
