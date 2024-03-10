import { isJson } from '../utils';
import { type StateStorage } from 'zustand/middleware';
import { get, set, del } from 'idb-keyval';

/** 缓存接口 */
export const cacheStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return (await get(name)) || '';
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await set(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await del(name);
  },
};

export class JsonCacheStorage<T> {
  constructor(private readonly key: string) {}
  get = async (): Promise<T | undefined> => {
    const res = await get(this.key);
    return isJson<T>(res);
  };

  set = async (value: T): Promise<void> => {
    await set(this.key, JSON.stringify(value));
  };

  removeItem = async (): Promise<void> => {
    await del(this.key);
  };

  async update(key: keyof T, value: T[keyof T]): Promise<void> {
    const res = await this.get();
    const data = { ...res, [key]: value };
    await this.set(data as T);
  }
}
