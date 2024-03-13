import { type OpenMusicOrderApi } from '@bb-music/app';
import { proxyMusicService } from '../utils';
import { type MusicOrderItem } from '@bb-music/bb-types';

export class OpenMusicOrderInstance implements OpenMusicOrderApi {
  useOriginGetMusicOrder: OpenMusicOrderApi['useOriginGetMusicOrder'] = async (origin) => {
    const res = await proxyMusicService<MusicOrderItem[]>({
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
