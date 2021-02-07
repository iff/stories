import { Card } from "@/components/Card"
import { importImage } from "../../image.macro"

export default function card() {
  return (
    <Card
      image={importImage("https://storage.googleapis.com/plog-imgix/hawaii-nz/DSCF0565.jpg")}
      caption="Hawaii"
    />
  );
}
