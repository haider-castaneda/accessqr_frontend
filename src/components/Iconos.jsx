const base = {
  width: 19,
  height: 19,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.9,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}
 
export const IcoPersonas = () => (
  <svg {...base}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)
 
export const IcoReloj = () => (
  <svg {...base}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
)
 
export const IcoMovimiento = () => (
  <svg {...base}>
    <path d="M3 12h13" />
    <path d="m12 6 6 6-6 6" />
    <path d="M21 4v16" />
  </svg>
)
 
export const IcoCheck = () => (
  <svg {...base}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
)
