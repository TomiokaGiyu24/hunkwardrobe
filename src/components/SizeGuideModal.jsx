import { motion, AnimatePresence } from 'framer-motion';

const sizeChart = [
  { size: 'XS', chest: '34-36"', length: '26"' },
  { size: 'S', chest: '36-38"', length: '27"' },
  { size: 'M', chest: '38-40"', length: '28"' },
  { size: 'L', chest: '40-42"', length: '29"' },
  { size: 'XL', chest: '42-44"', length: '30"' },
  { size: 'XXL', chest: '44-46"', length: '31"' },
  { size: '3XL', chest: '46-48"', length: '32"' },
];

export default function SizeGuideModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.7)',
              backdropFilter: 'blur(8px)',
              zIndex: 100,
            }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: '-45%' }}
            animate={{ opacity: 1, scale: 1, y: '-50%' }}
            exit={{ opacity: 0, scale: 0.95, y: '-45%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              x: '-50%',
              width: '90%',
              maxWidth: 520,
              maxHeight: '85vh',
              overflowY: 'auto',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-hi)',
              borderRadius: 20,
              padding: '36px 32px',
              zIndex: 101,
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <h3
                style={{
                  fontFamily: "'Anton', sans-serif",
                  fontSize: 28,
                  color: 'var(--text)',
                }}
              >
                SIZE GUIDE
              </h3>
              <button
                onClick={onClose}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  border: '1px solid var(--border-hi)',
                  background: 'transparent',
                  color: 'var(--text-dim)',
                  fontSize: 18,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ✕
              </button>
            </div>

            {/* Info */}
            <p style={{ color: 'var(--text-dim)', fontSize: 13, marginBottom: 20, lineHeight: 1.6 }}>
              All measurements in inches. Jerseys have a relaxed, unisex fit. When in doubt, size up for a streetwear look or stay true for a fitted feel.
            </p>

            {/* Table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {['Size', 'Chest', 'Length'].map((h) => (
                      <th
                        key={h}
                        style={{
                          fontFamily: "'Barlow Condensed', sans-serif",
                          fontWeight: 700,
                          fontSize: 11,
                          letterSpacing: 3,
                          textTransform: 'uppercase',
                          color: 'var(--text-dim)',
                          textAlign: 'left',
                          padding: '10px 12px',
                          borderBottom: '1px solid var(--border)',
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sizeChart.map((row) => (
                    <tr key={row.size}>
                      <td
                        style={{
                          fontFamily: "'Anton', sans-serif",
                          fontSize: 16,
                          color: 'var(--orange)',
                          padding: '10px 12px',
                          borderBottom: '1px solid var(--border)',
                        }}
                      >
                        {row.size}
                      </td>
                      <td
                        style={{
                          fontSize: 14,
                          color: 'var(--text)',
                          padding: '10px 12px',
                          borderBottom: '1px solid var(--border)',
                        }}
                      >
                        {row.chest}
                      </td>
                      <td
                        style={{
                          fontSize: 14,
                          color: 'var(--text)',
                          padding: '10px 12px',
                          borderBottom: '1px solid var(--border)',
                        }}
                      >
                        {row.length}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: 11, marginTop: 16 }}>
              Need help? WhatsApp us your height & weight — we'll pick the perfect size for you.
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
