module.exports = {
  query: [
    'relatedPostsBySlug(slug: String!, locale: String!): [BlogPost!]!',
    'blogPostBySlug(slug: String!, locale: String): BlogPost',
    'latestPostsByTags(tags:[Int], limit:Int, offset:Int): [BlogPost!]!',
  ],
  resolver: {
    Query: {
      relatedPostsBySlug: {
        description: 'Return related posts for page with given slug',
        resolver: 'application::blog-post.blog-post.relatedPostsBySlug',
      },
      blogPostBySlug: {
        description: 'Return blog post with given slug',
        resolver: 'application::blog-post.blog-post.findOneBlog',
      },
      latestPostsByTags: {
        description: 'Return latest posts with given tags',
        resolver: 'application::blog-post.blog-post.latestPostsByTags',
      },
    },
  },
};
