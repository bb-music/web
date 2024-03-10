'use client';
export function App({ children }: React.PropsWithChildren) {
  return (
    <>
      <body>{children}</body>
    </>
  );
}
