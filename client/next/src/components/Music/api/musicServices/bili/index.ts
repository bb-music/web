import {
  type MusicServiceApi,
  type MusicServiceApiAction,
  type MusicServiceApiHooks,
} from '@bb-music/app';
import { html2text, proxyMusicService } from '../../../utils';
import { createBiliConfigElement } from './ConfigElement';
import { type SearchItem, type SearchResponse } from '@bb-music/bb-types';
import { updateMusicServicesSetting } from '../utils';

class BiliMusicServiceConfigValue {
  enabled = true;
  proxyEnabled = false;
  proxyAddress = '';
  proxyToken = '';
}

const NAME = 'bili';
const CNAME = '哔哩哔哩';

type BiliMusicServiceApi = MusicServiceApi<BiliMusicServiceConfigValue>;
export class BiliMusicServiceInstance implements BiliMusicServiceApi {
  name = NAME;
  cname = CNAME;
  ConfigElement = createBiliConfigElement({ updateMusicServicesSetting });
  action = new BiliAction();
  hooks = new BiliHooks();
}

class BiliAction implements MusicServiceApiAction {
  searchList: MusicServiceApiAction['searchList'] = async (params) => {
    const page = params.current || 1;
    const query = {
      page: page + '',
      keyword: params.keyword,
    };

    const res = await proxyMusicService<SearchResponse>({
      proxy: {
        url: `/api/search/${NAME}`,
        params: query,
      },
    });

    return {
      ...res,
      data: res.data.map((item) => ({
        ...item,
        name: html2text(item.name),
        cover: item.cover,
        type: item.type,
      })),
    };
  };

  searchItemDetail: MusicServiceApiAction['searchItemDetail'] = async (item) => {
    const info = await proxyMusicService<SearchItem>({
      proxy: {
        url: `/api/search/${NAME}/${item.id}`,
      },
    });
    return {
      ...info,
      type: info.type,
    };
  };

  getMusicPlayerUrl: MusicServiceApiAction['getMusicPlayerUrl'] = async (music) => {
    return `/api/music/file/${NAME}/${music.id}`;
  };

  download: MusicServiceApiAction['download'] = async (music) => {
    const a = document.createElement('a');
    a.href = `/api/music/file/${NAME}/${music.id}`;
    a.download = `${music.name}.mp4`;
    a.target = '_blank';
    a.click();
  };
}
class BiliHooks implements MusicServiceApiHooks {
  init: MusicServiceApiHooks['init'] = async () => {
    // await InitConfig();
  };
}
