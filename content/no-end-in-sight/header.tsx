import { importBlob } from "@/cms";
import { Header } from "@/components/Header";
import * as React from "react";

export default async function header() {
  return (
    <div>
      <Header blob={await importBlob("ARSdapw2zdSqg2mBAePGixd7z7oPzythmAafqogNCVjd")} title="No End in Sight" />
    </div>
  );
}
