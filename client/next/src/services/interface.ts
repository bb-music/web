import type * as BBTypes from '@bb-music/bb-types';
import { type AxiosResponse } from 'axios';

export abstract class OriginService {
  abstract getConfig(): Promise<any>;
  abstract search(params: BBTypes.SearchParams): Promise<BBTypes.SearchResponse>;
  abstract searchDetail(id: string): Promise<BBTypes.SearchItem>;
  abstract getMusicFile(id: string): Promise<AxiosResponse | void>;
}
