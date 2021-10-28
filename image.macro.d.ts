import * as React from "react";

export interface Image {
  src: string;

  width: number;
  height: number;

  sqip: {
    src: string;
  };
}

export const importImage: (src: string) => Image;
export const importBlob: (blobId: string) => Image;
