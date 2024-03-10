export const enum OriginType {
  BiliOriginName = 'bili', // 哔哩哔哩
  YouTubeOriginName = 'youTube', // YouTube
}

export const enum SearchType {
  SearchTypeMusic = 'music', // 歌曲
  SearchTypeOrder = 'order', // 歌单
}

export interface MusicOrderItem {
  id: string;
  name: string;
  cover: string;
  desc: string;
  author: string;
  musicList: MusicItem[];
  created_at: string;
  updated_at: string;
}

export interface DownloadMusicParams {
  id: string;
  origin: OriginType;
  name: string;
  download_dir: string;
}

export interface MusicItem {
  id: string;
  cover: string;
  name: string;
  duration: number;
  author: string;
  origin: OriginType;
}

export interface SearchParams {
  keyword: string;
  page: string;
}

export interface SearchItem {
  id: string;
  cover: string;
  name: string;
  duration: number;
  author: string;
  type: SearchType;
  origin: OriginType;
  musicList: MusicItem[];
}

export interface SearchResponse {
  current: number;
  total: number;
  pageSize: number;
  data: SearchItem[];
}
