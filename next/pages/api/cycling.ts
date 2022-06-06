import { handleMethods } from '@bratislava/next-backend-api';
import OpenDataClient from '../../utils/opendata';

export default handleMethods()
  .get()<any>(async (req, res) => {
    const data = await OpenDataClient.getCyclingData();
    return res.json(data);
  })
  .prepare();
