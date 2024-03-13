import { getService } from '@/src/services';
import { errorResp } from '@/src/utils';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { args } = req.query;
  const [origin, id] = args as string[];
  if (!id) {
    res.status(400).json(errorResp('错误的歌曲 ID'));
  } else {
    // 详情
    const h = {
      bili_spi_b3: req.headers.bili_spi_b3 || req.cookies.bili_spi_b3,
      bili_spi_b4: req.headers.bili_spi_b4 || req.cookies.bili_spi_b4,
      bili_sign_img_key: req.headers.bili_sign_img_key || req.cookies.bili_sign_img_key,
      bili_sign_sub_key: req.headers.bili_sign_sub_key || req.cookies.bili_sign_sub_key,
    };
    const r = await getService(origin, h)?.getMusicFile(id);
    if (r) {
      res.setHeader('Cache-control', `max-age=${1 * 60 * 60 * 24 * 365 * 10}`);
      r.data.pipe(res);
    }
  }
}
