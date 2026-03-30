import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import ColorBends from '../components/ColorBends/ColorBends';
import { products } from '../data/products';

const ITEMS_PER_PAGE = 12;

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low-High' },
  { value: 'price-desc', label: 'Price: High-Low' },
  { value: 'new', label: 'New Arrivals' },
];

export default function Shop() {
  const [searchParams] = useSearchParams();
  const initialFilter = searchParams.get('filter');

  const initialCategory = searchParams.get('category');

  const [filters, setFilters] = useState({
    categories: initialCategory ? [initialCategory] : [],
    players: [],
    editions: [],
    maxPrice: 2000,
  });
  const [sort, setSort] = useState(initialFilter === 'new' ? 'new' : 'featured');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Count animation
  const [displayCount, setDisplayCount] = useState(0);

  const handleCategoryPillClick = (catId) => {
    if (catId === 'All') {
      setFilters(prev => ({ ...prev, categories: [] }));
    } else {
      setFilters(prev => ({ ...prev, categories: [catId] }));
    }
    // Also reset any specific dependent filters like Teams if switching away from Jerseys?
    // Leaving it simple for now, as UI handles hiding those groups.
  };

  const filtered = useMemo(() => {
    let result = [...products];

    if (filters.categories && filters.categories.length > 0) {
      result = result.filter(j => filters.categories.includes(j.category));
    }

    if (filters.players.length > 0) {
      result = result.filter(j => filters.players.includes(j.player));
    }
    if (filters.editions.length > 0) {
      result = result.filter(j => filters.editions.includes(j.edition));
    }
    if (filters.maxPrice < 2000) {
      result = result.filter(j => j.price <= filters.maxPrice);
    }

    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'new':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;

      default:
        break;
    }

    return result;
  }, [filters, sort]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  // Animate count
  useEffect(() => {
    const target = filtered.length;
    const duration = 600;
    const start = performance.now();
    const from = displayCount;

    const animate = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayCount(Math.round(from + (target - from) * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [filtered.length]);

  // Reset visible count on filter change
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [filters, sort]);

  return (
    <div className="page-wrapper" style={{ paddingTop: 68, position: 'relative', minHeight: '100vh' }}>
      
      {/* Global ColorBends background — renders directly behind cards */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        <ColorBends
          colors={["#FFE0B2", "#E65100", "#1E88E5"]}
          rotation={0}
          speed={0.2}
          scale={1.2}
          frequency={1}
          warpStrength={1.5}
          mouseInfluence={0.5}
          parallax={0.5}
          noise={0.1}
          transparent={true}
          autoRotate={0}
        />
      </div>

      {/* Very subtle dark tint — just enough to keep text readable without hiding ColorBends */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, background: 'rgba(5, 5, 10, 0.3)', pointerEvents: 'none' }} />

      {/* ━━━ Page Header ━━━ */}
      <section
        style={{
          position: 'relative',
          height: 300,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          zIndex: 1,
        }}
      >


        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="eyebrow"
            style={{ marginBottom: 16 }}
          >
            <span style={{ fontVariantNumeric: 'tabular-nums' }}>{displayCount}</span> PRODUCTS AVAILABLE
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="section-heading"
            style={{ fontSize: 'clamp(48px, 8vw, 96px)' }}
          >
            THE COLLECTION
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginTop: 32 }}
          >
            {[
              { id: 'All', label: 'All Items' },
              { id: 'jersey', label: 'Jerseys' },
              { id: 'polo', label: 'Polos' },
              { id: 'tshirt', label: 'Casual Wear' }
            ].map(cat => {
              const isActive = cat.id === 'All' 
                ? (!filters.categories || filters.categories.length === 0)
                : (filters.categories || []).includes(cat.id);
                
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryPillClick(cat.id)}
                  style={{
                    background: isActive ? 'var(--orange)' : 'rgba(255,255,255,0.05)',
                    color: isActive ? '#fff' : 'var(--text-dim)',
                    border: `1px solid ${isActive ? 'var(--orange)' : 'rgba(255,255,255,0.1)'}`,
                    padding: '8px 20px',
                    borderRadius: 24,
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: 14,
                    fontWeight: 700,
                    letterSpacing: 1,
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(10px)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.target.style.background = 'rgba(255,255,255,0.1)';
                      e.target.style.color = 'var(--text)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.target.style.background = 'rgba(255,255,255,0.05)';
                      e.target.style.color = 'var(--text-dim)';
                    }
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ━━━ Main Content ━━━ */}
      <section className="container" style={{ paddingBottom: 80, position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'flex',
            gap: 40,
            alignItems: 'flex-start',
          }}
        >
          {/* Sidebar drawer handles everything now */}

          {/* Main grid area */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Sort bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 28,
                flexWrap: 'wrap',
                gap: 12,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <p style={{ color: 'var(--text-dim)', fontSize: 13 }}>
                  Showing <span style={{ color: 'var(--text)', fontWeight: 600 }}>{visible.length}</span> of {filtered.length} jerseys
                </p>

                {/* Desktop sidebar toggle button */}
                <button
                  className="btn-ghost"
                  onClick={() => setMobileFilterOpen(true)}
                  style={{
                    padding: '8px 14px',
                    fontSize: 12,
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    letterSpacing: 1,
                    textTransform: 'uppercase',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                  Filters
                </button>


              </div>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 8,
                  padding: '8px 12px',
                  color: 'var(--text)',
                  fontSize: 13,
                  fontFamily: "'DM Sans', sans-serif",
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                {sortOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            {/* Jersey Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${filters.players.join()}-${filters.editions.join()}-${sort}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
                  gap: 30,
                  width: '100%',
                }}
                className="shop-product-grid"
              >
                {visible.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} variant="grid" />
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Empty state */}
            {filtered.length === 0 && (
              <div style={{ textAlign: 'center', padding: '80px 0' }}>
                <p style={{ fontFamily: "'Anton', sans-serif", fontSize: 32, color: 'var(--text-muted)', marginBottom: 12 }}>
                  NO PRODUCTS FOUND
                </p>
                <p style={{ color: 'var(--text-dim)', fontSize: 14 }}>
                  Try adjusting your filters to find what you're looking for.
                </p>
              </div>
            )}

            {/* Load More */}
            {hasMore && (
              <div style={{ textAlign: 'center', marginTop: 48 }}>
                <button
                  onClick={() => setVisibleCount(prev => prev + ITEMS_PER_PAGE)}
                  className="btn-ghost"
                  style={{ padding: '12px 40px' }}
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFilterOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.6)',
                zIndex: 60,
              }}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                bottom: 0,
                width: 'min(400px, 100vw)',
                background: 'var(--bg-surface)',
                borderRight: '1px solid var(--border)',
                zIndex: 61,
                overflowY: 'auto',
                padding: '40px 28px',
                boxShadow: '10px 0 50px rgba(0,0,0,0.5)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <h3 style={{ fontFamily: "'Anton', sans-serif", fontSize: 24, color: 'var(--text)' }}>FILTERS</h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  style={{ color: 'var(--text-dim)', fontSize: 24, background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  ✕
                </button>
              </div>
              <FilterSidebar filters={filters} onFilterChange={setFilters} totalCount={filtered.length} />
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', marginTop: 20 }}
              >
                Show {filtered.length} Results
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        /* Shop layout adjustments */
        @media (max-width: 1024px) {
          .filter-sidebar-desktop { display: none !important; }
          .mobile-filter-btn { display: flex !important; }
          .sidebar-toggle-btn { display: none !important; }
        }
        .shop-product-grid {
           display: grid !important;
        }
        @media (max-width: 1024px) {
           .shop-product-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
           .shop-product-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
