'use client';
import '../consts';

export function App({ children }: React.PropsWithChildren) {
  return (
    <>
      <body>{children}</body>
    </>
  );
}
