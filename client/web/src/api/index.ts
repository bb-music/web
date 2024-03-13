import { type Api } from '@bb-music/app';
import { SettingInstance } from './setting';
import { MusicInstance } from './music';
import { OpenMusicOrderInstance } from './openMusicOrder';
import { cacheStorage } from '../lib/cacheStorage';
import { UtilsInstance } from './utils';
import { BiliMusicServiceInstance } from './musicServices';
import { UserLocalMusicOrderInstance } from './userLocalMusicOrder';
import { UserGithubMusicOrderInstance } from './userGithubMusicOrder';

const setting = new SettingInstance();

export const apiInstance: Api = {
  utils: new UtilsInstance(),
  cacheStorage,
  setting,
  music: new MusicInstance(),
  openMusicOrder: new OpenMusicOrderInstance(),
  userMusicOrder: [
    new UserLocalMusicOrderInstance(),
    new UserGithubMusicOrderInstance(setting.settingCache, updateUserMusicOrderOriginConfig),
  ],
  musicServices: [
    new BiliMusicServiceInstance({
      getSetting: setting.settingCache.get,
      updateMusicServicesSetting,
    }),
  ],
};

// 更新歌单
async function updateUserMusicOrderOriginConfig(originName: string, data: any) {
  const settingData = await setting.settingCache.get();
  let list = settingData?.userMusicOrderOrigin ?? [];
  if (list.find((n) => n.name === originName)) {
    list = list.map((l) => {
      if (l.name === originName) {
        l.config = data;
      }
      return l;
    });
  } else {
    list.push({
      name: originName,
      config: data,
    });
  }
  await setting.settingCache.update('userMusicOrderOrigin', list);
}

// 更新音乐服务设置
export async function updateMusicServicesSetting(serviceName: string, data: any) {
  const settingData = await setting.settingCache.get();

  let list = settingData?.musicServices ?? [];
  if (list.find((n) => n.name === serviceName)) {
    list = list.map((l) => {
      if (l.name === serviceName) {
        l.config = data;
      }
      return l;
    });
  } else {
    list.push({
      name: serviceName,
      config: data,
    });
  }
  setting.settingCache.update('musicServices', list);
}
