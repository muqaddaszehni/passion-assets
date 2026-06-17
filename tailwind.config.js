/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0E1B2E',
        ivory: '#F7F4EE',
        brass: '#B0904F',
        charcoal: '#1C1C1C',
        hairline: '#D8D2C6',
        // muted category palette
        cat: {
          art: '#2A3A52',
          watches: '#B0904F',
          wine: '#7A3B47',
          autos: '#4A5A4E',
          realestate: '#9C8B6E',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        label: '0.18em',
      },
      boxShadow: {
        card: '0 1px 2px rgba(14, 27, 46, 0.04), 0 8px 24px rgba(14, 27, 46, 0.05)',
        plate: '0 1px 3px rgba(14, 27, 46, 0.10)',
      },
      maxWidth: {
        register: '1180px',
      },
    },
  },
  plugins: [],
}
