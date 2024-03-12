import { successResp } from '@/src/utils';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const origin = req.query.origin as string;
  const data = await fetch(origin).then(async (r) => await r.json());
  res.json(successResp(data));
}
