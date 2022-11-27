import { Header } from "@/components/Header";
import * as React from "react";
import { importBlob } from "../../image.macro";

export default function header() {
  return (
    <div>
      <Header blob={importBlob("ARSdapw2zdSqg2mBAePGixd7z7oPzythmAafqogNCVjd")} title="No End in Sight" />
    </div>
  );
}
