import { successResp } from '@/utils';
import { type NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams;
  const origin = query.get('origin') || '';
  const data = await fetch(origin).then(async (r) => await r.json());
  return successResp(data);
}
