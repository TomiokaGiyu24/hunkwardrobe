// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// HUNK WARDROBE — Jersey Data (Only real images)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const jerseysData = [
  {
    category: "jersey",
    id: "lbj-lakers-association",
    player: "LeBron James",
    lastName: "JAMES",
    number: 23,
    team: "Lakers",
    teamFull: "Los Angeles Lakers",
    city: "Los Angeles",
    conference: "Western",
    edition: "Association",
    price: 1299,
    primaryColor: "#FFFFFF",
    accentColor: "#552583",
    teamColor: "#552583",
    secondaryColor: "#FDB927",
    isNew: false,
    image: "/jerseys/lebron-james-lakers-white.png",
    teamLogo: "/team logos/losangeles-lakers.webp",
    stats: { ppg: 28.4, apg: 7.3, rpg: 8.1 },
    position: "SF",
    description: "The King's association edition. Clean white with purple and gold accents — timeless Lakers energy for the greatest to ever do it."
  },
  {
    id: "lbj-lakers-icon",
    player: "LeBron James",
    lastName: "JAMES",
    number: 23,
    team: "Lakers",
    teamFull: "Los Angeles Lakers",
    city: "Los Angeles",
    conference: "Western",
    edition: "Icon",
    price: 1499,
    primaryColor: "#FDB927",
    accentColor: "#552583",
    teamColor: "#552583",
    secondaryColor: "#FDB927",
    isNew: true,
    image: "/jerseys/lebron-james-lakers-yellow.png",
    teamLogo: "/team logos/losangeles-lakers.webp",
    stats: { ppg: 28.4, apg: 7.3, rpg: 8.1 },
    position: "SF",
    description: "The iconic gold. LeBron in Showtime yellow — a jersey that screams legacy. This is the one you wear to make a statement."
  },
  {
    id: "curry-warriors-statement",
    player: "Stephen Curry",
    lastName: "CURRY",
    number: 30,
    team: "Warriors",
    teamFull: "Golden State Warriors",
    city: "San Francisco",
    conference: "Western",
    edition: "Statement",
    price: 1499,
    primaryColor: "#1D428A",
    accentColor: "#FFC72C",
    teamColor: "#1D428A",
    secondaryColor: "#FFC72C",
    isNew: true,
    image: "/jerseys/curry-warriors-blue.png",
    teamLogo: "/team logos/golden-state-warriors.webp",
    stats: { ppg: 29.4, apg: 6.3, rpg: 5.5 },
    position: "PG",
    description: "The dynasty blue. Curry in Warriors statement edition — deep blue and championship gold. Splash Brothers forever."
  },
  {
    id: "booker-suns-city",
    player: "Devin Booker",
    lastName: "BOOKER",
    number: 1,
    team: "Suns",
    teamFull: "Phoenix Suns",
    city: "Phoenix",
    conference: "Western",
    edition: "City Edition",
    price: 1599,
    primaryColor: "#E56020",
    accentColor: "#1D1160",
    teamColor: "#1D1160",
    secondaryColor: "#E56020",
    isNew: true,
    image: "/jerseys/devin-booker-suns-blue.png",
    teamLogo: "/team logos/phoenix-suns.webp",
    stats: { ppg: 27.1, apg: 6.9, rpg: 4.5 },
    position: "SG",
    description: "Valley vibes. Booker in the iconic blue city edition — Phoenix heat materialized."
  },
  {
    id: "harden-rockets-icon",
    player: "James Harden",
    lastName: "HARDEN",
    number: 13,
    team: "Rockets",
    teamFull: "Houston Rockets",
    city: "Houston",
    conference: "Western",
    edition: "Icon",
    price: 1399,
    primaryColor: "#CE1141",
    accentColor: "#000000",
    teamColor: "#CE1141",
    secondaryColor: "#000000",
    isNew: false,
    image: "/jerseys/harden-rockets-red.png",
    teamLogo: "/team logos/houston-rockets.webp",
    stats: { ppg: 34.3, apg: 7.5, rpg: 6.6 },
    position: "SG",
    description: "Beard mode. The classic Rockets red — legendary step-backs and unguardable offense."
  },
  {
    id: "ja-grizzlies-city",
    player: "Ja Morant",
    lastName: "MORANT",
    number: 12,
    team: "Grizzlies",
    teamFull: "Memphis Grizzlies",
    city: "Memphis",
    conference: "Western",
    edition: "City Edition",
    price: 1499,
    primaryColor: "#E31837",
    accentColor: "#12173F",
    teamColor: "#E31837",
    secondaryColor: "#5D76A9",
    isNew: true,
    image: "/jerseys/ja-morant-red.png",
    teamLogo: "/team logos/memphis-grizzlies.webp",
    stats: { ppg: 25.1, apg: 8.2, rpg: 5.6 },
    position: "PG",
    description: "Vancouver throwback red. Ja's alternate edition — built for highlight reels and pure electricity."
  },
  {
    id: "embiid-sixers-statement",
    player: "Joel Embiid",
    lastName: "EMBIID",
    number: 21,
    team: "76ers",
    teamFull: "Philadelphia 76ers",
    city: "Philadelphia",
    conference: "Eastern",
    edition: "Statement",
    price: 1399,
    primaryColor: "#006BB6",
    accentColor: "#ED174C",
    teamColor: "#006BB6",
    secondaryColor: "#ED174C",
    isNew: false,
    image: "/jerseys/joel-embid-sixers-blue.png",
    teamLogo: "/team logos/philadelphia-76ers.webp",
    stats: { ppg: 33.1, apg: 4.2, rpg: 10.2 },
    position: "C",
    description: "Trust the Process. Embiid in the deep blue Sixers statement edition — MVP dominance."
  },
  {
    id: "luka-mavs-icon",
    player: "Luka Doncic",
    lastName: "DONCIC",
    number: 77,
    team: "Mavericks",
    teamFull: "Dallas Mavericks",
    city: "Dallas",
    conference: "Western",
    edition: "Icon",
    price: 1399,
    primaryColor: "#00538C",
    accentColor: "#FFFFFF",
    teamColor: "#00538C",
    secondaryColor: "#002B5E",
    isNew: false,
    image: "/jerseys/luka-blue.png",
    teamLogo: "/team logos/dalllas-mavericks.webp",
    stats: { ppg: 33.9, apg: 9.8, rpg: 9.2 },
    position: "PG",
    description: "Deep Dallas blue. Luka's icon edition — the jersey that's been to the Finals. Generational talent, generational drip."
  },
  {
    id: "luka-mavs-city",
    player: "Luka Doncic",
    lastName: "DONCIC",
    number: 77,
    team: "Mavericks",
    teamFull: "Dallas Mavericks",
    city: "Dallas",
    conference: "Western",
    edition: "City Edition",
    price: 1599,
    primaryColor: "#FFC72C",
    accentColor: "#00538C",
    teamColor: "#FFC72C",
    secondaryColor: "#00538C",
    isNew: true,
    image: "/jerseys/luka-yellow.png",
    teamLogo: "/team logos/dalllas-mavericks.webp",
    stats: { ppg: 33.9, apg: 9.8, rpg: 9.2 },
    position: "PG",
    description: "Golden magic. Luka's vivid yellow edition — unguardable stepbacks and pure showmanship."
  },
  {
    id: "lavine-bulls-association",
    player: "Zach LaVine",
    lastName: "LAVINE",
    number: 8,
    team: "Bulls",
    teamFull: "Chicago Bulls",
    city: "Chicago",
    conference: "Eastern",
    edition: "Association",
    price: 1299,
    primaryColor: "#FFFFFF",
    accentColor: "#CE1141",
    teamColor: "#CE1141",
    secondaryColor: "#000000",
    isNew: false,
    image: "/jerseys/zach-lavine-white.png",
    teamLogo: "/team logos/chicago-bulls.webp",
    stats: { ppg: 24.8, apg: 4.2, rpg: 4.5 },
    position: "SG",
    description: "Windy City white. Bulls association edition — where high-flying athleticism meets historic threads."
  }
];

