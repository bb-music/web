export * from './proxy';

/** 合并 className */
export function cls(...classList: Array<string | undefined | boolean>) {
  return classList.filter((i) => !!i).join(' ');
}

export function isJson<T = any[] | Record<string, any>>(val: string): T | undefined {
  try {
    return JSON.parse(val);
  } catch (e) {}
}

export function transformImgUrl(url: string) {
  let r = url;
  if (!r.startsWith('https://') && !r.startsWith('http://')) {
    r = 'http:' + r;
  }
  return `https://image.baidu.com/search/down?url=${r}`;
}

/**
 * mm:ss 转为 秒
 */
export function mmss2seconds(str: string) {
  const [m, s] = str.split(':').map(Number);
  return m * 60 + s;
}

export function html2text(str: string) {
  const html = document.createElement('div');
  html.innerHTML = str;
  return html.innerText;
}
