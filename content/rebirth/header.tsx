import { importBlob } from "@/cms";
import { Header } from "@/components/Header";
import * as React from "react";

export default async function header() {
  return (
    <div>
      <Header blob={await importBlob("3hTEGq6HsHYSQzVd1qP8Z7UwK7J2Ggm5U5YC6PdQjHVU")} title="Rebirth" />
    </div>
  );
}
