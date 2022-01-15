import { Header } from "@/components/Header";
import * as React from "react";
import { importBlob } from "../../image.macro";

export default function header() {
  return (
    <div>
      <Header image={importBlob("CbAA5a6fa9Qdb7E6gCnfNVx5UXbAxwLXGxAP5PDDMqYV")} title="Blouson Noir" />
    </div>
  );
}
