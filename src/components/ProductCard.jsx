import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import JerseySVG from './JerseySVG';
import { buildQuickOrderMessage, openWhatsApp } from '../utils/whatsapp';

export default function ProductCard({ product, index = 0 }) {
  const [hovered, setHovered] = useState(false);

  // Awwwards-style minimal card: Huge imagery, subtle interactions, floating data.
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        delay: index * 0.05,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '100%',
        position: 'relative',
        display: 'block',
        // Make the card itself dictate the aspect ratio
        aspectRatio: '3/4',
        borderRadius: 20,
        overflow: 'hidden',
        cursor: 'pointer',
        background: 'rgba(255, 255, 255, 0.01)', // Almost invisible base
        boxShadow: hovered ? '0 30px 60px rgba(0,0,0,0.6)' : '0 10px 30px rgba(0,0,0,0.2)',
        border: `1px solid ${hovered ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)'}`,
        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
        <Link to={`/product/${product.id}`} style={{ display: 'block', width: '100%', height: '100%' }}>
        
        {/* Soft atmospheric glow inside the card matching team color */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at 50% 30%, ${product.teamColor || product.primaryColor}30 0%, transparent 70%)`,
            opacity: hovered ? 1 : 0.4,
            transition: 'opacity 0.8s ease',
            pointerEvents: 'none',
          }}
        />

        {/* The Massive Image */}
        <motion.div
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            inset: '5%', // Small breathing room
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
          }}
        >
          {product.image ? (
            <img
              src={product.image}
              alt={`${product.player || product.lastName} ${product.category}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                filter: hovered ? 'drop-shadow(0px 20px 30px rgba(0,0,0,0.4)) brightness(1.05)' : 'drop-shadow(0px 10px 20px rgba(0,0,0,0.2)) brightness(0.95)',
                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              loading="lazy"
            />
          ) : (
            product.category === 'jersey' && (
              <JerseySVG
                primaryColor={product.primaryColor}
                accentColor={product.accentColor}
                number={product.number}
                lastName={product.lastName}
                edition={product.edition}
                size="lg"
              />
            )
          )}
        </motion.div>

        {/* Overlay gradient for text legibility at bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '40%',
            background: 'linear-gradient(to top, rgba(5,5,10,0.9) 0%, rgba(5,5,10,0) 100%)',
            pointerEvents: 'none',
            zIndex: 2,
            opacity: hovered ? 1 : 0.8,
            transition: 'opacity 0.5s',
          }}
        />

        {/* Elegant Meta Info Overlay */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '24px',
            zIndex: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          {/* Subtle Edition Tag */}
          <span
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 11,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: 'var(--orange)',
              fontWeight: 700,
            }}
          >
            {product.category === 'jersey' ? product.edition : product.player}
          </span>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 2 }}>
            <h3
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: 32,
                lineHeight: 1,
                textTransform: 'uppercase',
                color: 'var(--text)',
                margin: 0,
                letterSpacing: 0.5,
              }}
            >
              {product.player || product.lastName}
            </h3>
            
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 16,
                fontWeight: 600,
                color: '#fff',
                background: 'rgba(0, 0, 0, 0.45)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                padding: '5px 14px',
                borderRadius: 20,
                border: '1px solid rgba(255,255,255,0.08)',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              ₹{product.price.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
