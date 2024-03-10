/* eslint-disable @typescript-eslint/naming-convention */
import { request } from '../request';
import md5 from 'md5';

const mixinKeyEncTab = [
  46, 47, 18, 2, 53, 8, 23, 32, 15, 50, 10, 31, 58, 3, 45, 35, 27, 43, 5, 49, 33, 9, 42, 19, 29, 28,
  14, 39, 12, 38, 41, 13, 37, 48, 7, 16, 24, 55, 40, 61, 26, 17, 0, 1, 60, 51, 30, 4, 22, 25, 54,
  21, 56, 59, 6, 63, 57, 62, 11, 36, 20, 34, 44, 52,
];

// 对 imgKey 和 subKey 进行字符顺序打乱编码
const getMixinKey = (orig: string) =>
  mixinKeyEncTab
    .map((n) => orig[n])
    .join('')
    .slice(0, 32);

// 为请求参数进行 wbi 签名
export function encWbi(params: Record<string, any>, imgKey: string, subKey: string) {
  const mixinKey = getMixinKey(imgKey + subKey);
  const currTime = Math.round(Date.now() / 1000);
  const chrFilter = /[!'()*]/g;

  Object.assign(params, { wts: currTime }); // 添加 wts 字段
  // 按照 key 重排参数
  const query = Object.keys(params)
    .sort()
    .map((key) => {
      // 过滤 value 中的 "!'()*" 字符
      const value = params[key].toString().replace(chrFilter, '');
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .join('&');

  const wbiSign = md5(query + mixinKey); // 计算 w_rid

  return query + '&w_rid=' + wbiSign;
}

// 获取最新的 img_key 和 sub_key
export async function getWbiKeys() {
  const res = await request.get(`https://api.bilibili.com/x/web-interface/nav`, {
    headers: {
      // SESSDATA 字段
      Cookie: 'SESSDATA=xxxxxx',
    },
  });
  const {
    data: {
      wbi_img: { img_url, sub_url },
    },
  } = res.data;

  return {
    img_key: img_url.slice(img_url.lastIndexOf('/') + 1, img_url.lastIndexOf('.')) as string,
    sub_key: sub_url.slice(sub_url.lastIndexOf('/') + 1, sub_url.lastIndexOf('.')) as string,
  };
}
