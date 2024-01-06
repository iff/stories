import { importBlob } from "@/cms";
import { Header } from "@/components/Header";
import * as React from "react";

export default async function header() {
  return (
    <div>
      <Header blob={await importBlob("B9uJRSuzBxXBpBhAKZAYm1S35wD6s2sH2RixcN9G8Wax")} title="Kindest Regards" />
    </div>
  );
}
