// 音乐服务源
import type * as MusicInter from '@bb-music/bb-types';

export abstract class MusicServiceApiAction {
  // 搜索
  abstract searchList: (params: MusicInter.SearchParams) => Promise<MusicInter.SearchResponse>;
  // 搜索结果的详情
  abstract searchItemDetail: (item: MusicInter.SearchItem) => Promise<MusicInter.SearchItem>;
  /** 获取音乐播放地址 */
  abstract getMusicPlayerUrl(item: MusicInter.MusicItem): Promise<string>;
  /** 下载音乐 */
  abstract download(item: MusicInter.MusicItem): Promise<unknown>;
}

export abstract class MusicServiceApiHooks {
  // 应用启动初始化
  abstract init?(): Promise<void>;
}

export abstract class MusicServiceApi<T = any> {
  /** 源的唯一名称 */
  abstract name: string;
  /** 源的显示名称 */
  abstract cname: string;
  /** 源的配置项 */
  public abstract ConfigElement?: React.FC<{ onChange?: (v: T) => void }>;
  /** 源的操作 */
  abstract action: MusicServiceApiAction;
  /** 钩子 */
  abstract hooks?: MusicServiceApiHooks;
}
