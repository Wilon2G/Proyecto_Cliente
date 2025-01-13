import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontSize: {
        h1: '3xl',
        h2: '2xl',
        h3: 'xl',
      },
      colors: {
        // Tema oscuro
        primaryDark: '#151a2d',
        highlightDark: '#1f253d',
        textDark: '#e6e6e6',
        textDarkHighlight: '#f3f4f6',
        // Tema claro
        primaryLight: '#ffffff',
        highlightLight: '#f3f4f6',
        textLight: '#1f253d',
        textLightHighlight: '#151a2d',
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji',
        ],
      },
    },
  },
  plugins: [],
} satisfies Config;
