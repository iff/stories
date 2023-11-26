import { importBlob } from "@/cms";
import { Header } from "@/components/Header";
import * as React from "react";

export default async function header() {
  return (
    <div>
      <Header blob={await importBlob("CbAA5a6fa9Qdb7E6gCnfNVx5UXbAxwLXGxAP5PDDMqYV")} title="Blouson Noir" />
    </div>
  );
}
