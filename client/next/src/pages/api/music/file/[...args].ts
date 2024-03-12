import { service } from '@/src/services';
import { errorResp, validateOrigin } from '@/src/utils';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { args } = req.query;
  const [origin, id] = args as string[];
  if (!validateOrigin(origin)) {
    res.status(400).json(errorResp('错误的歌曲源'));
    return;
  }
  if (!id) {
    res.status(400).json(errorResp('错误的歌曲 ID'));
  } else {
    // 详情
    const r = await service[origin].getMusicFile(id);
    if (r) {
      res.setHeader('Cache-control', `max-age=${1 * 60 * 60 * 24 * 365 * 10}`);
      r.data.pipe(res);
    }
  }
}
