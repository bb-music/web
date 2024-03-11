import * as BBTypes from '@bb-music/bb-types';
export * from './catchStore';

/** 合并 className */
export function cls(...classList: Array<string | undefined>) {
  return classList.filter((i) => !!i).join(' ');
}

export function transformImgUrl(url: string) {
  let r = url;
  if (!r.startsWith('https://')) {
    r = 'http:' + r;
  }
  return `https://image.baidu.com/search/down?url=${r}`;
}

export function string2Number(val: string | number) {
  const r = Number(val);
  if (isNaN(r)) return;
  return r;
}

export function isJson<T = any[] | Record<string, any>>(val: string): T | undefined {
  try {
    return JSON.parse(val);
  } catch (e) {}
}

export function validateOrigin(origin?: string | null) {
  if (!origin) return false;
  return [BBTypes.OriginType.BiliOriginName, BBTypes.OriginType.YouTubeOriginName].includes(
    origin as BBTypes.OriginType,
  );
}

export function successResp(data: any) {
  return Response.json({
    code: 200,
    msg: 'success',
    data,
  });
}