import * as React from "react";

export interface Blob {
  id: string;
  name: string;

  url: string;

  asImage: {
    url: string;

    dimensions: {
      width: number;
      height: number;
    };

    placeholder: {
      url: string;
    };
  };
}

export const importBlob: (blobId: string) => Blob | any;
