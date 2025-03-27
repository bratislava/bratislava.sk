/**
 * Based on OLO: https://github.com/bratislava/olo.sk/blob/master/next/svgo.config.mjs
 *
 * We use default preset, and additionally we disable `removeViewBox` plugin, because it prevents resizing icons by css.
 *
 * Docs: https://github.com/svg/svgo?tab=readme-ov-file#configuration
 */
module.exports = {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false,
        },
      },
    },
  ],
}
