import type * as BBTypes from '@bb-music/bb-types';
import { type Response } from 'express';

export abstract class OriginService {
  abstract getConfig(): Promise<any>;
  abstract search(params: BBTypes.SearchParams): Promise<BBTypes.SearchResponse>;
  abstract searchDetail(id: string): Promise<BBTypes.SearchItem>;
  abstract getMusicFile(id: string, res: Response): void;
}
