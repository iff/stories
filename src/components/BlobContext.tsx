"use client";

import React, { createContext, useContext } from "react";

export interface BlobData {
  blobId: string;
  url: string;
  width: number;
  height: number;
}

interface BlobContextValue {
  blobs: Record<string, BlobData>;
}

const BlobContext = createContext<BlobContextValue | undefined>(undefined);

export function BlobProvider({
  blobs,
  children,
}: {
  blobs: Record<string, BlobData>;
  children: React.ReactNode;
}) {
  return (
    <BlobContext.Provider value={{ blobs }}>{children}</BlobContext.Provider>
  );
}

export function useBlobContext() {
  const context = useContext(BlobContext);
  if (!context) {
    throw new Error("useBlobContext must be used within BlobProvider");
  }
  return context.blobs;
}
