import { BiliClient, UserAgent, type SpiData, type SignData } from '@bb-music/sdk-bili';
import * as BBTypes from '@bb-music/bb-types';
import { type OriginService } from '../interface';
import {
  DecodeBiliSearchItemId,
  decodeBiliMusicItemId,
  duration2Seconds,
  unicodeBiliId,
} from './utils';

import axios from 'axios';
import { JsonStorage } from '@/lib/fileStorage';
import path from 'path';
import dayjs from 'dayjs';

interface BiliSetting {
  created_at: string;
  sign_data: SignData;
  spi_data: SpiData;
}

export class BiliService implements OriginService {
  client: BiliClient;
  constructor() {
    this.client = new BiliClient();
    this.initConfig();
  }

  async initConfig() {
    const settingCache = new JsonStorage<BiliSetting>(
      path.join(process.cwd(), '.bb-music'),
      'bili_setting.json',
      {},
    );
    const setting = settingCache.get();

    if (setting?.created_at && setting.sign_data && setting.spi_data) {
      // 判断是否过期 1小时
      const range = dayjs(setting.created_at).diff(dayjs(), 'hour');
      if (range <= 1) {
        if (setting.sign_data && setting.spi_data) {
          this.client.setSignData(setting.sign_data);
          this.client.setSpiData(setting.spi_data);
          console.log('使用缓存的 Sign 和 Spi');
          return;
        }
      }
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const [sign_data, spi_data] = await Promise.all([
      this.client.getSignData(),
      this.client.getSpiData(),
    ]);
    settingCache.set({
      created_at: dayjs().format(),
      sign_data,
      spi_data,
    });
  }

  getConfig = async () => {
    await this.initConfig();
    return {
      spi_data: this.client.spiData,
      sign_data: this.client.signData,
    };
  };

  search: OriginService['search'] = async (params) => {
    await this.initConfig();
    const res = await this.client.search(params);
    const result: BBTypes.SearchResponse = {
      current: res.page,
      total: res.numResults,
      pageSize: res.pagesize,
      data: [],
    };

    for (const item of res.result || []) {
      if (!['ketang'].includes(item.type)) {
        result.data.push({
          id: DecodeBiliSearchItemId(item.aid, item.bvid),
          cover: item.pic,
          name: item.title,
          duration: duration2Seconds(item.duration),
          author: item.author,
          origin: BBTypes.OriginType.BiliOriginName,
          musicList: [],
        });
      }
    }

    return result;
  };

  searchDetail: OriginService['searchDetail'] = async (id: string) => {
    const biliid = unicodeBiliId(id);
    await this.initConfig();
    const res = await this.client.getVideoDetail(biliid.aid, biliid.bvid);

    const result: BBTypes.SearchItem = {
      id: decodeBiliMusicItemId(res.aid, res.bvid, res.cid),
      cover: res.pic,
      name: res.title,
      duration: res.duration,
      author: '',
      origin: BBTypes.OriginType.BiliOriginName,
      type: BBTypes.SearchType.SearchTypeMusic,
    };
    if (res.videos > 0) {
      result.id = DecodeBiliSearchItemId(res.aid, res.bvid);
      result.type = BBTypes.SearchType.SearchTypeOrder;
      result.musicList = res.pages.map((item) => {
        return {
          id: decodeBiliMusicItemId(res.aid, res.bvid, item.cid),
          cover: item.first_frame,
          name: item.part,
          duration: item.duration,
          author: '',
          origin: BBTypes.OriginType.BiliOriginName,
        };
      });
    }

    return result;
  };

  getMusicFile: OriginService['getMusicFile'] = async (id: string) => {
    const biliid = unicodeBiliId(id);
    await this.initConfig();
    const detail = await this.client.getVideoUrl(biliid.aid, biliid.bvid, biliid.cid);

    if (detail?.durl?.length) {
      const originUrl = detail.durl[0].url;
      const headers = new Headers({
        Referer: 'https://www.bilibili.com/',
        'User-Agent': UserAgent,
      });
      return await fetch(originUrl, { headers });
    }
  };
}
