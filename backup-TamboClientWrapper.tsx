'use client';

import { TamboProvider } from '@tambo-ai/react';
import { type ReactNode } from 'react';
import tamboConfig from '@/lib/tambo-config-playful';

interface TamboWrapperProps {
  children: ReactNode;
}

export function TamboClientWrapper({ children }: TamboWrapperProps) {
  return (
    <TamboProvider {...tamboConfig}>
      {children}
    </TamboProvider>
  );
}
