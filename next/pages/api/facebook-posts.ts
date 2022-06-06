import { handleMethods } from '@bratislava/next-backend-api';
import { fetchFacebookPosts } from '../../utils/facebook';

export default handleMethods()
  .get()<any>(async (req, res) => {
    const posts = await fetchFacebookPosts();
    return res.json(posts);
  })
  .prepare();
