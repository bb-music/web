import { getService } from '@/src/services';
import { successResp } from '@/src/utils';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const origin = req.query.origin as string;
  const data = await getService(origin, req.headers)?.getConfig();
  res.json(successResp(data));
}
