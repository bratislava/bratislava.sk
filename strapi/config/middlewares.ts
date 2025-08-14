export default ({ env }) => [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'market-assets.strapi.io',
            'cdn-api.bratislava.sk',
            `${env('MINIO_BUCKET')}.s3.bratislava.sk`,
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'cdn-api.bratislava.sk',
            `${env('MINIO_BUCKET')}.s3.bratislava.sk`,
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
]
