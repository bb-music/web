import { service } from '@/services';
import { successResp, validateOrigin } from '@/utils';

export async function GET(
  req: Request,
  { params: { origin, id } }: { params: { origin: string; id: string } },
) {
  if (!validateOrigin(origin)) {
    throw new Error('错误的歌曲源');
  }
  const data = await service[origin].searchDetail(id);
  return successResp(data);
}
