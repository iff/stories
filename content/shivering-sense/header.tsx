import { importBlob } from "@/cms";
import { Header } from "@/components/Header";

export default async function header() {
  return <Header blob={await importBlob("BefU8tziWMjkR6YWg5Tt5187xsdkkXp2ro5zSA6FYTWW")} title="Shivering Sense" />;
}
