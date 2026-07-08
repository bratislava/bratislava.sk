/**
 * Docs: https://docs.strapi.io/cms/configurations/admin-panel
 */

export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
    sessions: {
      // How long an inactive session survives before forcing re-login.
      idleSessionLifespan: 4 * 60 * 60, // 4 hours
    },
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  watchIgnoreFiles: ['../schema.graphql', '**/config/sync/**'],
})
