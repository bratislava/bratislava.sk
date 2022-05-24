module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  proxy: env.bool('PROXY', false),
  admin: {
    host: env('HOST', '0.0.0.0'),
    port: env.int('PORT', 1337) + 1,
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'ca089d2666cdd0517de45e9739388cac'),
    },
  },
});

console.log('Server starting - comment to force redeploy TODO remove');
