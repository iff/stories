import { Header } from "@/components/Header";
import * as React from "react";
import { importBlob } from "../../image.macro";

export default function header() {
  return (
    <div>
      <Header blob={importBlob("3hTEGq6HsHYSQzVd1qP8Z7UwK7J2Ggm5U5YC6PdQjHVU")} title="Rebirth" />
    </div>
  );
}
