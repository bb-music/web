export interface Durl {
  order: number;
  length: number;
  size: number;
  ahead: string;
  vhead: string;
  url: string;
  backup_url: string[];
}

export interface Supportformat {
  quality: number;
  format: string;
  new_description: string;
  display_desc: string;
  superscript: string;
  codecs?: any;
}

export interface BiliVideoUrlResponse {
  from: string;
  result: string;
  message: string;
  quality: number;
  format: string;
  timelength: number;
  accept_format: string;
  accept_description: string[];
  accept_quality: number[];
  video_codecid: number;
  seek_param: string;
  seek_type: string;
  durl: Durl[];
  support_formats: Supportformat[];
  high_format?: any;
  last_play_time: number;
  last_play_cid: number;
}

export interface Subtitle {
  AllowSubmit: boolean;
  List: any[];
}

export interface Dimension {
  width: number;
  height: number;
  rotate: number;
}

export interface Argueinfo {
  argue_msg: string;
  argue_type: number;
  argue_link: string;
}

export interface VideoDetailPage {
  cid: number;
  page: number;
  from: string;
  part: string;
  duration: number;
  vid: string;
  weblink: string;
  dimension: Dimension;
  first_frame: string;
}

export interface rights {
  bp: number;
  elec: number;
  download: number;
  movie: number;
  pay: number;
  hd5: number;
  no_reprint: number;
  autoplay: number;
  ugc_pay: number;
  is_cooperation: number;
  ugc_pay_preview: number;
  no_background: number;
  clean_mode: number;
  is_stein_gate: number;
  is_360: number;
  no_share: number;
  arc_pay: number;
  free_watch: number;
}

export interface owner {
  mid: number;
  name: string;
  face: string;
}

export interface BiliVideoDetailResponse {
  bvid: string;
  aid: number;
  videos: number;
  tid: number;
  tname: string;
  copyright: number;
  pic: string;
  title: string;
  pubdate: number;
  ctime: number;
  desc: string;
  desc_v2: Descv2[];
  state: number;
  duration: number;
  rights: rights;
  owner: owner;
  argue_info: Argueinfo;
  dynamic: string;
  cid: number;
  dimension: Dimension;
  pages: VideoDetailPage[];
  subtitle: Subtitle;
}

export interface Descv2 {
  raw_text: string;
  type: number;
  biz_id: number;
}

export interface BiliSearchResultItem {
  type: string;
  id: number;
  author: string;
  mid: number;
  typeid: string;
  typename: string;
  arcurl: string;
  aid: number;
  bvid: string;
  title: string;
  description: string;
  arcrank: string;
  pic: string;
  play: number;
  video_review: number;
  favorites: number;
  tag: string;
  review: number;
  pubdate: number;
  senddate: number;
  duration: string;
  badgepay: boolean;
  hit_columns?: string[];
  view_type: string;
  is_pay: number;
  is_union_video: number;
  rec_tags?: string[];
  new_rec_tags?: string[];
  rank_score: number;
  like: number;
  upic: string;
  corner: string;
  cover: string;
  desc: string;
  url: string;
  rec_reason: string;
  danmaku: number;
  biz_data?: string[];
  is_charge_video: number;
  vt: number;
  enable_vt: number;
  vt_display: string;
  subtitle: string;
  episode_count_text: string;
  release_status: number;
  is_intervene: number;
  origin: string;
}

export interface BiliWbiKeysData {
  img_url: string;
  sub_url: string;
}

export interface BiliWbiKeysResult {
  isLogin: boolean;
  wbi_img: BiliWbiKeysData;
}

export interface BiliPagination {
  page: number;
  pagesize: number;
  numResults: number;
  numPages: number;
}

export interface BiliResponse<T = any> {
  code: number;
  message: string;
  ttl: number;
  data: T;
}

export interface SignData {
  img_key: string;
  sub_key: string;
}

export interface SpiData {
  b_3: string;
  b_4: string;
}

export interface SearchResponse extends BiliPagination {
  result: BiliSearchResultItem[];
}
