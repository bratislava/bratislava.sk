const { join } = require('path')
const defaultTheme = require('tailwindcss/defaultTheme')

const toRem = (px) => `${px / 16}rem`
const getFontSize = (size) => [toRem(size[0]), toRem(size[1])]

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    fontFamily: {
      sans: ['var(--inter-font)', ...defaultTheme.fontFamily.sans],
    },

    // DO NOT USE these font classes directly, use classes from globals.css
    // fontSize: {
    //   // TODO text-button mixes with tmp-[color] classes
    //   'size-button-large': getFontSize([20, 32]),
    //   'size-button-default': getFontSize([16, 24]),

    //   'size-p-large': getFontSize([20, 28]),
    //   'size-p-large-r': getFontSize([18, 28]),
    //   'size-p-default': getFontSize([18, 28]),
    //   'size-p-default-r': getFontSize([16, 24]),
    //   'size-component-default': getFontSize([16, 24]),
    //   'size-component-small': getFontSize([14, 20]),

    //   'size-h6': getFontSize([16, 24]),
    //   'size-h6-r': getFontSize([16, 20]),
    //   'size-h5': getFontSize([20, 28]),
    //   'size-h5-r': getFontSize([16, 24]),
    //   'size-h4': getFontSize([24, 32]),
    //   'size-h4-r': getFontSize([18, 26]),
    //   'size-h3': getFontSize([28, 36]),
    //   'size-h3-r': getFontSize([20, 28]),
    //   'size-h2': getFontSize([32, 40]),
    //   'size-h2-r': getFontSize([24, 28]),
    //   'size-h1': getFontSize([40, 48]),
    //   'size-h1-r': getFontSize([28, 36]),
    //   'size-h1-hero': getFontSize([56, 64]),
    //   'size-h1-hero-r': getFontSize([32, 40]),
    // },

    extend: {
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
    },
  },
}
