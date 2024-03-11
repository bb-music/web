'use client';
import { BBMusicApp, MobileContainer, PcContainer } from '@bb-music/app';
import { apiInstance } from '@bb-music/web';
import { useEffect, useState } from 'react';
// import '../../style.scss';
// import VConsole from 'vconsole';
// new VConsole();

export function Music() {
  const [initLoading, setInitLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
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
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
    setIsMobile(isMobile);
    init();
  }, []);

  if (!window?.navigator) return null;

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
