import type * as BBTypes from '@bb-music/bb-types';
import { type AxiosResponse } from 'axios';

export abstract class OriginService {
  abstract getConfig(): Promise<any>;
  abstract search(
    params: BBTypes.SearchParams,
    headers: Record<string, string>,
  ): Promise<BBTypes.SearchResponse>;
  abstract searchDetail(id: string, headers: Record<string, string>): Promise<BBTypes.SearchItem>;
  abstract getMusicFile(id: string, headers: Record<string, string>): Promise<AxiosResponse | void>;
}
