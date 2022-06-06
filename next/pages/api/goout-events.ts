import { handleMethods } from '@bratislava/next-backend-api';
import { fetchGooutEvents } from '../../utils/goout';

export default handleMethods()
  .get()<any>(async (req, res) => {
    const events = await fetchGooutEvents();
    return res.json(events);
  })
  .prepare();
