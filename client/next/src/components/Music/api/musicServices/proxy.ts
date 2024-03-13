import axios, { type AxiosRequestConfig } from 'axios';
import { validateBiliAuthConfig } from '.';

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
  const biliAuth = await validateBiliAuthConfig();
  const res = await axios<Resp<T>>({
    ...proxy,
    headers: {
      ...proxy.headers,
      bili_spi_b3: biliAuth.spi_data.b_3,
      bili_spi_b4: biliAuth.spi_data.b_4,
      bili_sign_img_key: biliAuth.sign_data.img_key,
      bili_sign_sub_key: biliAuth.sign_data.sub_key,
    },
  });
  return res.data.data;
}

export function mergeUrl(a: string, b: string) {
  const a1 = a.endsWith('/') ? a : a + '/';
  const b1 = b.startsWith('/') ? b.substring(1) : b;
  return a1 + b1;
}
