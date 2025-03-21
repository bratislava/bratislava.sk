const { join } = require('path')
const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')
const screens = require('./tailwind.config.screens')
const colors = require('./tailwind.config.colors')

const customVariants = plugin(function ({ addVariant }) {
  addVariant('not-first', '&:not(:first-child)')
})

/**
 * This plugin remove X button and decorations in native search input.
 * https://github.com/tailwindlabs/tailwindcss/discussions/10190#discussioncomment-4994363
 *
 * Similar styles are used also in RAC example styling https://react-spectrum.adobe.com/react-aria/SearchField.html#example
 *
 * @type {{handler: PluginCreator, config?: Partial<Config>}}
 */
const removeNativeSearchInputStyling = plugin(function ({ addBase }) {
  addBase({
    '[type="search"]::-webkit-search-decoration': { display: 'none' },
    '[type="search"]::-webkit-search-cancel-button': { display: 'none' },
    '[type="search"]::-webkit-search-results-button': { display: 'none' },
    '[type="search"]::-webkit-search-results-decoration': { display: 'none' },
  })
})

const toRem = (px) => `${px / 16}rem`
const getFontSize = (size) => [toRem(size[0]), toRem(size[1])]

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  plugins: [
    customVariants,
    removeNativeSearchInputStyling,
    require('tailwind-scrollbar-hide'),
    require('tailwindcss-react-aria-components'),
    require('tailwindcss-animate'),
  ],
  corePlugins: {
    container: false,
  },
  theme: {
    screens,
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
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

    // DO NOT USE these font classes directly, use classes from globals.css
    fontSize: {
      // TODO text-button mixes with tmp-[color] classes
      'size-button-large': getFontSize([20, 32]),
      'size-button-default': getFontSize([16, 24]),

      'size-p-large': getFontSize([20, 28]),
      'size-p-default': getFontSize([16, 24]),
      'size-p-small': getFontSize([14, 20]),

      'size-h6': getFontSize([16, 24]),
      'size-h6-r': getFontSize([16, 20]),
      'size-h5': getFontSize([20, 28]),
      'size-h5-r': getFontSize([16, 24]),
      'size-h4': getFontSize([24, 32]),
      'size-h4-r': getFontSize([18, 26]),
      'size-h3': getFontSize([28, 36]),
      'size-h3-r': getFontSize([20, 28]),
      'size-h2': getFontSize([32, 40]),
      'size-h2-r': getFontSize([24, 28]),
      'size-h1': getFontSize([40, 48]),
      'size-h1-r': getFontSize([28, 36]),
      'size-h1-hero': getFontSize([56, 64]),
      'size-h1-hero-r': getFontSize([32, 40]),
    },

    colors: colors,
    extend: {
      // Default theme has the border default color set as "colors.gray.200", but we use "grey" with "e" in our colors
      // This should be the only place where default tailwind config chooses some specific color from tailwind config.
      // https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/config.full.js#L84
      borderColor: (theme) => ({
        DEFAULT: theme('colors.grey.200'),
      }),
      rotate: {
        270: '270deg',
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
        enterFromTop: {
          from: { opacity: 0, transform: 'translateY(-200px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
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
        scaleY: {
          from: { opacity: 0, transform: 'scaleY(0)' },
          to: { opacity: 1, transform: 'scaleY(1)' },
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
        enterFromTop: 'enterFromTop 250ms ease',
        scaleY: 'scaleY 250ms ease',
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
        30: '7.5rem', // 120px
        66: '17.5rem', // 280px
        76: '19rem', // 304px
        88: '22rem', // 352px
        100: '25rem',
        104: '26rem', // 416px
        200: '50rem', // 800px
      },
      aspectRatio: {
        '16/10': '16 / 10',
        '2/1': '2 / 1',
        inba: '1 / 1.4',
      },
    },
  },
}
