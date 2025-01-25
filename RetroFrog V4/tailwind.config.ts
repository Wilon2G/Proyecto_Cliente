import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        'spin-pulse': 'spin 3.5s linear infinite, pulse 2s infinite',
      },
      colors: {
        primary: 'var(--primary)',
        'primary-hover': 'var(--primary-hover)',
        'primary-reverse': 'var(--primary-reverse)',
        'primary-hover-reverse': 'var(--primary-hover-reverse)',
        'gradient-from': 'var(--gradient-from)',
        'gradient-to': 'var(--gradient-to)',
        color: 'var(--color)',
        'color-reverse': 'var(--color-reverse)',
        'color-hover': 'var(--color-hover)',
        'icon-fill': 'var(--icon-fill)',
        'icon-fill-hover': 'var(--icon-fill-hover)',
        'icon-bg-hover': 'var(--icon-bg-hover)',
      },
      fontFamily: {
        'primary-font': 'var(--fontFamily)',
      },
      backgroundImage: {
        'image-bg': 'var(--bgImage)',
      },
    },
  },
  plugins: [],
} satisfies Config;
