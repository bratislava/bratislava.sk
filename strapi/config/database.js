module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'sqlite',
        filename: env('DATABASE_FILENAME', '.db/data.db'),
        // client: 'postgres',
        // host: env('POSTGRES_HOST', 'localhost'),
        // port: env.int('POSTGRES_PORT', 5432),
        // database: env('POSTGRES_DB', 'postgres'),
        // username: env('POSTGRES_USER', 'miralem'),
        // password: env('POSTGRES_PASSWORD', 'miralem'),
        // ssl: env.bool('POSTGRES_SSL', false),
      },
      options: {
        useNullAsDefault: true,
      },
    },
  },
});