const polosData = [
  {
    id: "polo-classic-black",
    category: "polo",
    player: "Classic Collection",
    lastName: "CLASSIC",
    team: "Hunk",
    teamFull: "Hunk Wardrobe Originals",
    city: "Global",
    price: 999,
    primaryColor: "#000000",
    accentColor: "#FFFFFF",
    isNew: true,
    image: "/polos/black-polo.png",
    description: "The essential black polo. Breathable athletic fit with a minimal embroidered chest logo."
  },
  {
    id: "polo-court-white",
    category: "polo",
    player: "Court Collection",
    lastName: "COURT",
    team: "Hunk",
    teamFull: "Hunk Wardrobe Originals",
    city: "Global",
    price: 999,
    primaryColor: "#FFFFFF",
    accentColor: "#E03A3E",
    isNew: false,
    image: "/polos/white-polo.png",
    description: "Crisp white polo designed for the golf course or courtside viewing. Moisture-wicking fabric."
  },
  {
    id: "polo-sport-navy",
    category: "polo",
    player: "Sport Collection",
    lastName: "SPORT",
    team: "Hunk",
    teamFull: "Hunk Wardrobe Athletics",
    city: "Global",
    price: 1099,
    primaryColor: "#1B2A4A",
    accentColor: "#FDB927",
    isNew: true,
    image: "/polos/navy-polo.png",
    description: "Deep navy sport polo with contrast stitching. Performance stretch fabric for all-day comfort."
  },
  {
    id: "polo-athletic-green",
    category: "polo",
    player: "Athletic Collection",
    lastName: "ATHLETIC",
    team: "Hunk",
    teamFull: "Hunk Wardrobe Athletics",
    city: "Global",
    price: 1099,
    primaryColor: "#2D5A27",
    accentColor: "#FFFFFF",
    isNew: false,
    image: "/polos/green-polo.png",
    description: "Forest green athletic polo. Quick-dry technology meets sophisticated street style."
  }
];

