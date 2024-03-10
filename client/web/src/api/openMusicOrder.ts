import { type OpenMusicOrderApi, type MusicInter } from '@bb-music/app';
import { proxyMusicService } from '../utils';

export class OpenMusicOrderInstance implements OpenMusicOrderApi {
  useOriginGetMusicOrder: OpenMusicOrderApi['useOriginGetMusicOrder'] = async (origin) => {
    const res = await proxyMusicService<MusicInter.MusicOrderItem[]>({
      proxy: {
        url: '/api/open-music-order',
        params: {
          origin,
        },
      },
    });
    return res;
  };
}
