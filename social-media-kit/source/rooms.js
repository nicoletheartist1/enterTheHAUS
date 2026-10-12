// Room data and icons, copied from the live Hub (src/pages/Hub.tsx, src/components/RoomIcons.tsx)
window.ROOMS = [
  { id: 'vision', num: '01', name: 'VISION', sub: 'Brand Design Studio', color: '#1A3C8F', ink: '#FFFFFF',
    desc: "Identity, web design, logos, strategy decks, SEO resource kits, and concept development. Built for the woman with a vision who's done waiting.",
    url: 'vision.enterthehaus.co' },
  { id: 'glam', num: '02', name: 'GLAM', sub: 'Wellness-Informed Pro Artistry', color: '#C2185B', ink: '#C1FF1A',
    desc: "Signature Glam, Full Glam, Bridal, Prom, reset days, and monthly retainers. Services starting at $40. She'll do your face and marry you too.",
    url: 'thehausglam.beauty' },
  { id: 'frequency', num: '03', name: 'FREQUENCY', sub: 'Music & Worship', color: '#6F00FF', ink: '#FFFFFF',
    desc: 'Live piano, worship direction, choir direction, original compositions, and custom music for weddings and milestones. Every note is an act of worship.',
    url: 'enterthehaus.co/frequency' },
  { id: 'stillher', num: '04', name: 'stillHER', sub: 'Handcrafted Jewelry', color: '#7B2D5E', ink: '#89CFF0',
    desc: 'The signature clickety-clack charm bracelet — sterling silver, rhinestone & a/b crystal charms, made in any color you want. She is still that woman.',
    url: 'enterthehaus.co/stillher' },
];

window.roomIcon = function (id, size, stroke, accent) {
  const s = `width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"`;
  if (id === 'vision') return `<svg ${s}><rect x="2" y="4" width="20" height="16" stroke="${stroke}" stroke-width="1.5"/><circle cx="12" cy="12" r="3" stroke="${stroke}" stroke-width="1.5"/><path d="M12 2V4M12 20V22M2 12H4M20 12H22" stroke="${stroke}" stroke-width="1.2" stroke-linecap="square"/></svg>`;
  if (id === 'glam') return `<svg ${s}><path d="M4 4L20 20M20 4L4 20" stroke="${stroke}" stroke-width="2" stroke-linecap="square"/><circle cx="12" cy="6" r="1.5" fill="${accent || '#C1FF1A'}"/><circle cx="12" cy="18" r="1.5" fill="${accent || '#C1FF1A'}"/></svg>`;
  if (id === 'frequency') return `<svg ${s}>${[[4,10,14],[8,6,18],[12,3,21],[16,7,17],[20,11,13]].map(([x,a,b]) => `<path d="M${x} ${a}V${b}" stroke="${stroke}" stroke-width="2" stroke-linecap="square"/>`).join('')}</svg>`;
  return `<svg ${s}><rect x="4" y="9" width="11" height="6" rx="3" stroke="${stroke}" stroke-width="2"/><rect x="9" y="9" width="11" height="6" rx="3" stroke="${accent || '#89CFF0'}" stroke-width="2"/></svg>`;
};

// Fill every [data-room-icon="id|size|stroke|accent"] placeholder
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-room-icon]').forEach(el => {
    const [id, size, stroke, accent] = el.dataset.roomIcon.split('|');
    el.innerHTML = roomIcon(id, size, stroke, accent);
  });
});
