module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'postgres',
        host: env('POSTGRES_HOST', 'postgres'),
        port: env.int('POSTGRES_PORT', 5432),
        database: env('POSTGRES_DB', 'strapi'),
        username: env('POSTGRES_USER', 'postgres'),
        password: env('POSTGRES_PASSWORD', 'postgres'),
        ssl: env.bool('POSTGRES_SSL', false),
      },
      pool: {
        // defaults from https://github.com/vincit/tarn.js
        // lowered acquire/create to fail faster
        // minimum size
        min: 2,

        // maximum size
        max: 10,

        // acquire promises are rejected after this many milliseconds
        // if a resource cannot be acquired
        acquireTimeoutMillis: 15000,

        // create operations are cancelled after this many milliseconds
        // if a resource cannot be acquired
        createTimeoutMillis: 15000,

        // destroy operations are awaited for at most this many milliseconds
        // new resources will be created after this timeout
        destroyTimeoutMillis: 5000,

        // free resouces are destroyed after this many milliseconds
        idleTimeoutMillis: 30000,

        // how often to check for idle resources to destroy
        reapIntervalMillis: 1000,

        // how long to idle after failed create before trying again
        createRetryIntervalMillis: 200,
      },
      options: {},
    },
  },
});
