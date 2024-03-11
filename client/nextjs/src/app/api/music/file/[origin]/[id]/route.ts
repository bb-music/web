import { service } from '@/services';
import { validateOrigin } from '@/utils';

export async function GET(
  req: Request,
  { params: { origin, id } }: { params: { origin: string; id: string } },
  res: Response,
) {
  if (!validateOrigin(origin)) {
    throw new Error('音乐源错误');
  }
  // 缓存时间为 10 年
  res.headers.set('Cache-control', `max-age=${1 * 60 * 60 * 24 * 365 * 10}`);
  service[origin].getMusicFile(id, res);
}
