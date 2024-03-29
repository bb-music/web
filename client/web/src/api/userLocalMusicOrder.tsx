import { type UserMusicOrderApiAction, type UserMusicOrderApi } from '@bb-music/app';
import { nanoid } from 'nanoid';
import dayjs from 'dayjs';
import { type MusicOrderItem } from '@bb-music/bb-types';
import { JsonCacheStorage } from '../lib/cacheStorage';

const NAME = 'Local';
const CNAME = '本地歌单';

export class UserLocalMusicOrderAction implements UserMusicOrderApiAction {
  userLocalMusicOrderCache = new JsonCacheStorage<MusicOrderItem[]>('bb-music-local-order');

  getList: UserMusicOrderApiAction['getList'] = async () => {
    const res = (await this.userLocalMusicOrderCache.get()) ?? [];
    return res;
  };

  create: UserMusicOrderApiAction['create'] = async (data) => {
    const res = await this.getList();
    if (res.find((l) => l.name.trim() === data.name.trim())) {
      await Promise.reject(new Error('歌单名称重复'));
      return;
    }
    await this.userLocalMusicOrderCache.set([{ ...data, id: nanoid() }, ...res]);
  };

  update: UserMusicOrderApiAction['update'] = async (data) => {
    await this.updateItem(data.id, () => {
      return {
        name: data.name,
        desc: data.desc,
        cover: data.cover,
      };
    });
  };

  delete: UserMusicOrderApiAction['delete'] = async (data) => {
    const res = await this.getList();
    await this.userLocalMusicOrderCache.set(res.filter((l) => l.id !== data.id));
  };

  getDetail: UserMusicOrderApiAction['getDetail'] = async (id) => {
    const res = await this.getList();
    const info = res.find((l) => l.id === id);
    if (!info) {
      return await Promise.reject(new Error('歌单不存在'));
    }
    return info;
  };

  appendMusic: UserMusicOrderApiAction['appendMusic'] = async (id, musics) => {
    await this.updateItem(id, (l) => {
      const newList = l.musicList?.filter((i) => !musics.find((m) => m.id === i.id));
      return {
        musicList: [...(newList ?? []), ...musics],
      };
    });
  };

  updateMusic: UserMusicOrderApiAction['updateMusic'] = async (id, music) => {
    await this.updateItem(id, (l) => {
      const newList = l.musicList?.map((i) => {
        if (i.id === music.id) {
          return {
            ...i,
            name: music.name,
            cover: music.cover,
          };
        }
        return i;
      });
      return {
        musicList: newList ?? [],
      };
    });
  };

  deleteMusic: UserMusicOrderApiAction['deleteMusic'] = async (id, musics) => {
    await this.updateItem(id, (l) => {
      const newList = l.musicList?.filter((i) => {
        return !musics.map((m) => m.id).includes(i.id);
      });
      return {
        musicList: newList || [],
      };
    });
  };

  private readonly updateItem = async (
    id: string,
    cb: (l: MusicOrderItem) => Partial<MusicOrderItem>,
  ) => {
    const res = await this.getList();
    await this.userLocalMusicOrderCache.set(
      res.map((l) => {
        if (l.id === id) {
          return {
            ...l,
            ...cb(l),
            updated_at: dayjs().format(),
          };
        }
        return l;
      }),
    );
  };
}

export class UserLocalMusicOrderInstance implements UserMusicOrderApi<null> {
  name = NAME;
  cname = CNAME;
  action = new UserLocalMusicOrderAction();
}
