import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { products as jerseys } from '../data/products';

export default function PlayerCard({ player, index = 0 }) {
  const [hovered, setHovered] = useState(false);

  const playerJersey = jerseys.find(j => j.player === player.name);
  const jerseyLink = playerJersey ? `/product/${playerJersey.id}` : '/shop';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        delay: index * 0.06,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link to={jerseyLink} style={{ textDecoration: 'none', color: 'inherit' }}>
        <motion.div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          whileHover={{ scale: 1.04, y: -8 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'relative',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            borderRadius: 16,
            padding: '32px 24px 24px',
            overflow: 'hidden',
            cursor: 'pointer',
            transition: 'border-color 0.4s ease',
            borderColor: hovered ? `${player.teamColor}50` : 'var(--border)',
          }}
        >
          {/* Team color glow */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '60%',
              background: hovered 
                ? `linear-gradient(180deg, ${player.teamColor}20 0%, transparent 100%)`
                : `radial-gradient(ellipse at 50% 0%, ${player.teamColor}10 0%, transparent 70%)`,
              transition: 'all 0.5s ease',
            }}
          />

          {/* Ghost number */}
          <span
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              fontFamily: "'Anton', sans-serif",
              fontSize: 80,
              color: 'var(--text)',
              opacity: 0.04,
              lineHeight: 1,
              pointerEvents: 'none',
            }}
          >
            {player.number}
          </span>



          {/* Player name */}
          <h3
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              fontSize: 17,
              color: 'var(--text)',
              marginBottom: 4,
              position: 'relative',
              zIndex: 1,
            }}
          >
            {player.name}
          </h3>



          {/* View link */}
          <p
            style={{
              marginTop: 16,
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: hovered ? 'var(--orange)' : 'var(--text-dim)',
              transition: 'color 0.3s ease',
              position: 'relative',
              zIndex: 1,
            }}
          >
            View Jerseys →
          </p>
        </motion.div>
      </Link>
    </motion.div>
  );
}
