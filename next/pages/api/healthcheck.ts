import { handleMethods } from '@bratislava/next-backend-api';

export default handleMethods()
  .get()<{ status: string }>(async (req, res) => {
    return res.json({ status: 'ok' });
  })
  .prepare();
