export default {
  config: {
    locales: ['sk'],

    // Disable video tutorials and new release notifications
    tutorials: false,
    notifications: {
      releases: false,
    },
  },
  bootstrap(app) {
    console.log(app)
  },
}
