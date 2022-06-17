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
    fontSize: {
      xxl: ['var(--font-size-xxl)', 'var(--line-height-xxl)'],
      xl: ['var(--font-size-xl)', 'var(--line-height-xl)'],
      lg: ['var(--font-size-lg)', 'var(--line-height-lg)'],
      md: ['var(--font-size-md)', 'var(--line-height-mg)'],
      sm: ['var(--font-size-sm)', 'var(--line-height-sm)'],
      xs: ['var(--font-size-xs)', 'var(--line-height-xs)'],
      nav: ['var(--font-size-nav)', 'var(--line-height-nav)'],
      btn: ['var(--font-size-btn)', 'var(--line-height-btn)'],
    },
    fontWeight: {
      light: '300',
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      heavy: '900',
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
      sm: '0px 4px 20px rgba(0, 0, 0, 0.08)',
      md: '0px 8px 24px rgba(0, 0, 0, 0.08)',
      lg: '0px 8px 24px rgba(0, 0, 0, 0.16)',
      DEFAULT: '0px 8px 24px rgba(0, 0, 0, 0.08)',
      xs: '0px 8px 24px rgba(0, 0, 0, 0.04)',
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
    extend: {
      fontSize: {
        xxs: ['12px', '18px'],
        xs: ['14px', '22.4px'],
        sm: ['16px', '24px'],
        default: ['20px', '30px'],
        md: ['24px', '140%'],
        md2: ['28px', '33.6px'],
        lg: ['32px', '44.8px'],
        xl: ['36px', '42.3px'],
        '2xl': ['40px', '60px'],
        xxl: ['42px', '50.8px'],
        xxxl: ['48px', '62px'],
      },
      colors: {
        primary: 'var(--primary-color)',
        primaryDark: '#933D35',
        secondary: 'var(--secondary-color)',
        background: 'var(--background-color)',
        font: 'var(--font-color)',
        input: {
          'nav-bg': 'var(--input-nav-background-color)',
          stroke: 'var(--input-stroke-color)',
        },
        universal: {
          'gray-500': 'var(--universal-gray-500)',
          'gray-800': 'var(--universal-gray-800)',
          black: 'var(--universal-black)',
        },
        gray: {
          universal: {
            100: 'var(--universal-gray-100)',
            200: 'var(--universal-gray-200)',
            500: 'var(--universal-gray-500)',
            800: 'var(--universal-gray-800)',
          },
          dark: 'var(--dark-gray-color)',
          semilight: 'var(--semilight-gray-color)',
          light: 'var(--light-gray-color)',
        },
        black: {
          universal: 'var(--universal-black)',
        },
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
        error: 'var(--error-color)',
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
        4.25: '17px',
        4.5: '18px',
        5.5: '22px',
        6: '24px',
        7.5: '30px',
        12.5: '50px',
        17.5: '70px',
        18: '72px',
        23: '92px',
        25: '100px',
        30: '120px',
        33: '132px',
        39: '156px',
        41: '165px',
        41.5: '166px',
        44.5: '178px',
        57: '228px',
        61: '244px',
        65: '260px',
        66: '264px',
        70: '280px',
        73: '294px',
        74: '300px',
        76: '293px',
        82: '330px',
        87: '350px',
        90: '350px',
        100: '450px',
        112: '450px',
        157.5: '630px',
        175: '700px',
        xStandard: 'var(--padding-x)',
        yStandard: 'var(--padding-y)',
        yHigh: 'var(--padding-y-high)',
        nav: 'var(--height-nav)',
        sidepanel: 'var(--sidepanel-width)',
        logoHeight: 'var(--logo-height)',
        logoWidth: 'var(--logo-width)',
      },
      letterSpacing: {
        wider: '.08em',
      },
      minHeight: {
        220: '220px',
      },
      width: {
        540: '540px',
      },
      minWidth: {
        39: '156px',
      },
      maxWidth: {
        61: '244px',
        87: '350px',
        100: "1110px"
      },
    },
  },
  corePlugins: {
    container: false,
  },
  mode: 'jit',
}
