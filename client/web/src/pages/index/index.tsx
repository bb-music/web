import { BBMusicApp, MobileContainer, PcContainer } from '@bb-music/app';
// import VConsole from 'vconsole';
import { apiInstance } from '../../api';
import { useEffect, useState } from 'react';
import '../../style.scss';

// new VConsole();

export default function Root() {
  const [initLoading, setInitLoading] = useState(false);
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
  console.log('isMobile: ', isMobile);
  const init = async () => {
    setInitLoading(true);
    try {
      await Promise.all(apiInstance.musicServices.map(async (s) => await s.hooks?.init?.()));
    } catch (error) {
      console.log('error: ', error);
    }
    setInitLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div
      style={{
        width: '100vw',
        height: '100%',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      {!initLoading && (
        <BBMusicApp apiInstance={apiInstance}>
          {isMobile ? <MobileContainer /> : <PcContainer />}
        </BBMusicApp>
      )}
    </div>
  );
}
