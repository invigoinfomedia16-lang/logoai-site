import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        bricolage: ['var(--font-sora)', 'var(--font-inter)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
        sora: ['var(--font-sora)', 'sans-serif'],
      },
      colors: {
        primary: '#336AEA',
        'primary-hover': 'rgba(51, 106, 234, 0.85)',
        dark: '#0D0D0D',
      },
      borderColor: {
        DEFAULT: 'rgba(84, 87, 94, 0.3)',
      },
      keyframes: {
        logoFade: {
          to: { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          from: { opacity: '0', transform: 'translateY(-60px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        spotlight: {
          '0%': { opacity: '0', transform: 'translate(-72%, -62%) scale(0.5)' },
          '100%': { opacity: '1', transform: 'translate(-50%,-40%) scale(1)' },
        },
      },
      animation: {
        logoFade: 'logoFade 0.5s cubic-bezier(0.23,1,0.32,1) forwards',
        fadeUp: 'fadeUp 0.7s cubic-bezier(0.23,1,0.32,1) forwards',
        slideIn: 'slideIn 0.6s cubic-bezier(0.23,1,0.32,1) forwards',
        marquee: 'marquee 30s linear infinite',
        spotlight: 'spotlight 2s ease 0.75s 1 forwards',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.23,1,0.32,1)',
      },
    },
  },
  plugins: [],
}
export default config
