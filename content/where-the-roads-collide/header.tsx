import { Header } from "@/components/Header";
import { importBlob } from "../../image.macro";

export default function header() {
  return <Header blob={importBlob("FvWPgxfsmWHtaUmzuNSte99GMM5Rtiu2CiKMJnZgXbfR")} title="Where the Roads Collide" />;
}
