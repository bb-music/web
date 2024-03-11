import { BiliService } from './bili';
import { type OriginService } from './interface';

export const service: Record<string, OriginService> = {
  bili: new BiliService(),
};