const tshirtsData = [
  {
    id: "tee-vintage-washed",
    category: "tshirt",
    player: "Street Collection",
    lastName: "STREET",
    team: "Hunk",
    teamFull: "Hunk Wardrobe Streetwear",
    city: "Los Angeles",
    price: 799,
    primaryColor: "#333333",
    accentColor: "#F58426",
    isNew: true,
    image: "/tshirts/washed-tee.png",
    description: "Heavyweight vintage washed graphic tee. Drop shoulder fit for the ultimate streetwear silhouette."
  },
  {
    id: "tee-essential-white",
    category: "tshirt",
    player: "Essential Collection",
    lastName: "ESSENTIAL",
    team: "Hunk",
    teamFull: "Hunk Wardrobe Basics",
    city: "Global",
    price: 699,
    primaryColor: "#FFFFFF",
    accentColor: "#000000",
    isNew: false,
    image: "/tshirts/white-tee.png",
    description: "The perfect fitting white t-shirt. 100% organic cotton, preshrunk, tailored athletic fit."
  },
  {
    id: "tee-signature-black",
    category: "tshirt",
    player: "Signature Collection",
    lastName: "SIGNATURE",
    team: "Hunk",
    teamFull: "Hunk Wardrobe Signature",
    city: "Mumbai",
    price: 899,
    primaryColor: "#0A0A0A",
    accentColor: "#FE4A22",
    isNew: true,
    image: "/tshirts/black-tee.png",
    description: "Premium black tee with embossed chest logo. 280 GSM heavyweight cotton, boxy contemporary fit."
  },
  {
    id: "tee-oversized-olive",
    category: "tshirt",
    player: "Oversized Collection",
    lastName: "OVERSIZED",
    team: "Hunk",
    teamFull: "Hunk Wardrobe Streetwear",
    city: "Delhi",
    price: 849,
    primaryColor: "#4A5D23",
    accentColor: "#D4C5A9",
    isNew: false,
    image: "/tshirts/olive-tee.png",
    description: "Olive drab oversized tee. Military-inspired colorway, relaxed drop shoulder, raw hem finish."
  }
];

export const products = [...jerseysData.map(j => ({...j, category: 'jersey'})), ...polosData, ...tshirtsData];



export const featuredPlayers = [
  { name: "LeBron James", team: "Lakers", number: 23, teamColor: "#552583", accentColor: "#FDB927", teamLogo: "/team logos/losangeles-lakers.webp" },
  { name: "Stephen Curry", team: "Warriors", number: 30, teamColor: "#1D428A", accentColor: "#FFC72C", teamLogo: "/team logos/golden-state-warriors.webp" },
  { name: "Devin Booker", team: "Suns", number: 1, teamColor: "#1D1160", accentColor: "#E56020", teamLogo: "/team logos/phoenix-suns.webp" },
  { name: "James Harden", team: "Rockets", number: 13, teamColor: "#CE1141", accentColor: "#000000", teamLogo: "/team logos/houston-rockets.webp" },
  { name: "Ja Morant", team: "Grizzlies", number: 12, teamColor: "#5D76A9", accentColor: "#12173F", teamLogo: "/team logos/memphis-grizzlies.webp" },
  { name: "Joel Embiid", team: "76ers", number: 21, teamColor: "#006BB6", accentColor: "#ED174C", teamLogo: "/team logos/philadelphia-76ers.webp" },
  { name: "Luka Doncic", team: "Mavericks", number: 77, teamColor: "#00538C", accentColor: "#002B5E", teamLogo: "/team logos/dalllas-mavericks.webp" },
  { name: "Zach LaVine", team: "Bulls", number: 8, teamColor: "#CE1141", accentColor: "#000000", teamLogo: "/team logos/chicago-bulls.webp" },
];

export const editions = ["Association", "Icon", "Statement", "City Edition", "Classic"];



export function getUniquePlayers() {
  return [...new Set(products.filter(p => !!p.player && p.category === 'jersey').map(p => p.player))].sort();
}

export function getRelatedProducts(currentProduct, limit = 4) {
  const { id, category, player } = currentProduct;
  let related = products.filter(p => p.category === category && p.id !== id);
  // Prefer same player first
  let playerMatch = related.filter(p => p.player === player);
  if (playerMatch.length > 0) return playerMatch.slice(0, limit);
  return related.slice(0, limit);
}

export function getPlayerEditions(playerName) {
  return products.filter(p => p.player === playerName && p.category === 'jersey');
}
