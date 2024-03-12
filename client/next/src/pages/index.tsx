import Head from 'next/head';
import Music from '../components/Music';

export default function Home() {
  return (
    <>
      <Head>
        <title>哔哔音乐</title>
        <meta name="description" content="免费，免登陆，在线畅听全网音乐" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Music />
    </>
  );
}
