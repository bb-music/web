import { type MusicOrderItem } from '@bb-music/bb-types';

export abstract class OpenMusicOrderApi {
  /** 使用歌单源获取歌单列表 */
  abstract useOriginGetMusicOrder(url: string): Promise<MusicOrderItem[]>;
}
