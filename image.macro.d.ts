import * as React from "react";

export interface Image {
  name?: string;

  src: string;

  width: number;
  height: number;

  sqip: {
    src: string;
  };
}

export const importImage: (src: string) => Image;
export const importBlob: (blobId: string) => Image;
