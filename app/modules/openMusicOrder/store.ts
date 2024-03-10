import { create } from 'zustand';
import { api } from '../../api';
import { settingStore } from '../setting';
import { type MusicInter } from '../../interface';

type MusicOrderItem = MusicInter.MusicOrderItem;

interface OpenMusicOrderStoreState {
  list: MusicOrderItem[];
}

interface OpenMusicOrderStoreHandler {
  load: () => Promise<void>;
}

type OpenMusicOrderStore = OpenMusicOrderStoreState & OpenMusicOrderStoreHandler;

export const useOpenMusicOrderStore = create<OpenMusicOrderStore>()((set, get) => {
  return {
    list: [],
    load: async () => {
      const origins = settingStore.getState().openMusicOrderOrigin;
      const urls = origins.map((u) => u.trim()).filter((u) => !!u);
      const res = await Promise.all(
        urls.map(async (url) => await api.openMusicOrder.useOriginGetMusicOrder(url)),
      );
      const list: MusicOrderItem[] = [];
      res.forEach((r) => {
        list.push(...r);
      });
      set({ list });
    },
  };
});
