import './globals.css';

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="zh-cn">
      <meta content="width=device-width, initial-scale=1.0" name="viewport" />
      <head>
        <title>哔哔音乐</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
