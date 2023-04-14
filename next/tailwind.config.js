const { join } = require('path')
const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')
const screens = require('./tailwind.config.screens')

const customVariants = plugin(function ({ addVariant }) {
  addVariant('not-first', '&:not(:first-child)')
})

const toRem = (px) => `${px / 16}rem`
const getFontSize = (size) => [toRem(size[0]), toRem(size[1])]

module.exports = {
  content: [
    join(__dirname, 'pages/**/*.{js,jsx,ts,tsx}'),
    join(__dirname, 'components/**/*.{js,jsx,ts,tsx}'),
  ],
  plugins: [customVariants, require('tailwind-scrollbar-hide')],
  corePlugins: {
    container: false,
  },
  mode: 'jit',
  theme: {
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    screens,
    boxShadow: {
      lg: '0px 16px 24px rgba(0, 0, 0, 0.12)',
      md: '0px 8px 16px rgba(0, 0, 0, 0.12)',
      DEFAULT: '0px 4px 12px rgba(0, 0, 0, 0.12)',
      sm: '0px 2px 8px rgba(0, 0, 0, 0.12)',
      none: 'none',
    },
    fontFamily: {
      sans: ['var(--inter-font)', ...defaultTheme.fontFamily.sans],
    },

    // DO NOT USE these classes directly, use classes from globals.css
    fontSize: {
      // TODO text-button mixes with tmp-[color] classes
      'size-button-large': getFontSize([20, 32]),
      'size-button-default': getFontSize([16, 24]),

      'size-p-large': getFontSize([20, 28]),
      'size-p-default': getFontSize([16, 24]),
      'size-p-small': getFontSize([14, 20]),

      'size-h6': getFontSize([16, 24]),
      'size-h6-r': getFontSize([16, 24]),
      'size-h5': getFontSize([20, 28]),
      'size-h5-r': getFontSize([16, 24]),
      'size-h4': getFontSize([24, 32]),
      'size-h4-r': getFontSize([18, 26]),
      'size-h3': getFontSize([28, 36]),
      'size-h3-r': getFontSize([20, 28]),
      'size-h2': getFontSize([32, 40]),
      'size-h2-r': getFontSize([24, 32]),
      'size-h1': getFontSize([40, 48]),
      'size-h1-r': getFontSize([28, 36]),
      'size-h1-hero': getFontSize([56, 64]),
      'size-h1-hero-r': getFontSize([32, 40]),
    },
    extend: {
      rotate: {
        270: '270deg',
      },
      colors: {
        error: 'rgb(var(--error-color))',
        font: {
          DEFAULT: 'rgb(var(--font-color))',
          contrast: 'rgb(var(--font-contrast-color))',
        },
        main: {
          100: 'rgb(var(--color-main-100))',
          200: 'rgb(var(--color-main-200))',
          300: 'rgb(var(--color-main-300))',
          400: 'rgb(var(--color-main-400))',
          500: 'rgb(var(--color-main-500))',
          600: 'rgb(var(--color-main-600))',
          700: 'rgb(var(--color-main-700))',
          800: 'rgb(var(--color-main-800))',
        },
        transport: {
          100: 'rgb(var(--color-transport-100))',
          200: 'rgb(var(--color-transport-200))',
          300: 'rgb(var(--color-transport-300))',
          400: 'rgb(var(--color-transport-400))',
          500: 'rgb(var(--color-transport-500))',
          600: 'rgb(var(--color-transport-600))',
          700: 'rgb(var(--color-transport-700))',
          800: 'rgb(var(--color-transport-800))',
        },
        environment: {
          100: 'rgb(var(--color-environment-100))',
          200: 'rgb(var(--color-environment-200))',
          300: 'rgb(var(--color-environment-300))',
          400: 'rgb(var(--color-environment-400))',
          500: 'rgb(var(--color-environment-500))',
          600: 'rgb(var(--color-environment-600))',
          700: 'rgb(var(--color-environment-700))',
          800: 'rgb(var(--color-environment-800))',
        },
        social: {
          100: 'rgb(var(--color-social-100))',
          200: 'rgb(var(--color-social-200))',
          300: 'rgb(var(--color-social-300))',
          400: 'rgb(var(--color-social-400))',
          500: 'rgb(var(--color-social-500))',
          600: 'rgb(var(--color-social-600))',
          700: 'rgb(var(--color-social-700))',
          800: 'rgb(var(--color-social-800))',
        },
        education: {
          100: 'rgb(var(--color-education-100))',
          200: 'rgb(var(--color-education-200))',
          300: 'rgb(var(--color-education-300))',
          400: 'rgb(var(--color-education-400))',
          500: 'rgb(var(--color-education-500))',
          600: 'rgb(var(--color-education-600))',
          700: 'rgb(var(--color-education-700))',
          800: 'rgb(var(--color-education-800))',
        },
        culture: {
          100: 'rgb(var(--color-culture-100))',
          200: 'rgb(var(--color-culture-200))',
          300: 'rgb(var(--color-culture-300))',
          400: 'rgb(var(--color-culture-400))',
          500: 'rgb(var(--color-culture-500))',
          600: 'rgb(var(--color-culture-600))',
          700: 'rgb(var(--color-culture-700))',
          800: 'rgb(var(--color-culture-800))',
        },
        gray: {
          0: 'rgb(var(--color-gray-0))',
          50: 'rgb(var(--color-gray-50))',
          100: 'rgb(var(--color-gray-100))',
          200: 'rgb(var(--color-gray-200))',
          300: 'rgb(var(--color-gray-300))',
          400: 'rgb(var(--color-gray-400))',
          500: 'rgb(var(--color-gray-500))',
          600: 'rgb(var(--color-gray-600))',
          700: 'rgb(var(--color-gray-700))',
          800: 'rgb(var(--color-gray-800))',
        },
        success: {
          50: 'rgb(var(--color-success-50))',
          100: 'rgb(var(--color-success-100))',
          200: 'rgb(var(--color-success-200))',
          300: 'rgb(var(--color-success-300))',
          400: 'rgb(var(--color-success-400))',
          500: 'rgb(var(--color-success-500))',
          600: 'rgb(var(--color-success-600))',
          700: 'rgb(var(--color-success-700))',
          800: 'rgb(var(--color-success-800))',
        },
        negative: {
          50: 'rgb(var(--color-negative-50))',
          100: 'rgb(var(--color-negative-100))',
          200: 'rgb(var(--color-negative-200))',
          300: 'rgb(var(--color-negative-300))',
          400: 'rgb(var(--color-negative-400))',
          500: 'rgb(var(--color-negative-500))',
          600: 'rgb(var(--color-negative-600))',
          700: 'rgb(var(--color-negative-700))',
          800: 'rgb(var(--color-negative-800))',
        },
        warning: {
          50: 'rgb(var(--color-warning-50))',
          100: 'rgb(var(--color-warning-100))',
          200: 'rgb(var(--color-warning-200))',
          300: 'rgb(var(--color-warning-300))',
          400: 'rgb(var(--color-warning-400))',
          500: 'rgb(var(--color-warning-500))',
          600: 'rgb(var(--color-warning-600))',
          700: 'rgb(var(--color-warning-700))',
          800: 'rgb(var(--color-warning-800))',
        },
        category: {
          100: 'rgb(var(--color-category-100))',
          200: 'rgb(var(--color-category-200))',
          300: 'rgb(var(--color-category-300))',
          400: 'rgb(var(--color-category-400))',
          500: 'rgb(var(--color-category-500))',
          600: 'rgb(var(--color-category-600))',
          700: 'rgb(var(--color-category-700))',
          800: 'rgb(var(--color-category-800))',
        },
      },
      // Inspired by: https://www.radix-ui.com/docs/primitives/components/navigation-menu
      keyframes: {
        enterFromRight: {
          from: { opacity: 0, transform: 'translateX(200px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        enterFromLeft: {
          from: { opacity: 0, transform: 'translateX(-200px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        exitToRight: {
          from: { opacity: 1, transform: 'translateX(0)' },
          to: { opacity: 0, transform: 'translateX(200px)' },
        },
        exitToLeft: {
          from: { opacity: 1, transform: 'translateX(0)' },
          to: { opacity: 0, transform: 'translateX(-200px)' },
        },
        scaleIn: {
          from: { opacity: 0, transform: 'rotateX(-10deg) scale(0.9)' },
          to: { opacity: 1, transform: 'rotateX(0deg) scale(1)' },
        },
        scaleOut: {
          from: { opacity: 1, transform: 'rotateX(0deg) scale(1)' },
          to: { opacity: 0, transform: 'rotateX(-10deg) scale(0.95)' },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        fadeOut: {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
      },
      animation: {
        scaleIn: 'scaleIn 200ms ease',
        scaleOut: 'scaleOut 200ms ease',
        fadeIn: 'fadeIn 200ms ease',
        fadeOut: 'fadeOut 200ms ease',
        enterFromLeft: 'enterFromLeft 250ms ease',
        enterFromRight: 'enterFromRight 250ms ease',
        exitToLeft: 'exitToLeft 250ms ease',
        exitToRight: 'exitToRight 250ms ease',
      },
      borderWidth: {
        3: '3px',
      },
      borderRadius: {
        10: '10px',
        5: '5px',
      },
      gridTemplateRows: {
        7: 'repeat(7, minmax(0, 1fr))',
        8: 'repeat(8, minmax(0, 1fr))',
        9: 'repeat(9, minmax(0, 1fr))',
      },
      spacing: {
        18: '4.5rem', // 72px
        66: '17.5rem', // 280px
        76: '19rem', // 304px
        88: '22rem', // 352px
        100: '25rem',
        104: '26rem', // 416px
        200: '50rem', // 800px
      },
    },
  },
}
