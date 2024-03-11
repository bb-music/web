class BiliId {
  aid: string = '';
  bvid: string = '';
  cid: string = '';
}

// 将 ID 转为 aid bvid cid
export function unicodeBiliId(id: string): BiliId {
  const parts = id.split('_');
  const biliId = new BiliId();
  if (parts.length < 2) {
    console.error('ID 格式不正确');
    return new BiliId();
  }
  biliId.aid = parts[0];
  biliId.bvid = parts[1];
  if (parts.length > 2) {
    biliId.cid = parts[2];
  }
  return biliId;
}
// 将 aid bvid 合并为 ID
export function DecodeBiliSearchItemId(aid: number, bvid: string): string {
  return `${aid}_${bvid}`;
}

// 将 aid bvid cid 合并为 ID
export function decodeBiliMusicItemId(aid: number, bvid: string, cid: number) {
  return `${aid}_${bvid}_${cid}`;
}

// 将 mm:ss 格式的时间转换为 秒
export function duration2Seconds(durationStr: string): number {
  if (durationStr === '') {
    return 0;
  }

  // 按":"分割字符串并转换为整数
  const parts = durationStr.split(':');
  if (parts.length < 2) {
    return 0;
  }

  const minutes = parseInt(parts[0], 10);
  if (isNaN(minutes)) {
    return 0;
  }

  const seconds = parseInt(parts[1], 10);
  if (isNaN(seconds)) {
    return 0;
  }

  // 返回分钟数乘以 60 再加上秒数
  return minutes * 60 + seconds;
}
