'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    // When relatedBlogPosts should be populated, load 6 latest related
    // blog posts from all related content tags
    // This is used when loading page.relatedBlogPosts in graphql.
    async afterFindOne(page, params, populate) {
      if (page && populate && populate.includes('relatedBlogPosts')) {
        page.relatedBlogPosts = [];

        const res = await strapi.connections.default
          .select('*')
          .from('pages__related_contents')
          .where('page_id', page.id);

        // (res.rows ?? res) is needed because sqlite and postgres behaves
        // differently in what they return as result
        const relatedTagIds = (res.rows ?? res).map((row) => row.tag_id);

        const relatedBlogPostsResult = await strapi
          .query('blog-post')
          .model.query((qb) => {
            qb.where('tag', 'in', relatedTagIds)
              .orderBy('published_at', 'desc')
              .limit(6);
          })
          .fetchAll();

        page.relatedBlogPosts = relatedBlogPostsResult.toJSON();
      }
    },
  },
};
