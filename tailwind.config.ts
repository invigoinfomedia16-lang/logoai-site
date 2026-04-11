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
        bricolage: ['var(--font-bricolage)', 'sans-serif'],
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
      },
      animation: {
        logoFade: 'logoFade 0.5s cubic-bezier(0.23,1,0.32,1) forwards',
        fadeUp: 'fadeUp 0.7s cubic-bezier(0.23,1,0.32,1) forwards',
        slideIn: 'slideIn 0.6s cubic-bezier(0.23,1,0.32,1) forwards',
        marquee: 'marquee 30s linear infinite',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.23,1,0.32,1)',
      },
    },
  },
  plugins: [],
}
export default config
