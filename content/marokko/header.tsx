import { Header } from "@/components/Header"
import { importImage } from "../../image.macro"

export default function header() {
  return (
    <Header
      image={importImage("https://storage.googleapis.com/plog-imgix/marocco/DSCF1169.jpg")}
      title="Marocco"
    />
  );
}
