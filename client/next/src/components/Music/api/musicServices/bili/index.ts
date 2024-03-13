import {
  type MusicServiceApi,
  type MusicServiceApiAction,
  type MusicServiceApiHooks,
} from '@bb-music/app';
import { type BiliBiliAuthConfig, type SearchItem, type SearchResponse } from '@bb-music/bb-types';
import { html2text } from '@bb-music/web/src/utils';
import { proxyMusicService } from '../proxy';
import { type CreateBiliConfigElementOptions, createBiliConfigElement } from './ConfigElement';
import { isJson } from '@/src/utils';
import dayjs from 'dayjs';
import axios from 'axios';
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
  ConfigElement;
  action = new BiliAction();
  hooks = new BiliHooks();

  constructor(props: CreateBiliConfigElementOptions) {
    this.ConfigElement = createBiliConfigElement(props);
  }
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
    await validateBiliAuthConfig();
  };
}

export function setBiliAuthConfig(res: BiliBiliAuthConfig & { created_at: string }) {
  window.localStorage.setItem('bili_auth_config', JSON.stringify(res));
  const data = {
    bili_spi_b3: res.spi_data.b_3,
    bili_spi_b4: res.spi_data.b_4,
    bili_sign_img_key: res.sign_data.img_key,
    bili_sign_sub_key: res.sign_data.sub_key,
  };
  Object.entries(data).forEach(([k, v]) => {
    setCookie(k, v);
  });
}
export function getBiliAuthConfig() {
  const info = window.localStorage.getItem('bili_auth_config');
  if (!info) return false;
  return isJson<BiliBiliAuthConfig & { created_at: string }>(info);
}

export async function validateBiliAuthConfig() {
  const prev = getBiliAuthConfig();
  if (prev && dayjs().diff(dayjs(prev.created_at), 'hour') < 1) {
    console.log('cache');
    return prev;
  }
  const res = await axios.get<{ data: BiliBiliAuthConfig }>(`/api/config/${NAME}`);
  const result: BiliBiliAuthConfig & { created_at: string } = {
    ...res.data.data,
    created_at: dayjs().format(),
  };
  setBiliAuthConfig(result);
  return result;
}

function setCookie(name: string, value: string, days = 100) {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
}
