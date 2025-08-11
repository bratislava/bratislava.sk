export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('NEXT_PUBLIC_STRAPI_URL', ''),
  app: {
    keys: env.array('APP_KEYS'),
  },
})
