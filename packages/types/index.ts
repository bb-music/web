// 歌曲源
export const enum OriginType {
  Bili = 'bili', // 哔哩哔哩
  YouTube = 'youTube', // YouTube
}

// 搜索结果类型
export const enum SearchType {
  Music = 'music', // 歌曲
  Order = 'order', // 歌单
}

// 下载歌曲
export interface DownloadMusicParams {
  id: string; // 歌曲 ID
  origin: OriginType; // 歌曲源
  name: string; // 歌曲名称
  download_dir: string; // 保存路径
}

/** 歌曲信息 */
export interface MusicItem {
  id: string; // ID
  cover?: string; // 封面
  name: string; // 名称
  duration: number; // 时长
  author?: string; // 作者
  origin: string; // 来源
  created_at?: string; // 创建时间
  updated_at?: string; // 更新时间
}

/** 歌单信息 */
export interface MusicOrderItem {
  id: string; // ID
  cover?: string; // 封面
  name: string; // 名称
  author?: string; // 作者
  desc?: string; // 描述
  musicList?: MusicItem[]; // 音乐列表
  created_at?: string; // 创建时间
  updated_at?: string; // 更新时间
}

// 搜索参数
export interface SearchParams {
  keyword: string;
  current: number;
}

// 搜索结果条目
export interface SearchItem {
  id: string; // ID
  cover: string; // 封面
  name: string; // 名称
  duration: number; // 时长
  author: string; // 作者
  type?: SearchType; // 类型
  origin: string; // 来源
  musicList?: MusicItem[]; // 歌单中的歌曲列表
}

// 搜索结果
export interface SearchResponse {
  current: number; // 当前页
  total: number; // 总数
  pageSize: number; // 每页条数
  data: SearchItem[];
}

// 哔哩哔哩的认证配置
export interface BiliBiliAuthConfig {
  sign_data: {
    img_key: string;
    sub_key: string;
  };
  spi_data: {
    b_3: string;
    b_4: string;
  };
}
