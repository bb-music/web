import { service } from '@/services';
import { validateOrigin } from '@/utils';

export async function GET(
  req: Request,
  { params: { origin, id } }: { params: { origin: string; id: string } },
) {
  if (!validateOrigin(origin)) {
    throw new Error('音乐源错误');
  }

  const res = await service[origin].getMusicFile(id);
  res?.headers.set('Cache-control', `max-age=${1 * 60 * 60 * 24 * 365 * 10}`);
  return res;
}
