'use client';
import { BBMusicApp, MobileContainer, PcContainer } from '@bb-music/app';
import { apiInstance } from '@bb-music/web';
import { useEffect, useState } from 'react';
// import '../../style.scss';
// import VConsole from 'vconsole';
// new VConsole();

export default function Music() {
  const [initLoading, setInitLoading] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean | undefined>();
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
    setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(window.navigator.userAgent));
    init();
  }, []);

  if (typeof isMobile === 'undefined') return null;

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
