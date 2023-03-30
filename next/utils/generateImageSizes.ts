import screens from '../tailwind.config.screens'

type SizesInput = {
  [K in keyof typeof screens]?: string
} & { default: string }

/**
 * Generate image sizes for next/image based on Tailwind breakpoints.
 * See https://nextjs.org/docs/api-reference/next/image#sizes.
 *
 * Example:
 * generateImageSizes({ sm: '50vw', lg: '33vw', default: '100vw' }) -> "(min-width: 1216px) 33vw, (min-width: 480px) 50vw, 100vw"
 */
export const generateImageSizes = (sizes: SizesInput) => {
  const sizesKeys = Object.keys(sizes)

  // We don't want to rely on order provided by sizes, so we use key order from `screens`.
  // To apply min-width correctly the result value should start from the biggest screen size, therefore it's reversed.
  return [
    ...(
      Object.keys(screens).filter((screen) => sizesKeys.includes(screen)) as [keyof typeof screens]
    )
      .reverse()
      .map((screen) => `(min-width: ${screens[screen]}) ${sizes[screen]}`),
    sizes.default,
  ].join(', ')
}
