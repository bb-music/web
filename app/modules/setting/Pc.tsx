/**
 * 设置页
 */
import styles from './index.module.scss';
import { useEffect } from 'react';
import { useSettingStore } from './store';
import { MainSetting, ServiceSetting, OpenSetting, MusicOrderSetting } from './common';
import { api } from '../../api';

export function Setting() {
  const store = useSettingStore();
  useEffect(() => {
    store.load();
  }, []);
  return (
    <div className={styles.container} style={{ '--input-default-width': '460px' } as any}>
      <MainSetting />
      <ServiceSetting />
      <OpenSetting />
      <MusicOrderSetting />
      {api.setting.ExtraElement}
    </div>
  );
}
