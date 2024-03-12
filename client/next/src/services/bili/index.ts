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

export class BiliService implements OriginService {
  client: BiliClient;
  constructor() {
    this.client = new BiliClient();
  }

  getConfig = async () => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const [sign_data, spi_data] = await Promise.all([
      this.client.getSignData(),
      this.client.getSpiData(),
    ]);
    return {
      spi_data,
      sign_data,
    };
  };

  private readonly setConfig = async (headers: Record<string, string>) => {
    // this.client.setSignData(signData);
    // this.client.setSpiData(spiData);
  };

  search: OriginService['search'] = async (params, headers) => {
    this.setConfig(headers);
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
          origin: BBTypes.OriginType.Bili,
          musicList: [],
        });
      }
    }

    return result;
  };

  searchDetail: OriginService['searchDetail'] = async (id: string, headers) => {
    this.setConfig(headers);
    const biliid = unicodeBiliId(id);
    const res = await this.client.getVideoDetail(biliid.aid, biliid.bvid);

    const result: BBTypes.SearchItem = {
      id: decodeBiliMusicItemId(res.aid, res.bvid, res.cid),
      cover: res.pic,
      name: res.title,
      duration: res.duration,
      author: '',
      origin: BBTypes.OriginType.Bili,
      type: BBTypes.SearchType.Music,
    };
    if (res.videos > 0) {
      result.id = DecodeBiliSearchItemId(res.aid, res.bvid);
      result.type = BBTypes.SearchType.Order;
      result.musicList = res.pages.map((item) => {
        return {
          id: decodeBiliMusicItemId(res.aid, res.bvid, item.cid),
          cover: item.first_frame,
          name: item.part,
          duration: item.duration,
          author: '',
          origin: BBTypes.OriginType.Bili,
        };
      });
    }

    return result;
  };

  getMusicFile: OriginService['getMusicFile'] = async (id: string, headers) => {
    this.setConfig(headers);
    const biliid = unicodeBiliId(id);
    const detail = await this.client.getVideoUrl(biliid.aid, biliid.bvid, biliid.cid);

    if (detail?.durl?.length) {
      const originUrl = detail.durl[0].url;
      // const headers = new Headers({
      //   Referer: 'https://www.bilibili.com/',
      //   'User-Agent': UserAgent,
      // });
      // return await fetch(originUrl, { headers });

      return await axios.get(originUrl, {
        headers: {
          Referer: 'https://www.bilibili.com/',
          'User-Agent': UserAgent,
        },
        responseType: 'stream',
      });
    }
  };
}
