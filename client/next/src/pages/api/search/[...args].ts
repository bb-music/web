import { service } from '@/src/services';
import { errorResp, successResp, validateOrigin } from '@/src/utils';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { args } = req.query;
  const [origin, id] = args as string[];
  if (!validateOrigin(origin)) {
    res.status(400).json(errorResp('错误的歌曲源'));
    return;
  }
  if (!id) {
    // 搜索
    const keyword = req.query.keyword as string;
    const page = (req.query.page as string) || '1';
    const data = await service[origin].search({
      keyword,
      page,
    });
    res.json(successResp(data));
  } else {
    // 详情
    const data = await service[origin].searchDetail(id);
    res.json(successResp(data));
  }
}
