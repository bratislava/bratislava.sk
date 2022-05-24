module.exports = {
  definition: `
    extend type Page {
      relatedBlogPosts: [BlogPost!]!
    }
  `,
  query: 'pageBySlug(slug: String!, locale: String!): Page',
  resolver: {
    Query: {
      pageBySlug: {
        description: 'Return page with given slug',
        resolver: 'application::page.page.findOne',
      },
    },
  },
};
