export default function Ticker() {
  const teams = [
    'LAKERS', 'WARRIORS', 'CELTICS', 'BUCKS', 'HEAT',
    'SUNS', 'MAVERICKS', 'NUGGETS', 'GRIZZLIES', 'THUNDER',
    'CLIPPERS', 'PELICANS', 'TIMBERWOLVES', 'NETS', 'KNICKS',
    'BULLS', 'SIXERS', 'RAPTORS', 'HAWKS', 'CAVALIERS',
  ];

  const items = [...teams, ...teams]; // double for seamless loop

  return (
    <div className="ticker-wrapper">
      <div className="ticker-track">
        {items.map((team, i) => (
          <span key={i} className="ticker-item">
            {team}
            <span className="star">★</span>
          </span>
        ))}
      </div>
    </div>
  );
}
