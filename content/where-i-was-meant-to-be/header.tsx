import { Header } from "@/components/Header";
import { importBlob } from "../../image.macro";

export default function header() {
  return <Header blob={importBlob("2ZfTSs9o51poWKLtqQ2X9Fo7jgKE7dK8g4CXKybZxQB2")} title="Where I was meant to be" />;
}
