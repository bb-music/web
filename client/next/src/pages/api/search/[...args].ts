import { getService } from '@/src/services';
import { successResp } from '@/src/utils';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { args } = req.query;
  const [origin, id] = args as string[];
  if (!id) {
    // 搜索
    const keyword = req.query.keyword as string;
    const page = (req.query.page as string) || '1';
    const data = await getService(origin, req.headers)?.search({
      keyword,
      current: Number(page),
    });
    res.json(successResp(data));
  } else {
    // 详情
    const data = await getService(origin, req.headers)?.searchDetail(id);
    res.json(successResp(data));
  }
}
