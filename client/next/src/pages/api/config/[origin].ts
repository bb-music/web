import { service } from '@/src/services';
import { errorResp, successResp, validateOrigin } from '@/src/utils';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const origin = req.query.origin as string;
  if (!validateOrigin(origin)) {
    res.status(400).json(errorResp('错误的歌曲源'));
    return;
  }
  const data = await service[origin].getConfig();
  res.json(successResp(data));
}
