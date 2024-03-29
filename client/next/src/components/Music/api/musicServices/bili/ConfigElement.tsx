import {
  type MusicServiceApi,
  SettingItem,
  Input,
  Button,
  Switch,
  message,
  type SettingInfo,
} from '@bb-music/app';
import { useEffect, useState } from 'react';
import { type BiliBiliAuthConfig } from '@bb-music/bb-types';
import { NAME } from './consts';
import { getBiliAuthConfig } from '.';

class BiliMusicServiceConfigValue {
  enabled = true;
  proxyEnabled = false;
  proxyAddress = '';
  proxyToken = '';
}

type BiliMusicServiceApi = MusicServiceApi<BiliMusicServiceConfigValue>;

export interface CreateBiliConfigElementOptions {
  getSetting: () => Promise<SettingInfo | undefined>;
  updateMusicServicesSetting: (serviceName: string, data: any) => Promise<void>;
}

export function createBiliConfigElement({
  getSetting,
  updateMusicServicesSetting,
}: CreateBiliConfigElementOptions) {
  const ConfigElement: BiliMusicServiceApi['ConfigElement'] = ({ onChange }) => {
    const [config, setConfig] = useState<BiliBiliAuthConfig>();
    const [data, setData] = useState<BiliMusicServiceConfigValue>(
      new BiliMusicServiceConfigValue(),
    );
    const loadHandler = async () => {
      const res = getBiliAuthConfig();
      setConfig(res || void 0);

      if (res) {
        getSetting().then((res) => {
          if (Array.isArray(res?.musicServices)) {
            const c = res?.musicServices?.find((m) => m.name === NAME)?.config;
            setData(c as BiliMusicServiceConfigValue);
          }
        });
      }
    };
    useEffect(() => {
      loadHandler();
    }, []);
    const createProps = (key: keyof typeof data, isSwitch?: boolean) => {
      return {
        [isSwitch ? 'checked' : 'value']: data[key],
        onChange: (e: any) => {
          setData((s) => ({
            ...s,
            [key]: isSwitch ? e : e.target.value,
          }));
        },
      };
    };
    const saveHandler = () => {
      updateMusicServicesSetting(NAME, data).then(() => {
        onChange?.(data);
        message.success('已保存');
      });
    };
    return (
      <>
        <SettingItem label="开启/关闭">
          <Switch {...createProps('enabled', true)} />
        </SettingItem>
        <div style={{ display: data.enabled ? 'block' : 'none' }}>
          <SettingItem label="代理开启/关闭">
            <Switch {...createProps('proxyEnabled', true)} />
          </SettingItem>
          <div style={{ display: data.proxyEnabled ? 'block' : 'none' }}>
            <SettingItem label="代理地址">
              <Input {...createProps('proxyAddress')} />
            </SettingItem>
            <SettingItem label="代理秘钥">
              <Input {...createProps('proxyToken')} />
            </SettingItem>
          </div>
          <div style={{ display: !data.proxyEnabled ? 'block' : 'none' }}>
            <SettingItem label="imgKey">
              <Input value={config?.sign_data.img_key} disabled />
            </SettingItem>
            <SettingItem label="subKey">
              <Input value={config?.sign_data.img_key} disabled />
            </SettingItem>
            <SettingItem label="UUID_V3">
              <Input value={config?.spi_data.b_3} disabled />
            </SettingItem>
            <SettingItem label="UUID_V4">
              <Input value={config?.spi_data.b_4} disabled />
            </SettingItem>
          </div>
        </div>
        <div style={{ marginBottom: 15, display: 'flex', gap: '15px' }}>
          <Button onClick={saveHandler}>保存</Button>
        </div>
      </>
    );
  };
  return ConfigElement;
}
