'use strict';
const { sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async relatedPostsBySlug(ctx) {
    const page = await strapi.services.page.findOne(ctx.params, [
      'relatedBlogPosts',
    ]);

    if (!page) return [];

    return page.relatedBlogPosts;
  },

  async findOneBlog(ctx) {
    const entity = await strapi.services['blog-post'].findOne(ctx.params);
    return sanitizeEntity(entity, { model: strapi.models['blog-post'] });
  },

  async latestPostsByTags(ctx) {
    const result = await strapi
      .query('blog-post')
      .model.query((qb) => {
        qb.where('tag', 'in', ctx.params['_tags'])
          .orderBy('published_at', 'desc')
          .limit(ctx.params['_limit'])
          .offset(ctx.params['_offset']);
      })
      .fetchAll();

    const fields = result.toJSON();
    return fields;
  },
};
