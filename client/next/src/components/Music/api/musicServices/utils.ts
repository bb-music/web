import { settingCache } from '../setting';

// 更新音乐服务设置
export async function updateMusicServicesSetting(serviceName: string, data: any) {
  const setting = await settingCache.get();
  let list = setting?.musicServices ?? [];
  if (list.find((n) => n.name === serviceName)) {
    list = list.map((l) => {
      if (l.name === serviceName) {
        l.config = data;
      }
      return l;
    });
  } else {
    list.push({
      name: serviceName,
      config: data,
    });
  }
  settingCache.update('musicServices', list);
}
