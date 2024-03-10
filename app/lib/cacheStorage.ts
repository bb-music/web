import { isJson } from '../utils';
import { api } from '../api';

export class JsonCacheStorage<T> {
  constructor(private readonly key: string) {}
  get = async (): Promise<T | undefined> => {
    const res = await api.cacheStorage.getItem(this.key);
    return isJson<T>(res || '');
  };

  set = async (value: T): Promise<void> => {
    await api.cacheStorage.setItem(this.key, JSON.stringify(value));
  };

  removeItem = async (): Promise<unknown> => {
    return api.cacheStorage.removeItem(this.key);
  };

  async update(key: keyof T, value: T[keyof T]): Promise<void> {
    const res = await this.get();
    const data = { ...res, [key]: value };
    await this.set(data as T);
  }
}
