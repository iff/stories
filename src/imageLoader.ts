"use client";

import { ImageLoaderProps } from "next/image";

export default function imageLoader({ src, width }: ImageLoaderProps) {
  return `${src}?w=${width}`;
}
