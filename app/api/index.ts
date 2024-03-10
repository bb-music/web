import { type SettingApi } from './setting';
import { type MusicApi } from './music';
import { type OpenMusicOrderApi } from './openMusicOpen';
import { type UserMusicOrderApi } from './userMusicOrder';
import { type StateStorage } from 'zustand/middleware';
import { type UtilsApi } from './utils';
import { type MusicServiceApi } from './musicService';

export * from './music';
export * from './musicService';
export * from './openMusicOpen';
export * from './setting';
export * from './userMusicOrder';
export * from './utils';

export let api: Api;

export interface Api {
  music: MusicApi;
  musicServices: MusicServiceApi[];
  setting: SettingApi;
  userMusicOrder: UserMusicOrderApi[];
  openMusicOrder: OpenMusicOrderApi;
  utils: UtilsApi;
  cacheStorage: StateStorage;
}

export function registerApiInstance(instance: Api) {
  if (!api) {
    api = instance;
  }
}
