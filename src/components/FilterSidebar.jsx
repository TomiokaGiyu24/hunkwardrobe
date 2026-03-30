import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getUniquePlayers, editions } from '../data/products';

const CATEGORIES = [
  { id: 'jersey', label: 'Jerseys' },
  { id: 'polo', label: 'Polos' },
  { id: 'tshirt', label: 'T-Shirts' }
];

export default function FilterSidebar({ filters, onFilterChange, totalCount }) {
  const [openSections, setOpenSections] = useState({ category: true, player: false, edition: true, price: false });
  
  const players = getUniquePlayers();

  const toggleSection = (key) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCategoryToggle = (catId) => {
    const current = filters.categories || [];
    const updated = current.includes(catId)
      ? current.filter(c => c !== catId)
      : [...current, catId];
    onFilterChange({ ...filters, categories: updated });
  };



  const handlePlayerToggle = (player) => {
    const current = filters.players || [];
    const updated = current.includes(player)
      ? current.filter(p => p !== player)
      : [...current, player];
    onFilterChange({ ...filters, players: updated });
  };

  const handleEditionToggle = (edition) => {
    const current = filters.editions || [];
    const updated = current.includes(edition)
      ? current.filter(e => e !== edition)
      : [...current, edition];
    onFilterChange({ ...filters, editions: updated });
  };

  const handlePriceChange = (value) => {
    onFilterChange({ ...filters, maxPrice: parseInt(value) });
  };

  const clearAll = () => {
    onFilterChange({ categories: [], players: [], editions: [], maxPrice: 2000 });
  };

  const hasFilters = (filters.categories?.length || 0) + (filters.players?.length || 0) + (filters.editions?.length || 0) > 0 || filters.maxPrice < 2000;

  const showNBAFilters = (filters.categories || []).length === 0 || (filters.categories || []).includes('jersey');



  return (
    <div
      style={{
        width: '100%',
        paddingRight: 24,
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <h3
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900,
            fontSize: 14,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: 'var(--text)',
          }}
        >
          Filter
        </h3>
        {hasFilters && (
          <button
            onClick={clearAll}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              color: 'var(--orange)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Clear All
          </button>
        )}
      </div>

      {/* By Category */}
      <div className="filter-section">
        <div className="filter-header" onClick={() => toggleSection('category')}>
          <span>By Category</span>
          <span style={{ fontSize: 14, transform: openSections.category ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>▾</span>
        </div>
        <AnimatePresence>
          {openSections.category && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: 'hidden', paddingTop: 8 }}
            >
              <div style={{ maxHeight: 240, overflowY: 'auto', paddingRight: 8 }}>
                {CATEGORIES.map((cat) => (
                  <label key={cat.id} className="custom-checkbox">
                    <input
                      type="checkbox"
                      checked={(filters.categories || []).includes(cat.id)}
                      onChange={() => handleCategoryToggle(cat.id)}
                    />
                    <span 
                      className="checkmark"
                      style={{
                        background: (filters.categories || []).includes(cat.id) ? 'var(--orange)' : 'transparent',
                        borderColor: (filters.categories || []).includes(cat.id) ? 'var(--orange)' : undefined,
                      }}
                    >
                      <svg viewBox="0 0 14 14"><path d="M11.6,3.4L5.5,9.5L2.4,6.4" fill="none" stroke="white" strokeWidth="2"/></svg>
                    </span>
                    {cat.label}
                  </label>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>



      {/* By Player */}
      {showNBAFilters && (
      <div className="filter-section">
        <div className="filter-header" onClick={() => toggleSection('player')}>
          <span>By Player</span>
          <span style={{ fontSize: 14, transform: openSections.player ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>▾</span>
        </div>
        <AnimatePresence>
          {openSections.player && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: 'hidden', paddingTop: 8 }}
            >
              <div style={{ maxHeight: 240, overflowY: 'auto', paddingRight: 8 }}>
                {players.map((player) => (
                  <label key={player} className="custom-checkbox">
                    <input
                      type="checkbox"
                      checked={(filters.players || []).includes(player)}
                      onChange={() => handlePlayerToggle(player)}
                    />
                    <span
                      className="checkmark"
                      style={{
                        background: (filters.players || []).includes(player) ? 'var(--orange)' : 'transparent',
                      }}
                    >
                      <svg viewBox="0 0 14 14"><path d="M11.6,3.4L5.5,9.5L2.4,6.4" fill="none" stroke="white" strokeWidth="2"/></svg>
                    </span>
                    {player}
                  </label>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      )}

      {/* By Edition */}
      {showNBAFilters && (
      <div className="filter-section">
        <div className="filter-header" onClick={() => toggleSection('edition')}>
          <span>By Edition</span>
          <span style={{ fontSize: 14, transform: openSections.edition ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>▾</span>
        </div>
        <AnimatePresence>
          {openSections.edition && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: 'hidden', paddingTop: 8 }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {editions.map((ed) => (
                  <button
                    key={ed}
                    className={`edition-chip ${(filters.editions || []).includes(ed) ? 'active' : ''}`}
                    onClick={() => handleEditionToggle(ed)}
                  >
                    {ed}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      )}

      {/* Price Range */}
      <div className="filter-section">
        <div className="filter-header" onClick={() => toggleSection('price')}>
          <span>Price Range</span>
          <span style={{ fontSize: 14, transform: openSections.price ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>▾</span>
        </div>
        <AnimatePresence>
          {openSections.price && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: 'hidden', paddingTop: 12 }}
            >
              <input
                type="range"
                min={999}
                max={2000}
                step={100}
                value={filters.maxPrice || 2000}
                onChange={(e) => handlePriceChange(e.target.value)}
                style={{ width: '100%' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                <span style={{ fontSize: 12, color: 'var(--text-dim)' }}>₹999</span>
                <span style={{ fontSize: 12, color: 'var(--orange)', fontWeight: 600 }}>
                  ₹{(filters.maxPrice || 2000).toLocaleString('en-IN')}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
