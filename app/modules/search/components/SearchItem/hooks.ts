import { useState } from 'react';
import { type MusicOrderDetailProps } from '../../..';
import { getMusicService } from '../../../../utils';
import { SearchType, type SearchItem } from '@bb-music/bb-types';

export interface SearchItemProps {
  data: SearchItem;
  gotoMusicOrderDetail: (opt: MusicOrderDetailProps) => void;
}

interface SearchItemHookProps {
  data: SearchItem;
  onDetailIsMusicOrder: (info: SearchItem) => void;
  onDetailIsMusic: (info: SearchItem) => void;
}
export function useSearchItem({
  data,
  onDetailIsMusicOrder,
  onDetailIsMusic,
}: SearchItemHookProps) {
  const [loading, setLoading] = useState(false);
  const [music, setMusic] = useState<SearchItem>();
  const getDetailHandler = async () => {
    setLoading(true);
    try {
      const service = getMusicService(data.origin);
      if (!service) return;
      const info = await service?.action.searchItemDetail(data);
      setMusic(info);
      if (info.type === SearchType.Order) {
        // 歌单
        onDetailIsMusicOrder(info);
      } else {
        // 当是歌曲时
        onDetailIsMusic(info);
      }
    } catch (e) {
      console.error('e', e);
    }
    setLoading(false);
  };

  return {
    loading,
    music,
    getDetailHandler,
  };
}
