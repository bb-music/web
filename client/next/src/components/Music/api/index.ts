import { type Api } from '@bb-music/app';
import { cacheStorage } from '@bb-music/web/src/lib/cacheStorage';
import { OpenMusicOrderInstance } from '@bb-music/web/src/api/openMusicOrder';
import { MusicInstance } from '@bb-music/web/src/api/music';
import { UtilsInstance } from '@bb-music/web/src/api/utils';
import { UserGithubMusicOrderInstance } from '@bb-music/web/src/api/userGithubMusicOrder';
import { UserLocalMusicOrderInstance } from '@bb-music/web/src/api/userLocalMusicOrder';

import { SettingInstance } from './setting';
import { BiliMusicServiceInstance } from './musicServices';

export const apiInstance: Api = {
  utils: new UtilsInstance(),
  cacheStorage,
  setting: new SettingInstance(),
  music: new MusicInstance(),
  openMusicOrder: new OpenMusicOrderInstance(),
  userMusicOrder: [new UserLocalMusicOrderInstance(), new UserGithubMusicOrderInstance()],
  musicServices: [new BiliMusicServiceInstance()],
};
