import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '../data/products';

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'jersey', label: 'Jerseys' },
  { id: 'polo', label: 'Polos' },
  { id: 'tshirt', label: 'T-Shirts' },
];

function highlightMatch(text, query) {
  if (!query || query.length < 2) return text;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? (
      <span key={i} style={{ color: 'var(--orange)', fontWeight: 700 }}>{part}</span>
    ) : (
      part
    )
  );
}

export default function SearchOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);
  const resultsRef = useRef(null);
  const navigate = useNavigate();

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setCategory('all');
      setSelectedIndex(-1);
      // Small delay to let animation start
      const t = setTimeout(() => inputRef.current?.focus(), 150);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Search logic
  const results = useMemo(() => {
    let filtered = [...products];

    // Category filter
    if (category !== 'all') {
      filtered = filtered.filter(p => p.category === category);
    }

    // Text search
    if (query.trim().length > 0) {
      const q = query.toLowerCase().trim();
      filtered = filtered.filter(p => {
        const searchable = [
          p.player,
          p.lastName,
          p.edition,
          p.category,
          p.description,
          p.city,
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        return searchable.includes(q);
      });
    }

    return filtered.slice(0, 12);
  }, [query, category]);

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(-1);
  }, [results]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, -1));
      } else if (e.key === 'Enter' && selectedIndex >= 0 && results[selectedIndex]) {
        onClose();
        navigate(`/product/${results[selectedIndex].id}`);
      }
    },
    [onClose, navigate, results, selectedIndex]
  );

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && resultsRef.current) {
      const items = resultsRef.current.querySelectorAll('[data-search-item]');
      items[selectedIndex]?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [selectedIndex]);

  const showResults = query.trim().length > 0 || category !== 'all';
  const noResults = showResults && results.length === 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            display: 'flex',
            flexDirection: 'column',
          }}
          onKeyDown={handleKeyDown}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(3, 3, 8, 0.85)',
              backdropFilter: 'blur(40px) saturate(180%)',
              WebkitBackdropFilter: 'blur(40px) saturate(180%)',
            }}
          />

          {/* Ambient glow */}
          <div
            style={{
              position: 'absolute',
              top: '-10%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80%',
              height: '40%',
              background: 'radial-gradient(ellipse, rgba(255,69,0,0.08) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: 780,
              margin: '0 auto',
              padding: 'clamp(80px, 12vh, 140px) 24px 24px',
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '100vh',
            }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: 'clamp(24px, 5vh, 48px)',
                right: 24,
                width: 40,
                height: 40,
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.04)',
                color: 'var(--text-dim)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: 18,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.color = 'var(--text)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                e.currentTarget.style.color = 'var(--text-dim)';
              }}
              aria-label="Close search"
            >
              ✕
            </button>

            {/* Search input */}
            <div style={{ position: 'relative', marginBottom: 24 }}>
              {/* Search icon */}
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--text-muted)"
                strokeWidth="2"
                strokeLinecap="round"
                style={{
                  position: 'absolute',
                  left: 20,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none',
                }}
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>

              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search jerseys, polos, t-shirts..."
                style={{
                  width: '100%',
                  padding: '20px 20px 20px 56px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 16,
                  color: 'var(--text)',
                  fontSize: 'clamp(16px, 2.5vw, 20px)',
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 300,
                  outline: 'none',
                  caretColor: 'var(--orange)',
                  transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(255,69,0,0.3)';
                  e.target.style.boxShadow = '0 0 0 4px rgba(255,69,0,0.06)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255,255,255,0.08)';
                  e.target.style.boxShadow = 'none';
                }}
              />

              {/* Keyboard shortcut hint */}
              {query.length === 0 && (
                <span
                  style={{
                    position: 'absolute',
                    right: 20,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: 1,
                    color: 'var(--text-muted)',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    padding: '4px 10px',
                    borderRadius: 6,
                    pointerEvents: 'none',
                  }}
                >
                  ESC
                </span>
              )}

              {/* Clear button */}
              {query.length > 0 && (
                <button
                  onClick={() => {
                    setQuery('');
                    inputRef.current?.focus();
                  }}
                  style={{
                    position: 'absolute',
                    right: 16,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 8,
                    color: 'var(--text-dim)',
                    padding: '4px 12px',
                    fontSize: 12,
                    fontFamily: "'DM Sans', sans-serif",
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                  }}
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category pills */}
            <div
              style={{
                display: 'flex',
                gap: 8,
                marginBottom: 28,
                flexWrap: 'wrap',
              }}
            >
              {CATEGORIES.map((cat) => {
                const isActive = category === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    style={{
                      padding: '7px 18px',
                      borderRadius: 24,
                      border: `1px solid ${isActive ? 'var(--orange)' : 'rgba(255,255,255,0.08)'}`,
                      background: isActive ? 'var(--orange)' : 'rgba(255,255,255,0.03)',
                      color: isActive ? '#fff' : 'var(--text-dim)',
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 700,
                      fontSize: 12,
                      letterSpacing: 1.5,
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                      }
                    }}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Results area */}
            <div
              ref={resultsRef}
              style={{
                flex: 1,
                overflowY: 'auto',
                paddingBottom: 40,
                // hide scrollbar
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
              className="search-results-scroll"
            >
              {/* Initial state — trending / popular */}
              {!showResults && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.4 }}
                >
                  <p
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 700,
                      fontSize: 11,
                      letterSpacing: 3,
                      textTransform: 'uppercase',
                      color: 'var(--text-muted)',
                      marginBottom: 16,
                    }}
                  >
                    POPULAR SEARCHES
                  </p>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    {['LeBron', 'Curry', 'Luka', 'Polo', 'Classic', 'Oversized'].map(
                      (term) => (
                        <button
                          key={term}
                          onClick={() => setQuery(term)}
                          style={{
                            padding: '8px 18px',
                            borderRadius: 10,
                            border: '1px solid rgba(255,255,255,0.06)',
                            background: 'rgba(255,255,255,0.03)',
                            color: 'var(--text-dim)',
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: 14,
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                            e.currentTarget.style.color = 'var(--text)';
                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                            e.currentTarget.style.color = 'var(--text-dim)';
                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                          }}
                        >
                          {term}
                        </button>
                      )
                    )}
                  </div>
                </motion.div>
              )}

              {/* No results */}
              {noResults && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    textAlign: 'center',
                    padding: '60px 20px',
                  }}
                >
                  <span style={{ fontSize: 48, display: 'block', marginBottom: 16, opacity: 0.5 }}>
                    🔍
                  </span>
                  <p
                    style={{
                      fontFamily: "'Anton', sans-serif",
                      fontSize: 24,
                      color: 'var(--text-muted)',
                      textTransform: 'uppercase',
                      marginBottom: 8,
                    }}
                  >
                    No results found
                  </p>
                  <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>
                    Try a different keyword or browse by category
                  </p>
                </motion.div>
              )}

              {/* Results grid */}
              {showResults && results.length > 0 && (
                <>
                  <p
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 700,
                      fontSize: 11,
                      letterSpacing: 3,
                      textTransform: 'uppercase',
                      color: 'var(--text-muted)',
                      marginBottom: 16,
                    }}
                  >
                    {results.length} RESULT{results.length !== 1 ? 'S' : ''}
                  </p>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                      gap: 16,
                    }}
                  >
                    {results.map((product, i) => (
                      <motion.div
                        key={product.id}
                        data-search-item
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                          delay: i * 0.04,
                          duration: 0.4,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      >
                        <Link
                          to={`/product/${product.id}`}
                          onClick={onClose}
                          style={{
                            textDecoration: 'none',
                            display: 'block',
                            borderRadius: 16,
                            overflow: 'hidden',
                            border: `1px solid ${selectedIndex === i ? 'rgba(255,69,0,0.4)' : 'rgba(255,255,255,0.06)'}`,
                            background: selectedIndex === i ? 'rgba(255,69,0,0.06)' : 'rgba(255,255,255,0.02)',
                            transition: 'all 0.3s ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                            e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                            e.currentTarget.style.transform = 'translateY(-4px)';
                          }}
                          onMouseLeave={(e) => {
                            const isSelected = selectedIndex === i;
                            e.currentTarget.style.borderColor = isSelected ? 'rgba(255,69,0,0.4)' : 'rgba(255,255,255,0.06)';
                            e.currentTarget.style.background = isSelected ? 'rgba(255,69,0,0.06)' : 'rgba(255,255,255,0.02)';
                            e.currentTarget.style.transform = 'translateY(0)';
                          }}
                        >
                          {/* Image */}
                          <div
                            style={{
                              aspectRatio: '1/1',
                              position: 'relative',
                              overflow: 'hidden',
                              background: `radial-gradient(circle at 50% 40%, ${product.teamColor || product.primaryColor}18 0%, transparent 70%)`,
                            }}
                          >
                            {product.image ? (
                              <img
                                src={product.image}
                                alt={product.player || product.lastName}
                                style={{
                                  position: 'absolute',
                                  inset: '10%',
                                  width: '80%',
                                  height: '80%',
                                  objectFit: 'contain',
                                  filter: 'brightness(0.95)',
                                }}
                                loading="lazy"
                              />
                            ) : (
                              <div
                                style={{
                                  position: 'absolute',
                                  inset: 0,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontFamily: "'Anton', sans-serif",
                                  fontSize: 40,
                                  color: 'var(--text-muted)',
                                  opacity: 0.3,
                                }}
                              >
                                {product.lastName?.substring(0, 2)}
                              </div>
                            )}

                            {/* Category badge */}
                            <span
                              style={{
                                position: 'absolute',
                                top: 10,
                                right: 10,
                                fontFamily: "'Barlow Condensed', sans-serif",
                                fontWeight: 700,
                                fontSize: 9,
                                letterSpacing: 1.5,
                                textTransform: 'uppercase',
                                color: 'var(--text-dim)',
                                background: 'rgba(0,0,0,0.5)',
                                backdropFilter: 'blur(8px)',
                                WebkitBackdropFilter: 'blur(8px)',
                                padding: '3px 8px',
                                borderRadius: 6,
                              }}
                            >
                              {product.category === 'jersey'
                                ? product.edition
                                : product.category}
                            </span>
                          </div>

                          {/* Info */}
                          <div style={{ padding: '14px 16px 16px' }}>
                            <p
                              style={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontWeight: 600,
                                fontSize: 14,
                                color: 'var(--text)',
                                lineHeight: 1.3,
                                marginBottom: 4,
                              }}
                            >
                              {highlightMatch(product.player || product.lastName, query)}
                            </p>
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                              }}
                            >
                              <span
                                style={{
                                  fontFamily: "'Barlow Condensed', sans-serif",
                                  fontWeight: 700,
                                  fontSize: 11,
                                  letterSpacing: 1,
                                  textTransform: 'uppercase',
                                  color: 'var(--orange)',
                                }}
                              >
                                {product.category}
                              </span>
                              <span
                                style={{
                                  fontFamily: "'DM Sans', sans-serif",
                                  fontWeight: 600,
                                  fontSize: 14,
                                  color: 'var(--text)',
                                }}
                              >
                                ₹{product.price.toLocaleString('en-IN')}
                              </span>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.div>

          {/* Inline styles */}
          <style>{`
            .search-results-scroll::-webkit-scrollbar { display: none; }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
