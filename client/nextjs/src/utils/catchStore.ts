import { isJson } from '.';

export class CacheStorage<T = any> {
  constructor(private readonly key: string) {}
  set(state: T) {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(this.key, JSON.stringify(state));
    }
  }

  get() {
    if (typeof window !== 'undefined') {
      return isJson(window.localStorage.getItem(this.key) || '');
    }
  }

  remove() {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(this.key);
    }
  }
}
