import { memo } from 'react';

const sizeMap = {
  sm: { width: 120, height: 140 },
  md: { width: 180, height: 210 },
  lg: { width: 260, height: 300 },
  xl: { width: 340, height: 390 },
};

function JerseySVG({ primaryColor = '#552583', accentColor = '#FDB927', number = 23, lastName = 'JAMES', edition = 'Icon', size = 'md', hovered = false }) {
  const dim = sizeMap[size] || sizeMap.md;
  const w = dim.width;
  const h = dim.height;
  const scale = w / 260;
  const numberSize = Math.round(72 * scale);
  const nameSize = Math.round(11 * scale);
  const editionSize = Math.round(7 * scale);

  // Determine if primary is light to choose text colors
  const isLightPrimary = isLightColor(primaryColor);
  const textColor = isLightPrimary ? accentColor : '#FFFFFF';
  const nameOnBack = isLightPrimary ? accentColor : 'rgba(255,255,255,0.9)';

  return (
    <svg 
      width={w} 
      height={h} 
      viewBox="0 0 260 300" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.4))', transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)' }}
    >
      <defs>
        {/* Fabric texture */}
        <filter id={`fabric-${number}-${edition}`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise" />
          <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
          <feBlend in="SourceGraphic" in2="grayNoise" mode="overlay" />
        </filter>
        
        {/* Subtle inner glow */}
        <radialGradient id={`glow-${number}-${edition}`} cx="50%" cy="30%" r="60%">
          <stop offset="0%" stopColor={accentColor} stopOpacity="0.15" />
          <stop offset="100%" stopColor={primaryColor} stopOpacity="0" />
        </radialGradient>

        {/* Side panel gradient */}
        <linearGradient id={`side-${number}-${edition}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={accentColor} stopOpacity="0.2" />
          <stop offset="100%" stopColor={accentColor} stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {/* Jersey body shape — realistic silhouette */}
      <path
        d={`
          M 80 8
          C 80 8, 100 0, 130 0
          C 160 0, 180 8, 180 8
          L 220 30
          C 226 33, 232 42, 234 50
          L 252 108
          C 254 114, 252 118, 246 118
          L 210 108
          C 206 107, 204 110, 204 114
          L 204 270
          C 204 278, 200 286, 190 290
          C 180 296, 160 300, 130 300
          C 100 300, 80 296, 70 290
          C 60 286, 56 278, 56 270
          L 56 114
          C 56 110, 54 107, 50 108
          L 14 118
          C 8 118, 6 114, 8 108
          L 26 50
          C 28 42, 34 33, 40 30
          L 80 8
          Z
        `}
        fill={primaryColor}
        stroke={accentColor}
        strokeWidth="0.5"
        strokeOpacity="0.3"
      />

      {/* Inner glow overlay */}
      <path
        d={`
          M 80 8
          C 80 8, 100 0, 130 0
          C 160 0, 180 8, 180 8
          L 220 30
          C 226 33, 232 42, 234 50
          L 252 108
          C 254 114, 252 118, 246 118
          L 210 108
          C 206 107, 204 110, 204 114
          L 204 270
          C 204 278, 200 286, 190 290
          C 180 296, 160 300, 130 300
          C 100 300, 80 296, 70 290
          C 60 286, 56 278, 56 270
          L 56 114
          C 56 110, 54 107, 50 108
          L 14 118
          C 8 118, 6 114, 8 108
          L 26 50
          C 28 42, 34 33, 40 30
          L 80 8
          Z
        `}
        fill={`url(#glow-${number}-${edition})`}
      />

      {/* Left side panel */}
      <path
        d="M 56 114 L 56 270 C 56 278, 60 286, 70 290 C 72 291, 74 292, 76 293 L 76 114 Z"
        fill={`url(#side-${number}-${edition})`}
      />

      {/* Right side panel */}
      <path
        d="M 204 114 L 204 270 C 204 278, 200 286, 190 290 C 188 291, 186 292, 184 293 L 184 114 Z"
        fill={`url(#side-${number}-${edition})`}
      />

      {/* Collar */}
      <path
        d="M 100 8 C 100 8, 115 14, 130 14 C 145 14, 160 8, 160 8 L 160 4 C 160 4, 145 10, 130 10 C 115 10, 100 4, 100 4 Z"
        fill={accentColor}
        fillOpacity="0.8"
      />

      {/* Left sleeve trim */}
      <line x1="56" y1="108" x2="26" y2="50" stroke={accentColor} strokeWidth="2" strokeOpacity="0.5" />
      
      {/* Right sleeve trim */}
      <line x1="204" y1="108" x2="234" y2="50" stroke={accentColor} strokeWidth="2" strokeOpacity="0.5" />

      {/* Hemline curve */}
      <path
        d="M 70 290 C 80 296, 100 300, 130 300 C 160 300, 180 296, 190 290"
        fill="none"
        stroke={accentColor}
        strokeWidth="1.5"
        strokeOpacity="0.4"
      />

      {/* Player number */}
      <text
        x="130"
        y="175"
        textAnchor="middle"
        fontFamily="'Anton', sans-serif"
        fontSize={numberSize}
        fill={textColor}
        style={{ 
          transition: 'opacity 0.3s ease',
          opacity: hovered ? 0.9 : 1,
        }}
      >
        {number}
      </text>

      {/* Player name */}
      <text
        x="130"
        y="210"
        textAnchor="middle"
        fontFamily="'Barlow Condensed', sans-serif"
        fontWeight="700"
        fontSize={nameSize}
        letterSpacing="3"
        fill={nameOnBack}
        opacity="0.85"
      >
        {lastName}
      </text>

      {/* Edition badge */}
      <rect x="95" y="255" width="70" height="16" rx="8" fill={accentColor} fillOpacity="0.15" stroke={accentColor} strokeWidth="0.5" strokeOpacity="0.3" />
      <text
        x="130"
        y="266"
        textAnchor="middle"
        fontFamily="'Barlow Condensed', sans-serif"
        fontWeight="700"
        fontSize={editionSize}
        letterSpacing="1.5"
        fill={textColor}
        opacity="0.6"
      >
        {edition.toUpperCase()}
      </text>
    </svg>
  );
}

function isLightColor(hex) {
  const c = hex.replace('#', '');
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6;
}

export default memo(JerseySVG);
