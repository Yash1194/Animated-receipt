// Receipt Templates & Presets Data
export const RECEIPT_PRESETS = [
  {
    id: 'cyberpunk-cafe',
    name: '☕ Neo-Tokyo Cafe & Bakery',
    category: 'Food & Beverage',
    storeName: 'NEO-TOKYO CAFE',
    tagline: 'Cybernetic Brews & Artisanal Pastries',
    address: 'Shibuya Crossing #2077, Tokyo',
    phone: '+81 (0)3 5489 9000',
    taxRate: 8,
    currency: '$',
    items: [
      { id: '1', name: 'Matcha Nitro Cold Brew', qty: 2, price: 6.50 },
      { id: '2', name: 'Sakura Mochi Croissant', qty: 1, price: 5.75 },
      { id: '3', name: 'Cyberpunk Espresso Shot', qty: 2, price: 4.00 },
      { id: '4', name: 'Yuzu Honey Soufflé Pancake', qty: 1, price: 12.50 },
    ],
    paymentMethod: 'Apple Pay (•••• 8920)',
    cashier: 'Rei Ayanami',
    stamp: 'INVOICE PAID',
    paperSkin: 'classic'
  },
  {
    id: 'saas-cloud',
    name: '🚀 Aether SaaS & AI Compute',
    category: 'Tech Infrastructure',
    storeName: 'AETHER NETWORKS INC.',
    tagline: 'Autonomous AI Cloud & Token Infrastructure',
    address: '500 Howard St, San Francisco, CA',
    phone: '+1 (800) 555-AETHER',
    taxRate: 5,
    currency: '$',
    items: [
      { id: '1', name: 'GPU Cluster (128x H100) - 24 hrs', qty: 1, price: 1840.00 },
      { id: '2', name: 'Neural API Tokens (50M Req)', qty: 1, price: 450.00 },
      { id: '3', name: 'Quantum Vector Database Node', qty: 2, price: 299.00 },
      { id: '4', name: 'Enterprise SLA & Support Tier', qty: 1, price: 250.00 }
    ],
    paymentMethod: 'Corporate Visa (•••• 4109)',
    cashier: 'Auto-Billing Robot',
    stamp: 'APPROVED',
    paperSkin: 'cyber'
  },
  {
    id: 'omakase-sushi',
    name: '🍣 Ginza Omakase Lounge',
    category: 'Fine Dining',
    storeName: 'GINZA SUKEYABASHI OMAKASE',
    tagline: 'Authentic Edomae Sushi & Rare Sake',
    address: '4-2-15 Ginza, Chuo-ku, Tokyo',
    phone: '+81 3 3535 1100',
    taxRate: 10,
    currency: '$',
    items: [
      { id: '1', name: 'Chef Omakase 18-Course', qty: 2, price: 245.00 },
      { id: '2', name: 'Otoro Nigiri (Bluefin Belly)', qty: 2, price: 28.00 },
      { id: '3', name: 'Dassai 23 Junmai Daiginjo (720ml)', qty: 1, price: 180.00 },
      { id: '4', name: 'Uni & Caviar Handroll', qty: 2, price: 32.00 }
    ],
    paymentMethod: 'Amex Platinum (•••• 1007)',
    cashier: 'Master Chef Jiro',
    stamp: 'INVOICE PAID',
    paperSkin: 'vintage'
  },
  {
    id: 'cyber-arcade',
    name: '🎮 Hologram Cyber Arcade',
    category: 'Entertainment',
    storeName: 'NEON MATRIX ARCADE',
    tagline: 'VR Gaming, Retro Cabinets & Synthwave',
    address: '88 Cyber Way, Sector 7',
    phone: '+1 (555) 019-2077',
    taxRate: 7,
    currency: '$',
    items: [
      { id: '1', name: 'VIP Full-Immersion VR Pass', qty: 3, price: 45.00 },
      { id: '2', name: 'Arcade Token Pouch (500x)', qty: 2, price: 35.00 },
      { id: '3', name: 'Neon Plasma Energy Elixir', qty: 4, price: 8.50 },
      { id: '4', name: 'Holographic Collectible Card', qty: 1, price: 15.00 }
    ],
    paymentMethod: 'Crypto Wallet (Solana)',
    cashier: 'AI Operator #404',
    stamp: 'VIP ACCESS',
    paperSkin: 'blueprint'
  },
  {
    id: 'luxury-boutique',
    name: '🛍️ Phantom Streetwear Atelier',
    category: 'Luxury Fashion',
    storeName: 'PHANTOM ATELIER PARIS',
    tagline: 'High Fashion & Limited Cyberwear',
    address: '12 Rue du Faubourg Saint-Honoré, Paris',
    phone: '+33 1 42 68 00 00',
    taxRate: 20,
    currency: '$',
    items: [
      { id: '1', name: 'Heavyweight Cyber Hoodie (Black)', qty: 1, price: 380.00 },
      { id: '2', name: 'Tactical Modular Cargo Pants', qty: 1, price: 290.00 },
      { id: '3', name: 'Chrome Hologram High-Tops', qty: 1, price: 650.00 },
      { id: '4', name: 'Titanium Keyring Pendant', qty: 1, price: 120.00 }
    ],
    paymentMethod: 'Mastercard Black (•••• 9981)',
    cashier: 'Jean-Luc S.',
    stamp: 'CONFIDENTIAL',
    paperSkin: 'gold'
  }
];

export const STAMP_OPTIONS = [
  { id: 'INVOICE PAID', label: 'INVOICE PAID', color: '#ef4444' },
  { id: 'APPROVED', label: 'APPROVED', color: '#10b981' },
  { id: 'CONFIDENTIAL', label: 'CONFIDENTIAL', color: '#8b5cf6' },
  { id: 'TOP SECRET', label: 'TOP SECRET', color: '#f59e0b' },
  { id: 'REFUNDED', label: 'REFUNDED', color: '#6b7280' },
  { id: 'VIP ACCESS', label: 'VIP ACCESS', color: '#ec4899' }
];

export const PAPER_SKINS = [
  { id: 'classic', name: 'Classic Thermal', desc: 'Authentic off-white paper' },
  { id: 'cyber', name: 'Cyber Neon', desc: 'Dark obsidian with glowing cyan ink' },
  { id: 'blueprint', name: 'Blueprint Tech', desc: 'Architectural blue layout' },
  { id: 'vintage', name: 'Vintage Parchment', desc: 'Warm aged paper feel' },
  { id: 'gold', name: 'Gold Foil Edition', desc: 'Luxurious dark gold finish' }
];

export function generateTransactionId() {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = 'TXN-';
  for (let i = 0; i < 10; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
