import { importBlob } from "@/cms";
import { Header } from "@/components/Header";

export default async function header() {
  return <Header blob={await importBlob("2ZfTSs9o51poWKLtqQ2X9Fo7jgKE7dK8g4CXKybZxQB2")} title="Where I was meant to be" />;
}
