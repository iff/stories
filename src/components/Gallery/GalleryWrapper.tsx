'use client'

import * as React from 'react';
import Gallery from './Gallery';

interface GalleryWrapperProps {
  children: React.ReactNode;
}

/**
 * Wrapper that ensures MDX children are loaded before passing to Gallery
 */
export function GalleryWrapper({ children }: GalleryWrapperProps) {
  return (
    <React.Suspense fallback={<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>Loading...</div>}>
      <Gallery>{children}</Gallery>
    </React.Suspense>
  );
}
