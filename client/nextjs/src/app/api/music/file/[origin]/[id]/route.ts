import { service } from '@/services';
import { validateOrigin } from '@/utils';

export async function GET(
  req: Request,
  { params: { origin, id } }: { params: { origin: string; id: string } },
) {
  if (!validateOrigin(origin)) {
    throw new Error('音乐源错误');
  }

  return await service[origin].getMusicFile(id);
}
