'use strict'

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  /*

    register({ strapi }) {
    const extensionService = strapi.plugin('graphql').service('extension');

    extensionService.use(({ nexus }) => {
      const pageBySlug = nexus.extendType({
        type: "Query",
        definition(t) {
          //  myQuery definition
          t.field('pageBySlug', {
            // Response type
            type: 'Page',

            // Args definition
            args: { slug: 'String', locale: 'String' },

            // Resolver definition
            resolve(parent, args, ctx) {
              const { slug, locale } = args;
              console.log({slug,locale})
              return strapi.db.query('application::page.page').findOne({
                where: { slug, locale },
            });
            }
          });
        }
      });

      return { types: [pageBySlug] };
    });
  },

  */

  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {},
}
