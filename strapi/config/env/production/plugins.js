module.exports = ({ env }) => ({
  email: {
    provider: 'mailgun',
    providerOptions: {
      apiKey: env('MAILGUN_API_KEY'),
      domain: env('MAILGUN_DOMAIN'), //Required if you have an account with multiple domains
      host: env('MAILGUN_HOST', 'api.mailgun.net'), //Optional. If domain region is Europe use 'api.eu.mailgun.net'
    },
    settings: {
      defaultFrom: 'info@bratislava.sk',
      defaultReplyTo: 'info@bratislava.sk',
    },
  },
  upload: {
    provider: 'ts-minio',
    providerOptions: {
      accessKey: env('MINIO_ACCESS_KEY', 'AKIAIOSFODNN7EXAMPLE'),
      secretKey: env(
        'MINIO_SECRET_KEY',
        'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY'
      ),
      bucket: env('MINIO_BUCKET', 'strapi'),
      endPoint: env('MINIO_ENDPOINT', 'localhost'),
      port: parseInt(env('MINIO_PORT', 9000), 10) || 9000,
      useSSL: env('MINIO_USE_SSL', false),
      folder: 'upload',
      isDocker: true,
      host: env('MINIO_HOST', 'localhost:9000'),
    },
  },
  graphql: {
    endpoint: '/graphql',
    shadowCRUD: true,
    playgroundAlways: false,
    depthLimit: 7,
    amountLimit: 800, // mainly to allow fetching static paths for all subpages from getStaticPaths
    apolloServer: {
      tracing: false,
    },
  },
});
