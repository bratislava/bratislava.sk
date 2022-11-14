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
        form: {
          input: {
            default: '#D6D6D6',
            hover: '#ADADAD',
            pressed: '#333333',
            disabled: '#C2C2C2',
          },
          calendar: {
            hover: '#f1f1f1',
            header: '#F5F5F5',
            pressed: '#EBEBEB',
            placeholder: '#858585',
          },
          brand: {
            default: '#E46054',
            hover: '#E98076',
            pressed: '#B64D43',
          },
          black: {
            default: '#333333',
            hover: '#5C5C5C',
            pressed: '#292929',
          },
          negative: {
            default: '#EF1919',
            hover: '#F24747',
            pressed: '#BF1414',
          },
          'plain-brand': {
            default: 'transparent',
            hover: '#FCEFEE',
            pressed: '#FADFDD',
          },
          'plain-black': {
            default: 'transparent',
            hover: '#EBEBEB',
            pressed: '#D6D6D6',
          },
          'plain-negative': {
            default: 'transparent',
            hover: '#FDE8E8',
            pressed: '#FCD1D1',
          },
          alert: {
            error: {
              default: '#D00000',
              'default-bg': '#FDF2F2',
              solid: '',
            },
            success: {
              default: '#01843D',
              'default-bg': '#F2F9F5',
              solid: '',
            },
            info: {
              default: '#333333',
              'default-bg': '#EBEBEB',
              solid: '',
            },
            warning: {
              default: '#E07B04',
              'default-bg': '#FDF8F2',
              solid: '',
            },
            textColor: {
              default: '#1F1F1F',
            },
          },
        },
        transperentBG: 'rgba(0, 0, 0, 0.5)',
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        tertiary: 'var(--tertiary-color)',
        background: 'var(--background-color)',
        font: 'var(--font-color)',
        input: {
          'nav-bg': 'var(--input-nav-background-color)',
          stroke: 'var(--input-stroke-color)',
        },
        universal: {
          'gray-100': 'var(--universal-gray-100)',
          'gray-200': 'var(--universal-gray-200)',
          'gray-500': 'var(--universal-gray-500)',
          'gray-600': 'var(--universal-gray-600)',
          'gray-700': 'var(--universal-gray-700)',
          'gray-800': 'var(--universal-gray-800)',
          black: 'var(--universal-black)',
        },
        gray: {
          universal: {
            0: 'var(--input-nav-background-color)',
            100: 'var(--universal-gray-100)',
            200: 'var(--universal-gray-200)',
            400: 'var(--universal-gray-400)',
            500: 'var(--universal-gray-500)',
            600: 'var(--universal-gray-600)',
            700: 'var(--universal-gray-700)',
            800: 'var(--universal-gray-800)',
          },
          dark: 'var(--dark-gray-color)',
          semilight: 'var(--semilight-gray-color)',
          light: 'var(--light-gray-color)',
        },
        offWhite: '#ccc',
        lightGray: '#9A9A9A',
        black: {
          universal: 'var(--universal-black)',
        },
        blackTransparent: 'rgba(51, 51, 51, 0.5);',
        yellow: {
          promo: '#FFEF4E',
        },
        red: {
          'universal-800': 'var(--universal-red-800)',
          'universal-500': 'var(--universal-red-500)',
          'universal-300': 'var(--universal-red-300)',
          brick: '#E46054',
          'brick-dark': '#D05145',
          superlight: 'var(--superlight-red-color)',
        },
        blue: {
          light: '#faf9f9',
          sea: '#7CCEF2',
          'sea-dark': '#66BDE3',
        },
        purple: '#704B9D', // TODO var
        warning: 'var(--warning-color)',
        success: 'var(--success-color)',
        'success-700': '#01843D',
        error: 'var(--error-color)',
        transprentGray: 'rgba(51, 51, 51, 0.25)',
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
