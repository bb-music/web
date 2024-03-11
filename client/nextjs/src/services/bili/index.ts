import { BiliClient, UserAgent } from '@bb-music/sdk-bili';
import * as BBTypes from '@bb-music/bb-types';
import { type OriginService } from '../interface';
import {
  DecodeBiliSearchItemId,
  decodeBiliMusicItemId,
  duration2Seconds,
  unicodeBiliId,
} from './utils';

import axios from 'axios';
import fs from 'fs';

export class BiliService implements OriginService {
  client: BiliClient;
  constructor() {
    this.client = new BiliClient();
    this.client.getWbiKeys().then(() => {
      console.log('SignData 获取成功');
    });
    this.client.getSpiData().then(() => {
      console.log('SpiData 获取成功');
    });
  }

  getConfig = async () => {
    return {
      spi_data: this.client.spiData,
      sign_data: this.client.signData,
    };
  };

  search: OriginService['search'] = async (params) => {
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

  getMusicFile: OriginService['getMusicFile'] = async (id: string, res: Response) => {
    const biliid = unicodeBiliId(id);
    const detail = await this.client.getVideoUrl(biliid.aid, biliid.bvid, biliid.cid);

    if (detail?.durl?.length) {
      const originUrl = detail.durl[0].url;
      axios
        .get(originUrl, {
          headers: {
            Referer: 'https://www.bilibili.com/',
            Cookie: '',
            'User-Agent': UserAgent,
          },
          responseType: 'stream',
        })
        .then((response) => {
          response.data.pipe(res);
        });
    }
  };
}

class SettingCache {
  filePath: string = './bili-setting';
  constructor(defaultData: Record<string, any> = {}) {
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify(defaultData));
    }
  }

  getFile() {
    const str = fs.readFileSync(this.filePath).toString();
    return JSON.parse(str);
  }
}
