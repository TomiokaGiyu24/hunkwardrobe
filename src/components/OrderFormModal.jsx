import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function OrderFormModal({ isOpen, onClose, onSubmit, productName }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    houseNo: '',
    landmark: '',
    city: '',
    state: '',
    pincode: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    else if (formData.phone.length < 10) newErrors.phone = 'Invalid phone number';
    if (!formData.houseNo) newErrors.houseNo = 'House NO./Building is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.pincode) newErrors.pincode = 'Pincode is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

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
              background: 'rgba(0,0,0,0.8)',
              backdropFilter: 'blur(10px)',
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
              maxWidth: 560,
              maxHeight: '90vh',
              overflowY: 'auto',
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: 24,
              zIndex: 101,
              boxShadow: '0 30px 60px rgba(0,0,0,0.6)',
            }}
            className="hide-scrollbar"
          >
            {/* Header */}
            <div
              style={{
                position: 'sticky',
                top: 0,
                background: 'rgba(15,15,26,0.9)',
                backdropFilter: 'blur(12px)',
                padding: '24px 32px',
                borderBottom: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                zIndex: 10,
              }}
            >
              <div>
                <h3
                  style={{
                    fontFamily: "'Anton', sans-serif",
                    fontSize: 28,
                    color: 'var(--text)',
                    lineHeight: 1,
                    textTransform: 'uppercase',
                  }}
                >
                  Shipping Details
                </h3>
                {productName && (
                  <p style={{ color: 'var(--text-dim)', fontSize: 13, marginTop: 4 }}>
                    Ordering: <span style={{ color: 'var(--text)' }}>{productName}</span>
                  </p>
                )}
              </div>
              <button
                onClick={onClose}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  border: '1px solid var(--border)',
                  background: 'var(--bg-elevated)',
                  color: 'var(--text-dim)',
                  fontSize: 18,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--text)';
                  e.currentTarget.style.borderColor = 'var(--text-dim)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-dim)';
                  e.currentTarget.style.borderColor = 'var(--border)';
                }}
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <div style={{ padding: '32px' }}>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                
                {/* Name & Phone */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <InputGroup
                    label="Full Name *"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                    placeholder="John Doe"
                  />
                  <InputGroup
                    label="Phone Number *"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    error={errors.phone}
                    placeholder="+91 99999 99999"
                    type="tel"
                  />
                </div>

                <InputGroup
                  label="Email Address (Optional)"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  placeholder="john@example.com"
                  type="email"
                />

                {/* Address Line 1 */}
                <InputGroup
                  label="House No. / Building / Flat *"
                  name="houseNo"
                  value={formData.houseNo}
                  onChange={handleChange}
                  error={errors.houseNo}
                  placeholder="123, Block A, Horizon Apartments"
                />

                {/* Address Line 2 */}
                <InputGroup
                  label="Landmark / Area (Optional)"
                  name="landmark"
                  value={formData.landmark}
                  onChange={handleChange}
                  error={errors.landmark}
                  placeholder="Near Central Park"
                />

                {/* City & State */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <InputGroup
                    label="City *"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    error={errors.city}
                    placeholder="Mumbai"
                  />
                  <InputGroup
                    label="State *"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    error={errors.state}
                    placeholder="Maharashtra"
                  />
                </div>

                {/* Pincode */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <InputGroup
                    label="Pincode *"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    error={errors.pincode}
                    placeholder="400001"
                  />
                </div>

                <div style={{ marginTop: 12 }}>
                  <button type="submit" className="btn-whatsapp" style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: 16 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Continue to WhatsApp
                  </button>
                  <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 16, textAlign: 'center', lineHeight: 1.5 }}>
                    Your details will be formatted and securely pasted into WhatsApp so you can easily complete your order.
                  </p>
                </div>
              </form>
            </div>
          </motion.div>

          {/* Quick responsive styles for mobile */}
          <style>{`
            @media (max-width: 600px) {
              .hide-scrollbar > div:last-child > form > div[style*="grid-template-columns"] {
                grid-template-columns: 1fr !important;
              }
            }
          `}</style>
        </>
      )}
    </AnimatePresence>
  );
}

// Sub-component for form inputs to keep it clean
function InputGroup({ label, name, value, onChange, error, placeholder, type = 'text' }) {
  const [focused, setFocused] = useState(false);
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 700,
          fontSize: 13,
          letterSpacing: 1,
          textTransform: 'uppercase',
          color: focused ? 'var(--orange)' : 'var(--text-dim)',
          transition: 'color 0.3s ease',
        }}
        htmlFor={name}
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: `1px solid ${error ? '#ff4a4a' : (focused ? 'var(--orange)' : 'rgba(255,255,255,0.08)')}`,
          borderRadius: 12,
          padding: '14px 16px',
          color: 'var(--text)',
          fontSize: 15,
          outline: 'none',
          transition: 'all 0.3s ease',
          boxShadow: focused ? '0 0 0 4px rgba(254, 74, 34, 0.1)' : 'none',
        }}
      />
      {error && (
        <span style={{ color: '#ff4a4a', fontSize: 12, marginTop: 2 }}>
          {error}
        </span>
      )}
    </div>
  );
}
