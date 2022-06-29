const { dbV4 } = require('../config/database')

const queries = [
  `
  ALTER TABLE IF EXISTS public.components_sections_articles_lists
    ADD COLUMN category integer;
  `,
  `
  ALTER TABLE IF EXISTS public.components_blocks_icon_with_title_and_descriptions
    ADD COLUMN link character varying(255) COLLATE pg_catalog."default";
  `,
  `
  ALTER TABLE IF EXISTS public.components_blocks_list_items
    ADD COLUMN more_link_page integer;
  `,
  `
  ALTER TABLE IF EXISTS public.components_blocks_page_links
    ADD COLUMN page integer;
  `,
  `
  ALTER TABLE IF EXISTS public.components_sections_featured_blog_posts
    ADD COLUMN first_blog integer;
  `,
  `
  ALTER TABLE IF EXISTS public.components_sections_featured_blog_posts
    ADD COLUMN second_blog integer;
`,
  `
  ALTER TABLE IF EXISTS public.components_sections_featured_blog_posts
    ADD COLUMN third_blog integer;
`,
  `
  ALTER TABLE IF EXISTS public.components_accordion_items_flat_texts
    ADD COLUMN more_link_page integer;
`,
  `
  ALTER TABLE IF EXISTS public.page_categories
    ADD COLUMN tag integer;
`,
  `
  ALTER TABLE IF EXISTS public.components_sections_featured_blog_posts_first_blog_links
    ADD COLUMN featured_blog_post_id integer;
`,
  `
  ALTER TABLE IF EXISTS public.components_sections_featured_blog_posts_second_blog_links
    ADD COLUMN featured_blog_post_id integer;
`,
  `
  ALTER TABLE IF EXISTS public.components_sections_featured_blog_posts_third_blog_links
    ADD COLUMN featured_blog_post_id integer;
`,
  `
  ALTER TABLE IF EXISTS public.pages
    ADD COLUMN page_category integer;
`,
  `
  ALTER TABLE IF EXISTS public.pages
    ADD COLUMN parent_page integer;
`,
  `
  ALTER TABLE IF EXISTS public.homepages
    ADD COLUMN left_highlight integer;
`,
 `
  ALTER TABLE IF EXISTS public.homepages
    ADD COLUMN right_highlight integer;
`,
 `
  ALTER TABLE IF EXISTS public.tags
    ADD COLUMN page_category integer;
`,
 `
  ALTER TABLE IF EXISTS public.blog_posts
    ADD COLUMN author integer;
`,
 `
  ALTER TABLE IF EXISTS public.blog_posts
    ADD COLUMN tag integer;
`,


]

async function addAdditionalColumns() {
  for (let i = 0; i < queries.length; i++) {
    try {
      await dbV4.raw(queries[i])
    } catch (error) {
      if (!error.message.includes('already exists')) {
        console.log(error.message)
      }
    }
  }
}

module.exports = {
  addAdditionalColumns,
}
