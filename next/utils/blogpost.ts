import { client } from './gql';

export const fetchBlogPosts = async (
  tags: number[],
  limit: number,
  offset: number
) => {
  const { latestPostsByTags } = await client.LatestPostsByTags({
    tags,
    limit,
    offset,
  });

  return latestPostsByTags;
};
