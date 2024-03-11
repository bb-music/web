import { service } from '@/services';
import { successResp, validateOrigin } from '@/utils';

export async function GET(req: Request, { params: { origin } }: { params: { origin: string } }) {
  if (!validateOrigin(origin)) {
    throw new Error('未知音乐源');
  }
  const data = await service[origin].getConfig();
  return successResp(data);
}
