import { api, type SettingApi, type SettingInfo } from '@bb-music/app';
import { JsonCacheStorage } from '../lib/cacheStorage';

export class SettingInstance implements SettingApi {
  public settingCache = new JsonCacheStorage<SettingInfo>('bb-setting');

  getInfo = async () => {
    const config = (await this.settingCache.get()) || {
      openMusicOrderOrigin: [],
      musicServices: [],
    };
    return {
      ...config,
      userMusicOrderOrigin:
        api.userMusicOrder?.map((u) => {
          return {
            name: u.name,
            config: {},
          };
        }) || [],
    };
  };

  updateOpenMusicOrderOrigin: SettingApi['updateOpenMusicOrderOrigin'] = async (value) => {
    await this.settingCache.update('openMusicOrderOrigin', value);
  };

  updateUserMusicOrderOrigin: SettingApi['updateUserMusicOrderOrigin'] = async (value) => {
    await this.settingCache.update('userMusicOrderOrigin', value);
  };
}
