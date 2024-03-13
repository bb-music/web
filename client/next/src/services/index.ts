import { OriginType } from '@bb-music/bb-types';
import { BiliService } from './bili';
import { type OriginService } from './interface';

export function getService(name: string, data: Record<string, any>): OriginService {
  switch (name) {
    case OriginType.Bili:
      return new BiliService(data);
    default:
      throw new Error(`未知歌曲源: ${name}`);
  }
}
