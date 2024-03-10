import {
  Button,
  message,
  Input,
  SettingItem,
  userMusicOrderOrigin,
  UserMusicOrderOriginType,
  type UserMusicOrderApi,
  type UserMusicOrderOrigin,
} from '@bb-music/app';

import { useEffect, useState } from 'react';
import { settingCache } from './setting';

const { GithubUserMusicOrderAction } = userMusicOrderOrigin;

const NAME = UserMusicOrderOriginType.Github;
const CNAME = 'Github 歌单';

// Github 源
interface GithubSyncValue {
  repo: string;
  token: string;
}
type GithubMusicOrder = UserMusicOrderApi<GithubSyncValue>;
export class UserGithubMusicOrderInstance implements GithubMusicOrder {
  name = NAME;
  cname = CNAME;
  ConfigElement: GithubMusicOrder['ConfigElement'] = ({ onChange }) => {
    const [data, setData] = useState<GithubSyncValue>({
      repo: '',
      token: '',
    });
    const loadHandler = async () => {
      const setting = await settingCache.get();
      if (setting) {
        const config = setting.userMusicOrderOrigin.find((u) => u.name === NAME)?.config;
        if (config) {
          setData({
            repo: config.repo,
            token: config.token,
          });
        }
      }
    };
    useEffect(() => {
      loadHandler();
    }, []);
    const changeHandler = (key: keyof GithubSyncValue, value: string) => {
      const newValue = {
        ...data,
        [key]: value,
      };
      setData(newValue);
    };
    const savaHandler = () => {
      updateUserMusicOrderOriginConfig(NAME, data).then(() => {
        onChange?.(data);
        message.success('已保存');
      });
    };
    return (
      <>
        <SettingItem label="仓库地址">
          <Input
            value={data.repo}
            onChange={(e) => {
              changeHandler('repo', e.target.value);
            }}
          />
        </SettingItem>
        <SettingItem label="token">
          <Input
            value={data.token}
            onChange={(e) => {
              changeHandler('token', e.target.value);
            }}
          />
        </SettingItem>
        <Button onClick={savaHandler}>保存</Button>
      </>
    );
  };

  action = new GithubUserMusicOrderAction(async () => {
    const setting = await settingCache.get();
    const config = setting?.userMusicOrderOrigin.find((n) => n.name === NAME)?.config;
    return config as UserMusicOrderOrigin.GithubConfig;
  });
}

async function updateUserMusicOrderOriginConfig(originName: string, data: any) {
  const setting = await settingCache.get();
  let list = setting?.userMusicOrderOrigin ?? [];
  if (list.find((n) => n.name === originName)) {
    list = list.map((l) => {
      if (l.name === originName) {
        l.config = data;
      }
      return l;
    });
  } else {
    list.push({
      name: originName,
      config: data,
    });
  }
  await settingCache.update('userMusicOrderOrigin', list);
}
