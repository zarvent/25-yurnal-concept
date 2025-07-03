import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        // Core shadcn/ui system colors
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        // Yurnal Therapeutic Design System - Inspired by Headspace principles
        primary: {
          DEFAULT: '#2563EB', // Deep Blue - Trust & Focus (similar to Headspace's primary)
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
          950: '#172554',
        },

        secondary: {
          DEFAULT: '#64748B', // Slate - Professional & Calming
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
          950: '#020617',
        },

        // Therapeutic accent colors
        healing: {
          DEFAULT: '#10B981', // Emerald - Growth & Healing
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
          950: '#022C22',
        },

        warm: {
          DEFAULT: '#F59E0B', // Amber - Warmth & Energy
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
          950: '#451A03',
        },

        calm: {
          DEFAULT: '#8B5CF6', // Violet - Mindfulness & Calm
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
          950: '#2E1065',
        },

        // Ecosystem-specific colors
        patient: {
          DEFAULT: '#06B6D4', // Cyan - Hope & Support
          light: '#E0F7FA',
          dark: '#0E7490',
        },

        therapist: {
          DEFAULT: '#8B5CF6', // Violet - Wisdom & Professional Care
          light: '#F3F4F6',
          dark: '#5B21B6',
        },

        academic: {
          DEFAULT: '#059669', // Emerald - Knowledge & Growth
          light: '#ECFDF5',
          dark: '#047857',
        },

        student: {
          DEFAULT: '#DC2626', // Red - Energy & Learning
          light: '#FEF2F2',
          dark: '#991B1B',
        },

        // Semantic colors
        success: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444',
        info: '#3B82F6',

        // Legacy support
        'accent-calm': '#10B981',
        'accent-energetic': '#F59E0B',
        'neutral-dark': '#1F2937',
        'neutral-medium': '#6B7280',
        'neutral-light': '#F9FAFB',
        'semantic-danger': '#EF4444',

        // shadcn/ui system colors
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },

      // Enhanced typography system
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'Consolas', 'monospace'],
      },

      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],

        // Therapeutic typography scale
        'therapeutic-xs': ['0.75rem', { lineHeight: '1.2rem', letterSpacing: '0.025em' }],
        'therapeutic-sm': ['0.875rem', { lineHeight: '1.4rem', letterSpacing: '0.015em' }],
        'therapeutic-base': ['1rem', { lineHeight: '1.6rem', letterSpacing: '0.01em' }],
        'therapeutic-lg': ['1.125rem', { lineHeight: '1.8rem', letterSpacing: '0.005em' }],
        'therapeutic-xl': ['1.25rem', { lineHeight: '1.9rem', letterSpacing: '0em' }],
        'therapeutic-2xl': ['1.5rem', { lineHeight: '2.2rem', letterSpacing: '-0.005em' }],
        'therapeutic-3xl': ['1.875rem', { lineHeight: '2.5rem', letterSpacing: '-0.01em' }],
        'therapeutic-4xl': ['2.25rem', { lineHeight: '2.8rem', letterSpacing: '-0.015em' }],
      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        DEFAULT: '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        'full': '9999px',

        // Therapeutic rounded corners - inspired by Headspace's soft aesthetic
        'therapeutic': '0.75rem',       // 12px - Primary cards and buttons
        'therapeutic-lg': '1rem',       // 16px - Large cards and modals
        'therapeutic-xl': '1.25rem',    // 20px - Hero sections and major components
        'therapeutic-2xl': '1.5rem',    // 24px - Special containers
        'therapeutic-3xl': '2rem',      // 32px - Landing page sections

        // Legacy shadcn/ui support (using custom names to avoid conflicts)
        'shadcn-lg': "var(--radius)",
        'shadcn-md': "calc(var(--radius) - 2px)",
        'shadcn-sm': "calc(var(--radius) - 4px)",
      },

      // Enhanced spacing scale for therapeutic layouts
      spacing: {
        'therapeutic-xs': '0.5rem',     // 8px
        'therapeutic-sm': '0.75rem',    // 12px
        'therapeutic-md': '1rem',       // 16px
        'therapeutic-lg': '1.5rem',     // 24px
        'therapeutic-xl': '2rem',       // 32px
        'therapeutic-2xl': '3rem',      // 48px
        'therapeutic-3xl': '4rem',      // 64px
        'therapeutic-4xl': '6rem',      // 96px
        'therapeutic-5xl': '8rem',      // 128px
      },

      // Enhanced shadows for depth and elevation
      boxShadow: {
        'therapeutic-xs': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'therapeutic-sm': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'therapeutic': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'therapeutic-md': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'therapeutic-lg': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        'therapeutic-xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        'therapeutic-2xl': '0 50px 100px -20px rgb(0 0 0 / 0.25)',
        'therapeutic-inner': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',

        // Colored shadows for interactive elements
        'primary-glow': '0 10px 40px -10px rgb(37 99 235 / 0.3)',
        'healing-glow': '0 10px 40px -10px rgb(16 185 129 / 0.3)',
        'warm-glow': '0 10px 40px -10px rgb(245 158 11 / 0.3)',
        'calm-glow': '0 10px 40px -10px rgb(139 92 246 / 0.3)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        "accordion-up": {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },

        // Therapeutic entrance animations
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'therapeutic-fade': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },

        // Professional slide animations
        'slide-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },

        // Calming continuous animations
        'gentle-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        'soft-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        'float-gentle': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },

        // Professional effects
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'skeleton-loading': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },

        // Therapeutic glow effects
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 24px -8px hsl(var(--primary) / 0.3)' },
          '50%': { boxShadow: '0 0 32px -4px hsl(var(--primary) / 0.4)' },
        },
        'glow-accent': {
          '0%, 100%': { boxShadow: '0 0 24px -8px hsl(var(--accent) / 0.3)' },
          '50%': { boxShadow: '0 0 32px -4px hsl(var(--accent) / 0.4)' },
        },
      },
      animation: {
        // Accordion animations
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',

        // Therapeutic entrance animations
        'fade-in': 'fade-in 0.5s ease-out',
        'fade-in-up': 'fade-in-up 0.6s ease-out',
        'therapeutic-fade': 'therapeutic-fade 0.3s ease-out',

        // Professional slide animations
        'slide-in-left': 'slide-in-left 0.4s ease-out',
        'slide-in-right': 'slide-in-right 0.4s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',

        // Calming continuous animations
        'gentle-pulse': 'gentle-pulse 3s ease-in-out infinite',
        'soft-bounce': 'soft-bounce 2s ease-in-out infinite',
        'float-gentle': 'float-gentle 3s ease-in-out infinite',

        // Professional effects
        'shimmer': 'shimmer 2s infinite',
        'gradient-shift': 'gradient-shift 3s ease-in-out infinite',
        'skeleton-loading': 'skeleton-loading 2s infinite ease-in-out',

        // Therapeutic glow effects
        'pulse-glow': 'pulse-glow 2.5s infinite ease-in-out',
        'glow-accent': 'glow-accent 2.5s infinite ease-in-out',
      },
      backgroundSize: {
        'auto': 'auto',
        'cover': 'cover',
        'contain': 'contain',
        '50': '50%',
        '100': '100%',
        '200': '200%',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/container-queries'),
  ],
} satisfies Config;
