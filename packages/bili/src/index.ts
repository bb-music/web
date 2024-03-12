/* eslint-disable @typescript-eslint/naming-convention */
import axios, { type AxiosInstance } from 'axios';
import {
  type SpiData,
  type BiliResponse,
  type BiliWbiKeysResult,
  type SignData,
  type SearchResponse,
  type BiliVideoDetailResponse,
  type BiliVideoUrlResponse,
} from './interface';
import { encWbi } from './utils';
import { type SearchParams } from '@bb-music/bb-types';

export * from './interface';

export const UserAgent =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

export class BiliClient {
  request: AxiosInstance;
  signData?: SignData;
  spiData?: SpiData;

  constructor() {
    const request = axios.create();
    request.defaults.headers.common['User-Agent'] = UserAgent;
    request.interceptors.request.use((config) => {
      config.headers.Cookie = this.getCookie();
      if (!this.spiData) {
        console.warn('spidata 为空', config.url);
      }
      return config;
    });
    this.request = request;
  }

  getCookie = () => {
    if (this.spiData) {
      return `buvid4=${this.spiData.b_4}; buvid3=${this.spiData.b_3};`;
    }
    return ``;
  };

  setSignData = (signData: SignData) => {
    this.signData = signData;
  };

  setSpiData = (spiData: SpiData) => {
    this.spiData = spiData;
  };

  // 获取认证秘钥
  public async getSignData() {
    const url = `https://api.bilibili.com/x/web-interface/nav`;
    const res = await this.request.get<BiliResponse<BiliWbiKeysResult>>(url);
    const {
      data: {
        wbi_img: { img_url, sub_url },
      },
    } = res.data;
    const data = {
      img_key: img_url.slice(img_url.lastIndexOf('/') + 1, img_url.lastIndexOf('.')),
      sub_key: sub_url.slice(sub_url.lastIndexOf('/') + 1, sub_url.lastIndexOf('.')),
    };
    this.setSignData(data);
    return data;
  }

  // 获取 spi
  public async getSpiData() {
    const url = 'https://api.bilibili.com/x/frontend/finger/spi';
    const res = await this.request.get<BiliResponse<SpiData>>(url);
    const data = res.data.data;
    this.setSpiData(data);
    return data;
  }

  // 对参数签名
  public sign(params: Record<string, string>) {
    const signData = this.signData;
    if (signData) {
      return encWbi(params, signData.img_key, signData.sub_key);
    } else {
      console.error('请先获取认证秘钥 signData');
    }
  }

  // 搜索
  public async search(params: SearchParams) {
    const url = 'https://api.bilibili.com/x/web-interface/wbi/search/type';
    const res = await this.request
      .get<BiliResponse<SearchResponse>>(url, {
        params: this.sign({
          search_type: 'video',
          keyword: params.keyword,
          page: params.page,
        }),
      })
      .catch(async (e) => {
        console.log(e);
        return await Promise.reject(e);
      });
    return res.data.data;
  }

  // 视频详情
  public async getVideoDetail(aid: string, bvid: string) {
    const url = 'https://api.bilibili.com/x/web-interface/view';
    const res = await this.request.get<BiliResponse<BiliVideoDetailResponse>>(url, {
      params: this.sign({
        aid,
        bvid,
      }),
    });
    return res.data.data;
  }

  // 视频流地址
  public async getVideoUrl(aid: string, bvid: string, cid: string) {
    const url = 'https://api.bilibili.com/x/player/wbi/playurl';
    const res = await this.request.get<BiliResponse<BiliVideoUrlResponse>>(url, {
      params: this.sign({
        aid,
        bvid,
        cid,
      }),
    });
    return res.data.data;
  }
}
