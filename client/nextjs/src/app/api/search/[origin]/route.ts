import { service } from '@/services';
import { successResp, validateOrigin } from '@/utils';
import { type NextRequest } from 'next/server';

export async function GET(
  req: NextRequest,
  { params: { origin } }: { params: { origin: string } },
) {
  const query = req.nextUrl.searchParams;
  const keyword = query.get('keyword');
  const page = query.get('page') || '1';

  if (!keyword) {
    throw new Error('缺少关键词');
  }

  if (!origin || !validateOrigin(origin)) {
    throw new Error('错误的歌曲源');
  }
  const data = await service[origin].search({
    keyword,
    page,
  });

  return successResp(data);
}
