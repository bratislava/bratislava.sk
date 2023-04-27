export default {
  config: {
    // Add slovak as option for strapi admin
    locales: ['sk'],

    // Disable video tutorials and new release notifications
    tutorials: false,

    notifications: {
      releases: false,
    },
  },
  bootstrap() {},
}
