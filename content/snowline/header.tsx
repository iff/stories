import { Header } from "@/components/Header"
import { importImage } from "../../image.macro"

export default function header() {
  return (
    <Header
      image={importImage("https://storage.googleapis.com/plog-imgix/baeretswil-wald/DSCF0335.jpg")}
      title="Riding the snow line"
    />
  );
}
