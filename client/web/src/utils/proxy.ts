import axios, { type AxiosRequestConfig } from 'axios';

export interface Resp<T = any> {
  code: number;
  message: string;
  data: T;
}

export class ProxyConfig {
  enabled = true;
  proxyEnabled = false;
  proxyAddress = '';
  proxyToken = '';
}

interface ProxyServiceOptions {
  proxy: AxiosRequestConfig;
}

export async function proxyMusicService<T = any>({ proxy }: ProxyServiceOptions) {
  const res = await axios<Resp<T>>({
    ...proxy,
  }).then((res) => res.data.data);
  return res;
}

export function mergeUrl(a: string, b: string) {
  const a1 = a.endsWith('/') ? a : a + '/';
  const b1 = b.startsWith('/') ? b.substring(1) : b;
  return a1 + b1;
}
