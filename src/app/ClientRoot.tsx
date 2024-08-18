'use client';

import { SessionProvider } from "next-auth/react";
import { Providers } from "./Provider";


// a parent wrapper

export default function ClientRoot({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <Providers>
        {children}
      </Providers>
    </SessionProvider>
  );
}
