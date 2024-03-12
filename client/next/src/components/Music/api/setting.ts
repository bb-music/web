import { api, type SettingApi, type SettingInfo } from '@bb-music/app';
import { JsonCacheStorage } from '@bb-music/web/src/lib/cacheStorage';

export const settingCache = new JsonCacheStorage<SettingInfo>('bb-setting');

export class SettingInstance implements SettingApi {
  getInfo = async () => {
    const config = (await settingCache.get()) || {
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
    await settingCache.update('openMusicOrderOrigin', value);
  };

  updateUserMusicOrderOrigin: SettingApi['updateUserMusicOrderOrigin'] = async (value) => {
    await settingCache.update('userMusicOrderOrigin', value);
  };
}
