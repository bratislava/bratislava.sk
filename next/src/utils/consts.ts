export const bratislavaTimezone = 'Europe/Bratislava'

/**
 * Not Found parameters for Static Generation, with revalidate
 */
export const NOT_FOUND_STATIC = {
  notFound: true,
  revalidate: 10,
} as const

/**
 * Not Found parameters for Server Side Rendering
 */
export const NOT_FOUND_SERVERSIDE = {
  notFound: true,
} as const
