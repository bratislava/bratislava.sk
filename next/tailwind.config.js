const { join } = require('path')
const plugin = require('tailwindcss/plugin')

const scrollBarHide = plugin(function ({ addUtilities }) {
  addUtilities({
    '.scrollbar-hide': {
      /* Firefox */
      'scrollbar-width': 'none',

      /* Safari and Chrome */
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
  })
})

module.exports = {
  content: [join(__dirname, 'pages/**/*.{js,jsx,ts,tsx}'), join(__dirname, 'components/**/*.{js,jsx,ts,tsx}')],
  darkMode: 'media', // or 'class'
  theme: {
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    screens: {
      xs: '360px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      '1.5lg': '1110px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
      maxMd: { max: '768px' },
    },
    container: {
      xs: '360px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1175px',
      '2xl': '1470px',
    },
    boxShadow: {
      lg: '0px 16px 24px rgba(0, 0, 0, 0.12)',
      md: '0px 8px 16px rgba(0, 0, 0, 0.12)',
      DEFAULT: '0px 4px 12px rgba(0, 0, 0, 0.12)',
      sm: '0px 2px 8px rgba(0, 0, 0, 0.12)',
      none: 'none',
    },
    
    fontFamily: {
      sans: [
        'Public Sans',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
    },
    fontSize: {
      'p-xs': ['12px', '18px'],
      'p-sm': ['14px', '24px'],
      'p-base': ['16px', '24px'],
      'p-md': ['20px', '32px'],

      'h-sm': ['16px', '24px'],
      'h-base': ['20px', '28px'],
      'h-md': ['24px', '32px'],
      'h-lg': ['28px', '36px'],
      'h-xl': ['32px', '40px'],
      'h-2xl': ['40px', '48px'],
      'h-3xl': ['56px', '64px'],
    },
    extend: {
      rotate: {
        270: '270deg',
      },
      colors: {
        error: 'var(--error-color)',
        font: 'var(--font-color)',
        gray: {
          0: '#FFF',
          50: '#F5F5F5',
          100: '#EBEBEB',
          200: '#D6D6D6',
          300: '#C2C2C2',
          400: '#ADADAD',
          500: '#858585',
          600: '#5C5C5C',
          700: '#333333',
          800: '#1F1F1F',
        },
        main: {
          100: '#FBEBEA',
          200: '#F7D7D4',
          300: '#F3C3BF',
          400: '#EFAFA9',
          500: '#EE938B',
          600: '#E05F53',
          700: '#D83728',
          800: '#93251B',
        },
        success: {
          50: '#F2F9F5',
          100: '#E6F3EC',
          200: '#CCE6D8',
          300: '#B3DAC5',
          400: '#99CEB1',
          500: '#67B58B',
          600: '#349D64',
          700: '#01843D',
          800: '#015A29',
        },
        negative: {
          50: '#FDF2F2',
          100: '#FAE5E5',
          200: '#F6CCCC',
          300: '#F1B2B2',
          400: '#EC9999',
          500: '#E36666',
          600: '#DA3333',
          700: '#D00000',
          800: '#8D0000',
        },
        warning: {
          50: '#FDF8F2',
          100: '#FCF2E6',
          200: '#F9E5CD',
          300: '#F6D7B4',
          400: '#F3CA9B',
          500: '#ECB068',
          600: '#E69536',
          700: '#E07B04',
          800: '#985403',
        },
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        tertiary: 'var(--tertiary-color)',
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
        104: '26rem', // 416px
        200: '50rem', // 800px
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
  corePlugins: {
    container: false,
  },
  mode: 'jit',
}
