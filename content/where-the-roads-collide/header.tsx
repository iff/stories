import { importBlob } from "@/cms";
import { Header } from "@/components/Header";

export default async function header() {
  return <Header blob={await importBlob("FvWPgxfsmWHtaUmzuNSte99GMM5Rtiu2CiKMJnZgXbfR")} title="Where the Roads Collide" />;
}
